# Cashflow CFO — Dashboard Layout Specification

> v1.0 • For the engineer implementing the main application dashboard
> Updated to match lead's requested layout: sidebar → header → cash flow chart → 3 metric cards → transactions table

---

## Page Structure (Overview)

```
┌──────────────────────────────────────────────────────────────────┐
│  [Sidebar 240px]  │            Main Content Area                  │
│                    │                                               │
│  ┌──────────────┐  │  ┌──────────────────────────────────────┐   │
│  │  Logo + Name  │  │  │  Top Header                         │   │
│  └──────────────┘  │  │  "Dashboard"   [Period ▼]  [🔔] [👤] │   │
│                    │  └──────────────────────────────────────┘   │
│  ┌──────────────┐  │                                               │
│  │  ● Dashboard  │  │  ┌──────────────────────────────────────┐   │
│  │  ○ Cash Flow  │  │  │  Cash Flow Chart (full width)        │   │
│  │  ○ Tax        │  │  │  [area chart - revenue vs expenses]  │   │
│  │  ○ Pricing    │  │  └──────────────────────────────────────┘   │
│  │  ○ Runway     │  │                                               │
│  │  ○ Settings   │  │  ┌──────────┬──────────┬──────────┐       │   │
│  └──────────────┘  │  │  Runway   │  Tax     │  Net     │       │   │
│                    │  │  Card     │  Reserve │  Cash    │       │   │
│                    │  │           │  Card    │  Card    │       │   │
│                    │  ├──────────┴──────────┴──────────┤       │   │
│                    │  │  Recent Transactions (table)     │       │   │
│                    │  └─────────────────────────────────┘       │   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 1. Sidebar Navigation (240px)

### Layout
```
┌────────────────────┐
│  [Logo Mark 32px]  │  ← Logo + "Cashflow CFO"
│  Cashflow CFO      │
├────────────────────┤
│                    │
│  ● Dashboard       │  ← Active page (Teal left bar)
│  ○ Cash Flow       │
│  ○ Tax             │
│  ○ Pricing         │
│  ○ Runway          │
│  ○ Settings        │
│                    │
├────────────────────┤
│                    │
│  [👤] Alex Chen    │  ← User avatar + name
│  Free Trial · 12d  │  ← Upgrade prompt
│                    │
└────────────────────┘
```

### Specs

| Element              | Value                                                          |
|----------------------|----------------------------------------------------------------|
| **Width**            | 240px fixed                                                    |
| **Background**       | `var(--color-bg)` (`#F8FAFC` light / `#0F172A` dark)          |
| **Border-right**     | 1px solid `var(--color-border)` (`#E2E8F0`)                   |
| **Logo area**        | 32px logo mark + "Cashflow CFO" in Deep Navy, 18px bold       |
| **Padding**          | 20px top, 16px horizontal                                      |

### Nav Items

| Item       | Icon (Lucide)   | Route             |
|------------|-----------------|-------------------|
| Dashboard  | `LayoutDashboard` | `/dashboard`     |
| Cash Flow  | `TrendingUp`    | `/cashflow`       |
| Tax        | `FileText`      | `/tax`            |
| Pricing    | `DollarSign`    | `/pricing`        |
| Runway     | `Gauge`         | `/runway`         |
| Settings   | `Settings`      | `/settings`       |

### Nav Item States
```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  margin: 2px 8px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 14px;
  transition: all var(--transition-fast);
}
.nav-item:hover {
  background: var(--color-surface-hover);
}
.nav-item.active {
  background: rgba(13, 148, 136, 0.08);
  color: var(--color-secondary);
  border-left: 3px solid var(--color-secondary);
  font-weight: 600;
}
```

### User Section (sidebar bottom)
- User avatar (24px circle, first initial)
- User name (14px, `var(--color-text)`)
- Subscription badge: "Starter" or "Pro" (12px, `var(--color-text-muted)`)
- If on trial: "Free Trial · Xd remaining" in Amber

---

## 2. Top Header

```
┌──────────────────────────────────────────────────────────────┐
│  Dashboard                               [Period ▼] [🔔] [👤]│
│  Your financial overview at a glance                        │
└──────────────────────────────────────────────────────────────┘
```

### Specs

