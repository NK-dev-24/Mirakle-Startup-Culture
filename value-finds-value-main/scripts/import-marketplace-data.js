// This script will connect directly to your database and add the marketplace data.
// Run with: node scripts/import-marketplace-data.js

import { createClient } from '@supabase/supabase-js';

// Supabase configuration from your project
const supabaseUrl = 'https://pufehvlectunfnergidh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZmVodmxlY3R1bmZuZXJnaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU2NzIsImV4cCI6MjA2OTA5MTY3Mn0.TZESJEWM_k-E4cp4AyiALQtq4Y9Jkj-6CpdyXonc95o';

const supabase = createClient(supabaseUrl, supabaseKey);

const challengesToImport = [
  {
    title: "Hangzhou Global Entrepreneurial Challenge",
    organizer: "Startup Competition Network",
    description: "Hangzhou Global Entrepreneurial Challenge for International Talents: $800K Prize Pool Awaits",
    type: ["Startup Competition"],
    deadline: "9 day(s) left"
  },
  {
    title: "2025 Global AgriTech Awards",
    organizer: "WAFI - World AgriFood Innovation",
    contact: "Alicia Abou",
    description: "Pioneering the Future of Agriculture to Join World AgriFood Innovation Conference",
    type: ["Proof of Concept (PoC)", "Acceleration Program", "Investment", "Startup Competition", "Media Exposure"],
    deadline: "1 month(s) left"
  },
  {
    title: "Chaoyang's Global Startup Competition",
    organizer: "Startup Competition Network",
    description: "Bridging Global Startups to China's Market with Prize Pool of over $7 Million",
    type: ["Startup Competition"],
    deadline: "4 month(s) left"
  },
  {
    title: "Supersonic Program",
    organizer: "Supersonic",
    type: ["Acceleration Program", "Proof of Concept (PoC)", "Startup Competition"],
    status: "Always open",
    reward: 33.60
  },
  {
    title: "Supersonic Program (Duplicate Listing)",
    organizer: "Supersonic",
    type: ["Acceleration Program"],
    status: "Always open",
    reward: 33.60
  },
  {
    title: "Founders Lair Media Exposure",
    organizer: "Founders Lair (Jelte Ansgar Wingender)",
    type: ["Media Exposure"],
    status: "Always open"
  },
  {
    title: "Nigeria Startup Radar",
    organizer: "Nigeria Startup Radar",
    description: "Shine Globally in Our Startup Spotlight",
    type: ["Media Exposure"],
    status: "Always open"
  }
];

const startupsToImport = [
  {
    name: "Yournotify",
    ecosystem: "Nigeria",
    foundingYear: "2021",
    description: "Email and SMS Marketing Platform",
    industry: ["Marketing", "Communication"]
  },
  {
    name: "Obrisk",
    ecosystem: "China Mainland - Greater China",
    foundingYear: "2019",
    industry: ["Technology"]
  },
  {
    name: "BreatheIO",
    ecosystem: "Pakistan",
    foundingYear: "2020",
    industry: ["Technology"]
  },
  {
    name: "Earthfields®",
    ecosystem: "India",
    foundingYear: "2020",
    industry: ["Agriculture", "Sustainability"]
  },
  {
    name: "Scale",
    ecosystem: "Kenya",
    foundingYear: "2020",
    description: "Techstars '22",
    industry: ["Technology"]
  },
  {
    name: "BizReNow Solutions LLP",
    ecosystem: "India",
    foundingYear: "2021",
    industry: ["Business Solutions"]
  },
  {
    name: "Hivericks Technologies",
    ecosystem: "India",
    foundingYear: "2018",
    industry: ["Technology"]
  },
  {
    name: "PREGGY INDIA",
    ecosystem: "India",
    foundingYear: "2020",
    industry: ["Healthcare"]
  },
  {
    name: "Piltover Technologies",
    ecosystem: "India",
    foundingYear: "N/A",
    industry: ["Technology"]
  },
  {
    name: "Univus",
    ecosystem: "Kenya",
    foundingYear: "2021",
    industry: ["Technology"]
  }
];

