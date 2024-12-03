import { db } from '@/lib/config/firebase';
import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { RFP } from '@/types/rfp';

export async function saveRFP(rfp: RFP): Promise<void> {
  try {
    // Check if RFP already exists
    const existing = await checkExistingRFP(rfp.id);
    if (existing) {
      console.log(`RFP ${rfp.id} already exists, skipping...`);
      return;
    }

    const rfpsRef = collection(db, 'rfps');
    await addDoc(rfpsRef, {
      ...rfp,
      postDate: Timestamp.fromDate(new Date(rfp.postDate))
    });
    console.log(`Successfully saved RFP: ${rfp.id}`);
  } catch (error) {
    console.error('Error saving RFP to Firebase:', error);
    throw error;
  }
}

async function checkExistingRFP(nctId: string): Promise<boolean> {
  const rfpsRef = collection(db, 'rfps');
  const q = query(rfpsRef, where('id', '==', nctId));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}