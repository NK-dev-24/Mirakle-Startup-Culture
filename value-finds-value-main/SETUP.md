# Mirakle Database & Admin Panel Setup

## 🚀 Quick Setup Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase Database

1. **Go to your Supabase project**: https://supabase.com/dashboard/project/pufehvlectunfnergidh

2. **Run the SQL script**:
   - Go to **SQL Editor** in your Supabase dashboard
   - Copy and paste the contents of `supabase-setup.sql`
   - Click **Run** to create all tables and policies

### 3. Create Admin User

1. **In Supabase Dashboard**:
   - Go to **Authentication > Users**
   - Click **Add User**
   - Enter your email and password (this will be your admin account)

2. **Add Admin Role**:
   - Go to **Table Editor > users**
   - Add a new row with:
     - `id`: Copy the user ID from Authentication > Users
     - `email`: Your email
     - `role`: `admin`

### 4. Start the Application
```bash
npm run dev
```

### 5. Access Admin Panel
- Visit: http://localhost:8080/admin
- Login with your admin credentials

## 📊 Database Schema

### Startups Table
- `id`: UUID (Primary Key)
- `name`: Startup name
- `website`: Website URL
- `industry`: Industry category
- `type`: B2B, B2C, etc.
- `city`: City location
- `country`: Country
- `founder`: Founder name
- `email`: Contact email
- `employees`: Number of employees
- `funding`: Funding status
- `customers`: Customer count
- `revenue`: Revenue range
- `launched`: Launch status
- `paying_customers`: Paying customers status
- `revenue_gen`: Revenue generation status
- `full_time_team`: Full-time team status
- `venture_backed`: Venture backed status
- `video`: Video link
- `pitch_deck`: Pitch deck link
- `support`: Support needs
- `contribute`: Contribution details

### Challenges Table
- `id`: UUID (Primary Key)
- `title`: Challenge title
- `organizer`: Organizing company
- `description`: Challenge description
- `type`: Array of challenge types
- `deadline`: Application deadline
- `status`: Challenge status
- `reward`: Prize amount
- `contact`: Contact person
- `industry`: Array of relevant industries

### Users Table
- `id`: UUID (Primary Key)
- `email`: User email
- `role`: 'admin' or 'user'
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Admin-only access** to admin panel
- **Authenticated users** can view startups and challenges
- **Only admins** can create, update, or delete data

## 🛠️ Admin Panel Features

- **Dashboard**: Overview with statistics
- **Startups Management**: View, add, edit, delete startups
- **Challenges Management**: View, add, edit, delete challenges
- **Users Management**: View, add, edit, delete users

## 📝 Data Migration

To migrate your existing static data:

1. **Install Node.js dependencies**:
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Run the migration script**:
   ```bash
   node scripts/migrate-data.js
   ```

## 🔧 Troubleshooting

### Common Issues:

1. **"Cannot find module '@supabase/supabase-js'"**
   - Run: `npm install`

2. **Admin panel not accessible**
   - Make sure you've added the user to the `users` table with `role: 'admin'`

3. **Database connection errors**
   - Check that the Supabase URL and key are correct in `src/config/supabase.ts`

4. **Permission denied errors**
   - Ensure RLS policies are properly set up in Supabase

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Supabase project settings
3. Ensure all SQL scripts have been executed successfully 