const applyOpportunitiesToImport = [
  {
    title: "RTA Bus Stop Cooling Challenge",
    location: "Dubai, United Arab Emirates",
    deadline: "April 21"
  },
  {
    title: "S2 Xpeed - Cohort #5 - 2025",
    dates: "Sep 28 – Dec 19",
    location: "Barcelona, Spain",
    funding: "€1,200 per team",
    deadline: "April 21"
  },
  {
    title: "Solid Waste Diversion Challenge",
    location: "Miami, United States",
    funding: "$100K per team",
    equity: "0%",
    deadline: "April 21"
  },
  {
    title: "2025 Aging & Longevity Technologies",
    dates: "May 21",
    location: "San Diego, United States",
    deadline: "April 21"
  },
  {
    title: "Accelerate 2025",
    location: "Santa Monica, United States",
    funding: "$100K per team",
    equity: "3–5%",
    deadline: "April 21"
  },
  {
    title: "Ignite 2025",
    location: "Santa Monica, United States",
    deadline: "April 21"
  },
  {
    title: "Launchpad 2025",
    location: "Santa Monica, United States",
    deadline: "April 21"
  },
  {
    title: "Blue Startups 2025",
    dates: "Jul 14 – Oct 3",
    location: "Honolulu, United States",
    funding: "$25K–$250K per team",
    equity: "3–6%",
    deadline: "April 21"
  },
  {
    title: "FORTIS OC#1: Guidelines and Processes",
    dates: "April 22",
    location: "Brussels, Belgium"
  },
  {
    title: "Wallifornia Music+Tech Accelerator 2025",
    dates: "Jun 29 – Jul 1",
    location: "Liège, Belgium",
    deadline: "April 22"
  },
  {
    title: "NebulOuS Experts Expression of Interest",
    dates: "Feb 19 – Apr 23",
    location: "Brussels, Belgium",
    deadline: "April 23"
  },
  {
    title: "NebulOuS Open Call #2",
    dates: "Feb 19 – Apr 23",
    location: "Brussels, Belgium",
    funding: "€150K per team",
    deadline: "April 23"
  },
  {
    title: "Real Estate & Proptech Pitch Night",
    dates: "April 23",
    location: "Berlin, Germany"
  },
  {
    title: "Barcelona 2025 Venture Capital World Summit",
    dates: "April 24",
    location: "Barcelona, Spain"
  },
  {
    title: "ExcellEnt Soft-Landing Mission in Paris",
    dates: "Jun 11 – 13",
    location: "Paris, France",
    funding: "€1,000 per team",
    deadline: "April 23"
  },
  {
    title: "Cajamar Innova Agrotech Projects Call 2",
    location: "Almería, Spain",
    deadline: "April 23"
  },
  {
    title: "Cold Chain Show",
    dates: "Jun 9 – 12",
    location: "Chandīgarh, India",
    deadline: "April 24"
  },
  {
    title: "Healthcare Investment Conference",
    dates: "April 25",
    location: "Berlin, Germany",
    deadline: "April 24"
  },
  {
    title: "Open Call for Tech Solutions",
    dates: "Feb 25 – Apr 24",
    location: "Brussels, Belgium",
    funding: "€100K per team",
    deadline: "April 24"
  }
];

async function importChallenges() {
  console.log('📋 Importing challenges...');
  try {
    const { error } = await supabase.from('challenges').insert(challengesToImport);
    if (error) {
      console.error('❌ CHALLENGES ERROR:', error.message);
      return false;
    } else {
      console.log('✅ Challenges imported successfully!');
      return true;
    }
  } catch (err) {
    console.error('❌ CHALLENGES SCRIPT ERROR:', err.message);
    return false;
  }
}

async function importStartups() {
  console.log('🚀 Importing startups...');
  try {
    const { error } = await supabase.from('startups').insert(startupsToImport);
    if (error) {
      console.error('❌ STARTUPS ERROR:', error.message);
      return false;
    } else {
      console.log('✅ Startups imported successfully!');
      return true;
    }
  } catch (err) {
    console.error('❌ STARTUPS SCRIPT ERROR:', err.message);
    return false;
  }
}

async function importApplyOpportunities() {
  console.log('📝 Importing apply opportunities...');
  try {
    const { error } = await supabase.from('apply_opportunities').insert(applyOpportunitiesToImport);
    if (error) {
      console.error('❌ APPLY OPPORTUNITIES ERROR:', error.message);
      return false;
    } else {
      console.log('✅ Apply opportunities imported successfully!');
      return true;
    }
  } catch (err) {
    console.error('❌ APPLY OPPORTUNITIES SCRIPT ERROR:', err.message);
    return false;
  }
}

async function importAllData() {
  console.log('🔄 Starting data import process...');
  
  const results = {
    challenges: await importChallenges(),
    startups: await importStartups(),
    applyOpportunities: await importApplyOpportunities()
  };
  
  console.log('\n📊 Import Summary:');
  console.log(`Challenges: ${results.challenges ? '✅ Success' : '❌ Failed'}`);
  console.log(`Startups: ${results.startups ? '✅ Success' : '❌ Failed'}`);
  console.log(`Apply Opportunities: ${results.applyOpportunities ? '✅ Success' : '❌ Failed'}`);
  
  const allSuccess = Object.values(results).every(result => result === true);
  
  if (allSuccess) {
    console.log('\n🎉 All data imported successfully! Please refresh your Supabase tables.');
  } else {
    console.log('\n⚠️ Some imports failed. Check the error messages above.');
  }
}

// Run the import
importAllData(); 