import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const NavLinks = () => {
  const getUser = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || storedUser === "undefined") {
      return null;
    }

    return JSON.parse(storedUser);
  };

  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };

    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const navigation = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Browse",
      path: "/search",
    },
    {
      name: "Categories",
      path: "/categories",
    },

    ...(user?.role === "owner"
      ? [
          {
            name: "Post Property",
            path: "/add-property",
          },
        ]
      : []),
  ];

  return (
    <nav className="hidden items-center gap-10 lg:flex">
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `relative text-[15px] font-medium transition-all duration-200 ${
              isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks;
