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
    {
      name: "Map",
      path: "/map",
    },

    ...(user?.role === "owner"
      ? [
          {
            name: "Post Property",
            path: "/add-property",
          },
          {
            name: "Messages",
            path: "/messages",
          },
        ]
      : []),
  ];

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `
    group
    relative
    text-[15px]
    font-medium
    transition-all
    duration-300
    ${isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"}
    `
          }
        >
          {({ isActive }) => (
            <>
              {item.name}

              <span
                className={`
          absolute
          -bottom-2
          left-0
          h-[2px]
          w-full
          bg-blue-600
          transition-transform
          duration-300
          origin-left
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks;
