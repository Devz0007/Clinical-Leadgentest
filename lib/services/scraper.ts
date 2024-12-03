"use server";

import axios from 'axios';
import * as cheerio from 'cheerio';
import { db } from '@/lib/config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { RFP } from '@/types/rfp';

interface ClinicalTrial {
  nctId: string;
  title: string;
  status: string;
  conditions: string[];
  interventions: string[];
  locations: string[];
  phase: string;
  enrollment: number;
  lastUpdatePosted: Date;
}

export async function scrapeClinicalTrialsGov(): Promise<void> {
  try {
    const baseUrl = 'https://clinicaltrials.gov/api/v2/studies';
    const params = {
      format: 'json',
      filter: {
        lastUpdatePostedDate: {
          lte: new Date().toISOString(),
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        overallStatus: ["Recruiting", "Not yet recruiting"],
        studyType: ["Interventional"]
      },
      pageSize: 100,
      page: 1
    };

    const response = await axios.get(baseUrl, { params });
    const studies = response.data.studies;

    for (const study of studies) {
      const trial: ClinicalTrial = {
        nctId: study.protocolSection.identificationModule.nctId,
        title: study.protocolSection.identificationModule.briefTitle,
        status: study.protocolSection.statusModule.overallStatus,
        conditions: study.protocolSection.conditionsModule?.conditions || [],
        interventions: study.protocolSection.armsInterventionsModule?.interventions?.map((i: any) => i.name) || [],
        locations: study.protocolSection.contactsLocationsModule?.locations?.map((l: any) => l.facility) || [],
        phase: study.protocolSection.designModule?.phases?.[0] || "Not Specified",
        enrollment: study.protocolSection.designModule?.enrollmentInfo?.count || 0,
        lastUpdatePosted: new Date(study.protocolSection.statusModule.lastUpdatePostDate)
      };

      await saveToFirebase(transformToRFP(trial));
    }
  } catch (error) {
    console.error('Error scraping ClinicalTrials.gov:', error);
    throw error;
  }
}

function transformToRFP(trial: ClinicalTrial): RFP {
  return {
    id: trial.nctId,
    title: trial.title,
    company: "Various Institutions",
    source: "ClinicalTrials.gov",
    sourceUrl: `https://clinicaltrials.gov/study/${trial.nctId}`,
    postDate: trial.lastUpdatePosted,
    description: `Conditions: ${trial.conditions.join(', ')}\nInterventions: ${trial.interventions.join(', ')}`,
    trialPhase: trial.phase,
    therapeuticArea: trial.conditions[0],
    location: trial.locations,
    status: trial.status.toLowerCase() === "recruiting" ? "active" : "upcoming",
    patientCount: {
      target: trial.enrollment
    }
  };
}

async function saveToFirebase(rfp: RFP): Promise<void> {
  if (!db) {
    throw new Error('Firebase is not initialized');
  }

  try {
    const rfpsRef = collection(db, 'rfps');
    await addDoc(rfpsRef, {
      ...rfp,
      postDate: Timestamp.fromDate(new Date(rfp.postDate))
    });
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    throw error;
  }
}