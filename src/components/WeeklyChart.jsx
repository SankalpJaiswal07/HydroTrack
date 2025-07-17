import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { unitUtils } from "../utils/helpher";
import { useWater } from "../contexts/WaterContext";
import { BarChart3 } from "lucide-react";

const WeeklyChart = () => {
  const { getWeeklyData, userSettings } = useWater();
  const weeklyData = getWeeklyData();

  const chartData = weeklyData.map((day) => ({
    date: unitUtils.formatDate(day.date),
    intake: day.intake,
    goal: day.goal,
    percentage: day.percentage,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
          Weekly Overview
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Intake</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span>Goal</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip
              formatter={(value, name) => [
                unitUtils.formatVolume(value, userSettings.preferredUnit),
                name === "intake" ? "Intake" : "Goal",
              ]}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="intake" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="goal" fill="#4ADE80" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default WeeklyChart;
