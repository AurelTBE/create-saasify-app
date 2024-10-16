#!/usr/bin/env node

const inquirer = require('inquirer');
const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

async function main() {
  console.log(chalk.bold.cyan('Welcome to NextSaaSBoilerplate!'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: 'my-saas-app'
    },
    {
      type: 'list',
      name: 'authentication',
      message: 'Choose your authentication provider:',
      choices: ['Firebase Auth', 'Supabase Auth', 'Clerk']
    },
    {
      type: 'list',
      name: 'database',
      message: 'Choose your database provider:',
      choices: ['Firebase', 'Supabase', 'MongoDB']
    },
    {
      type: 'confirm',
      name: 'emailIntegration',
      message: 'Do you want to include email integration?',
      default: false
    }
  ]);

  const spinner = ora('Creating your SaaS boilerplate...').start();

  try {
    // Clone the repository
    execSync(`git clone https://github.com/AurelTBE/NextSaaSBoilerplate.git ${answers.projectName}`);
    process.chdir(answers.projectName);
    fs.removeSync('.git');

    // Update project name in package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.name = answers.projectName;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

    // Replace "Your Site Name" and "SaaSify" with the project name
    const files = [
      'README.md',
      'package.json',
      'app/[locale]/privacy/page.tsx',
      'app/[locale]/terms/page.tsx',
      'components/TopBar.tsx',
      'locales/en/about.json',
      'locales/en/common.json',
      'locales/en/cta.json',
      'locales/en/footer.json',
      'locales/en/hero.json',
      'locales/en/privacy.json',
      'locales/en/terms.json',
      'locales/en/testimonials.json',
      'locales/fr/about.json',
      'locales/fr/common.json',
      'locales/fr/cta.json',
      'locales/fr/footer.json',
      'locales/fr/hero.json',
      'locales/fr/privacy.json',
      'locales/fr/terms.json',
      'locales/fr/testimonials.json'
    ];
    files.forEach(file => {
      if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/SaaSify/g, answers.projectName);
        fs.writeFileSync(file, content);
      }
    });

    // Create .env.local file with placeholders
    const envContent = `
NEXT_PUBLIC_AUTH_PROVIDER=${answers.authentication.split(' ')[0].toUpperCase()}
NEXT_PUBLIC_DATABASE_PROVIDER=${answers.database.toUpperCase()}
${answers.authentication === 'Firebase Auth' ? `
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
` : ''}
${answers.authentication === 'Supabase Auth' ? `
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
` : ''}
${answers.authentication === 'Clerk' ? `
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
` : ''}
${answers.database === 'MongoDB' ? `
MONGODB_URI=
` : ''}
${answers.emailIntegration ? `
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=
` : ''}
    `.trim();

    fs.writeFileSync('.env.local', envContent);

    // Add or modify files based on selected options
    if (answers.authentication === 'Firebase Auth' || answers.database === 'Firebase') {
      const firebaseConfig = `
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
      `.trim();
      fs.writeFileSync('lib/firebase.ts', firebaseConfig);
    }

    if (answers.authentication === 'Supabase Auth' || answers.database === 'Supabase') {
      const supabaseConfig = `
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
      `.trim();
      fs.writeFileSync('lib/supabase.ts', supabaseConfig);
    }

    if (answers.database === 'MongoDB') {
      const mongodbConfig = `
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
      `.trim();
      fs.writeFileSync('lib/mongodb.ts', mongodbConfig);
    }

    // Update or create necessary configuration files
    const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
    `.trim();
    fs.writeFileSync('tailwind.config.js', tailwindConfig);

    // Install additional dependencies
    spinner.text = 'Installing dependencies...';
    execSync('npm install @radix-ui/react-icons react-icons @shadcn/ui', { stdio: 'ignore' });

    spinner.succeed('Your SaaS boilerplate is ready!');
    console.log(chalk.green(`\ncd ${answers.projectName}`));
    console.log(chalk.green('npm run dev'));
    console.log(chalk.yellow('\nDon\'t forget to update your .env.local file with your actual credentials!'));
    console.log(chalk.yellow('\nTo add Shadcn/UI components, use: npx shadcn-ui@latest add <component-name>'));

  } catch (error) {
    spinner.fail('An error occurred');
    console.error(error);
  }
}

main();
