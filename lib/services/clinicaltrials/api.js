const axios = require('axios');

const API_BASE_URL = 'https://classic.clinicaltrials.gov/api/query/study_fields';

async function fetchStudies(params) {
  try {
    const queryParams = {
      expr: buildSearchExpression(params),
      fields: [
        "NCTId",
        "BriefTitle",
        "OfficialTitle",
        "OverallStatus",
        "BriefSummary",
        "DetailedDescription",
        "Phase",
        "EnrollmentCount",
        "LastUpdatePostDate",
        "Condition",
        "InterventionName",
        "LocationFacility",
        "LeadSponsorName",
        "EligibilityCriteria",
        "LocationCountry",
        "LocationCity",
        "LocationState"
      ].join(","),
      min_rnk: 1,
      max_rnk: 100,
      fmt: 'json'
    };

    console.log('Fetching with params:', queryParams);

    const response = await axios.get(API_BASE_URL, { 
      params: queryParams
    });

    return {
      studies: response.data.StudyFieldsResponse.StudyFields || []
    };
  } catch (error) {
    console.error('Error fetching from ClinicalTrials.gov API:', error);
    throw error;
  }
}

function buildSearchExpression({ startDate, endDate }) {
  return `AREA[LastUpdatePostDate]RANGE[${startDate},${endDate}] AND ` +
         `AREA[OverallStatus]EXPAND[Recruiting,Not yet recruiting] AND ` +
         `AREA[StudyType]EXPAND[Interventional] AND ` +
         `AREA[LocationCountry]United States`;
}

function buildAPIParams(daysAgo = 180) {
  const today = new Date();
  const pastDate = new Date(today.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  
  return {
    startDate: pastDate.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0]
  };
}

module.exports = { fetchStudies, buildAPIParams };