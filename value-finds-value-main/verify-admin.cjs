const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pufehvlectunfnergidh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZmVodmxlY3R1bmZuZXJnaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU2NzIsImV4cCI6MjA2OTA5MTY3Mn0.TZESJEWM_k-E4cp4AyiALQtq4Y9Jkj-6CpdyXonc95o';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyAdminSetup() {
  console.log('🔍 Verifying admin setup...\n');

  // Check users table
  console.log('📋 Checking users table...');
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*');

  if (usersError) {
    console.error('❌ Error fetching users:', usersError);
    return;
  }

  console.log(`✅ Found ${users.length} users in the table:`);
  users.forEach(user => {
    console.log(`   - ID: ${user.id}`);
    console.log(`   - Email: ${user.email}`);
    console.log(`   - Role: ${user.role}`);
    console.log(`   - Created: ${user.created_at}`);
    console.log('');
  });

  // Check if there's an admin user
  const adminUser = users.find(u => u.role === 'admin');
  if (adminUser) {
    console.log('✅ Admin user found!');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Role: ${adminUser.role}`);
  } else {
    console.log('❌ No admin user found!');
  }

  // Check startups table
  console.log('\n📋 Checking startups table...');
  const { data: startups, error: startupsError } = await supabase
    .from('startups')
    .select('*');

  if (startupsError) {
    console.error('❌ Error fetching startups:', startupsError);
  } else {
    console.log(`✅ Found ${startups.length} startups`);
  }

  // Check challenges table
  console.log('\n📋 Checking challenges table...');
  const { data: challenges, error: challengesError } = await supabase
    .from('challenges')
    .select('*');

  if (challengesError) {
    console.error('❌ Error fetching challenges:', challengesError);
  } else {
    console.log(`✅ Found ${challenges.length} challenges`);
  }

  console.log('\n🎯 Summary:');
  console.log(`   - Users: ${users.length}`);
  console.log(`   - Startups: ${startups?.length || 0}`);
  console.log(`   - Challenges: ${challenges?.length || 0}`);
  console.log(`   - Admin user: ${adminUser ? '✅ Found' : '❌ Missing'}`);
}

verifyAdminSetup().catch(console.error); 