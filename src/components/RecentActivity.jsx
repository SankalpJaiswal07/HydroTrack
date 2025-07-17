import { useWater } from "../contexts/WaterContext";
import { Droplets, Zap, Clock } from "lucide-react";
import { unitUtils } from "../utils/helpher";

const RecentActivity = () => {
  const { intakeHistory, userSettings } = useWater();

  // Get today's entries
  const today = unitUtils.getTodayString();
  const todayEntries = intakeHistory
    .filter((entry) => entry.date === today)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-blue-500" />
        Recent Activity
      </h3>

      {todayEntries.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No activity today. Start tracking your hydration!
        </p>
      ) : (
        <div className="space-y-3">
          {todayEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {unitUtils.formatVolume(
                      entry.amount,
                      userSettings.preferredUnit
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="text-green-600">
                <Zap className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
