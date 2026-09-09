# Customer Support Dashboard

A polished and fully responsive **Customer Support Dashboard** built for a support team to view and manage customer support tickets. Built with React, TypeScript, and Tailwind CSS.

🌐 **Live Demo:** https://customer-support-dashboard-eight.vercel.app

🔗 **GitHub Repo:** https://github.com/supriya5645/customer-support-dashboard

---

## Features

### 1. Dashboard
- Stats cards at the top: **Total Tickets**, **Open**, **In Progress**, **Resolved**
- Full ticket list with: Customer name, Issue/subject, Priority, Status, Created date

### 2. Ticket Management
- 🔍 **Search** tickets by ID, subject, or customer name
- 🎛️ **Filter** by Status (Open / In Progress / Resolved)
- 🎛️ **Filter** by Priority (Low / Medium / High)
- ✏️ **Change ticket status** directly from the dashboard table

### 3. Ticket Details (Side Panel)
- Customer information (name + email)
- Full issue description
- Current status and priority
- Created date & time
- Full conversation / message history
- Ability to send replies in the conversation thread

### 4. State Management & API
- **Zustand** for global state management
- **Mock API** that simulates async network calls
- **Loading state** — spinner while tickets are fetching
- **Error state** — displays error message if fetch fails
- **Empty state** — illustrated empty screen when no tickets match filters

### 5. UI/UX
- Fully responsive — works on **desktop and mobile**
- Smooth **slide-in animation** for the side panel
- **Color-coded** priority and status badges
- Clean typography, spacing, and visual hierarchy
- Built entirely with **Tailwind CSS**
- Reusable components: `StatCard`, `TicketDetails`

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** (Vite) | Frontend framework |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling & responsive design |
| **Zustand** | State management |
| **Lucide React** | Icons |
| **date-fns** | Date formatting |

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/supriya5645/customer-support-dashboard.git
   cd customer-support-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the dashboard.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## Project Structure

```
src/
├── components/
│   └── TicketDetails.tsx   # Ticket details side panel component
├── App.tsx                 # Main dashboard page
├── store.ts                # Zustand global state store
├── api.ts                  # Mock API with simulated async data fetch
├── index.css               # Tailwind CSS entry
└── main.tsx                # App entry point
```

---

## How It Works — Application Workflow

### Data Flow
```
1. App loads
       ↓
2. App.tsx → useEffect → calls fetchTickets()
       ↓
3. api.ts → simulates 800ms network delay → returns mock tickets[]
       ↓
4. store.ts (Zustand) → stores tickets[], sets isLoading = false
       ↓
5. App.tsx re-renders → shows Stats Cards + Ticket Table
       ↓
6. User interactions update Zustand state → UI re-renders automatically
```

### User Interactions
| User Action | What Happens Internally |
|---|---|
| Type in search box | `setSearchQuery()` → `filteredTickets` recalculates → table updates |
| Select status filter | `setStatusFilter()` → `filteredTickets` recalculates → table updates |
| Select priority filter | `setPriorityFilter()` → `filteredTickets` recalculates → table updates |
| Click status dropdown on row | `updateTicketStatus()` → updates ticket in store → badge color changes |
| Click a ticket row | `setSelectedTicketId()` → TicketDetails side panel slides in |
| Send a reply in panel | `addMessage()` → new message appended to ticket → chat bubble appears |
| Click X or dark overlay | `setSelectedTicketId(null)` → side panel slides out |
| Click "Clear filters" | Resets `searchQuery`, `statusFilter`, `priorityFilter` to defaults |

### Component Roles
| Component | Responsibility |
|---|---|
| `App.tsx` | Main page — navbar, stat cards, filter bar, ticket table |
| `store.ts` | Global Zustand state — single source of truth for all data |
| `api.ts` | Data layer — mock API simulating a real async REST API call |
| `TicketDetails.tsx` | Side panel — full ticket info, status change, conversation thread |

### Zustand Store State Shape
```ts
{
  tickets[],          // all fetched ticket data
  isLoading,          // shows/hides loading spinner
  error,              // shows/hides error message
  searchQuery,        // live search input value
  statusFilter,       // current status dropdown value
  priorityFilter,     // current priority dropdown value
  selectedTicketId,   // ID of open ticket (null = panel closed)
}
```

---

## AI Usage

This project was built with the assistance of **Antigravity AI** (powered by Google Gemini / Claude Sonnet), used as a coding agent to:
- Scaffold the project structure and file layout
- Generate React components with TypeScript
- Implement Zustand state management
- Apply Tailwind CSS styling for a responsive UI
- Generate mock ticket data and conversation history
- Debug TypeScript and build errors

All code has been reviewed and understood by the author.