| Element              | Value                                                    |
|----------------------|----------------------------------------------------------|
| **Height**           | 64px                                                     |
| **Background**       | `var(--color-surface)` (white)                           |
| **Border-bottom**    | 1px solid `var(--color-border)`                          |
| **Padding**          | 16px 24px                                                |

### Left Side
- Page title: **"Dashboard"** — H2, Inter, 700 weight, `var(--color-text)`
- Optional subtitle: "Your financial overview at a glance" — 14px, `var(--color-text-muted)`

### Right Side
- **Period selector**: Dropdown button with options:
  - "This Week"
  - "This Month" ← default
  - "Last 30 Days"
  - "This Quarter"
  - "This Year"
  - "Custom Range"
  - Style: Ghost button, 14px, `var(--color-text-secondary)`, `var(--color-border)` border
- **Notification bell**: `Bell` icon (Lucide, 20px), `var(--color-text-secondary)`. Red dot if unread.
- **User avatar**: 32px circle, `var(--color-secondary)` bg, white initial

---

## 3. Main Dashboard Content Area

### Layout Flow (vertical stacking)

```
┌──────────────────────────────────────────────────┐
│  1. Cash Flow Chart (full-width)                 │
│     Header + chart area                          │
├──────────────────────────────────────────────────┤
│  2. Metric Cards (3-column row)                  │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐    │
│  │  Runway   │  │  Tax      │  │  Net Cash │    │
│  │           │  │  Reserve  │  │           │    │
│  └───────────┘  └───────────┘  └───────────┘    │
├──────────────────────────────────────────────────┤
│  3. Recent Transactions (full-width table)       │
│     Search + filter bar + scrollable table       │
└──────────────────────────────────────────────────┘
```

**Content padding**: 24px horizontal, 24px top, 32px bottom
**Max width**: 1200px, centered
**Gap between sections**: 24px

---

## 4. Section 1: Cash Flow Chart

```
┌──────────────────────────────────────────────────────────────┐
│  💰 Cash Flow Overview                        [Export ▼]    │
│                                                             │
│  $12,430       $8,210         $4,220                        │
│  Revenue       Expenses       Net Cash Flow                 │
│  ▲ +8.3%       ▼ +2.1%       ▲ +14.2%                      │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │        ╱╲    ╱╲          ╱╲                         │   │
│  │  ╱╲  ╱  ╲  ╱  ╲  ╱╲  ╱  ╲  ╱╲                      │   │
│  │ ╱  ╲╱    ╲╱    ╲╱  ╲╱    ╲╱  ╲                     │   │
│  │ ─────────────────────────────────────               │   │
│  │   Jan  Feb  Mar  Apr  May  Jun  Jul                │   │
│  └──────────────────────────────────────────────────────┘   │
│  ▲ Revenue line ($0D9488)  ▼ Expenses area ($DC2626, 15%)  │
│  Last 7 days vs previous period                             │
└──────────────────────────────────────────────────────────────┘
```

### Chart Specs

| Element             | Value                                                   |
|---------------------|---------------------------------------------------------|
| **Card bg**         | `var(--color-surface)` (white)                          |
| **Border-radius**   | `var(--radius-lg)` (12px)                               |
| **Shadow**          | `var(--shadow-sm)`                                      |
| **Top accent**      | 4px Teal `#0D9488` stripe                               |
| **Padding**         | 20px                                                    |

### KPI Summary Row (above chart)
- Three KPI numbers in a row, each with label and delta arrow
- **Revenue**: `var(--font-mono)`, 28px weight 500, Teal `#0D9488`
- **Expenses**: `var(--font-mono)`, 28px weight 500, Red `#DC2626`
- **Net Cash Flow**: `var(--font-mono)`, 28px weight 500, Dark Slate `#1E293B`
- Delta text: 13px, positive `#059669`, negative `#DC2626`

### Chart Itself
- **Type**: Area chart (revenue line + expenses filled area)
- **Revenue line**: 2px Teal `#0D9488`
- **Expenses area**: Red `#DC2626` at 15% opacity fill
- **X-axis**: Month labels (Jan, Feb, Mar...)
- **Y-axis**: Dollar amounts (auto-scaled)
- **Grid lines**: Subtle, `#F1F5F9`
- **Tooltip on hover**: Shows date, revenue, expenses, net
- **Responsive**: Full width on desktop, auto-height (280px ideal)
- **Library suggestion**: Recharts or Chart.js (lightweight)

