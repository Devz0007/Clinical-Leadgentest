import { RFP } from '@/types/rfp';
import { fetchStudies } from './client';
import { formatLocation } from './utils';
import { APIError } from './errors';

export async function fetchClinicalTrials(): Promise<RFP[]> {
  try {
    const studies = await fetchStudies();
    return studies.map(transformStudyToRFP);
  } catch (error) {
    console.error('Error fetching clinical trials:', error);
    throw error instanceof APIError ? error : new APIError('Failed to fetch clinical trials');
  }
}

function transformStudyToRFP(study: any): RFP {
  const protocolSection = study.protocolSection;
  
  if (!protocolSection?.identificationModule?.nctId) {
    throw new APIError('Invalid study data: Missing NCT ID');
  }

  return {
    id: protocolSection.identificationModule.nctId,
    title: protocolSection.identificationModule.briefTitle || 'Untitled Study',
    company: protocolSection.sponsorCollaboratorsModule?.leadSponsor?.name || 'Various Institutions',
    source: 'ClinicalTrials.gov',
    sourceUrl: `https://clinicaltrials.gov/study/${protocolSection.identificationModule.nctId}`,
    postDate: new Date(protocolSection.statusModule.lastUpdatePostDateStruct.date),
    description: formatDescription(protocolSection),
    trialPhase: protocolSection.designModule?.phases?.[0] || 'Not Specified',
    therapeuticArea: protocolSection.conditionsModule?.conditions?.[0],
    location: formatLocations(protocolSection),
    status: protocolSection.statusModule.overallStatus.toLowerCase().includes('recruiting') ? 'active' : 'upcoming',
    patientCount: {
      target: protocolSection.designModule?.enrollmentInfo?.count || 0
    }
  };
}

function formatDescription(protocolSection: any): string {
  const parts = [];
  
  if (protocolSection.conditionsModule?.conditions?.length > 0) {
    parts.push(`Conditions: ${protocolSection.conditionsModule.conditions.join(', ')}`);
  }
  
  if (protocolSection.descriptionModule?.briefSummary) {
    parts.push(`\n\nSummary: ${protocolSection.descriptionModule.briefSummary}`);
  }
  
  return parts.join('') || 'No description available';
}

function formatLocations(protocolSection: any): string[] {
  const locations: string[] = [];
  const locationsList = protocolSection.contactsLocationsModule?.locations || [];
  
  for (const loc of locationsList) {
    if (loc.country === 'United States') {
      locations.push(formatLocation(loc.facility, loc.city, loc.state));
    }
  }
  
  return locations;
}