import WaterProvider from "./contexts/WaterContext";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <WaterProvider>
    <Dashboard />
  </WaterProvider>
);

export default App;
