import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const SUPABASE_URL = 'https://pufehvlectunfnergidh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZmVodmxlY3R1bmZuZXJnaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU2NzIsImV4cCI6MjA2OTA5MTY3Mn0.TZESJEWM_k-E4cp4AyiALQtq4Y9Jkj-6CpdyXonc95o';

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Simple and reliable data reading
const readFoundersData = () => {
  try {
    const dataPath = path.join(__dirname, '../src/data/foundersData.ts');
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    
    // Find the array start and end
    const startMarker = 'export const foundersData: FounderStartup[] = [';
    const startIndex = fileContent.indexOf(startMarker);
    
    if (startIndex === -1) {
      throw new Error('Could not find foundersData array');
    }
    
    // Find the matching closing bracket
    let bracketCount = 0;
    let endIndex = -1;
    
    for (let i = startIndex + startMarker.length; i < fileContent.length; i++) {
      if (fileContent[i] === '[') bracketCount++;
      if (fileContent[i] === ']') {
        if (bracketCount === 0) {
          endIndex = i;
          break;
        }
        bracketCount--;
      }
    }
    
    if (endIndex === -1) {
      throw new Error('Could not find array end');
    }
    
    // Extract the JSON array
    const jsonArray = fileContent.substring(startIndex + startMarker.length, endIndex + 1);
    return JSON.parse(jsonArray);
  } catch (error) {
    console.error('❌ Error reading data:', error.message);
    process.exit(1);
  }
};

// Transform data to match database schema
const transformStartupData = (startup) => ({
  name: startup.name,
  website: startup.website,
  industry: startup.industry,
  type: startup.type,
  city: startup.city,
  country: startup.country,
  founder: startup.founder,
  email: startup.email,
  employees: startup.employees,
  funding: startup.funding,
  customers: startup.customers,
  revenue: startup.revenue,
  launched: startup.launched,
  paying_customers: startup.payingCustomers,
  revenue_gen: startup.revenueGen,
  full_time_team: startup.fullTimeTeam,
  venture_backed: startup.ventureBacked,
  video: startup.video,
  pitch_deck: startup.pitchDeck,
  support: startup.support,
  contribute: startup.contribute
});

// Main migration function
const migrateStartupsData = async () => {
  try {
    console.log('🚀 Starting migration...');
    
    const foundersData = readFoundersData();
    console.log(`📊 Found ${foundersData.length} startups to migrate`);
    
    const transformedData = foundersData.map(transformStartupData);
    
    // Insert in batches
    const batchSize = 50;
    let successCount = 0;
    
    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(transformedData.length / batchSize)}`);
      
      const { data, error } = await supabase
        .from('startups')
        .insert(batch)
        .select();
      
      if (error) {
        console.error(`❌ Batch error:`, error.message);
      } else {
        successCount += data.length;
        console.log(`✅ Inserted ${data.length} startups`);
      }
      
      // Small delay between batches
      if (i + batchSize < transformedData.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    console.log(`\n🎉 Migration complete! Successfully migrated ${successCount}/${transformedData.length} startups`);
    
  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    process.exit(1);
  }
};

// Check existing data
const checkExistingData = async () => {
  try {
    const { count, error } = await supabase
      .from('startups')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    
    console.log(`📊 Current startups in database: ${count}`);
    
    if (count > 0) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      return new Promise((resolve) => {
        rl.question('Database has existing data. Continue anyway? (y/N): ', (answer) => {
          rl.close();
          resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
        });
      });
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error checking data:', error.message);
    return false;
  }
};

// Clear table
const clearStartupsTable = async () => {
  try {
    console.log('🗑️  Clearing table...');
    const { error } = await supabase.from('startups').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (error) throw error;
    console.log('✅ Table cleared');
  } catch (error) {
    console.error('❌ Error clearing table:', error.message);
  }
};

// Main execution
const main = async () => {
  const command = process.argv[2];
  
  if (command === 'clear') {
    await clearStartupsTable();
    return;
  }
  
  const shouldContinue = await checkExistingData();
  if (shouldContinue) {
    await migrateStartupsData();
  } else {
    console.log('❌ Migration cancelled');
  }
};

main(); 