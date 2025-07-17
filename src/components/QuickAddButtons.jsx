import { useState } from "react";
import { useWater } from "../contexts/WaterContext";
import { Plus } from "lucide-react";

const QuickAddButtons = () => {
  const { addWaterIntake, userSettings } = useWater();
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickAdd = async (amount) => {
    setIsLoading(true);
    try {
      await addWaterIntake(amount, userSettings.preferredUnit);
    } catch (error) {
      console.error("Failed to add quick intake:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define quick add amounts based on user's preferred unit
  const quickAmounts =
    userSettings.preferredUnit === "L"
      ? [
          { amount: 0.25, label: "250ml" },
          { amount: 0.5, label: "500ml" },
          { amount: 0.75, label: "750ml" },
          { amount: 1, label: "1L" },
        ]
      : [
          { amount: 250, label: "250ml" },
          { amount: 500, label: "500ml" },
          { amount: 750, label: "750ml" },
          { amount: 1000, label: "1L" },
        ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {quickAmounts.map(({ amount, label }) => (
        <button
          key={amount}
          onClick={() => handleQuickAdd(amount)}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4 inline mr-1" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default QuickAddButtons;
