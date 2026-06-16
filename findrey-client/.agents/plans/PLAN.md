# FinDrey Client Development & Migration Plan (v2.0+)

This document outlines the strategic roadmap for the **FinDrey Client** frontend, structured into iterative versions, sprints, and granular tasks.

---

## Database & Backend Recommendations

For a personal finance app, **relational database integrity** is highly critical (handling transactions, double-entry ledger bookkeeping, budgets, and accounts). 

*   **Recommended Stack**: **PostgreSQL** (via **Neon** or **Supabase** free tiers) + **Redis/DragonflyDB** for real-time WebSockets pub/sub and session/rate limiting.

---

## Roadmap, Sprints & Granular Task Breakdown

### Version 2.0: Platform Modernization & Core Stack Migration

#### Sprint 0: Local Infrastructure Setup (Docker Compose)
*   [ ] **Task 0.1**: Add a PostgreSQL 16 Alpine container to `docker-compose.yml` for persistent relational ledger data.
*   [ ] **Task 0.2**: Add a DragonflyDB (Redis-compatible) container to `docker-compose.yml` for session cache and WebSocket Pub/Sub.
*   [ ] **Task 0.3**: Wire environment variables for `go` service connecting to the local Postgres and DragonflyDB instances.

#### Sprint 1: Runtime & Styling Migration (Client)
*   [ ] **Task 1.1**: Migrate runtime and package manager from npm/yarn to **Bun** (remove `package-lock.json`, generate `bun.lockb`, update scripts).
*   [ ] **Task 1.2**: Install and configure **Tailwind CSS v4** (or version confirmed by user) and set up the CSS variable-based utility styles.
*   [ ] **Task 1.3**: Initialize **shadcn/ui** configurations (`components.json`) tailored for Bun.
*   [ ] **Task 1.4**: Configure custom theme tokens (Glassmorphism, Light/Dark mode, premium typography like Outfit or Inter).
*   [ ] **Task 1.5**: Set up base UI layouts: Navigation bar, Sidebar, App shell container.

#### Sprint 2: Next.js to TanStack Router Migration
*   [ ] **Task 2.1**: Remove Next.js app/pages structure, install and configure `@tanstack/react-router`.
*   [ ] **Task 2.2**: Configure the route tree generator (`tsr.config.json`) and configure development watch commands.
*   [ ] **Task 2.3**: Set up root route, layout routes, and public vs. private route guards.
*   [ ] **Task 2.4**: Migrate existing React/Redux/Recoil state management to TanStack Query (`@tanstack/react-query`) for API-driven state.
*   [ ] **Task 2.5**: Configure TanStack Router DevTools and Query DevTools for debugging.

---

### Version 2.1: Authentication, Profiles & Settings

#### Sprint 3: Authentication & Security
*   [ ] **Task 3.1**: Integrate **Better-Auth** client SDK on the frontend.
*   [ ] **Task 3.2**: Create the premium Sign-In / Sign-Up pages (Glassmorphic cards, custom animations).
*   [ ] **Task 3.3**: Implement Google OAuth provider authentication flow.
*   [ ] **Task 3.4**: Build route guards redirecting unauthenticated users to `/login`.
*   [ ] **Task 3.5**: Implement Session expiry handling, silent token refresh, and Log Out functionality.

#### Sprint 4: User Profile & Workspace Settings
*   [ ] **Task 4.1**: Build User Profile page (Avatar management, account details update).
*   [ ] **Task 4.2**: Implement Settings panel (select default currency, language, timezone).
*   [ ] **Task 4.3**: Integrate basic theme selector (System, Light, Dark).

---

### Version 2.2: Accounts, Transactions & Advanced Grid

#### Sprint 5: Account & Ledger Management
*   [ ] **Task 5.1**: Build Accounts Dashboard (showing Net Worth, total assets, total liabilities).
*   [ ] **Task 5.2**: Create Account Creation/Edit modals (support Asset, Expense, Revenue, and Liability categories).
*   [ ] **Task 5.3**: Build Account detail view (history of transactions for a specific account).

#### Sprint 6: Premium Transaction Data Grid
*   [ ] **Task 6.1**: Implement the compound-component base grid structure.
*   [ ] **Task 6.2**: Add resizable columns with localStorage memory.
*   [ ] **Task 6.3**: Add column sorting and multiselect filtering (by account, category, tags).
*   [ ] **Task 6.4**: Add inline-editing (double-click cell to edit category/amount) with optimistic UI updates.
*   [ ] **Task 6.5**: Add pagination and virtual scrolling (for datasets of 10,000+ items).
*   [ ] **Task 6.6**: Add CSV/JSON export and import capabilities.
*   [ ] **Task 6.7**: Add keyboard navigation, copy-paste cell values, and global undo/redo stack.

---

### Version 2.3: Budgets, Bills & Savings Goals

#### Sprint 7: Budgets & Category Limits
*   [ ] **Task 7.1**: Create Budget definition interface (monthly/weekly/custom intervals).
*   [ ] **Task 7.2**: Build Budget Progress Cards (visual progress bars, indicators for over-budget states).
*   [ ] **Task 7.3**: Build Category rules engine (auto-categorize transactions based on description/payee).

#### Sprint 8: Bills, Subscriptions & Piggy Banks
*   [ ] **Task 8.1**: Build Bills and Subscriptions calendar/dashboard (track recurring items).
*   [ ] **Task 8.2**: Implement due date alerts and expected payment status indicator.
*   [ ] **Task 8.3**: Create Piggy Banks page (savings targets, drag-and-drop money from accounts into piggy banks).

---

### Version 2.4: Real-time Collaboration, Notifications & Automation

#### Sprint 9: Family Sharing & Multi-Tenancy
*   [ ] **Task 9.1**: Build Tenant/Workspace switcher (Personal vs. Family ledgers).
*   [ ] **Task 9.2**: Create Family Invitation page (generate invite links or send emails).
*   [ ] **Task 9.3**: Implement role-based access control (Admin vs. Member permissions on transactions).

#### Sprint 10: Real-time WebSockets & Notifications
*   [ ] **Task 10.1**: Set up WebSocket client connection inside the client layout.
*   [ ] **Task 10.2**: Build interactive Notification panel (real-time updates for budget overruns, family transactions, bill due dates).
*   [ ] **Task 10.3**: Implement toast notifications for background updates.

#### Sprint 11: Rules & Transaction Automations
*   [ ] **Task 11.1**: Build automation rules UI (if payee contains "Uber", tag as "Transport").
*   [ ] **Task 11.2**: Implement bulk-update rules tester before execution.
