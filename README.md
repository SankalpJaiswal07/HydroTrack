# HydroTrack - Water Intake Tracker

A fully-featured, responsive water intake tracker built with **React + Vite**, **TailwindCSS**, and **Supabase**. Designed with a clean, modern UI, this app helps users stay hydrated by setting daily goals, tracking intake, and monitoring weekly progress — all with real-time visual feedback and persistent data storage.

## 🚀 Features

### Core Features

- **Water Intake Logging**: Add water consumption with custom amounts or quick-add buttons
- **Daily Goal Tracking**: Configurable daily goals with visual progress indicators
- **Progress Visualization**: Real-time progress bars (desktop) and circular progress rings (mobile)
- **Data Persistence**: All data stored in Supabase database with real-time synchronization

### Advanced Features

- **Multi-unit Support**: Switch between milliliters (ml) and liters (L)
- **Quick Add Buttons**: Pre-configured amounts (250ml, 500ml, 750ml, 1L)
- **Weekly Analytics**: Interactive charts showing 7-day intake patterns
- **Streak Tracking**: Monitor consecutive days of goal achievement
- **Recent Activity**: Real-time feed of today's water intake entries
- **Responsive Design**: Optimized for mobile and desktop experiences

## 🛠️ Technology Stack

- **Frontend**: React 18 with hooks and Context API
- **Backend**: Supabase (PostgreSQL database with real-time capabilities)
- **Styling**: Tailwind CSS for responsive, modern UI
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AddWaterForm.jsx     # Custom water amount input
│   ├── DailyProgressBar.jsx # Progress visualization
│   ├── ProgressRing.jsx     # Circular progress for mobile
│   ├── QuickAddButtons.jsx  # Pre-configured amount buttons
│   ├── RecentActivity.jsx   # Today's intake history
│   ├── StatsCard.jsx        # Metric display cards
│   └── WeeklyChart.jsx      # 7-day intake visualization
├── contexts/            # React Context for state management
│   └── WaterContext.jsx     # Global water intake state
├── pages/               # Main application pages
│   ├── Dashboard.jsx        # Main dashboard interface
│   └── Settings.jsx         # User preferences modal
├── service/             # External service integrations
│   └── supabase.js          # Database operations
└── utils/               # Helper functions
    └── helpher.js           # Unit conversion and formatting

```

## 🗄️ Database Schema

### water_intake table

- `id`: Primary key
- `amount`: Water amount in ml
- `date`: Date of intake (YYYY-MM-DD)
- `timestamp`: Exact time of entry

### user_settings table

- `id`: Primary key
- `dailyGoal`: Target daily intake in ml
- `preferredUnit`: Display unit preference (ml/L)

## 🎨 Design Principles

### User Experience

- **Intuitive Interface**: Clean, modern design with clear visual hierarchy
- **Responsive Layout**: Adapts seamlessly between desktop and mobile
- **Visual Feedback**: Immediate progress updates and success indicators
- **Accessibility**: Proper contrast ratios and semantic HTML

### Technical Architecture

- **Component-Based**: Modular, reusable components
- **Centralized State**: Context API for global state management
- **Error Handling**: Comprehensive error handling with user feedback
- **Performance**: Optimized renders and efficient data fetching

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+ or higher)
- Supabase account and project

### Installation

```bash

# 1. Clone the repo
git  clone  https://github.com/your-username/HydroTrack.git
cd  HydroTrack

# 2. Install dependencies
npm  install

# 3. Set up environment variables
# Create a .env file in the root and add the following:

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# 4. Run the development server
npm  run  dev
```

### Database Setup

Create the following tables in your Supabase project:

```sql
-- Water intake entries
CREATE TABLE water_intake (
  id SERIAL PRIMARY KEY,
  amount INTEGER NOT NULL,
  date DATE NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- User settings
CREATE TABLE user_settings (
  id SERIAL PRIMARY KEY,
  daily_goal INTEGER DEFAULT 2000,
  preferred_unit VARCHAR(10) DEFAULT 'ml'
);

```

## 💡 Key Implementation Decisions

### State Management

- **Context API**: Chosen over Redux for simplicity and built-in React integration
- **Local State**: Component-level state for UI interactions and forms
- **Real-time Updates**: Immediate state updates for responsive user experience

### Data Architecture

- **Normalized Storage**: All volumes stored in ml for consistency
- **Display Conversion**: Runtime conversion based on user preference
- **Date Handling**: ISO date strings for reliable date comparisons

### Performance Optimizations

- **Efficient Renders**: Proper dependency arrays in useEffect hooks
- **Minimal Re-renders**: Strategic state organization to prevent unnecessary updates
- **Responsive Design**: CSS-based responsive behavior without JavaScript
