const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://pufehvlectunfnergidh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZmVodmxlY3R1bmZuZXJnaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU2NzIsImV4cCI6MjA2OTA5MTY3Mn0.TZESJEWM_k-E4cp4AyiALQtq4Y9Jkj-6CpdyXonc95o';
const supabase = createClient(supabaseUrl, supabaseKey);

// Example data (replace with your real data or import from your TS files)
const foundersData = [
  {
    email: 'nallathambi.e@bizrenow.com',
    name: 'BizReNow Solutions LLP',
    website: 'https://www.bizrenow.com',
    industry: 'SaaS',
    type: 'B2B',
    city: 'Coimbatore',
    country: 'India',
    founder: 'Nallathambi E',
    employees: '9',
    funding: 'Bootstrapped',
    customers: 'Fewer than 1,000',
    revenue: '$10k-$49k',
    launched: 'checked',
    paying_customers: 'checked',
    revenue_gen: 'checked',
    full_time_team: 'checked',
    venture_backed: '',
    video: '',
    pitch_deck: 'https://drive.google.com/open?id=1IjIgefmKOORRqoqKSrmxH_hFx8lX1MP0',
    support: '',
    contribute: ''
  }
  // Add more data as needed
];

const challengesData = [
  {
    title: 'Hangzhou Global Entrepreneurial Challenge',
    organizer: 'Startup Competition Network',
    description: 'Hangzhou Global Entrepreneurial Challenge for International Talents: $800K Prize Pool Awaits',
    type: ['Startup Competition'],
    deadline: '9 day(s) left'
  }
  // Add more data as needed
];

async function migrateData() {
  try {
    console.log('Starting data migration...');

    // Migrate startups
    console.log('Migrating startups...');
    const { data: startupsData, error: startupsError } = await supabase
      .from('startups')
      .insert(foundersData);

    if (startupsError) {
      console.error('Error migrating startups:', startupsError);
    } else {
      console.log(`Successfully migrated ${startupsData?.length || 0} startups`);
    }

    // Migrate challenges
    console.log('Migrating challenges...');
    const { data: challengesResult, error: challengesError } = await supabase
      .from('challenges')
      .insert(challengesData);

    if (challengesError) {
      console.error('Error migrating challenges:', challengesError);
    } else {
      console.log(`Successfully migrated ${challengesResult?.length || 0} challenges`);
    }

    console.log('Data migration completed!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migration
migrateData(); 