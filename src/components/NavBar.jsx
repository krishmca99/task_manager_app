import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="pt-4">
      <div className="rounded-t-md py-4 px-6 mx-auto w-[95%] bg-[#002a54] shadow md:max-w-7xl lg:max-w-7xl">
        <h1 className="text-2xl text-center  font-semibold text-white">Task Manager App</h1>
      </div>
    </nav>
  );
};

export default NavBar;
