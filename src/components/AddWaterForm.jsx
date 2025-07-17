import { useState } from "react";
import { Droplets } from "lucide-react";
import { useWater } from "../contexts/WaterContext";

const AddWaterForm = () => {
  const { addWaterIntake, userSettings } = useWater();
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState(userSettings.preferredUnit);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      await addWaterIntake(parseFloat(amount), unit);
      setAmount("");
    } catch (error) {
      console.error("Failed to add intake:", error);
      alert("Failed to add water intake. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <Droplets className="w-5 h-5 mr-2 text-blue-500" />
        Custom Amount
      </h3>

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter amount"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            min="0"
          />
        </div>

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
        >
          <option value="ml">ml</option>
          <option value="L">L</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !amount}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg cursor-pointer"
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};
export default AddWaterForm;
