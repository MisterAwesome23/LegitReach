# Legit Reach - Creator-First Marketing Platform

A platform connecting micro-influencers with brands for authentic marketing campaigns.

## Features

- Role-based authentication (Creator, Brand, Agency, Admin)
- Campaign creation and management
- AI-powered creator-brand matching
- Escrow-protected deals with contract signing
- Affiliate link generation and tracking
- Creator earnings and analytics
- Brand campaign performance dashboard

## Tech Stack

- Frontend: Vite, React, TypeScript, TailwindCSS
- Backend: Supabase (PostgreSQL DB, Auth, Row Level Security)
- Payments: Stripe (PaymentIntent for escrow, Stripe Connect for payouts)
- Serverless: Supabase Edge Functions
- UI Components: Shadcn/ui, Lucide Icons
- Animations: Framer Motion
- Routing: React Router

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Supabase account
- Stripe account

### Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server

```bash
npm run dev
```

## Database Schema

The application uses the following main tables:

- `user_profiles`: Stores user information for all roles
- `campaigns`: Stores campaign information
- `campaign_matches`: Matches between campaigns and creators
- `deals`: Contract and payment details for accepted matches
- `deliverables`: Content submitted by creators
- `aff_links`: Affiliate links for tracking
- `transactions`: Payment transactions

## Deployment

1. Build the project

```bash
npm run build
```

2. Deploy to your preferred hosting provider (Vercel, Netlify, etc.)

## Edge Functions

The application uses Supabase Edge Functions for server-side logic:

- `validateCampaignBudget`: Validates campaign budget
- `createAffiliateLink`: Creates affiliate links
- `affiliateWebhookHandler`: Handles affiliate network webhooks
- `transferToCreator`: Transfers funds to creators

## License

This project is licensed under the MIT License.