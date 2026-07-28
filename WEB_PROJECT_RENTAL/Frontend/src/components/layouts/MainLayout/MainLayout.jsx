import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useLayout } from "../../../context/LayoutContext";
const MainLayout = () => {
  const location = useLocation();

  // Read state passed from navigate()
  const hideNavbar = location.state?.hideNavbar || false;

  const { showNavbar, showFooter } = useLayout();

return (
  <>
    {showNavbar && <Navbar />}

    <main>
      <Outlet />
    </main>

    {showFooter && <Footer />}
  </>
);
};

export default MainLayout;
