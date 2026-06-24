# Cashflow CFO

> **Your AI Financial Co-Pilot** — Never run out of cash again.

Cashflow CFO is an AI-powered financial dashboard built specifically for **solopreneurs, freelancers, and independent consultants** earning $50k–$500k/year. It automates cash flow tracking, predicts upcoming tax obligations, suggests optimal pricing increases, and forecasts runway — so you can run your business with CFO-level clarity without hiring an accountant or opening a spreadsheet.

---

## ✨ Features

### 💰 Cash Flow Tracking
- Manually log income and expenses with category tagging
- Real-time dashboard with revenue vs. expenses visualization
- Beautiful Recharts area charts showing trends over time
- Monthly, quarterly, and yearly views

### 📊 Tax Obligation Predictions
- AI engine calculates estimated self-employment + income tax
- Quarterly payment schedule aligned with IRS deadlines
- Progress bar shows how much of the quarter has elapsed
- Actionable tips: "Set aside $X/month to be ready"

### 📈 Smart Pricing Suggestions
- Analyzes your expense/income ratio and spending trends
- Compares current rate vs. suggested rate with projected revenue impact
- One-click "Apply Suggestion" with acceptance tracking
- Helps solopreneurs confidently raise rates based on data

### 🛣️ Runway Forecasting
- Calculates months of runway based on cash on hand and burn rate
- 3-month rolling average for accurate projections
- What-if scenario modeling
- Color-coded status: ✅ Healthy (>6mo), ⚠️ Warning (3–6mo), 🚨 Critical (<3mo)

### 🔐 Additional Features
- JWT-based authentication (signup/login)
- Dark mode support
- 14-day free trial (both tiers)
- Custom CSS design token system for easy theming

---

## 📸 Screenshots

> *Replace with actual screenshots after deployment*

### Dashboard Overview
![Dashboard Preview](design/hero-dashboard-preview.png)
*Main dashboard with cash flow chart, metric cards (runway, tax reserve, net cash), and recent transactions table*

### Brand Assets
| Logo | Color Palette |
|------|---------------|
| ![Logo](design/cashflow-cfo-logo.png) | **Primary:** Deep Navy `#0F172A` · **Secondary:** Teal `#0D9488` · **Accent:** Bright Teal `#14B8A6` · **Success:** Green `#059669` · **Warning:** Amber `#D97706` · **Danger:** Red `#DC2626` |

See the full [Brand Style Guide](design/brand-style-guide.md) for details.

---

## 🚀 Tech Stack

| Layer            | Technology                            |
|------------------|---------------------------------------|
| **Frontend**     | React 18 + Vite + Recharts            |
| **Backend**      | Express.js (Node.js)                  |
| **Database**     | Turso (SQLite with edge sync)         |
| **Auth**         | JWT (JSON Web Tokens)                 |
| **Payments**     | Stripe (subscription billing)         |
| **Bank Sync**    | Plaid (Pro tier — upcoming)           |
| **Styling**      | CSS Custom Properties (design tokens) |
| **Icons**        | Lucide React                          |

### Why This Stack?
- **Vite + React**: Lightning-fast dev experience, tree-shakeable, excellent DX
- **Express**: Lightweight, proven, easy to deploy
- **Turso/SQLite**: Serverless edge database with zero ops overhead
- **Recharts**: Declarative charting built on D3 — perfect for financial data visualization
- **Stripe**: Industry standard for SaaS subscriptions with webhook support
- **CSS Design Tokens**: Full light/dark mode theming with WCAG AA accessible colors

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────┐
│                    Frontend (Vite + React)            │
│  ┌────────────────────────────────────────────────┐  │
│  │  Pages: Login, Signup, Dashboard, CashFlow,    │  │
│  │  Tax, Pricing, Runway, Settings                │  │
│  │  Components: Sidebar, Header, Widgets, Charts  │  │
│  │  Context: AuthContext, ThemeContext             │  │
│  └────────────────────────────────────────────────┘  │
│                       ↕ API calls (JWT auth)          │
├──────────────────────────────────────────────────────┤
│                    Backend (Express.js)               │
│  ┌────────────────────────────────────────────────┐  │
│  │  Routes: /api/auth, /api/cashflow, /api/tax,   │  │
│  │  /api/pricing, /api/runway, /api/subscription  │  │
│  │  Middleware: JWT verification, CORS, error      │  │
│  │  Services: Tax engine, Pricing engine, Runway   │  │
│  └────────────────────────────────────────────────┘  │
│                       ↕ SQL queries                   │
├──────────────────────────────────────────────────────┤
│                    Database (Turso / SQLite)          │
│  ┌────────────────────────────────────────────────┐  │
│  │  Tables: users, transactions, tax_predictions, │  │
│  │  subscriptions, pricing_suggestions, settings  │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### Data Flow
1. User authenticates via JWT → receives token stored in localStorage
2. Frontend makes authenticated API calls to Express backend
3. Backend validates JWT, processes business logic, queries Turso
4. Tax predictions engine calculates estimated quarterly obligations
5. Pricing engine analyzes expense/income ratio trends
6. Runway engine computes 3-month rolling average projections
7. All data rendered via Recharts visualizations in the dashboard

---

