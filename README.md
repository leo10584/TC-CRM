# Tatvacare HealthTech CRM

A comprehensive Next.js 14 CRM application built specifically for healthcare B2B sales, featuring RFP management, opportunity tracking, CPQ (Configure, Price, Quote) with Indian GST compliance, e-signature integration, and comprehensive audit trails.

## 🚀 Features

### Core CRM Functionality
- **RFP Management**: Create, track, and convert RFPs to opportunities
- **Opportunity Pipeline**: Visual pipeline management with stage tracking
- **Quote/CPQ System**: Advanced quoting with product catalog and pricing rules
- **E-Signature Integration**: DocuSign/Adobe Sign integration for contract execution
- **Email Threading**: Complete email communication history
- **Dashboard & Reporting**: Real-time analytics and performance metrics

### Indian Market Compliance
- **GST Calculations**: Automatic CGST/SGST/IGST calculation based on state
- **INR Currency Formatting**: Proper Indian numbering system (Lakhs/Crores)
- **Regulatory Compliance**: ISO 9001 audit trail and data retention policies

### Enterprise Features
- **Auth0 Authentication**: OIDC with PKCE, role-based access control
- **Audit Trail**: Immutable audit logs for all system changes
- **Multi-language Support**: English (India) localization with next-intl
- **OpenTelemetry**: Comprehensive monitoring and observability

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Authentication**: Auth0
- **Internationalization**: next-intl
- **Testing**: Playwright (E2E) + Vitest (Unit)
- **Monitoring**: OpenTelemetry

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Auth0 account
- (Optional) DocuSign/Adobe Sign account for e-signature

## 🚀 Quick Start

### 1. Clone and Install

\`\`\`bash
git clone <repository-url>
cd tatvacare-crm
npm install
\`\`\`

### 2. Environment Setup

Create a `.env.local` file in the root directory:

\`\`\`env
# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-domain.auth0.com'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_CLIENT_SECRET='your-auth0-client-secret'

# API Configuration
NEXT_PUBLIC_API_BASE_URL='https://api.tatvacare.com'

# OpenTelemetry (Optional)
NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT='https://your-otel-endpoint'
NEXT_PUBLIC_OTEL_SERVICE_NAME='tatvacare-crm'

# E-Signature (Optional)
DOCUSIGN_CLIENT_ID='your-docusign-client-id'
DOCUSIGN_CLIENT_SECRET='your-docusign-client-secret'
DOCUSIGN_ACCOUNT_ID='your-docusign-account-id'
\`\`\`

### 3. Auth0 Setup

#### Create Auth0 Application

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new **Single Page Application**
3. Configure the following settings:

**Allowed Callback URLs:**
\`\`\`
http://localhost:3000/api/auth/callback
\`\`\`

**Allowed Logout URLs:**
\`\`\`
http://localhost:3000
\`\`\`

**Allowed Web Origins:**
\`\`\`
http://localhost:3000
\`\`\`

#### Configure Auth0 Rules (Optional)

Add custom claims for role-based access:

\`\`\`javascript
function addRolesToToken(user, context, callback) {
  const assignedRoles = (context.authorization || {}).roles;
  const idTokenClaims = context.idToken || {};
  const accessTokenClaims = context.accessToken || {};

  idTokenClaims['https://tatvacare.com/roles'] = assignedRoles;
  accessTokenClaims['https://tatvacare.com/roles'] = assignedRoles;

  context.idToken = idTokenClaims;
  context.accessToken = accessTokenClaims;

  callback(null, user, context);
}
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

### Unit Tests
\`\`\`bash
npm run test
\`\`\`

### E2E Tests
\`\`\`bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
\`\`\`

### Test Coverage
\`\`\`bash
npm run test:coverage
\`\`\`

## 📊 API Integration

The application uses OpenAPI-generated clients for backend communication:

\`\`\`bash
# Generate API client from OpenAPI spec
npm run generate:api
\`\`\`

The API client is configured in `lib/api/mutator.ts` with automatic Auth0 token injection.

## 🔒 Security & Compliance

### ISO 9001 Audit Requirements

This application implements comprehensive audit trails to meet ISO 9001 quality management standards:

#### Audit Trail Features
- **Immutable Logs**: All changes are recorded with cryptographic integrity
- **User Attribution**: Every action is linked to authenticated users
- **Timestamp Accuracy**: UTC timestamps with millisecond precision
- **Change Tracking**: Before/after values for all modifications
- **Retention Policy**: Configurable retention (default: 7 years)

#### Compliance Reports
- Access audit logs via `/audit/[entityType]/[entityId]`
- Export audit trails in PDF/Excel formats
- Filter by date range, user, action type
- Automated compliance reporting

#### Data Protection
- **Encryption**: All sensitive data encrypted at rest and in transit
- **Access Control**: Role-based permissions with Auth0
- **Session Management**: Secure session handling with automatic timeout
- **Input Validation**: Comprehensive validation using Zod schemas

### Security Best Practices
- HTTPS enforcement in production
- Content Security Policy (CSP) headers
- XSS protection with proper sanitization
- CSRF protection with SameSite cookies
- Rate limiting on API endpoints

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

\`\`\`env
# Update Auth0 URLs for production
AUTH0_BASE_URL='https://your-domain.vercel.app'
NEXT_PUBLIC_API_BASE_URL='https://api.tatvacare.com'

# Add production-specific variables
NODE_ENV='production'
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin settings
│   ├── audit/             # Audit trail pages
│   ├── opps/              # Opportunities
│   ├── quotes/            # Quote management
│   ├── rfp/               # RFP management
│   └── reports/           # Analytics & reports
├── components/            # Reusable UI components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility libraries
│   ├── api/               # API client & mutations
│   ├── stores/            # Zustand stores
│   ├── utils/             # Helper functions
│   └── validations/       # Zod schemas
├── e2e/                   # Playwright E2E tests
├── __tests__/             # Unit tests
└── openapi/               # OpenAPI specifications
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation for API changes
- Follow conventional commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the [documentation](docs/)

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

---

**Built with ❤️ for Healthcare B2B Sales Teams**
\`\`\`

```json file="" isHidden
