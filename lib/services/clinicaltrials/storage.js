const { getDb } = require('../../config/firebase.js');
const { collection, addDoc, Timestamp, query, where, getDocs } = require('firebase/firestore');

async function saveRFP(rfp) {
  const db = getDb();
  if (!db) {
    throw new Error('Firebase is not initialized');
  }

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

async function checkExistingRFP(nctId) {
  const db = getDb();
  if (!db) return false;

  const rfpsRef = collection(db, 'rfps');
  const q = query(rfpsRef, where('id', '==', nctId));
  const snapshot = await getDocs(q);
  
  return !snapshot.empty;
}

module.exports = { saveRFP };