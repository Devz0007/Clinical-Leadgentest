const { scrapeClinicalTrialsGov } = require('../lib/services/clinicaltrials/scraper.js');
const { initializeFirebase } = require('../lib/config/firebase.js');
const cron = require('node-cron');

async function runScraper() {
  try {
    console.log('Starting scraper...');
    
    // Initialize Firebase before scraping
    const db = initializeFirebase();
    if (!db) {
      throw new Error('Failed to initialize Firebase');
    }
    
    await scrapeClinicalTrialsGov();
    console.log('Scraper completed successfully');
  } catch (error) {
    console.error('Error running scraper:', error);
    process.exit(1);
  }
}

// Run immediately on start
runScraper();

// Schedule to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running scheduled scraper...');
  runScraper();
});