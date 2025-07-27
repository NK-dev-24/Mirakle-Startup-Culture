const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pufehvlectunfnergidh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZmVodmxlY3R1bmZuZXJnaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU2NzIsImV4cCI6MjA2OTA5MTY3Mn0.TZESJEWM_k-E4cp4AyiALQtq4Y9Jkj-6CpdyXonc95o';
const supabase = createClient(supabaseUrl, supabaseKey);

async function addAdminUser() {
  const adminUser = {
    id: 'bc9f7157-9989-434c-9df5-dbe847289f34', // Your user ID from the console
    email: 'naveenkumarv.edu@gmail.com',
    role: 'admin'
  };
  
  console.log('Adding admin user...');
  console.log('User data:', adminUser);
  
  try {
    // First, let's temporarily disable RLS for the users table
    console.log('Note: You may need to temporarily disable RLS for the users table in Supabase');
    
    const { data, error } = await supabase
      .from('users')
      .insert(adminUser);
    
    if (error) {
      console.error('Error adding admin user:', error);
      console.log('\nIf you get a RLS error, you need to:');
      console.log('1. Go to Supabase Dashboard > Authentication > Policies');
      console.log('2. Find the "users" table');
      console.log('3. Temporarily disable RLS (toggle off)');
      console.log('4. Run this script again');
      console.log('5. Re-enable RLS after adding the user');
    } else {
      console.log('Admin user added successfully!');
      console.log('Data:', data);
    }
    
  } catch (error) {
    console.error('Failed to add admin user:', error);
  }
}

addAdminUser(); 