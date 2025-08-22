# Deployment Guide - Tatvacare HealthtechCRM

## Environment Variables Setup

### Option 1: Vercel Dashboard (Recommended)

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add each variable for **Production**, **Preview**, and **Development** environments:

**Required Variables:**
- `NEXT_PUBLIC_API_BASE_URL` - Your backend API URL
- `NEXTAUTH_URL` - Your app's URL (e.g., https://crm.your-domain.com)
- `NEXTAUTH_SECRET` - Random secret for NextAuth (generate with `openssl rand -base64 32`)
- `AUTH0_DOMAIN` - Your Auth0 tenant domain
- `AUTH0_CLIENT_ID` - Auth0 application client ID
- `AUTH0_CLIENT_SECRET` - Auth0 application client secret
- `AUTH0_ISSUER_BASE_URL` - Your Auth0 issuer URL
- `NEXT_PUBLIC_OPENID_AUDIENCE` - API audience identifier
- `NEXT_PUBLIC_FEATURE_CALENDAR` - Enable calendar features (true/false)
- `NEXT_PUBLIC_FEATURE_ESIGN` - Enable e-signature features (true/false)
- `NEXT_PUBLIC_FEATURE_RAZORPAY` - Enable Razorpay integration (true/false)

### Option 2: Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Run the setup script: `bash scripts/setup-vercel-env.sh`

### Option 3: Environment Variables CSV

Use the provided `environment-variables.csv` file to bulk import via Vercel dashboard.

## Auth0 Setup

1. Create an Auth0 application (Regular Web Application)
2. Set Allowed Callback URLs: `https://your-domain.com/api/auth/callback/auth0`
3. Set Allowed Logout URLs: `https://your-domain.com`
4. Enable RBAC and add custom claims
5. Create API in Auth0 for backend authentication

## Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in your Auth0 credentials
3. Set `NEXTAUTH_URL=http://localhost:3000`
4. Run `npm run dev`

## Production Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables as described above
4. Deploy automatically on push to main branch
