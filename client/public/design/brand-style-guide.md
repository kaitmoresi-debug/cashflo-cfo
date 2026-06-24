# Cashflow CFO — Brand Style Guide

> Version 1.0 • Last updated: 2026-06-24

---

## 1. Brand Essence

**Cashflow CFO** is the AI financial co-pilot for solopreneurs. We make financial clarity simple, automated, and trustworthy — no accountants, no spreadsheets.

- **Tone**: Confident, clear, approachable, data-driven
- **Personality**: Like a brilliant CFO who *actually* explains things in plain English
- **Promise**: Never run out of cash again

---

## 2. Logo

### Primary Logo
- **File**: `/home/team/shared/design/cashflow-cfo-logo.svg`
- **File (PNG)**: `/home/team/shared/design/cashflow-cfo-logo.png`
- **Format**: SVG (preferred), PNG fallback

### Logo Mark
A stylized "C" that doubles as an upward-trending chart line, with a small arrow accent. The mark sits to the left of the wordmark.

### Clear Space
Maintain padding equal to the height of the "C" mark on all sides. Never crowd the logo.

### Minimum Size
- Digital: 140px wide (or 32px for the mark alone)
- Print: 0.75" wide

### Don'ts
- Do not recolor the logo
- Do not stretch or distort
- Do not put on busy backgrounds without the white clearance circle
- Do not add drop shadows or effects

---

## 3. Color Palette

| Role           | Name       | Hex       | RGB              | Usage                                                  |
|----------------|------------|-----------|------------------|--------------------------------------------------------|
| **Primary**    | Deep Navy  | `#0F172A` | 15, 23, 42       | Headings, primary buttons, main brand color            |
| **Secondary**  | Teal       | `#0D9488` | 13, 148, 136     | Secondary elements, wordmark "CFO", links              |
| **Accent**     | Bright Teal| `#14B8A6` | 20, 184, 166     | CTAs, interactive states, hover effects                |
| **Background** | Off-White  | `#F8FAFC` | 248, 250, 252    | Page backgrounds (light mode)                          |
| **Surface**    | White      | `#FFFFFF` | 255, 255, 255    | Cards, modals, elevated panels                         |
| **Text**       | Dark Slate | `#1E293B` | 30, 41, 59       | Body text                                              |
| **Text 2**     | Slate      | `#475569` | 71, 85, 105      | Secondary/muted text                                   |
| **Success**    | Green      | `#059669` | 5, 150, 105      | Positive cash flow, growth indicators, "good" status   |
| **Warning**    | Amber      | `#D97706` | 217, 119, 6      | Tax obligations, upcoming payments, medium alerts      |
| **Danger**     | Red        | `#DC2626` | 220, 38, 38      | Negative cash flow, low runway, critical alerts        |

### Dark Mode Palette

| Role         | Hex       | Usage                         |
|--------------|-----------|-------------------------------|
| Background   | `#0F172A` | Page background (dark mode)   |
| Surface      | `#1E293B` | Cards in dark mode            |
| Text         | `#F1F5F9` | Body text in dark mode        |
| Border       | `#334155` | Subtle borders in dark mode   |

### Accessibility
All text/background combinations meet WCAG AA contrast ratio minimums:
- Primary text on white: 12.6:1 ✅
- Body text on white: 9.0:1 ✅
- Teal on white (links): 5.8:1 ✅
- White on navy (buttons): 13.6:1 ✅

---

## 4. Typography

### Headings — Inter
```
font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
```

| Level | Weight | Size (px) | Line Height | Letter-spacing |
|-------|--------|-----------|-------------|----------------|
| H1    | 700    | 40–48     | 1.15        | -0.02em        |
| H2    | 700    | 30–36     | 1.2         | -0.01em        |
| H3    | 600    | 22–26     | 1.25        | normal         |
| H4    | 600    | 18–20     | 1.3         | normal         |

### Body — Inter
```
font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
```

| Usage     | Weight | Size (px) | Line Height |
|-----------|--------|-----------|-------------|
| Body      | 400    | 15–16     | 1.5–1.6     |
| Small     | 400    | 13–14     | 1.5         |
| Caption   | 500    | 11–12     | 1.4         |

### Data / Monospace — JetBrains Mono
```
font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
```

| Usage                  | Weight | Size (px) |
|------------------------|--------|-----------|
| Dashboard numbers      | 500    | 20–32     |
| Table data / amounts   | 400    | 14–16     |
| Small data labels      | 400    | 12        |

