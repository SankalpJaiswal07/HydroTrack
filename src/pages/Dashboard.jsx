import { useState } from "react";
import { useWater } from "../contexts/WaterContext";
import RecentActivity from "../components/RecentActivity";
import QuickAddButtons from "../components/QuickAddButtons";
import AddWaterForm from "../components/AddWaterForm";
import DailyProgressBar from "../components/DailyProgressBar";
import WeeklyChart from "../components/WeeklyChart";
import SettingsModal from "./Settings";
import StatsCard from "../components/StatsCard";
import { unitUtils } from "../utils/helpher";
import {
  Droplets,
  Settings,
  TrendingUp,
  Target,
  Award,
  Zap,
  Waves,
} from "lucide-react";

const Dashboard = () => {
  const { getTodayIntake, userSettings, getCurrentStreak, getWeeklyData } =
    useWater();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const todayIntake = getTodayIntake();
  const currentStreak = getCurrentStreak();
  const weeklyData = getWeeklyData();
  const avgIntake = weeklyData.reduce((sum, day) => sum + day.intake, 0) / 7;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HydroTrack</h1>
                <p className="text-sm text-gray-500">
                  Stay hydrated, stay healthy
                </p>
              </div>
            </div>

            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Today's Intake"
            value={unitUtils
              .formatVolume(todayIntake, userSettings.preferredUnit)
              .replace(/ml|L/, "")}
            unit={userSettings.preferredUnit}
            icon={Droplets}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Daily Goal"
            value={unitUtils
              .formatVolume(userSettings.dailyGoal, userSettings.preferredUnit)
              .replace(/ml|L/, "")}
            unit={userSettings.preferredUnit}
            icon={Target}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatsCard
            title="Current Streak"
            value={currentStreak}
            unit="days"
            icon={Award}
            color="bg-gradient-to-r from-yellow-500 to-orange-500"
          />
          <StatsCard
            title="Weekly Average"
            value={Math.round(avgIntake)}
            unit="ml"
            icon={TrendingUp}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Bar */}
            <DailyProgressBar />

            {/* Quick Add Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-500" />
                Quick Add
              </h3>
              <QuickAddButtons />
            </div>

            {/* Manual Add Form */}
            <AddWaterForm />

            {/* Weekly Chart */}
            <WeeklyChart />
          </div>

          {/* Right Column - Recent Activity */}
          <div className="space-y-6">
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
