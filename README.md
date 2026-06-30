# Live Stream Analytics Dashboard

> A real-time analytics dashboard for live streams, built with Next.js and TypeScript. Features background data simulation for live broadcasts, dual-axis interactive charts (Recharts) for monitoring viewer metrics, and automated revenue calculation.

---

## 🚀 Features

* **Real-Time Live Simulation**: Features a custom background ticker (`useLiveStreamTicker`) that updates live broadcast metrics (CCV, Chat Rate, and Super Chat) every 5 seconds.
* **Dual-Axis Interactive Charts**: Visualizes complex data streams using Recharts, allowing simultaneous tracking of viewer counts and financial metrics across distinct time scales (15-minute windows vs. full duration).
* **Automated Revenue Calculation**: Tracks and breaks down instant and cumulative Super Chat earnings dynamically.
* **Stream Switching**: Integrated sidebar UI to instantly switch active dashboard views between live broadcasts and static past archives.

## 🛠️ Tech Stack

* **Framework**: Next.js
* **Language**: TypeScript
* **Charting Library**: Recharts
* **Styling**: CSS Modules
* **State/Logic**: Custom React Hooks

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure (Core Parts)
```text
src/
├── components/
│   ├── DashboardLayout.tsx  # Main dashboard container & layout
│   ├── Sidebar.tsx          # Stream selection menu
│   ├── StreamChart.tsx      # Dual-axis Recharts implementation
│   └── SummaryCard.tsx      # Real-time KPI summary display
├── hooks/
│   └── useLiveStreamTicker.ts # Real-time metric simulation engine
└── data/
    └── mockStreamData.ts    # Seed data for live and archived streams
```