### Export Menu (top right)
- "Download CSV", "Print"
- Ghost button, 13px, `var(--color-text-muted)`

---

## 5. Section 2: Three Metric Cards

```
┌──────────────────────────┬──────────────────────────┬──────────────────────────┐
│  Runway Forecast         │  Tax Reserve             │  Net Cash Position       │
│                          │                          │                          │
│       ┌─────┐            │  Estimated tax due       │  Current balance         │
│      ╱  8.2  ╲           │  this quarter            │                          │
│      │ months │          │  $3,240                  │  $4,220                  │
│      ╲        ╱          │                          │                          │
│       └─────┘            │  ▓▓▓▓▓▓▓▓▓▓░░░░ 62%     │  ▲ +14.2% this month    │
│                          │  Set aside $270/mo       │                          │
│  ✅ Healthy              │                          │  ┌──────────────────┐    │
│  Monthly burn: $4,100    │  Next: Sep 15, 2026      │  │  Mini sparkline  │    │
│  Cash: $33,620           │                          │  └──────────────────┘    │
└──────────────────────────┴──────────────────────────┴──────────────────────────┘
```

### Card Specifications (all 3 share same base style)

| Element            | Value                                                      |
|--------------------|------------------------------------------------------------|
| **Width**          | Equal 1/3 of container (gap: 16px)                         |
| **Card bg**        | `var(--color-surface)` (white)                             |
| **Border-radius**  | `var(--radius-lg)` (12px)                                  |
| **Shadow**         | `var(--shadow-sm)`                                         |
| **Padding**        | 20px                                                       |
| **Top accent**     | 3px colored stripe                                         |

---

### Card A: Runway Forecast
- **Icon**: `Gauge` (Lucide, 20px, Green `#059669`)
- **Top accent**: Green `#059669`
- **Primary number**: "8.2" months — `var(--font-mono)`, 32px, weight 500, `var(--color-text)`
- **Label below**: "months of runway" — 13px, `var(--color-text-muted)`
- **Circular gauge** visualization (CSS or SVG, 60px diameter)
- **Status badge**: "✅ Healthy" (Green), "⚠️ Warning" (Amber), "🚨 Critical" (Red)
- **Thresholds**: >6mo = Green, 3–6mo = Amber, <3mo = Red
- **Secondary info**: "Monthly burn: $4,100" · "Cash on hand: $33,620" — 13px each

### Card B: Tax Reserve
- **Icon**: `FileText` (Lucide, 20px, Amber `#D97706`)
- **Top accent**: Amber `#D97706`
- **Primary number**: "$3,240" — `var(--font-mono)`, 32px, weight 500, `var(--color-text)`
- **Label below**: "estimated tax due this quarter" — 13px, `var(--color-text-muted)`
- **Progress bar** (horizontal): Showing % of quarter elapsed
  - Bar bg: `#F1F5F9`, Fill: Amber `#D97706`, Height: 6px, Rounded
  - Text: "62% of quarter elapsed"
- **Action line**: "▸ Set aside $270/mo to be ready" — 13px, `var(--color-text-secondary)`
- **Due date**: "Next payment: Sep 15, 2026" — 13px, `var(--color-text-muted)`

### Card C: Net Cash Position
- **Icon**: `TrendingUp` (Lucide, 20px, Teal `#0D9488`)
- **Top accent**: Teal `#0D9488`
- **Primary number**: "$4,220" — `var(--font-mono)`, 32px, weight 500, `var(--color-text)`
- **Label below**: "net cash position" — 13px, `var(--color-text-muted)`
- **Delta**: "▲ +14.2% this month" — 14px, `#059669`
- **Mini sparkline chart** (inline, 100% width × 40px height)
  - Line: Teal `#0D9488`, 2px
  - Area fill: Teal at 10% opacity

---

## 6. Section 3: Recent Transactions Table

