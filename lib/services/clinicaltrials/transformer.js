function transformToRFP(study) {
  return {
    id: study.NCTId[0],
    title: study.BriefTitle[0],
    company: study.LeadSponsorName?.[0] || "Various Institutions",
    source: "ClinicalTrials.gov",
    sourceUrl: `https://clinicaltrials.gov/study/${study.NCTId[0]}`,
    postDate: new Date(study.LastUpdatePostDate[0]),
    description: formatDescription(study),
    trialPhase: study.Phase?.[0] || "Not Specified",
    therapeuticArea: study.Condition?.[0],
    location: formatLocations(study),
    status: study.OverallStatus[0].toLowerCase() === "recruiting" ? "active" : "upcoming",
    patientCount: {
      target: study.EnrollmentCount?.[0] ? parseInt(study.EnrollmentCount[0]) : 0
    },
    requirements: study.EligibilityCriteria ? 
      [study.EligibilityCriteria[0]] : 
      undefined
  };
}

function formatDescription(study) {
  const parts = [];
  
  if (study.Condition?.length > 0) {
    parts.push(`Conditions: ${study.Condition.join(', ')}`);
  }
  
  if (study.InterventionName?.length > 0) {
    parts.push(`Interventions: ${study.InterventionName.join(', ')}`);
  }
  
  if (study.BriefSummary?.[0]) {
    parts.push(`\n\nSummary: ${study.BriefSummary[0]}`);
  }
  
  return parts.join('\n');
}

function formatLocations(study) {
  const locations = [];
  
  if (study.LocationFacility && study.LocationCity && study.LocationState) {
    for (let i = 0; i < study.LocationFacility.length; i++) {
      if (study.LocationCountry[i] === 'United States') {
        locations.push(`${study.LocationFacility[i]}, ${study.LocationCity[i]}, ${study.LocationState[i]}`);
      }
    }
  }
  
  return locations;
}

module.exports = { transformToRFP };