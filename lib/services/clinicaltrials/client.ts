import axios from 'axios';
import { APIError } from './errors';
import { formatDateParam } from './utils';

const API_BASE_URL = 'https://clinicaltrials.gov/api/v2/studies';

export async function fetchStudies() {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const params = {
      format: 'json',
      query: {
        term: `AREA[LastUpdatePostDate]RANGE[${formatDateParam(thirtyDaysAgo)},${formatDateParam(today)}]`,
        locn: 'United States'
      },
      filter: {
        overallStatus: ['NOT_YET_RECRUITING', 'RECRUITING']
      },
      fields: [
        'NCTId',
        'BriefTitle',
        'LeadSponsorName',
        'OverallStatus',
        'BriefSummary',
        'Phase',
        'Condition',
        'EnrollmentCount',
        'LocationFacility',
        'LocationCity',
        'LocationState',
        'LastUpdatePostDate'
      ].join(','),
      pageSize: 10
    };

    const response = await axios.get(API_BASE_URL, {
      params,
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return response.data.studies || [];
  } catch (error) {
    throw APIError.fromError(error);
  }
}