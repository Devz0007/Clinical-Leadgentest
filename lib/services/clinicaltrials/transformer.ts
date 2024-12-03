import { ClinicalTrial } from './types';
import { RFP } from '@/types/rfp';

export function transformToRFP(trial: ClinicalTrial): RFP {
  return {
    id: trial.nctId,
    title: trial.title,
    company: trial.sponsor || "Various Institutions",
    source: "ClinicalTrials.gov",
    sourceUrl: `https://clinicaltrials.gov/study/${trial.nctId}`,
    postDate: trial.lastUpdatePosted,
    description: formatDescription(trial),
    trialPhase: trial.phase,
    therapeuticArea: trial.conditions[0],
    location: trial.locations,
    status: trial.status.toLowerCase() === "recruiting" ? "active" : "upcoming",
    patientCount: {
      target: trial.enrollment
    },
    requirements: trial.eligibilityCriteria ? [trial.eligibilityCriteria] : undefined
  };
}

function formatDescription(trial: ClinicalTrial): string {
  const parts = [];
  
  if (trial.conditions.length > 0) {
    parts.push(`Conditions: ${trial.conditions.join(', ')}`);
  }
  
  if (trial.interventions.length > 0) {
    parts.push(`Interventions: ${trial.interventions.join(', ')}`);
  }
  
  if (trial.briefSummary) {
    parts.push(`\n\nSummary: ${trial.briefSummary}`);
  }
  
  return parts.join('\n');
}