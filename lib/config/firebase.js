const { initializeApp, getApps } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDXhaAlHYZfTYokVTHcM1B-4rzk8WUmmVA",
  authDomain: "clinical-leads.firebaseapp.com",
  projectId: "clinical-leads",
  storageBucket: "clinical-leads.firebasestorage.app",
  messagingSenderId: "825737027907",
  appId: "1:825737027907:web:a886b67e62578bda7e8ff6"
};

let app;
let db;

function initializeFirebase() {
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
  }
  return db;
}

module.exports = { 
  initializeFirebase,
  getDb: () => db || initializeFirebase()
};