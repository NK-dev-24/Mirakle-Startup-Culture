const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pufehvlectunfnergidh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZmVodmxlY3R1bmZuZXJnaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU2NzIsImV4cCI6MjA2OTA5MTY3Mn0.TZESJEWM_k-E4cp4AyiALQtq4Y9Jkj-6CpdyXonc95o';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testAdminUser() {
  const userId = 'bc9f7157-9989-434c-9df5-dbe847289f34';
  
  console.log('Testing admin user setup...');
  console.log('User ID:', userId);
  
  try {
    // Test 1: Check if user exists in users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    console.log('User data:', userData);
    console.log('User error:', userError);
    
    if (userData) {
      console.log('User found in database');
      console.log('Role:', userData.role);
      console.log('Email:', userData.email);
      console.log('Is admin?', userData.role === 'admin');
    } else {
      console.log('User not found in database');
    }
    
    // Test 2: Check all users in the table
    const { data: allUsers, error: allUsersError } = await supabase
      .from('users')
      .select('*');
    
    console.log('All users in table:', allUsers);
    console.log('All users error:', allUsersError);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAdminUser(); 