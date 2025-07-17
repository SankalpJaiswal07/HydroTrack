import ProgressRing from "./ProgressRing";
import { Award, Droplets } from "lucide-react";
import { useWater } from "../contexts/WaterContext";
import { unitUtils } from "../utils/helpher";

const DailyProgressBar = () => {
  const { getTodayIntake, userSettings } = useWater();

  const todayIntake = getTodayIntake();
  const progressPercentage = Math.min(
    (todayIntake / userSettings.dailyGoal) * 100,
    100
  );
  const isGoalMet = todayIntake >= userSettings.dailyGoal;
  const remaining = Math.max(userSettings.dailyGoal - todayIntake, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Today's Progress
        </h3>
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-600">
            {unitUtils.formatVolume(todayIntake, userSettings.preferredUnit)} /{" "}
            {unitUtils.formatVolume(
              userSettings.dailyGoal,
              userSettings.preferredUnit
            )}
          </span>
        </div>
      </div>

      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
          <div
            className={`h-6 rounded-full transition-all duration-700 ease-out ${
              isGoalMet
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-blue-500 to-blue-600"
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progressPercentage)}% Complete
          </span>

          {isGoalMet ? (
            <div className="flex items-center gap-1 text-green-600">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Goal Achieved!</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">
              {unitUtils.formatVolume(remaining, userSettings.preferredUnit)}{" "}
              remaining
            </span>
          )}
        </div>
      </div>

      {/* Mobile Progress Ring */}
      <div className="md:hidden flex flex-col items-center">
        <ProgressRing percentage={progressPercentage} />
        <div className="mt-4 text-center">
          {isGoalMet ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Award className="w-5 h-5" />
              <span className="font-medium">Goal Achieved!</span>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {unitUtils.formatVolume(remaining, userSettings.preferredUnit)}{" "}
              remaining
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyProgressBar;
