# Freelancer Marketplace

A freelancer marketplace platform built with React, TypeScript, and Supabase.

## Features

- User authentication (client, freelancer, admin roles)
- Job posting and management
- Freelancer profiles and discovery
- Proposal submission and management
- Contract creation and management
- Milestone-based payment system
- Real-time messaging

## Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- A Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

3. Create a new project in Supabase

4. Set up your database tables in Supabase using the SQL provided below

5. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-project-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

6. Start the development server:
   ```
   npm run dev
   ```

## Database Setup

Run the following SQL in your Supabase SQL editor to create the necessary tables:

```sql
-- Create tables for users, clients, freelancers, jobs, proposals, contracts, milestones, and payments

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'freelancer', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company TEXT,
  industry TEXT,
  description TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Freelancers table
CREATE TABLE freelancers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  hourly_rate NUMERIC NOT NULL,
  bio TEXT NOT NULL,
  location TEXT,
  experience INTEGER NOT NULL,
  availability TEXT NOT NULL CHECK (availability IN ('available', 'limited', 'unavailable')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  category TEXT NOT NULL,
  budget_min NUMERIC NOT NULL,
  budget_max NUMERIC NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('fixed', 'hourly')),
  duration TEXT,
  status TEXT NOT NULL CHECK (status IN ('open', 'in-progress', 'completed', 'cancelled')),
  location TEXT NOT NULL CHECK (location IN ('remote', 'onsite', 'hybrid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expiry TIMESTAMP WITH TIME ZONE
);

-- Proposals table
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  freelancer_id UUID REFERENCES freelancers(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  bid NUMERIC NOT NULL,
  estimated_duration TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contracts table
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  freelancer_id UUID REFERENCES freelancers(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  terms TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'cancelled')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Milestones table
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in-progress', 'submitted', 'approved', 'released', 'rejected')),
  submission_date TIMESTAMP WITH TIME ZONE,
  approval_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  freelancer_id UUID REFERENCES freelancers(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS policies for security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancers ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Example RLS policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Add more policies as needed for your application's security requirements
```

## Environment Type Generation

After setting up your Supabase database, you can generate TypeScript types for your database schema:

1. Install the Supabase CLI
2. Run the following command to generate types:
   ```
   npx supabase gen types typescript --project-id your-project-id > src/types/database.types.ts
   ```

## Email Confirmation Setup

To enable email confirmation for user registration:

1. Log in to your Supabase dashboard
2. Go to Authentication > Providers
3. Under "Email", enable "Confirm email" 
4. Configure your Site URL (this should match your deployed application URL)
5. Customize the email templates under "Email Templates" section if desired

For local development:
- You can use the Site URL as http://localhost:5173 (or your local development URL)
- In development mode, Supabase provides a way to view confirmation emails in the dashboard under Authentication > Users

Alternatively, you can use a service like Mailhog or Mailtrap for testing emails locally.

## Troubleshooting

### Database Setup Issues

If you encounter errors like "relation 'public.users' does not exist" or "JSON object requested, multiple (or no) rows returned":

1. Make sure you've run the SQL script in your Supabase SQL Editor
2. You can use the `setup-db.sql` file which includes `IF NOT EXISTS` clauses to safely create tables

For a quick fix, run these commands directly in the SQL Editor:

```sql
-- Create UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'freelancer', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS but make users table publicly readable
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);
```

Note: If you're just testing the application, you can focus on creating just the `users` table first, as the other tables will be created as needed by the application logic.

## License

MIT 