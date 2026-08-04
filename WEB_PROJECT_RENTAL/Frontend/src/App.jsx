import AppRoutes from "./routes/AppRoutes";
import { useEffect, useState } from "react";
import SplashScreen from "./components/common/SplashScreen";


function App() {

  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("splashShown");
  });

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("splashShown", "true");
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [loading]);
  if (loading) {
  return <SplashScreen />;
}

  return <AppRoutes />;
}

export default App;
