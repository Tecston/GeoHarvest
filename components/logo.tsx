"use client";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
      <img
        src="/images/Logo.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">GeoHarvest</span>
    </Link>
  );
};
