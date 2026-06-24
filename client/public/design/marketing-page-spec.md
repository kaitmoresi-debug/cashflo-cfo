# Cashflow CFO — Marketing Page Design Specification

> v1.0 • Design spec for the public landing/marketing website

---

## 1. Page Layout (Single Scrolling Page)

```
┌──────────────────────────────────────────────┐
│  Navigation Bar (sticky)                      │
│  [Logo]  Features  Pricing  [CTA Button]      │
├──────────────────────────────────────────────┤
│                                              │
│  ┌──────────────── Hero Section ──────────┐  │
│  │  Headline + Subheadline                 │  │
│  │  Two CTA buttons + Trust signals        │  │
│  │  Dashboard preview image                │  │
│  └─────────────────────────────────────────┘  │
│                                              │
│  ┌─────────────── Logo Cloud ─────────────┐  │
│  │  "Trusted by 1,000+ solopreneurs"       │  │
│  │  [Logo] [Logo] [Logo] [Logo] [Logo]     │  │
│  └─────────────────────────────────────────┘  │
│                                              │
│  ┌───────────── Features Grid ────────────┐  │
│  │  3-column feature cards with icons      │  │
│  └─────────────────────────────────────────┘  │
│                                              │
│  ┌────────────── How It Works ────────────┐  │
│  │  3-step horizontal layout               │  │
│  │  ① Connect → ② Analyze → ③ Relax       │  │
│  └─────────────────────────────────────────┘  │
│                                              │
│  ┌────────────── Pricing Tiers ───────────┐  │
│  │  Starter $19/mo  |  Pro $49/mo          │  │
│  └─────────────────────────────────────────┘  │
│                                              │
│  ┌────────────── Final CTA ───────────────┐  │
│  │  "Start your 14-day free trial"         │  │
│  │  No credit card required                │  │
│  └─────────────────────────────────────────┘  │
│                                              │
│  ┌───────────────── Footer ───────────────┐  │
│  │  Logo | Product | Company | Legal       │  │
│  └─────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

---

## 2. Navigation Bar

| Element            | Details                                                    |
|--------------------|------------------------------------------------------------|
| Position           | Fixed/sticky at top, z-index: 50                           |
| Height             | 64px                                                       |
| Background         | `rgba(248, 250, 252, 0.95)` with backdrop blur (8px)      |
| Border-bottom      | 1px solid `var(--color-border)`                            |
| Logo (left)        | 28px logo mark + "Cashflow CFO" text, Deep Navy           |
| Nav links (center) | Features, Pricing (scroll to sections)                     |
| CTA button (right) | "Get Started Free" — Primary button style (`#0F172A` bg)  |

On scroll, add a subtle shadow below the nav.

On mobile, nav condenses to logo + hamburger icon (opens slide-down menu).

---

## 3. Hero Section

```
┌──────────────────────────────────────────────────┐
│  [Left Column 50%]     │  [Right Column 50%]      │
│                         │                          │
│  # Never run out of     │  ┌────────────────────┐  │
│  # cash again.          │  │  Dashboard Preview │  │
│                         │  │  (rounded corners, │  │
│  Your AI financial co-  │  │  subtle shadow)    │  │
│  pilot. Automated cash  │  │                    │  │
│  flow, tax predictions, │  │                    │  │
│  and pricing insights — │  │                    │  │
│  without spreadsheets.  │  └────────────────────┘  │
│                         │                          │
│  [Start Free Trial]     │                          │
│  [See How It Works ▸]   │                          │
│                         │                          │
│  ✦ No credit card       │                          │
│  ✦ 14-day free trial    │                          │
│  ✦ Cancel anytime       │                          │
└──────────────────────────────────────────────────┘
```

### Hero Details

**Headline** (H1, 48px on desktop, responsive):
- "Never run out of cash again."
- Color: `var(--color-text)` (`#1E293B`)
- Weight: 700

**Subheadline** (18px, `var(--color-text-secondary)`):
- "Your AI financial co-pilot. Automated cash flow tracking, tax predictions, and pricing insights — without spreadsheets or hiring a CFO."

**CTA Buttons**:
1. "Start Free Trial" — Primary (`#0F172A` bg, white text, 14px padding h, 12px v, rounded 8px)
2. "See How It Works" — Ghost (white bg, `#475569` text, `#E2E8F0` border)

**Trust Badges** (below CTAs):
- ✓ No credit card required
- ✓ 14-day free trial
- ✓ Cancel anytime

