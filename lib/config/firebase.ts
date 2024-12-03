import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXhaAlHYZfTYokVTHcM1B-4rzk8WUmmVA",
  authDomain: "clinical-leads.firebaseapp.com",
  projectId: "clinical-leads",
  storageBucket: "clinical-leads.firebasestorage.app",
  messagingSenderId: "825737027907",
  appId: "1:825737027907:web:a886b67e62578bda7e8ff6"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);