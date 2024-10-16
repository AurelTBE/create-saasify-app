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
bash
npx create-nextsaasify-app


Follow the interactive prompts to configure your project:

1. Enter your project name
2. Choose your authentication provider
3. Select your database provider
4. Decide whether to include email integration

After the setup is complete, navigate to your project directory and start the development server:

In my github project, the occurences of "SaaSify" to replace by the name entered by the user are in:
./app/[locale]/privacy/page.tsx
./app/[locale]/terms/page.tsx
./components/TopBar.tsx
./locales/en/about.json
./locales/en/common.json
./locales/en/cta.json
./locales/en/footer.json
./locales/en/hero.json
./locales/en/privacy.json
./locales/en/terms.json
./locales/en/testimonials.json
./locales/fr/about.json
./locales/fr/common.json
./locales/fr/cta.json
./locales/fr/footer.json
./locales/fr/hero.json
./locales/fr/privacy.json
./locales/fr/terms.json
./locales/fr/testimonials.json


Thank you for providing that information. I'll update the bin/cli.js file to include these additional files when replacing "SaaSify" with the user's project name. Here's the modified section of the file:
This update does the following:
Expands the files array to include all the files you mentioned where "SaaSify" needs to be replaced.
Adds a check if (fs.existsSync(file)) before attempting to read and modify each file. This ensures that the script doesn't crash if a file is missing or has been moved.
The rest of the bin/cli.js file remains the same. This change will ensure that all occurrences of "SaaSify" in the specified files are replaced with the project name entered by the user during the setup process.
As my NextJS Project is NextJS 14, with TypeScript, using App folder, I don't have a "pages" directory and no "_app.js. Also, for the files that will be added for the project (either for db or authentication logics) try to favor TypeScript if appropriate

Thank you for providing that context. You're right, we should adjust the script to reflect the structure of a Next.js 14 project with TypeScript and the App Router. I'll modify the bin/cli.js file to account for these changes and favor TypeScript for new files. Here's an updated version:
This updated version of bin/cli.js makes the following changes:
Removes references to the pages directory and _app.js.
Adds TypeScript configurations for Firebase, Supabase, and MongoDB in the lib directory.
Creates new TypeScript files (firebase.ts, supabase.ts, mongodb.ts) based on the user's choices for authentication and database providers.
These changes should better align with a Next.js 14 project structure using TypeScript and the App Router. The script now favors TypeScript for new files related to database and authentication logic.
Here is how my githube project is configured:
NextJS 14 with the following settings:

