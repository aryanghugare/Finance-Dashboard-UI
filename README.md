# Finance Dashboard UI (React + Tailwind)

A clean, frontend-only finance dashboard built for an assessment. It uses **mock data**, client-side **state management**, basic **role-based UI**, lightweight **visualizations**, and **localStorage persistence**.

## Features (mapped to requirements)

### Dashboard Overview
- Summary cards: **Total Balance**, **Income**, **Expenses**
- Time-based visualization: **Balance trend** (cumulative by day)
- Categorical visualization: **Spending breakdown** (expenses by category)

### Transactions
- Table columns: Date, Description, Category, Type, Amount
- Interactions: **search**, **filter** (type/category), **sorting** (date/amount)
- Empty states for “no data / no matches”

### Role-based UI (simulated)
- Role switcher (top-right):
  - **Viewer**: read-only
  - **Admin**: can add/edit/delete transactions

### Insights
- Highest spending category
- Monthly net and month-over-month change
- Simple suggestion card

### State Management
- Context + reducer: `src/context/DashboardContext.jsx`
- Persists: role, filters, theme, transactions → **localStorage**

### UX
- Responsive layout
- **Dark mode**

## Tech stack
- React (Vite)
- Tailwind CSS

## Getting started

Install dependencies:
- `npm install`

Run dev server:
- `npm run dev`

Build:
- `npm run build`

## Project structure
- `src/pages/DashboardPage.jsx` – page composition
- `src/components/*` – UI components
- `src/context/DashboardContext.jsx` – global state + persistence
- `src/data/mockTransactions.js` – mock data
- `src/utils/*` – formatting + finance calculations

## Notes / assumptions
- Frontend-only (no backend).
- Charts are implemented as lightweight UI components (no chart library) to keep the project simple.
