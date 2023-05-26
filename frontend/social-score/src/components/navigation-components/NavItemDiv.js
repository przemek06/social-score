import React from "react";

const NavItemDiv = ({path, text}) => {
    const current_nav = "font-normal text-white font-semibold text-lg pr-4 pl-4 pt-6 pb-2 bg-greenPrimary hover:bg-greenSecondary"
    const default_nav = "font-normal text-black font-semibold text-lg pr-4 pl-4 pt-6 pb-2 bg-white hover:text-gray-500"
    return (
      <div className={window.location.pathname === path ? current_nav : default_nav}>
        <a href={path}>
            {text}
        </a>
      </div>
    );
  };

export default NavItemDiv;