√ What is your project named? ... nextsaasboilerplate
√ Would you like to use TypeScript? ... Yes
√ Would you like to use ESLint? ...  Yes
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like to use `src/` directory? ... No
√ Would you like to use App Router? (recommended) ...  Yes
√ Would you like to customize the default import alias (@/*)? ... No

For styling, use Tailwind CSS
For UI, use Shadcn/UI
For Icons, use react-icons

Make sur your implementation is compatible

Thank you for providing the details about your project configuration. I'll modify the bin/cli.js file to ensure it's compatible with your NextJS 14 setup, including TypeScript, ESLint, Tailwind CSS, App Router, and the use of Shadcn/UI and react-icons. Here's an updated version of the bin/cli.js file:
This updated version of bin/cli.js makes the following changes to ensure compatibility with your project setup:
Uses TypeScript for all new files (.ts extensions).
Updates the Tailwind CSS configuration to include Shadcn/UI settings.
Installs additional dependencies for Shadcn/UI and react-icons.
Provides instructions for adding Shadcn/UI components after project creation.
Ensures all file paths are correct for the App Router structure (no src/ directory).
Updates environment variables for Clerk (if selected) to match their current naming convention.
This script should now be fully compatible with your NextJS 14 project configuration, including TypeScript, ESLint, Tailwind CSS, App Router, Shadcn/UI, and react-icons.
Now what do I have to do to be able to use this NPX? (I don't have a npm account)

To use this script as an NPX command without publishing it to npm, you can set it up as a local package. Here's what you need to do:
Create a new directory for your CLI tool:
Initialize a new npm package:
Create a bin directory and move your cli.js file into it:
Update the package.json file to include the bin field:
Install the dependencies required by your script:
Make the CLI script executable:
Link the package locally:
Now you can use your CLI tool locally by running:
This will execute your CLI script without needing to publish it to npm.
To use it in a different directory, you might need to run npm link nextsaasboilerplate-cli in that directory first.
Remember that this setup is for local use only. If you want to share this tool with others or use it on different machines, you would need to publish it to npm or host it in a GitHub repository and use it with npx github:yourusername/nextsaasboilerplate-cli.
I want to publish it to npm

Certainly! To publish your CLI tool to npm, you'll need to follow these steps:
First, make sure you have an npm account. If you don't have one, you can create it at https://www.npmjs.com/signup.
Log in to your npm account in your terminal:
Update your package.json file. Here's a sample of what it should look like:
Make sure to replace "Your Name" with your actual name or username.
Create a README.md file in the root of your project explaining how to use your CLI tool.
If you haven't already, create a .gitignore file to exclude node_modules and any other files you don't want to publish:
Commit all your changes to git:
Before publishing, you can test your package locally:
If everything works as expected, you can publish your package:
If this is your first time publishing this package, and the name is available, it should publish successfully.
After publishing, users can use your CLI tool with npx:
Remember to increment the version number in package.json each time you make updates and want to publish a new version.
Also, make sure that your bin/cli.js file has the correct shebang at the top:
This ensures that the script is executed with Node.js.
After publishing, your CLI tool will be available for anyone to use via npx, making it easy for users to create new NextSaaSBoilerplate projects.
Write a README.md

Certainly! I'll create a README.md file for your create-saasify-app CLI tool. This README will provide an overview of the tool, installation instructions, usage guide, and other relevant information.
bash
npx create-saasify-app
bash
npx create-saasify-app
bash
cd your-project-name
npm run dev
bash
npx shadcn-ui@latest add <component-name>
This README provides a comprehensive overview of your create-saasify-app CLI tool. It includes sections on features, prerequisites, installation, usage, configuration, adding Shadcn/UI components, contributing guidelines, license information, acknowledgments, and support.
You may want to customize this README further based on any specific details or instructions you want to provide to your users. Also, consider adding more detailed documentation if your tool has more complex features or configuration options.
Please write the instructions in @README.md 

Certainly! I'll write the instructions for your create-saasify-app CLI tool in the README.md file. Here's the content for your README.md:
bash
npx create-saasify-app
bash
cd your-project-name
npm run dev
bash
npx shadcn-ui@latest add <component-name>
This README provides a comprehensive overview of your create-saasify-app CLI tool, including its features, usage instructions, and other relevant information for users. Feel free to adjust or expand any sections as needed to better fit your specific implementation or to add any additional details you think would be helpful for users.
I have this issue:
PS C:\Users\aurel\Desktop\Projets\Cursor Projects\SaaSifyBoilerplate> npm publish           
npm warn publish npm auto-corrected some errors in your package.json when publishing.  Please run "npm pkg fix" to address these errors.
npm warn publish errors corrected:
npm warn publish "bin[create-saasify-app]" script name was cleaned
npm notice
npm notice 📦  create-saasify-app@1.0.0
npm notice Tarball Contents
npm notice 737B README.md
npm notice 8.9kB bin/cli.js
npm notice 1.1kB contexts/AppContext.js
npm notice 1.3kB lib/auth/firebase.js
npm notice 885B lib/auth/supabase.js
npm notice 1.4kB lib/db/firebase.js
npm notice 1.3kB lib/db/supabase.js
npm notice 645B package.json
npm notice Tarball Details
npm notice name: create-saasify-app
npm notice version: 1.0.0
npm notice filename: create-saasify-app-1.0.0.tgz
npm notice package size: 4.7 kB
npm notice unpacked size: 16.3 kB
npm notice shasum: b7fb8cedc8df1a90e9709cf7147c2fe66b163243
npm notice integrity: sha512-5D9xvK7qZDkhs[...]yFrU5q1VNQNoQ==
npm notice total files: 8
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access
npm error code E403
npm error 403 403 Forbidden - PUT https://registry.npmjs.org/create-saasify-app - You do not have permission to publish "create-saasify-app". Are you logged in as the correct user?
npm error 403 In most cases, you or one of your dependencies are requesting
npm error 403 a package version that is forbidden by your security policy, or
npm error 403 on a server you do not have access to.
npm error A complete log of this run can be found in: C:\Users\aurel\AppData\Local\npm-cache\_logs\2024-10-16T09_24_02_096Z-debug-0.log

It seems you're encountering a permission issue when trying to publish your package to npm. The error message suggests that you don't have the necessary permissions to publish a package named "create-saasify-app". This could be due to a few reasons:
The package name "create-saasify-app" might already be taken by someone else.
You might not be logged in to npm, or you're logged in with a different account that doesn't have the right permissions.
Here are some steps you can take to resolve this:
Check if the package name is available:
Visit https://www.npmjs.com/package/create-saasify-app in your browser. If a package with this name already exists, you'll need to choose a different name.
If the name is available, make sure you're logged in to npm:
Run npm whoami in your terminal. If you're not logged in, it will give you an error. In that case, log in using npm login.
If you're logged in but still getting the error, try to use a more unique name for your package. You could prefix it with your username or organization name, for example:
Update your package.json:
Replace yourusername with your actual npm username.
After changing the name, run npm publish --access=public if you're using a scoped package name (starting with @).
If you're still having issues, you can try to unpublish any previous versions of the package (if you have published any) using npm unpublish <package-name> --force and then try publishing again.
Lastly, make sure you've run npm pkg fix as suggested in the warning message to correct any issues in your package.json file.
If none of these steps work, you might want to contact npm support or check their documentation for any specific issues related to publishing packages.
Update my instructions (the command) to take into consideration the new name: @aureltbe/create-saasify-app

Certainly! I'll update the README.md file to reflect the new package name @aureltbe/create-saasify-app. Here's the updated Usage section:
bash
npx @aureltbe/create-saasify-app
bash
cd your-project-name
npm run dev
bash
npx shadcn-ui@latest add <component-name>
This update changes the command to use the new scoped package name @aureltbe/create-saasify-app. The rest of the README remains the same, providing comprehensive information about the tool's features, usage, and configuration.
I tried to run npm publish again, but it failed, how do I upload my update?

I apologize for the confusion. If you're still having trouble publishing your package, let's go through the process step-by-step to ensure everything is set up correctly:
First, make sure you're logged in to npm with the correct account:
If this doesn't show your username or gives an error, log in:
Since you're using a scoped package name (@aureltbe/create-saasify-app), you need to specify that it's a public package when publishing for the first time:
3. If you've previously published this package and are trying to update it, make sure you've incremented the version number in your package.json file. npm won't let you publish a new version with the same version number.
If you're still getting an error, try to unpublish the current version (if it exists) and then publish again:
Replace 1.0.0 with the current version number if it's different.
If none of the above works, there might be an issue with your npm configuration. Try clearing your npm cache and logging in again:
6. Lastly, make sure all the files you want to include in your package are not in your .gitignore file. npm uses .gitignore to determine which files to exclude from the package.
If you're still encountering issues after trying these steps, please provide the exact error message you're seeing. This will help in diagnosing the problem more accurately.
[{
	"resource": "/c:/Users/aurel/Desktop/Projets/Cursor Projects/SaaSifyBoilerplate/package.json",
	"owner": "_generated_diagnostic_collection_name_#3",
	"code": "768",
	"severity": 4,
	"message": "Problems loading reference 'https://json.schemastore.org/package': Unable to load schema from 'https://json.schemastore.org/package': getaddrinfo ENOTFOUND json.schemastore.org.",
	"startLineNumber": 1,
	"startColumn": 1,
	"endLineNumber": 1,
	"endColumn": 2
}]

It seems like you're encountering an issue with the JSON schema validation for your package.json file. This is likely due to a temporary network issue or DNS resolution problem. This warning doesn't affect the functionality of your package, but let's try to resolve it.
For now, let's focus on publishing your updated package. Based on the changes you've made:
You've updated the package name to @aureltbe/create-saasify-app
You've incremented the version to 1.0.1
These are good steps. Now, to publish your update:
Make sure you're logged in to npm with the correct account:
If you're not logged in or it's not the correct account, log in:
Since this is a scoped package (@aureltbe), you need to publish it as a public package:
If you encounter any errors during this process, please provide the exact error message.
Regarding the files in your package:
Make sure your .gitignore file is not excluding any files that you want to include in your npm package. npm uses .gitignore to determine which files to exclude.
The bin/cli.js file is correctly referenced in your package.json, so it should be included.
If you have any TypeScript files (like bin/cli.ts), make sure they are compiled to JavaScript before publishing.
If you're still having issues, you can try to see what files npm is planning to include in your package by running:
This will list all the files that would be included in your package without actually creating the package.
Let me know if you encounter any specific errors or if you need further assistance with the publishing process.
Fine, update my README.md to give the npx command (npx create-nextsaasify-app), also give instructions related to the environment variable (in the .env.local that will be generated, to enable the authentication, db...

Certainly! I'll update your README.md with the correct npx command and add instructions for setting up the environment variables. Here's the updated README.md:
bash
npx create-nextsaasify-app
bash
cd your-project-name
npm run dev
bash
npx shadcn-ui@latest add <component-name>
This updated README.md now includes:
1. The correct npx command: npx create-nextsaasify-app
2. Detailed instructions for setting up the environment variables in the .env.local file
Information about which variables are needed for each authentication and database option
These changes should provide users with clear instructions on how to use your CLI tool and set up their project correctly.
you didn't add this to my @README.md 

I apologize for the oversight. You're right, I didn't add the specific command to the README.md. Let's update the README.md file to include this information. Here's the corrected version of the Usage section:
bash
npx create-nextsaasify-app
bash
cd your-project-name
npm run dev


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