```
┌──────────────────────────────────────────────────────────────┐
│  Recent Transactions              [Search...] [Filter ▼]     │
│  Showing 15 of 142 transactions this month                   │
│                                                              │
│  ┌──────┬────────────┬──────────┬───────────┬────────┬──────┐│
│  │ Date │ Description │ Category │ Amount    │ Status │      ││
│  ├──────┼────────────┼──────────┼───────────┼────────┼──────┤│
│  │ Today│ Client XYZ  │ Revenue  │  +$2,400 │ ✅     │      ││
│  │ Jun23│ Stripe fee  │ Expense  │  -$0.59  │ ✅     │      ││
│  │ Jun22│ AWS Hosting │ Expense  │  -$89.00 │ ✅     │      ││
│  │ Jun21│ Freelance   │ Revenue  │  +$1,200 │ ✅     │      ││
│  │ ...  │ ...         │ ...      │  ...     │ ...    │      ││
│  └──────┴────────────┴──────────┴───────────┴────────┴──────┘│
│                                                              │
│  [View All Transactions →]                                   │
└──────────────────────────────────────────────────────────────┘
```

### Table Specs

| Element              | Value                                                    |
|----------------------|----------------------------------------------------------|
| **Card bg**          | `var(--color-surface)` (white)                           |
| **Border-radius**    | `var(--radius-lg)` (12px)                                |
| **Shadow**           | `var(--shadow-sm)`                                       |
| **Padding**          | 20px                                                     |
| **Top accent**       | 4px Deep Navy `#0F172A` stripe                           |

### Header Row
- **Title**: "Recent Transactions" — H3, Inter, 600 weight, `var(--color-text)`
- **Subtitle**: "Showing 15 of 142 transactions this month" — 13px, `var(--color-text-muted)`

### Search & Filter (right side of header)
- **Search input**: 14px, with search icon (Lucide `Search`)
  - Border: `var(--color-border)`, rounded 6px
  - Placeholder: "Search transactions..."
- **Filter dropdown**: "All Categories" / "Revenue" / "Expenses" / "Transfers"
  - Ghost button style, 14px

### Table Columns

| Column       | Width   | Alignment | Format                                              |
|------------- |---------|-----------|-----------------------------------------------------|
| **Date**     | 100px   | Left      | "Today", "Yesterday", or "Mon DD" — 13px, `var(--color-text-secondary)` |
| **Description** | Flex | Left      | 14px, `var(--color-text)`. Truncate with ellipsis on overflow |
| **Category** | 110px   | Left      | Badge pill: Revenue (Teal bg), Expense (Red bg), or custom |
| **Amount**   | 110px   | Right     | `var(--font-mono)`, 14px weight 500. Revenue = `#059669` with + prefix, Expense = `#DC2626` with - prefix |
| **Status**   | 70px    | Center    | ✅ `Check` icon green, or ⏳ clock icon amber for pending |

### Table Body Rows
- Row height: 44px
- Alternating row bg: `var(--color-surface-hover)` on hover only (no zebra striping)
- Divider: 1px `var(--color-border)` between rows
- Empty state: "No transactions found" centered, with `SearchX` icon, muted text

### Category Badge Styling
```css
.category-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
}
.category-badge.revenue {
  background: rgba(13, 148, 136, 0.1);
  color: var(--color-secondary);
}
.category-badge.expense {
  background: rgba(220, 38, 38, 0.1);
  color: var(--color-danger);
}
```

### Footer Link
- "View All Transactions →" — right-aligned, 14px, `var(--color-secondary)`, hover underline
- Links to `/cashflow` page

---

## 7. Responsive Breakpoints

| Breakpoint | Width       | Layout Change                                              |
|------------|-------------|------------------------------------------------------------|
| Desktop    | ≥ 1024px    | Full layout: sidebar visible, 3-col metric cards           |
| Tablet     | 768–1023px  | Sidebar collapses to hamburger menu (slide-out overlay)    |
| Tablet     | 768–1023px  | Metric cards → 2 columns (runway + tax, net cash full width below) |
| Mobile     | < 768px     | Single column: chart stacks, metric cards stack vertically, table scrolls horizontally |
| Small      | < 480px     | 16px content padding, compact table rows (36px)            |

### Sidebar Responsive (Tablet+Mobile)
- Hidden by default, shown via hamburger `Menu` icon in top header
- Overlay backdrop: `rgba(0,0,0,0.4)`
- Slide-in from left, 240px

---

## 8. States

