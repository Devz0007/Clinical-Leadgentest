"use client";

import { db } from '@/lib/config/firebase';
import { collection, getDocs, query, orderBy, limit, DocumentData } from 'firebase/firestore';

export async function getLatestRFPs(limitCount: number = 10): Promise<DocumentData[]> {
  if (!db) {
    throw new Error('Firebase is not initialized');
  }

  try {
    const rfpsRef = collection(db, 'rfps');
    const q = query(rfpsRef, orderBy('postDate', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching RFPs:', error);
    throw error;
  }
}