**Dashboard Preview Image** (right column):
- File: `hero-dashboard-preview.png`
- Rounded corners: 12px
- Shadow: `var(--shadow-xl)`
- Border: 1px solid `var(--color-border)`

### Mobile Hero (stacked)
Headline + subheadline + CTAs stacked vertically. Dashboard preview below. Reduce H1 to 32px.

---

## 4. Social Proof / Logo Cloud

```
Trusted by 1,000+ solopreneurs

[Logo 1]  [Logo 2]  [Logo 3]  [Logo 4]  [Logo 5]
```

- Light `#F8FAFC` background
- Subtle divider from hero
- Brand logos in grayscale at 30% opacity on hover 100%
- "Trusted by 1,000+ solopreneurs" — 14px, `var(--color-text-muted)`, uppercase, letter-spacing 2px

---

## 5. Features Section

### Section Title
- H2: "Everything you need to stay cash-flow positive"
- 16px subtitle: "Automated financial insights designed for one-person businesses"

### Feature Cards (3-column grid)

### Card 1: Cash Flow Tracking
| Element     | Value                                     |
|-------------|-------------------------------------------|
| Icon        | `TrendingUp` (Lucide, 32px, Teal)         |
| Title       | "Real-time Cash Flow"                     |
| Description | "See exactly where your money is going. Automated categorization from your bank feed." |
| Color accent| Top border 3px `#0D9488`                  |

### Card 2: Tax Predictions
| Element     | Value                                     |
|-------------|-------------------------------------------|
| Icon        | `FileText` (Lucide, 32px, Amber)          |
| Title       | "Tax Obligation Predictions"              |
| Description | "Know exactly what you'll owe next quarter. No surprises, no penalties." |
| Color accent| Top border 3px `#D97706`                  |

### Card 3: Pricing Suggestions
| Element     | Value                                     |
|-------------|-------------------------------------------|
| Icon        | `DollarSign` (Lucide, 32px, Teal)         |
| Title       | "Smart Pricing Insights"                  |
| Description | "Get data-backed suggestions on when and how much to raise your rates." |
| Color accent| Top border 3px `#0F172A`                  |

### Card 4: Runway Forecasting
| Element     | Value                                     |
|-------------|-------------------------------------------|
| Icon        | `Gauge` (Lucide, 32px, Green)             |
| Title       | "Runway Forecasting"                      |
| Description | "Know exactly how many months you have before you need more cash — in real time." |
| Color accent| Top border 3px `#059669`                  |

### Card 5: Bank Connection
| Element     | Value                                     |
|-------------|-------------------------------------------|
| Icon        | `Building` (Lucide, 32px, Slate)          |
| Title       | "Automatic Bank Sync"                     |
| Description | "Connect your accounts securely. Transactions flow in automatically, categorized by AI." |
| Color accent| Top border 3px `#475569`                  |

### Card 6: Subscription Management
| Element     | Value                                     |
|-------------|-------------------------------------------|
| Icon        | `CreditCard` (Lucide, 32px, Teal)         |
| Title       | "Subscription & Expense Tracking"         |
| Description | "Track recurring subscriptions and spot unused services draining your cash." |
| Color accent| Top border 3px `#0D9488`                  |

### Card Styling
```css
.feature-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border-top: 3px solid var(--color-secondary);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}
.feature-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

---

## 6. How It Works Section

```
┌──────────────────────────────────────────────────┐
│  How Cashflow CFO works                          │
│  Three simple steps to financial clarity         │
│                                                   │
│  ① Connect Your Bank      ② AI Analyzes          │
│  Securely link your        Our AI categorizes     │
│  accounts in under         transactions and       │
│  2 minutes                 detects patterns        │
│                                                   │
│                         ③ Stay Ahead              │
│                           Get real-time alerts     │
│                           on cash flow, tax,       │
│                           and pricing             │
└──────────────────────────────────────────────────┘
```

- 3-column layout with connector arrows between steps (or vertical stack on mobile)
- Step number: 48px circle in Teal with white number
- Title: H3 weight 600
- Description: 15px body text

---

## 7. Pricing Section

### Section Header
- H2: "Simple, transparent pricing"
- Subtitle: "One plan for every solopreneur. Upgrade when you need more."

### Tier Cards (side by side)

### Starter — $19/mo
```
┌──────────────────────────────┐
│  Starter                      │
│  $19 / month                  │
│                               │
│  ✓ Cash flow tracking         │
│  ✓ Tax obligation predictions │
│  ✓ Monthly summaries          │
│  ✓ Email support              │
│                               │
│  [Start Free Trial]           │
│  No credit card required      │
└──────────────────────────────┘
```

### Pro — $49/mo
```
┌──────────────────────────────┐
│  ★ Most Popular               │
│  Pro                          │
│  $49 / month                  │
│                               │
│  ✓ Everything in Starter     │
│  ✓ AI pricing suggestions    │
│  ✓ Runway forecasting        │
│  ✓ Bank account connection    │
│  ✓ Priority support           │
│                               │
│  [Start Free Trial]           │
│  No credit card required      │
└──────────────────────────────┘
```

### Pro Card Styling
- Elevated shadow (`var(--shadow-lg)`)
- "Most Popular" badge: Teal `#0D9488` bg, white text, 12px, uppercase, letter-spacing 1.5px
- CTA button: Teal bg (`#0D9488`) — different from Starter's Navy

