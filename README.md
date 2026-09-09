# Customer Support Dashboard

A simple and responsive Customer Support Dashboard built with React, TypeScript, and Tailwind CSS. State management is handled with Zustand.

## Features
- **Dashboard Stats**: View Total, Open, In Progress, and Resolved ticket counts.
- **Ticket List**: Browse tickets with details such as customer name, priority, status, and creation date.
- **Search & Filters**: Search tickets by text, and filter by status and priority.
- **Status Updates**: Quickly change a ticket's status from the dashboard list or inside the details view.
- **Ticket Details Side Panel**: View full customer info, issue description, and interact in a mocked conversation thread.
- **Mock API Integration**: Simulates an async API call with loading and error states.

## Tech Stack
- **React 18** (Vite)
- **TypeScript**
- **Tailwind CSS** (Styling & Responsive Design)
- **Zustand** (State Management)
- **Lucide React** (Icons)
- **date-fns** (Date Formatting)

## Setup Instructions

1. **Clone the repository** (or download the source):
   ```bash
   cd dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173` to view the dashboard.

## AI Usage
- **Antigravity (Gemini 3.1 Pro / GPT-OSS 120B)**: Used as a coding agent to scaffold the project structure, generate the React components, implement state management using Zustand, and apply Tailwind CSS styling for a responsive UI. The agent was also used to generate the mock data and create this README file.
