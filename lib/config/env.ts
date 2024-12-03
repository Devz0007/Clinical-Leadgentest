export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface ScraperConfig {
  intervalMinutes: number;
  maxConcurrentRequests: number;
}

export function getFirebaseConfig(): FirebaseConfig | null {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const missingValues = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingValues.length > 0) {
    return null;
  }

  return config as FirebaseConfig;
}

export function getScraperConfig(): ScraperConfig {
  return {
    intervalMinutes: Number(process.env.SCRAPER_INTERVAL_MINUTES || 60),
    maxConcurrentRequests: Number(process.env.SCRAPER_MAX_CONCURRENT_REQUESTS || 5),
  };
}