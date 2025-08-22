# Vercel CLI helper (run from your repo root after `npm i -g vercel` and `vercel login`)
# This will prompt you to paste values for each key for each environment.

# Production
vercel env add NEXT_PUBLIC_API_BASE_URL production
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add AUTH0_DOMAIN production
vercel env add AUTH0_CLIENT_ID production
vercel env add AUTH0_CLIENT_SECRET production
vercel env add AUTH0_ISSUER_BASE_URL production
vercel env add NEXT_PUBLIC_OPENID_AUDIENCE production
vercel env add NEXT_PUBLIC_FEATURE_CALENDAR production
vercel env add NEXT_PUBLIC_FEATURE_ESIGN production
vercel env add NEXT_PUBLIC_FEATURE_RAZORPAY production

# Preview
vercel env add NEXT_PUBLIC_API_BASE_URL preview
vercel env add NEXTAUTH_URL preview
vercel env add NEXTAUTH_SECRET preview
vercel env add AUTH0_DOMAIN preview
vercel env add AUTH0_CLIENT_ID preview
vercel env add AUTH0_CLIENT_SECRET preview
vercel env add AUTH0_ISSUER_BASE_URL preview
vercel env add NEXT_PUBLIC_OPENID_AUDIENCE preview
vercel env add NEXT_PUBLIC_FEATURE_CALENDAR preview
vercel env add NEXT_PUBLIC_FEATURE_ESIGN preview
vercel env add NEXT_PUBLIC_FEATURE_RAZORPAY preview

# Development
vercel env add NEXT_PUBLIC_API_BASE_URL development
vercel env add NEXTAUTH_URL development
vercel env add NEXTAUTH_SECRET development
vercel env add AUTH0_DOMAIN development
vercel env add AUTH0_CLIENT_ID development
vercel env add AUTH0_CLIENT_SECRET development
vercel env add AUTH0_ISSUER_BASE_URL development
vercel env add NEXT_PUBLIC_OPENID_AUDIENCE development
vercel env add NEXT_PUBLIC_FEATURE_CALENDAR development
vercel env add NEXT_PUBLIC_FEATURE_ESIGN development
vercel env add NEXT_PUBLIC_FEATURE_RAZORPAY development

# To pull envs locally into a .env file:
# vercel env pull .env.local
