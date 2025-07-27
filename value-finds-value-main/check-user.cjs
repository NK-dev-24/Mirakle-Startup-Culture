const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pufehvlectunfnergidh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZmVodmxlY3R1bmZuZXJnaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU2NzIsImV4cCI6MjA2OTA5MTY3Mn0.TZESJEWM_k-E4cp4AyiALQtq4Y9Jkj-6CpdyXonc95o';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUser() {
  const userId = 'bc9f7157-9989-434c-9df5-dbe847289f34';
  
  console.log('Checking user in database...');
  console.log('User ID:', userId);
  
  try {
    // Check the exact user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId);
    
    console.log('User data:', userData);
    console.log('User error:', userError);
    
    if (userData && userData.length > 0) {
      const user = userData[0];
      console.log('Found user:');
      console.log('- ID:', user.id);
      console.log('- Email:', user.email);
      console.log('- Role:', user.role);
      console.log('- Created at:', user.created_at);
      console.log('- Updated at:', user.updated_at);
      console.log('Is admin?', user.role === 'admin');
    } else {
      console.log('No user found with this ID');
    }
    
    // Also check all users
    const { data: allUsers, error: allUsersError } = await supabase
      .from('users')
      .select('*');
    
    console.log('\nAll users in table:');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`);
    });
    
  } catch (error) {
    console.error('Check failed:', error);
  }
}

checkUser(); 