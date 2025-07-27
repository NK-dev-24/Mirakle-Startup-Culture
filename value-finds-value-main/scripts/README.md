# Marketplace Data Import Scripts

This directory contains scripts for importing data into your Supabase database.

## Import Marketplace Data

The `import-marketplace-data.js` script imports all marketplace data including challenges, startups, and apply opportunities into your Supabase database.

### Prerequisites

1. Make sure you have the required dependencies installed:
   ```bash
   npm install
   ```

2. Ensure your Supabase database has the following tables:
   - `challenges`
   - `startups` 
   - `apply_opportunities`

### Running the Import Script

You can run the import script using npm:

```bash
npm run import-marketplace
```

Or directly with node:

```bash
node scripts/import-marketplace-data.js
```

### What the Script Does

The script will:

1. **Import Challenges** - 7 challenge opportunities including startup competitions, acceleration programs, and media exposure opportunities
2. **Import Startups** - 10 startup companies from various ecosystems and industries
3. **Import Apply Opportunities** - 20+ apply opportunities with funding, equity, and deadline information

### Expected Output

The script will provide detailed feedback:

```
🔄 Starting data import process...
📋 Importing challenges...
✅ Challenges imported successfully!
🚀 Importing startups...
✅ Startups imported successfully!
📝 Importing apply opportunities...
✅ Apply opportunities imported successfully!

📊 Import Summary:
Challenges: ✅ Success
Startups: ✅ Success
Apply Opportunities: ✅ Success

🎉 All data imported successfully! Please refresh your Supabase tables.
```

### Troubleshooting

If you encounter errors:

1. **Database Connection Issues**: Check that your Supabase URL and key are correct in the script
2. **Table Not Found**: Ensure the required tables exist in your Supabase database
3. **Permission Issues**: Make sure your Supabase key has the necessary permissions to insert data

### Data Structure

The script imports data that matches the TypeScript interfaces defined in `src/types/marketplace.ts`:

- **Challenge**: title, organizer, description, type, deadline, status, reward, contact, industry
- **Startup**: name, ecosystem, foundingYear, description, industry  
- **Apply**: title, location, dates, deadline, funding, equity

### Notes

- The script uses your existing Supabase configuration from `src/config/supabase.ts`
- All data is imported as-is from the `src/data/marketplaceData.ts` file
- The script provides detailed error reporting if any imports fail 