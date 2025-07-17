export const unitUtils = {
  // Convert ml to liters with proper formatting
  mlToLiters: (ml) => (ml / 1000).toFixed(2),

  // Convert liters to ml
  litersToMl: (liters) => liters * 1000,

  // Format volume based on user preference
  formatVolume: (ml, unit) => {
    if (unit === "L") {
      return `${unitUtils.mlToLiters(ml)}L`;
    }
    return `${ml}ml`;
  },

  // Format date for display
  formatDate: (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  },

  // Get today's date string
  getTodayString: () => {
    return new Date().toISOString().split("T")[0];
  },
};
