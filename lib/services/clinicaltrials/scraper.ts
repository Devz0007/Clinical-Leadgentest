import { fetchStudies } from './api';
import { transformToRFP } from './transformer';
import { saveRFP } from './storage';
import { ClinicalTrial } from './types';

export async function scrapeClinicalTrialsGov(): Promise<void> {
  try {
    console.log('Starting ClinicalTrials.gov scraper...');
    
    const studies = await fetchStudies();
    console.log(`Found ${studies.length} studies to process`);
    
    for (const study of studies) {
      try {
        const trial: ClinicalTrial = {
          nctId: study.protocolSection.identificationModule.nctId,
          title: study.protocolSection.identificationModule.briefTitle,
          status: study.protocolSection.statusModule.overallStatus,
          conditions: study.protocolSection.conditionsModule?.conditions || [],
          interventions: study.protocolSection.armsInterventionsModule?.interventions?.map((i: any) => i.name) || [],
          locations: study.protocolSection.contactsLocationsModule?.locations?.map((l: any) => l.facility) || [],
          phase: study.protocolSection.designModule?.phases?.[0] || "Not Specified",
          enrollment: study.protocolSection.designModule?.enrollmentInfo?.count || 0,
          lastUpdatePosted: new Date(study.protocolSection.statusModule.lastUpdatePostDate),
          sponsor: study.protocolSection.sponsorCollaboratorsModule?.leadSponsor?.name
        };

        const rfp = transformToRFP(trial);
        await saveRFP(rfp);
        console.log(`Processed study: ${trial.nctId}`);
      } catch (error) {
        console.error(`Error processing study:`, error);
        continue;
      }
    }
    
    console.log('Scraping completed successfully');
  } catch (error) {
    console.error('Error in scraper:', error);
    throw error;
  }
}