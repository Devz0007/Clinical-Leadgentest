export interface ClinicalTrial {
  nctId: string;
  title: string;
  status: string;
  conditions: string[];
  interventions: string[];
  locations: string[];
  phase: string;
  enrollment: number;
  lastUpdatePosted: Date;
  briefSummary?: string;
  detailedDescription?: string;
  eligibilityCriteria?: string;
  sponsor?: string;
}

export interface ClinicalTrialsAPIParams {
  format: 'json';
  filter: {
    lastUpdatePostedDate: {
      lte: string;
      gte: string;
    };
    overallStatus: string[];
    studyType: string[];
  };
  pageSize: number;
  page: number;
}

export interface APIResponse {
  studies: any[];
  totalCount: number;
  currentPage: number;
}