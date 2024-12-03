const { fetchStudies, buildAPIParams } = require('./api.js');
const { transformToRFP } = require('./transformer.js');
const { saveRFP } = require('./storage.js');
const { initializeFirebase } = require('../../config/firebase.js');

async function scrapeClinicalTrialsGov() {
  try {
    console.log('Starting ClinicalTrials.gov scraper...');
    
    // Ensure Firebase is initialized
    const db = initializeFirebase();
    if (!db) {
      throw new Error('Failed to initialize Firebase');
    }
    
    const params = buildAPIParams(180); // Last 6 months
    const response = await fetchStudies(params);
    
    if (!response.studies || !Array.isArray(response.studies)) {
      throw new Error('Invalid response format from ClinicalTrials.gov API');
    }
    
    console.log(`Found ${response.studies.length} studies to process`);
    
    for (const study of response.studies) {
      try {
        if (!study.protocolSection?.identificationModule?.nctId) {
          console.warn('Skipping invalid study data');
          continue;
        }

        const rfp = transformToRFP(study);
        await saveRFP(rfp);
        console.log(`Saved RFP: ${rfp.id}`);
      } catch (error) {
        console.error(`Error processing study:`, error);
        continue;
      }
    }
    
    console.log('Scraping completed successfully');
  } catch (error) {
    console.error('Error in scraper:', error);
    throw error;
  }
}

module.exports = { scrapeClinicalTrialsGov };