"use client";
import React, { useEffect, useState } from "react";

import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  animate,
  stagger,
} from "framer-motion";

import { BsStarFill } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
// import { useCalEmbed } from "@/app/hooks/useCalEmbed";
// import { CONSTANTS } from "@/constants/links";

export function CTA() {
  // Animación base para los textos de la CTA
  const textAnimationProps = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 }, // Animar cuando el 30% sea visible
    transition: { duration: 0.6, ease: "circOut" },
  };

  // Animación para el botón
  const buttonAnimationProps = {
    initial: { opacity: 0, scale: 0.8, y: 10 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: "backOut", delay: 0.3 }, // Pequeño delay para el botón
  };

  return (
    <div
      id="contact"
      className="px-4 w-full md:px-8 bg-white dark:bg-neutral-950 py-20 overflow-hidden" // Añadido overflow-hidden
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center w-full gap-8 md:gap-12">
        {/* Contenedor para el texto, ajustado para mejor layout */}
        <div className="flex flex-col md:w-2/3 text-center md:text-left">
          <motion.h2
            {...textAnimationProps} // Aplicando props de animación
            // La clase original ya es de motion.h2, solo añadimos las props de animación
            className="text-black dark:text-white text-2xl sm:text-xl md:text-3xl font-bold mx-auto md:mx-0 max-w-xl"
          >
            Conecta con Nuestro Equipo<br />
            Lleva tu Agricultura al Siguiente Nivel.
          </motion.h2>
          <motion.p // Convertido a motion.p y animado
            {...textAnimationProps}
            transition={{ ...textAnimationProps.transition, delay: 0.15 }} // Ligero delay para el párrafo
            className="max-w-md mt-5 md:mt-6 text-sm md:text-base mx-auto md:mx-0 text-neutral-600 dark:text-neutral-400"
          >
            ¿Listo para transformar tu operación agrícola? Agenda una llamada con nosotros y descubre cómo GeoHarvest puede ayudarte a maximizar el potencial de tus cultivos y optimizar tus decisiones.
          </motion.p>
          {/* FeaturedImages sigue comentado como en tu original */}
          {/* <FeaturedImages
            textClassName="lg:text-left text-center"
            className="lg:justify-start justify-start items-center"
            containerClassName="md:items-start"
          /> */}
        </div>
        
        {/* Botón/Enlace "Agendar" animado */}
        <motion.a // Convertido a motion.a y animado
          href="mailto:support@geoharvest.org"
          {...buttonAnimationProps}
          className="flex-shrink-0 mt-6 md:mt-0 flex space-x-2 items-center group text-base px-6 py-3 sm:px-5 sm:py-2.5 rounded-lg bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] transition-transform duration-150 ease-in-out hover:scale-105"
        >
          <span>Agendar</span>
          <HiArrowRight className="text-white group-hover:translate-x-1 stroke-[1px] h-4 w-4 sm:h-3 sm:w-3 mt-0.5 transition-transform duration-200" />
        </motion.a>
      </div>
    </div>
  );
}

export const FeaturedImages = ({
  textClassName,
  className,
  showStars = false,
  containerClassName,
}: {
  textClassName?: string;
  className?: string;
  showStars?: boolean;
  containerClassName?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  useEffect(() => {
    animate(
      ".animation-container",
      {
        scale: [1.1, 1, 0.9, 1],
        opacity: [0, 1],
      },
      { duration: 0.4, delay: stagger(0.1) }
    );
  }, []);
  return (
    <div
      className={cn(
        "flex flex-col items-center mt-10 mb-10",
        containerClassName
      )}
    >
      <div
        className={cn(
          "flex flex-col sm:flex-row items-center justify-center mb-2",
          className
        )}
      >
        <div className="flex flex-row items-center mb-4 sm:mb-0">
          {testimonials.map((testimonial, idx) => (
            <div
              className="-mr-4  relative group"
              key={testimonial.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 160,
                        damping: 20,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{
                      translateX: translateX,

                      whiteSpace: "nowrap",
                    }}
                    className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-neutral-900 z-50 shadow-xl px-4 py-2"
                  >
                    <div className="absolute inset-x-0 z-30 w-[20%] mx-auto -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                    <div className="absolute inset-x-0 w-[70%] mx-auto z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-white relative z-30 text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-neutral-300 text-xs px-1 py-0.5 rounded-sm bg-neutral-950">
                        {testimonial.designation}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="animation-container">
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    rotate: `${Math.random() * 15 - 5}deg`,
                    scale: 1,
                    opacity: 1,
                  }}
                  whileHover={{
                    scale: 1.05,
                    zIndex: 30,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="rounded-2xl overflow-hidden border-2  border-neutral-200  relative"
                >
                  <img
                    onMouseMove={handleMouseMove}
                    height={100}
                    width={100}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover object-top  h-14 w-14 "
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center ml-6">
          {[...Array(5)].map((_, index) => (
            <BsStarFill
              key={index}
              // className={showStars ? "h-4 w-4 text-yellow-400 mx-1" : "hidden"}
              className={showStars ? "h-4 w-4 text-yellow-400 mx-1" : "hidden"}
            />
          ))}
        </div>
      </div>
      <p
        className={cn(
          "text-neutral-400 text-sm text-left  relative z-40",
          textClassName
        )}
      >
        {/* Confiado por 27,000+ Agricultores */}
        Con el apoyo del @Tecnológico de Monterrey
      </p>
    </div>
  );
};

const testimonials = [
  {
    name: "Jorge Coronado",
    designation: "CTO",
    image:
      "/images/jorge.jpeg",
  },
  {
    name: "Jesús Medina",
    designation: "Product Manager",
    image:
      "/images/Medina.png",
  }
];
