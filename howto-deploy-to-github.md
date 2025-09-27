# How to Deploy to GitHub Pages

This guide provides step-by-step instructions on how to deploy your Docusaurus documentation site to GitHub Pages, making it accessible as a live website.

## Prerequisites

- A GitHub account.
- Your project code pushed to a GitHub repository. If you haven't done this, follow the steps in the "Push Your Source Code" section first.

## Step 1: Create a GitHub Repository

If you haven't already, create a new **public** repository on GitHub. For consistency with the project's configuration, it is highly recommended to name it `my-learning-documentation`.

## Step 2: Configure Docusaurus for Deployment

Before you can deploy, you must update `docusaurus.config.js` with your specific GitHub username and repository name.

Open `docusaurus.config.js` and modify the following fields:

```javascript
// In docusaurus.config.js

const config = {
  // ...
  url: 'https://<YOUR-USERNAME>.github.io', // Replace <YOUR-USERNAME>
  baseUrl: '/my-learning-documentation/',      // Should match your repository name
  organizationName: '<YOUR-USERNAME>',         // Replace <YOUR-USERNAME>
  projectName: 'my-learning-documentation',      // Should match your repository name
  // ...
};
```

## Step 3: Push Your Source Code to GitHub

Connect your local repository to the remote one on GitHub and push your source files. This only needs to be done once to set up the connection.

```sh
# Replace <YOUR-USERNAME> with your actual GitHub username
git remote add origin https://github.com/<YOUR-USERNAME>/my-learning-documentation.git

# It's best practice to name the primary branch 'main'
git branch -M main

# Push your source code to the 'main' branch on GitHub
git push -u origin main
```

For subsequent updates, you will just need to commit and push your changes:
```sh
git add .
git commit -m "Your commit message"
git push
```

## Step 4: Deploy the Website

Docusaurus provides a simple command to build your site and deploy it to GitHub Pages.

```sh
# Using npm
npm run deploy

# Or using yarn
yarn deploy
```

This command performs two actions:
1.  It builds a production-ready, static version of your website.
2.  It pushes the contents of the `build` directory to a special `gh-pages` branch in your GitHub repository.

## Step 5: Verify Deployment

After the deploy command finishes, GitHub Pages will automatically start serving your site from the `gh-pages` branch.

Your live documentation will be available at the URL you configured in Step 2:
**`https://<YOUR-USERNAME>.github.io/my-learning-documentation/`**

It may take a few minutes for the site to become live after the first deployment. You can check the deployment status in your repository's **Settings > Pages** tab.