import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layouts/MainLayout/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout/AuthLayout";

import Home from "../pages/Home";
import Search from "../pages/Search";
import PropertyDetails from "../pages/PropertyDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Saved from "../pages/Saved";
import Profile from "../pages/Profile";
import AddProperty from "../pages/AddProperty";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login & Register (No Navbar/Footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Main Website (With Navbar/Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-property" element={<AddProperty />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
