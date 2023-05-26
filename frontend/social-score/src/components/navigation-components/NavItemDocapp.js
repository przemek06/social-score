import React from "react";

const NavItemDocapp = ({path, text}) => {
    const style = "font-normal text-black font-semibold text-2xl pr-4 pl-4 pt-6 pb-2 hover:text-pink-400"
    return (
      <div className={style}>
        <a href={path}>
            {text}
        </a>
      </div>
    );
  };

export default NavItemDocapp;