"use client";

import { db } from '@/lib/config/firebase';
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore';
import { RFP } from '@/types/rfp';

export async function getLatestRFPs(limitCount: number = 10): Promise<RFP[]> {
  try {
    const rfpsRef = collection(db, 'rfps');
    const sixMonthsAgo = Timestamp.fromDate(new Date(Date.now() - 180 * 24 * 60 * 60 * 1000));
    
    const q = query(
      rfpsRef,
      where('postDate', '>=', sixMonthsAgo),
      orderBy('postDate', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as RFP[];
  } catch (error) {
    console.error('Error fetching RFPs:', error);
    throw error;
  }
}

export async function searchRFPs(params: {
  therapeuticArea?: string;
  trialPhase?: string;
  status?: 'active' | 'closed' | 'upcoming';
  location?: string;
}): Promise<RFP[]> {
  try {
    const constraints = [
      where('postDate', '>=', Timestamp.fromDate(new Date(Date.now() - 180 * 24 * 60 * 60 * 1000))),
      orderBy('postDate', 'desc')
    ];
    
    if (params.therapeuticArea) {
      constraints.push(where('therapeuticArea', '==', params.therapeuticArea));
    }
    if (params.trialPhase) {
      constraints.push(where('trialPhase', '==', params.trialPhase));
    }
    if (params.status) {
      constraints.push(where('status', '==', params.status));
    }
    if (params.location) {
      constraints.push(where('location', 'array-contains', params.location));
    }

    const rfpsRef = collection(db, 'rfps');
    const q = query(rfpsRef, ...constraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as RFP[];
  } catch (error) {
    console.error('Error searching RFPs:', error);
    throw error;
  }
}