import { createContext, useContext, useEffect, useState } from "react";
import {
  getIntakeHistory,
  getUserSettings,
  addIntakeEntry,
  updateUserSettings,
} from "../service/supabase";
import { unitUtils } from "../utils/helpher";

const WaterContext = createContext();

const WaterProvider = ({ children }) => {
  const [intakeHistory, setIntakeHistory] = useState([]);
  const [userSettings, setUserSettings] = useState({
    dailyGoal: 2000,
    preferredUnit: "ml",
  });
  const [loading, setLoading] = useState(true);

  // Load user data on app initialization
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const [history, settings] = await Promise.all([
          getIntakeHistory(),
          getUserSettings(),
        ]);

        setIntakeHistory(history);
        setUserSettings(settings);
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Add new water intake entry
  const addWaterIntake = async (amount, unit = "ml") => {
    try {
      // Convert everything to ml for consistent storage
      const amountInMl = unit === "L" ? unitUtils.litersToMl(amount) : amount;

      const entry = await addIntakeEntry({
        amount: amountInMl,
        date: unitUtils.getTodayString(),
      });

      // Update local state
      setIntakeHistory((prev) => [...prev, entry]);
      return entry;
    } catch (error) {
      console.error("Failed to add water intake:", error);
      throw error;
    }
  };

  // Update user settings
  const updateSettings = async (newSettings) => {
    try {
      const updatedSettings = await updateUserSettings(newSettings);
      setUserSettings(updatedSettings);
      return updatedSettings;
    } catch (error) {
      console.error("Failed to update settings:", error);
      throw error;
    }
  };

  // Calculate today's total intake
  const getTodayIntake = () => {
    const today = unitUtils.getTodayString();
    return intakeHistory
      .filter((entry) => entry.date === today)
      .reduce((total, entry) => total + entry.amount, 0);
  };

  // Get intake data for the last 7 days
  const getWeeklyData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];

      const dayIntake = intakeHistory
        .filter((entry) => entry.date === dateString)
        .reduce((total, entry) => total + entry.amount, 0);

      last7Days.push({
        date: dateString,
        intake: dayIntake,
        goal: userSettings.dailyGoal,
        percentage: Math.round((dayIntake / userSettings.dailyGoal) * 100),
      });
    }
    return last7Days;
  };

  const getCurrentStreak = () => {
    const weeklyData = getWeeklyData();
    let streak = 0;

    // Start from yesterday if today's percentage is less than 100
    let startIndex = weeklyData.length - 1;
    if (weeklyData[startIndex].percentage < 100) {
      startIndex--; // skip today
    }

    for (let i = startIndex; i >= 0; i--) {
      if (weeklyData[i].percentage >= 100) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const value = {
    intakeHistory,
    userSettings,
    loading,
    addWaterIntake,
    updateSettings,
    getTodayIntake,
    getWeeklyData,
    getCurrentStreak,
  };

  return (
    <WaterContext.Provider value={value}>{children}</WaterContext.Provider>
  );
};

export default WaterProvider;

const useWater = () => {
  const context = useContext(WaterContext);
  if (!context) {
    throw new Error("useWater must be used within a WaterProvider");
  }
  return context;
};
// eslint-disable-next-line react-refresh/only-export-components
export { useWater };