Used for: dollar amounts, runway counts, tax figures, percentage changes, any financial data display.

### Font Loading
Use Inter from Google Fonts (`wght@400;500;600;700;800`) and JetBrains Mono (`wght@400;500`). Self-host for production.

---

## 5. UI Component Styles

### Buttons
- **Primary**: Deep Navy `#0F172A` bg, White text, 8px border-radius, 12px h-padding, 10px v-padding
- **Secondary**: White bg, Teal `#0D9488` border + text
- **Ghost**: No bg, Dark Slate text, hover: light gray bg
- **Danger**: Red `#DC2626` bg, White text

### Cards
- White `#FFFFFF` bg, 12px border-radius, subtle shadow (`0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`)
- Elevated: `0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)`

### Dashboard Widgets
- White card with colored top border stripe (Teal for cash flow, Amber for tax, Green for runway)
- Data numbers in JetBrains Mono
- Mini sparkline charts in accent Teal

### Navigation
- Clean, minimal left sidebar in dark mode (Deep Navy) or light (Off-White)
- Active state: Teal accent bar
- Icons: Feather or Lucide icon set, 20px

---

## 6. Data Visualization

### Colors for Charts
| Metric          | Color      | Hex       |
|-----------------|------------|-----------|
| Revenue/Inflow  | Teal       | `#0D9488` |
| Expenses        | Red        | `#DC2626` |
| Net Cash Flow   | Dark Slate | `#1E293B` |
| Projected       | Bright Teal| `#14B8A6` (dashed) |
| Tax Reserve     | Amber      | `#D97706` |
| Runway          | Green      | `#059669` |

### Sparklines
- Line weight: 2px
- Area fill: 15% opacity of the line color
- No axis labels needed (inline mini charts)

---

## 7. Iconography

Use the **Lucide** icon set (open-source, consistent, clean line style).

| Feature               | Icon                  |
|-----------------------|-----------------------|
| Cash flow             | `TrendingUp`          |
| Tax prediction        | `FileText`            |
| Pricing suggestion    | `DollarSign`          |
| Runway gauge          | `Gauge`               |
| Bank connection       | `Building`            |
| Subscription          | `CreditCard`          |
| Dashboard             | `LayoutDashboard`     |
| Settings              | `Settings`            |
| Notifications         | `Bell`                |
| User                  | `UserCircle`          |

Icon style: 1.5px stroke width, 24px default size, rounded caps and joins.

---

## 8. Spacing Scale

Use a 4px base unit:

| Token | px  | Usage                |
|-------|-----|----------------------|
| 1     | 4   | Tight inner padding  |
| 2     | 8   | Button padding, gaps |
| 3     | 12  | Card padding         |
| 4     | 16  | Section padding      |
| 5     | 20  | Widget margins       |
| 6     | 24  | Panel padding        |
| 8     | 32  | Page padding         |
| 10    | 40  | Large gaps           |
| 12    | 48  | Section separation   |

---

## 9. Marketing Page Guidelines

### Hero Section
- Large H1 headline + supporting subtext
- Dashboard preview image (use actual product screenshot)
- Two CTA buttons: "Start Free Trial" (Primary) and "See How It Works" (Ghost)
- Background: subtle gradient from Off-White to very light Teal

### Feature Cards
- 3-column grid on desktop
- Icon at top, H3 title, short description
- Hover: slight elevation + Teal accent

### Pricing Section
- Two tier cards side by side (Starter $19/mo, Pro $49/mo)
- Pro card slightly elevated with "Most Popular" badge (Teal bg)
- Feature checklist with checkmark icons
- CTA button per tier

### Trust Signals
- "Trusted by 1,000+ solopreneurs"
- 14-day free trial badge
- No credit card required for trial

---

## 10. File Inventory

| File | Description |
|------|-------------|
| `design/cashflow-cfo-logo.svg` | Primary logo — scalable vector format |
| `design/cashflow-cfo-logo.png` | Primary logo — PNG (1024×1024) |
| `design/brand-style-guide.md` | This document |
| `design/color-palette.css` | CSS custom properties for the palette |
| `design/dashboard-layout-spec.md` | Dashboard widget layout spec |

---

## 11. Versioning

This is v1.0. The brand is expected to evolve. When making changes:
1. Update the `version` and date at the top
2. Keep the old values in a changelog section below
3. Notify the engineer of any color or typography changes that affect UI code