---

## 8. Final CTA Section

```
┌──────────────────────────────────────────────┐
│  Background: subtle gradient                  │
│  Navy → Teal (or Deep Navy → Dark Slate)      │
│                                               │
│  H2: Ready to take control of your finances?  │
│  Sub: Join 1,000+ solopreneurs who never      │
│       run out of cash.                         │
│                                               │
│  [Start Your 14-Day Free Trial ▸]            │
│  (White bg, Deep Navy text, prominent CTA)    │
│                                               │
│  ✦ No credit card required                    │
│  ✦ Cancel anytime                             │
└──────────────────────────────────────────────┘
```

- Full-width background section
- Dark gradient background (Deep Navy `#0F172A` to slightly lighter `#1E293B`)
- Or use: subtle teal-to-navy gradient
- CTA button: Inverted — White bg, Deep Navy text

---

## 9. Footer

```
┌──────────────────────────────────────────────┐
│  [Logo]                                       │
│  Your AI Financial Co-Pilot                    │
│                                               │
│  Product  │  Company   │  Resources  │  Legal │
│  Features │  About     │  Blog       │  Privacy│
│  Pricing  │  Contact   │  Docs       │  Terms  │
│  Changelog│  Careers   │  API        │  Cookies│
│                                               │
│  © 2026 Cashflow CFO. All rights reserved.    │
└──────────────────────────────────────────────┘
```

- Background: `#F8FAFC` or `#0F172A` for dark footer
- Divided into 4 link columns
- Legal links, copyright at bottom

---

## 10. Typography on Marketing Page

| Element        | Font         | Size   | Weight | Color         |
|----------------|------------- |--------|--------|---------------|
| H1 (Hero)      | Inter        | 48px   | 700    | `#1E293B`     |
| H2 (Section)   | Inter        | 36px   | 700    | `#1E293B`     |
| H3 (Card)      | Inter        | 22px   | 600    | `#1E293B`     |
| Body           | Inter        | 16px   | 400    | `#475569`     |
| Small          | Inter        | 14px   | 400    | `#94A3B8`     |
| Mono (pricing) | JetBrains Mono | 32px | 500    | `#0F172A`     |

---

## 11. Responsive Breakpoints

| Breakpoint | Width      | Changes                                              |
|------------|------------|------------------------------------------------------|
| Desktop    | ≥ 1024px   | Full layout, side-by-side hero, 3-col features       |
| Tablet     | 768–1023px | 2-col features, stacked hero, reduced H1 to 36px     |
| Mobile     | < 768px    | Single column, 16px padding, stacked pricing cards   |
| Small      | < 480px    | H1 28px, minimal padding                             |

---

## 12. Animations (Subtle)

- **Hero**: Fade-in + slight slide-up on load (400ms ease-out)
- **Feature cards**: Staggered fade-in on scroll (Intersection Observer, each card 200ms delay)
- **Pricing cards**: Scale up 1.02 on hover
- **CTA buttons**: Slight lift on hover (translateY -1px, shadow increase)
- **Nav background**: Opacity transition on scroll (0.95 → 1.0)

---

## 13. Asset Files for Marketing Page

| File | Description |
|------|-------------|
| `design/hero-dashboard-preview.png` | Dashboard screenshot for hero (1536×1024) |
| `design/cashflow-cfo-logo.svg` | Primary logo for nav/hero/footer |
| `design/color-palette.css` | CSS custom properties to import |

---

## 14. SEO & Meta

- **Title**: Cashflow CFO — Your AI Financial Co-Pilot for Solopreneurs
- **Description**: Never run out of cash again. Automated cash flow tracking, tax predictions, and pricing insights for one-person businesses. No spreadsheets needed.
- **OG Image**: `hero-dashboard-preview.png`
- **URL**: `https://cashflowcfo.com` (or team's public URL)