## 🏃 Quick Start Guide

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A Turso account (free tier) — or use local SQLite for development
- A Stripe account (for subscription payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/kaitmoresi-debug/cashflo-cfo.git
cd cashflo-cfo

# Install dependencies
npm install

# Set up environment variables (see .env.example below)
cp .env.example .env

# Initialize the database
npm run db:init

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (Vite dev server) with the API proxied to `http://localhost:3001`.

### Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=3001
NODE_ENV=development

# Database (Turso)
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-turso-token

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Frontend URL (for CORS)
VITE_API_URL=http://localhost:3001

# Plaid (Pro tier — optional for development)
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
```

---

## 🎨 Brand Identity

Cashflow CFO has a complete brand identity system designed for a professional, trustworthy, modern feel.

| Asset | File |
|-------|------|
| Logo (SVG) | [`design/cashflow-cfo-logo.svg`](design/cashflow-cfo-logo.svg) |
| Logo (PNG) | [`design/cashflow-cfo-logo.png`](design/cashflow-cfo-logo.png) |
| Brand Style Guide | [`design/brand-style-guide.md`](design/brand-style-guide.md) |
| CSS Design Tokens | [`design/color-palette.css`](design/color-palette.css) |
| Dashboard Layout Spec | [`design/dashboard-layout-spec.md`](design/dashboard-layout-spec.md) |
| Marketing Page Spec | [`design/marketing-page-spec.md`](design/marketing-page-spec.md) |

### Design Highlights
- **Color palette**: Deep Navy `#0F172A` (primary) + Teal `#0D9488` (secondary) on clean white backgrounds
- **Typography**: Inter for UI (weights 400–800), JetBrains Mono for financial data display
- **Dark mode**: Full dark theme for reduced eye strain — just toggle `[data-theme="dark"]`
- **Accessibility**: All text/background combos pass WCAG AA contrast minimums
- **Icons**: Lucide icon set — clean 1.5px stroke, rounded caps, tree-shakeable

---

## 📦 Project Structure

```
cashflo-cfo/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── CashFlowChart.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── TransactionsTable.jsx
│   │   │   └── ...
│   │   ├── pages/             # Route pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ...
│   │   ├── hooks/             # Custom React hooks
│   │   ├── context/           # Auth, theme contexts
│   │   ├── styles/            # CSS variables, global styles
│   │   └── App.jsx            # Root component with routing
│   └── index.html
├── server/                    # Backend (Express)
│   ├── routes/                # API route handlers
│   ├── middleware/            # JWT auth, error handling
│   ├── services/              # Business logic
│   │   ├── taxEngine.js       # Tax prediction calculations
│   │   ├── pricingEngine.js   # Pricing suggestion analysis
│   │   └── runwayEngine.js    # Runway forecasting
│   ├── db/                    # Database setup + queries
│   └── index.js               # Server entry point
├── design/                    # Design assets (brand identity)
│   ├── brand-style-guide.md
│   ├── color-palette.css
│   ├── dashboard-layout-spec.md
│   ├── marketing-page-spec.md
│   ├── cashflow-cfo-logo.svg
│   ├── cashflow-cfo-logo.png
│   └── hero-dashboard-preview.png
├── package.json
├── .env.example
└── README.md
```

---

## 💵 Revenue Model & Pricing

| Tier     | Price    | Features                                                  |
|----------|----------|-----------------------------------------------------------|
| **Starter** | **$19/mo** | Cash flow tracking + tax obligation predictions          |
| **Pro**     | **$49/mo** | Everything in Starter + pricing suggestions + runway forecasting + bank account connection |

- 📅 **14-day free trial** on both tiers
- 💳 **No credit card required** for trial
- 🔄 Cancel anytime

---

## 🧠 How It Works

```
① Connect your bank  ──→  ② AI analyzes patterns  ──→  ③ Stay ahead
     (or add manually)        (transactions, trends)       (alerts, insights)
```

1. **Connect**: Securely link your bank accounts via Plaid (Pro) or manually log transactions (Starter)
2. **Analyze**: Our AI engine categorizes spending, detects patterns, and runs predictive models
3. **Stay ahead**: Get real-time alerts on cash flow changes, tax deadlines, pricing opportunities, and runway status

---

## 📈 Key Metrics & Goals

| KPI | Target | Why It Matters |
|-----|--------|----------------|
| Monthly Recurring Revenue (MRR) | Growing | Measures business health |
| Active Subscribers | Increasing | User adoption |
| Churn Rate | < 5% monthly | Product stickiness |
| Pricing Suggestions Accepted | > 40% | Real value delivered |
| Tax Prediction Accuracy | > 90% vs. actual filings | Trust and reliability |

---

## 🛣️ Roadmap

- [x] **MVP Complete** — All four core features shipped
- [ ] **Production Deployment** — Deploy app for owner preview
- [ ] **GitHub Repo** — Push code to remote repository
- [ ] **Stripe Integration** — Live subscription payments
- [ ] **Plaid Bank Sync** — Automated transaction import (Pro tier)
- [ ] **Mobile Responsive** — Full mobile optimization
- [ ] **Email Notifications** — Weekly cash flow summaries
- [ ] **Multi-currency Support** — For international solopreneurs
- [ ] **API Access** — Public API for integration with other tools

---

## 🤝 Contributing

This is a closed-source project. For inquiries, suggestions, or partnership opportunities, please contact the team.

---

## 📄 License

Proprietary — All rights reserved. © 2026 Cashflow CFO.

---

## 🙋 About

Built by a team focused on empowering solopreneurs with AI-driven financial clarity. We believe every independent worker deserves a CFO — without the cost or complexity.

**Cashflow CFO** — Your AI Financial Co-Pilot.