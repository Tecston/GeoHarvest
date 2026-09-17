import { Link } from "react-router-dom";
import React from "react";
import { Logo } from "./logo";

export function Footer() {
  const pages = [
    {
      title: "Inicio",
      href: "#",
    },
    {
      title: "Soluciones",
      href: "#",
    },
    {
      title: "Precio",
      href: "#",
    },
    {
      title: "Contacto",
      href: "#",
    }
  ];

  const socials = [
    {
      title: "Facebook",
      href: "#",
    },
    {
      title: "Instagram",
      href: "#",
    },
    {
      title: "Twitter",
      href: "#",
    },
    {
      title: "LinkedIn",
      href: "#",
    },
  ];
  const legals = [
    {
      title: "Términos y Condiciones",
      href: "#",
    },
    {
      title: "Términos de Servicio",
      href: "#",
    },
    {
      title: "Política de Privacidad",
      href: "#",
    },
  ];

  const signups = [
    {
      title: "Registrarse",
      href: "/register",
    },
    {
      title: "Login",
      href: "/login",
    },
    // {
    //   title: "Demo",
    //   href: "#",
    // },
  ];
  return (
    <div className=" dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-neutral-950 w-full relative overflow-hidden">
      
      <p className="text-center uppercase mt-9  text-[clamp(2rem,10vw,13rem)] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-neutral-50 dark:from-neutral-50 dark:to-black inset-x-0">
        GeoHarvest
      </p>
      {/* <p className="text-center uppercase mt-9  text-[clamp(2rem,10vw,13rem)] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0"> */}

      <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-center items-start  md:px-8">
        <div>
          

          <div className="mt-2 ml-2">
            &copy; copyright GeoHarvest 2026. All rights reserved.
          </div>
        </div>
        

          
          {/* <div className="flex justify-center space-y-4 flex-col">
            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
              Legal
            </p>
            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
              {legals.map((legal, idx) => (
                <li key={"legal" + idx} className="list-none">
                  <Link
                    className="transition-colors hover:text-text-neutral-800 "
                    to={legal.href}
                  >
                    {legal.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          
      </div>
      
    </div>
  );
}
