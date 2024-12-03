export interface RFP {
  id: string;
  title: string;
  company: string;
  source: string;
  sourceUrl: string;
  postDate: Date;
  deadline?: Date;
  description: string;
  trialPhase?: string;
  therapeuticArea?: string;
  location?: string[];
  status: 'active' | 'closed' | 'upcoming';
  requirements?: string[];
  patientCount?: {
    min?: number;
    max?: number;
    target?: number;
  };
  indication?: string;
  primaryEndpoint?: string;
  secondaryEndpoints?: string[];
  inclusionCriteria?: string[];
  exclusionCriteria?: string[];
}

export type RFPSource = {
  id: string;
  name: string;
  url: string;
  type: 'pharma' | 'cro' | 'registry';
  lastScraped?: Date;
};

export type TherapeuticArea = {
  id: string;
  name: string;
  subcategories?: string[];
};

export type TrialPhase = 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4' | 'Not Specified';