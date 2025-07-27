const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pufehvlectunfnergidh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZmVodmxlY3R1bmZuZXJnaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTU2NzIsImV4cCI6MjA2OTA5MTY3Mn0.TZESJEWM_k-E4cp4AyiALQtq4Y9Jkj-6CpdyXonc95o';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixUser() {
  const userId = 'bc9f7157-9989-434c-9df5-dbe847289f34';
  
  console.log('Fixing user data...');
  console.log('User ID:', userId);
  
  try {
    // Update the user with correct role and email
    const { data, error } = await supabase
      .from('users')
      .update({
        role: 'admin',
        email: 'naveenkumarv.edu@gmail.com'
      })
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user:', error);
    } else {
      console.log('User updated successfully!');
      console.log('Data:', data);
      
      // Verify the update
      const { data: verifyData, error: verifyError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (verifyData) {
        console.log('\nUpdated user data:');
        console.log('- ID:', verifyData.id);
        console.log('- Email:', verifyData.email);
        console.log('- Role:', verifyData.role);
        console.log('Is admin?', verifyData.role === 'admin');
      }
    }
    
  } catch (error) {
    console.error('Fix failed:', error);
  }
}

fixUser(); 