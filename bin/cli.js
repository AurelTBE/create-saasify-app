#!/usr/bin/env node

const inquirer = require('inquirer');
const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

async function main() {
  console.log(chalk.bold.cyan('Welcome to Sassify NextJS 14 Boilerplate!'));

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
    },
    {
      type: 'confirm',
      name: 'stripeIntegration',
      message: 'Do you want to include Stripe integration for subscriptions?',
      default: true
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

    // Remove Contact component if email integration is not selected
    if (!answers.emailIntegration) {
      const pageContent = fs.readFileSync('app/page.tsx', 'utf8');
      const updatedPageContent = pageContent
        .replace(/import Contact from '@\/components\/Contact';?\n?/, '')
        .replace(/<Contact\s*\/>\n?/, '');
      fs.writeFileSync('app/page.tsx', updatedPageContent);
    }

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
${answers.stripeIntegration ? `
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_STARTER_PLAN_PRICE_ID=
NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID=
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

    // Add Stripe integration if selected
    if (answers.stripeIntegration) {
      const stripeConfig = `
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16', // Use the latest API version
});

export const PLANS = {
  STARTER: {
    name: 'Starter Plan',
    price: 29,
    features: ['Basic Support', 'Up to 100 Users', 'Core Features Access'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PLAN_PRICE_ID,
  },
  PRO: {
    name: 'Pro Plan',
    price: 79,
    features: ['Priority Support', 'Up to 1,000 Users', 'Advanced Features Access', 'Custom Integrations'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID,
  },
  ENTERPRISE: {
    name: 'Enterprise Plan',
    price: 'Custom',
    features: ['Dedicated Support', 'Unlimited Users', 'Full Feature Access', 'Custom Development Options'],
    priceId: null, // Typically handled through custom quotes
  },
};

export async function createCheckoutSession(priceId: string, customerId?: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: \`\${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_BASE_URL}/pricing\`,
    customer: customerId,
  });

  return session;
}

export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: \`\${process.env.NEXT_PUBLIC_BASE_URL}/account\`,
  });

  return session;
}
      `.trim();
      fs.writeFileSync('lib/stripe.ts', stripeConfig);

      // We're not creating PricingPlans.tsx anymore
      console.log(chalk.yellow('\nStripe integration has been added. You can use the existing Pricing component in components/Pricing.tsx'));
      console.log(chalk.yellow('Make sure to update the Pricing component to use Stripe checkout when a plan is selected.'));
    }

    // Install additional dependencies with progress indicator
    spinner.text = 'Installing dependencies...';
    execSync('npm install @radix-ui/react-icons react-icons @shadcn/ui stripe', { stdio: 'inherit' });

    spinner.succeed('Your SaaS boilerplate is ready!');
    console.log(chalk.green(`\nProject created successfully in ${answers.projectName}`));
    console.log(chalk.yellow('\nDon\'t forget to update your .env.local file with your actual credentials!'));
    console.log(chalk.yellow('\nTo add Shadcn/UI components, use: npx shadcn-ui@latest add <component-name>'));

    if (answers.stripeIntegration) {
      console.log(chalk.yellow('\nMake sure to set up your Stripe account and add the necessary environment variables.'));
      console.log(chalk.yellow('Update the Pricing component in components/Pricing.tsx to integrate with Stripe checkout.'));
    }

    // Change directory to the project folder
    const projectPath = path.resolve(process.cwd(), answers.projectName);
    process.chdir(projectPath);
    console.log(chalk.green('\nYou can now start your development server:'));
    console.log(chalk.cyan('npm run dev'));

  } catch (error) {
    spinner.fail('An error occurred');
    console.error(error);
  }
} // This closes the main function

main();
