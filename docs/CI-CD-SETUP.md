# CI/CD Pipeline Setup Guide

This guide will help you set up a complete CI/CD pipeline for your React application with automated deployment to Vercel.

## 📋 Overview

The CI/CD pipeline includes:
- **Automated Testing**: Linting and TypeScript type checking
- **Build Verification**: Ensures the application builds successfully
- **Security Scanning**: Dependency vulnerability checks
- **Preview Deployments**: Automatic preview deployments for pull requests
- **Production Deployments**: Automatic production deployments from the main branch

## 🚀 Quick Setup

### Step 1: Vercel Configuration

1. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure your project settings

2. **Get Vercel Credentials**:
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions
   - Note down your Organization ID and Project ID

### Step 2: GitHub Secrets

Add these secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `VERCEL_TOKEN` | Vercel API token | [Vercel Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel organization ID | Found in Vercel project settings |
| `VERCEL_PROJECT_ID` | Vercel project ID | Found in Vercel project settings |
| `SNYK_TOKEN` | Snyk security token (optional) | [Snyk Account](https://snyk.io/account) |

### Step 3: Branch Protection (Recommended)

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators in these restrictions

## 🔧 Workflow Details

### Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Triggers**:
- Push to `main` or `develop` branches
- Pull requests to `main`

**Jobs**:
1. **Lint and Test**: Runs ESLint and TypeScript type checking
2. **Build**: Builds the application and uploads artifacts
3. **Deploy**: Deploys to Vercel production (only on `main` branch)

### Preview Pipeline (`.github/workflows/preview.yml`)

**Triggers**:
- Pull requests to `main`

**Purpose**: Creates preview deployments for code review

### Security Pipeline (`.github/workflows/security.yml`)

**Triggers**:
- Push to `main` or `develop` branches
- Pull requests to `main`
- Weekly scheduled runs

**Features**:
- npm audit for dependency vulnerabilities
- Snyk security scanning (if token provided)

## 🛠️ Configuration Files

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Environment Variables

Configure these in your Vercel project settings:
- Firebase configuration
- API keys
- Other sensitive data

## 📊 Monitoring and Debugging

### GitHub Actions

1. **View Workflow Runs**:
   - Go to **Actions** tab in your repository
   - Click on any workflow to see detailed logs

2. **Debug Failed Builds**:
   - Check the specific job that failed
   - Review the error logs
   - Common issues:
     - Missing dependencies
     - TypeScript errors
     - Linting violations

### Vercel Deployment

1. **View Deployments**:
   - Go to your Vercel dashboard
   - Click on your project
   - Check the "Deployments" tab

2. **Debug Deployment Issues**:
   - Check build logs in Vercel
   - Verify environment variables
   - Test locally with `npm run build`

## 🔄 Development Workflow

### Feature Development

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**:
   - Write your code
   - Run tests locally: `npm run test`
   - Commit your changes

3. **Create Pull Request**:
   - Push your branch: `git push origin feature/your-feature-name`
   - Create PR to `main`
   - Preview deployment will be created automatically

4. **Review and Merge**:
   - Review the preview deployment
   - Get code review approval
   - Merge to trigger production deployment

### Production Deployment

- **Automatic**: Merging to `main` triggers production deployment
- **Manual**: You can also deploy manually from Vercel dashboard

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check TypeScript errors: `npm run type-check`
   - Fix linting issues: `npm run lint:fix`
   - Verify all dependencies are installed

2. **Deployment Fails**:
   - Check Vercel build logs
   - Verify environment variables
   - Ensure `vercel.json` is configured correctly

3. **Preview Not Working**:
   - Check GitHub Actions logs
   - Verify Vercel tokens are correct
   - Ensure branch protection rules are not blocking

### Getting Help

1. **GitHub Actions Issues**:
   - Check the Actions tab for detailed logs
   - Review workflow configuration

2. **Vercel Issues**:
   - Check Vercel dashboard for deployment logs
   - Review project settings

3. **Security Issues**:
   - Run `npm audit` locally
   - Check Snyk dashboard for vulnerabilities

## 📈 Best Practices

1. **Code Quality**:
   - Always run tests before pushing
   - Use TypeScript for type safety
   - Follow ESLint rules

2. **Security**:
   - Keep dependencies updated
   - Review security scan results
   - Use environment variables for secrets

3. **Deployment**:
   - Test changes in preview before merging
   - Monitor production deployments
   - Set up alerts for failed deployments

## 🔗 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Snyk Security](https://snyk.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) 