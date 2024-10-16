# create-nextsaasify-app

`create-nextsaasify-app` is a CLI tool for quickly setting up a new SaaS project using the NextSaaSBoilerplate. It provides an interactive setup process to customize your new SaaS application with various authentication and database options.

## Features

- Interactive CLI for project setup
- Support for multiple authentication providers (Firebase, Supabase, Clerk)
- Support for multiple database options (Firebase, Supabase, MongoDB)
- Optional email integration setup
- Automatic configuration of selected options
- Built with Next.js 14, TypeScript, Tailwind CSS, and Shadcn/UI

## Prerequisites

- Node.js 14.0.0 or later
- npm 6.0.0 or later

## Usage

To create a new SaaS project, run:
```bash
npx create-nextsaasify-app
```

Follow the interactive prompts to configure your project:

1. Enter your project name
2. Choose your authentication provider
3. Select your database provider
4. Decide whether to include email integration

After the setup is complete, navigate to your project directory and start the development server.


## Configuration

The CLI tool will create a `.env.local` file in your project root with placeholders for the necessary environment variables. Before running your application, you need to fill these in with your actual credentials:

1. For Firebase Auth and/or Firebase Database:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID

2. For Supabase Auth and/or Supabase Database:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY

3. For Clerk Authentication:
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY

4. For MongoDB Database:
   - MONGODB_URI

5. For Email Integration (if selected):
   - EMAIL_SERVER_USER
   - EMAIL_SERVER_PASSWORD
   - EMAIL_SERVER_HOST
   - EMAIL_SERVER_PORT
   - EMAIL_FROM

Make sure to obtain these credentials from your respective service providers and update the `.env.local` file accordingly.