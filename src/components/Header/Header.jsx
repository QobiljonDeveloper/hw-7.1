import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#4c9adf]">
          MyShop
        </Link>

        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[#5DA4E3] ${
                isActive ? "text-[#5DA4E3] font-semibold" : ""
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `hover:text-blue-400 ${
                isActive ? "text-blue-400 font-semibold" : ""
              }`
            }
          >
            User
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
