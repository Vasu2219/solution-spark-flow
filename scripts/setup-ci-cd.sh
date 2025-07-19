#!/bin/bash

# CI/CD Setup Script for Vercel Deployment
echo "🚀 Setting up CI/CD Pipeline for Vercel Deployment"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if GitHub remote is configured
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No GitHub remote configured. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/your-repo.git"
    echo "   git push -u origin main"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. 🔗 Connect to Vercel:"
echo "   - Go to https://vercel.com/dashboard"
echo "   - Import your GitHub repository"
echo "   - Get your Vercel tokens and IDs"
echo ""
echo "2. 🔐 Add GitHub Secrets:"
echo "   - Go to your GitHub repository"
echo "   - Navigate to Settings → Secrets and variables → Actions"
echo "   - Add the following secrets:"
echo "     • VERCEL_TOKEN: Your Vercel API token"
echo "     • VERCEL_ORG_ID: Your Vercel organization ID"
echo "     • VERCEL_PROJECT_ID: Your Vercel project ID"
echo "     • SNYK_TOKEN: (Optional) Your Snyk token for security scanning"
echo ""
echo "3. 🛡️  Set up Branch Protection (Recommended):"
echo "   - Go to Settings → Branches"
echo "   - Add rule for 'main' branch"
echo "   - Require status checks to pass before merging"
echo ""
echo "4. 🚀 Push your code:"
echo "   git add ."
echo "   git commit -m 'Add CI/CD pipeline'"
echo "   git push"
echo ""
echo "✅ CI/CD pipeline is now configured!"
echo "   - Push to 'main' branch → Production deployment"
echo "   - Create pull request → Preview deployment"
echo "   - All changes will be automatically tested and deployed" 