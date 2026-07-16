import { NavLink } from "react-router-dom";

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
];

const NavLinks = () => {
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
