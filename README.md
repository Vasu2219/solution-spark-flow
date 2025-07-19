# Solution Spark Flow

A modern React application built with Vite, TypeScript, and Tailwind CSS.

## 🚀 CI/CD Pipeline

This project includes a complete CI/CD pipeline for automated deployment to Vercel.

### Pipeline Features

- **Automated Testing**: Linting and type checking on every push
- **Build Verification**: Ensures the application builds successfully
- **Preview Deployments**: Automatic preview deployments for pull requests
- **Production Deployments**: Automatic production deployments from the main branch

### Setup Instructions

#### 1. Vercel Setup

1. Connect your GitHub repository to Vercel
2. Get your Vercel tokens and IDs:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Settings → Tokens
   - Create a new token
   - Get your Organization ID and Project ID

#### 2. GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

#### 3. Branch Protection (Recommended)

Set up branch protection rules for the `main` branch:
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Include administrators in these restrictions

### Workflow Details

#### Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

- **Triggers**: Push to `main`/`develop` branches, pull requests to `main`
- **Jobs**:
  1. **Lint and Test**: Runs ESLint and TypeScript type checking
  2. **Build**: Builds the application and uploads artifacts
  3. **Deploy**: Deploys to Vercel production (only on `main` branch)

#### Preview Pipeline (`.github/workflows/preview.yml`)

- **Triggers**: Pull requests to `main`
- **Purpose**: Creates preview deployments for code review
- **Features**: Full testing, building, and preview deployment

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

### Environment Variables

Make sure to configure your environment variables in Vercel:
- Firebase configuration
- API keys
- Other sensitive data

### Deployment

The application will automatically deploy to Vercel when:
- Code is pushed to the `main` branch (production deployment)
- A pull request is created (preview deployment)

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── landing/        # Landing page components
│   ├── layout/         # Layout components
│   └── ui/            # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── main.tsx           # Application entry point
```

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Run tests: `npm run lint`
4. Create a pull request to `main`
5. The CI/CD pipeline will automatically create a preview deployment
6. After review and approval, merge to trigger production deployment