### Loading State
- Each section independent skeleton placeholder
- Chart: gray rectangle with subtle pulse animation
- Metric cards: 3 gray rectangles with rounded corners
- Table: 5 rows of gray lines

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.skeleton {
  background: #E2E8F0;
  border-radius: var(--radius-md);
  animation: pulse 2s ease-in-out infinite;
}
```

### Empty State (first time / no data)
- Cash flow chart: "Connect your bank to see your cash flow trends"
- Metric cards: "--" instead of numbers, "No data yet" labels
- Transactions table: "No transactions yet. [Connect Bank] to sync automatically."
- All with muted gray styling, centered messages

### Error State
- Inline per-section: red-tinted banner within each broken section
- "We're having trouble loading this data. [Retry]" — 14px, with `AlertCircle` icon
- Does not break other sections

---

## 9. Component Hierarchy (for the Engineer)

```
DashboardPage
├── Sidebar
│   ├── LogoLockup
│   ├── NavItem[] (each: icon + label + active state)
│   └── UserSection (avatar + name + plan badge)
├── TopHeader
│   ├── PageTitle ("Dashboard")
│   ├── PeriodSelector (dropdown)
│   ├── NotificationBell (icon + badge)
│   └── UserAvatar
└── MainContent
    ├── CashFlowChart
    │   ├── KPISummaryRow (Revenue, Expenses, Net Cash)
    │   ├── AreaChart (Recharts/Chart.js)
    │   └── ExportMenu
    ├── MetricCardsRow
    │   ├── RunwayCard (gauge viz + number + status)
    │   ├── TaxReserveCard (progress bar + number + due date)
    │   └── NetCashCard (number + sparkline + delta)
    └── RecentTransactionsTable
        ├── TableHeader (search + filter)
        ├── TableRow[] (date, description, category, amount, status)
        └── ViewAllLink
```

---

## 10. Colors Reference for Dashboard

| Element                   | Color     | Hex       | Used Where                           |
|---------------------------|-----------|-----------|--------------------------------------|
| Revenue / Inflow          | Teal      | `#0D9488` | Chart line, amount text              |
| Expenses / Outflow        | Red       | `#DC2626` | Chart area, negative amounts         |
| Net Cash / Positive delta | Green     | `#059669` | Delta up arrows, healthy status      |
| Warning / Tax             | Amber     | `#D97706` | Tax reserve card, warning status     |
| Critical / Danger         | Red       | `#DC2626` | Negative cash, critical runway       |
| Text primary              | Dark Slate| `#1E293B` | Main labels, numbers                 |
| Text secondary            | Slate     | `#475569` | Sub-labels, descriptions             |
| Text muted                | Slate 400 | `#94A3B8` | Captions, placeholders               |
| Row hover                 | Light gray| `#F1F5F9` | Table row hover state                |
| Chart grid                | Light gray| `#F1F5F9` | Chart axis gridlines                 |

---

## 11. Icons (Lucide)

| Component          | Icon             |
|--------------------|------------------|
| Dashboard nav      | `LayoutDashboard` |
| Cash Flow nav      | `TrendingUp`      |
| Tax nav            | `FileText`        |
| Pricing nav        | `DollarSign`      |
| Runway nav         | `Gauge`           |
| Settings nav       | `Settings`        |
| Notification bell  | `Bell`            |
| Hamburger menu     | `Menu`            |
| Search             | `Search`          |
| Filter             | `Filter`          |
| Export             | `Download`        |
| Check (status)     | `CheckCircle`     |
| Pending (status)   | `Clock`           |
| Retry (error)      | `RefreshCw`       |
| Error icon         | `AlertCircle`     |
| View all arrow     | `ArrowRight`      |

---

## 12. Framework & Library Suggestions

| Need                | Recommendation               | Why                                                  |
|---------------------|------------------------------|------------------------------------------------------|
| Charting            | Recharts (React) or Chart.js | Lightweight, good area/sparkline/bar support         |
| Icons               | Lucide React                 | Already specified, tree-shakeable                    |
| Date handling       | date-fns                     | Lightweight date formatting                          |
| Table               | Custom or TanStack Table     | Lightweight virtual scrolling for large datasets     |
| CSS framework       | Tailwind CSS or CSS Modules  | Consistent with CSS custom properties provided       |
| Notifications       | Custom with SSE or polling   | Simple, no extra library needed                      |