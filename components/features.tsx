"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe"; // Aunque no se usa en Features, lo mantengo como en tu original
import { motion, AnimatePresence } from "framer-motion";

const featuresData = [
  {
    id: 1,
    title: "Monitoreo Global en Tiempo Real",
    description: "Observa cada detalle de tus cultivos desde cualquier lugar. Con tecnología avanzada de sensores y monitoreo satelital, te brindamos una visión completa del estado de tus terrenos y cultivos.",
    imageSrc: "/images/agricultor.png",
  },
  {
    id: 2,
    title: "Trazabilidad completa del campo al cliente",
    description: "Seguimiento de todo el proceso para mayor transparencia, desde la siembra hasta la entrega, garantizando calidad y confianza.",
    imageSrc: "/images/reporte-planta.png", 
  },
  {
    id: 3,
    title: "Análisis y Predicciones a tu Alcance",
    description: "Accede a predicciones detalladas y análisis profundos que te ayudarán a anticipar tendencias, maximizar la rentabilidad y tomar decisiones informadas. Con GeoHarvest, conviertes datos en estrategias efectivas.",
    imageSrc: "/images/evaluacion.png",
  },
];

// Animación base para la mayoría de los elementos
const defaultAnimationProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 }, // amount: 0.3 para que se active cuando el 30% sea visible
};

export function Features() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === featuresData.length - 1 ? 0 : prevIndex + 1
        ),
      5000 // Cambia cada 5 segundos
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const currentFeature = featuresData[currentIndex];

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div
      id="features"
      className="w-full mx-auto bg-white dark:bg-neutral-950 py-20 px-4 md:px-8 overflow-hidden" // Añadido overflow-hidden para evitar scrollbars por animaciones x
    >
      <Header> {/* El componente Header ya tiene su propia animación whileInView */}
        <motion.h2
          {...defaultAnimationProps}
          transition={{ ...defaultAnimationProps.transition, delay: 0.1 }}
          className="font-sans text-xl text-center md:text-4xl w-fit mx-auto font-bold tracking-tight text-neutral-800 dark:text-neutral-100"
        >
          Soluciones Inteligentes para el Futuro Agrícola
        </motion.h2>
      </Header>
      <motion.p
        {...defaultAnimationProps}
        transition={{ ...defaultAnimationProps.transition, delay: 0.2 }}
        className="max-w-lg text-sm text-neutral-600 text-center mx-auto mt-4 dark:text-neutral-400"
      >
        Cultiva con facilidad, nosotros nos encargamos del resto.
      </motion.p>
      
      <motion.div // Contenedor para el título y descripción de la característica actual
        {...defaultAnimationProps}
        transition={{ ...defaultAnimationProps.transition, delay: 0.3 }}
        className="w-full max-w-md mx-auto text-center my-8 h-24"
      >
        <AnimatePresence mode="wait">
          <motion.h3
            key={`${currentFeature.id}-title`}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4 }} // Duración más corta para el cambio de texto
            className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2"
          >
            {currentFeature.title}
          </motion.h3>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={`${currentFeature.id}-description`}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, delay: 0.1 }} // Duración más corta para el cambio de texto
            className="text-neutral-600 dark:text-neutral-400 text-sm"
          >
            {currentFeature.description}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <motion.div // Contenedor para el mockup del teléfono
        initial={{ opacity: 0, scale: 0.9, y:50 }}
        whileInView={{ opacity: 1, scale: 1, y:0 }}
        viewport={{ once: true, amount: 0.2 }} // amount:0.2 ya que el teléfono es alto
        transition={{ duration: 0.7, ease: "circOut", delay: 0.4 }}
        className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[550px] w-[280px] shadow-xl isolate"
      >
        <div className="h-[36px] w-[3px] bg-gray-800 absolute -left-[13px] top-[64px] rounded-l-lg"></div>
        <div className="h-[36px] w-[3px] bg-gray-800 absolute -left-[13px] top-[122px] rounded-l-lg"></div>
        <div className="h-[52px] w-[3px] bg-gray-800 absolute -right-[13px] top-[100px] rounded-r-lg"></div>

        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-neutral-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex} // La key aquí es importante para que AnimatePresence detecte el cambio
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={currentFeature.imageSrc}
                alt={currentFeature.title}
                width={260} 
                height={530}
                className="object-cover object-top w-full h-full" // object-cover para llenar el espacio
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div // Contenedor para los puntos de navegación con stagger
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.7 }} // Stagger y delay para que aparezcan después del teléfono
        className="flex justify-center space-x-2 mt-8"
      >
        {featuresData.map((_, index) => (
          <motion.button
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1 }
            }}
            onClick={() => {
              setCurrentIndex(index);
              resetTimeout(); 
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-colors duration-300",
              currentIndex === index ? "bg-sky-500" : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
            )}
            aria-label={`Go to feature ${index + 1}`}
          />
        ))}
      </motion.div>
    </div>
  );
}

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-fit mx-auto p-4 flex items-center justify-center">
      <motion.div
        initial={{
          width: 0,
          height: 0,
          borderRadius: "100%", // Empezar como un punto
        }}
        whileInView={{
          width: "100%",
          height: "100%",
          borderRadius: "0.75rem", // tailwind's rounded-lg
        }}
        viewport={{ once: true, amount: 0.5 }} // Asegura que la animación del borde solo ocurra una vez
        style={{
          transformOrigin: "center", // Origen de la transformación en el centro para expandir
        }}
        transition={{
          duration: 0.8, // Duración ajustada
          ease: "circOut", // Un ease más suave
        }}
        className="absolute inset-0 h-full border border-neutral-200 dark:border-neutral-800 w-full"
      >
        {/* Los puntos de las esquinas se animarán cuando el motion.div padre se anime */}
        {[
          { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, delay: 0.6 }, className: "absolute -top-1 -left-1 h-2 w-2 dark:bg-neutral-100 bg-neutral-800 rounded-full" },
          { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, delay: 0.7 }, className: "absolute -top-1 -right-1 h-2 w-2 dark:bg-neutral-100 bg-neutral-800 rounded-full" },
          { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, delay: 0.8 }, className: "absolute -bottom-1 -left-1 h-2 w-2 dark:bg-neutral-100 bg-neutral-800 rounded-full" },
          { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, delay: 0.9 }, className: "absolute -bottom-1 -right-1 h-2 w-2 dark:bg-neutral-100 bg-neutral-800 rounded-full" },
        ].map((dot, index) => (
          <motion.div key={index} {...dot} />
        ))}
      </motion.div>
      {children}
    </div>
  );
};

// Skeletons

export const SkeletonOne = () => {
  const Container = ({
    children,
    ...props
  }: { children: React.ReactNode } & React.ComponentProps<
    typeof motion.div
  >) => {
    return (
      <motion.div
        {...props}
        className={cn(
          "w-full h-14 md:h-40 p-2 rounded-lg relative shadow-lg flex items-center bg-gradient-to-b from-white to-white dark:from-neutral-800 dark:to-neutral-700 justify-center",
          props.className
        )}
      >
        {children}
      </motion.div>
    );
  };
  return (
    <div className="relative flex items-center justify-center  w-full h-full">
      <svg
        width="128"
        height="69"
        viewBox="0 0 128 69"
        fill="none"
        className="absolute left-1/2 -translate-x-[90%]  -top-2 text-neutral-200 dark:text-neutral-800"
      >
        <path
          d="M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75"
          stroke="currentColor"
          strokeWidth="1"
        />
        <motion.path
          d="M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75"
          stroke="url(#gradient-2)"
          strokeWidth="1"
        />

        <defs>
          <motion.linearGradient
            initial={{
              x1: "0%",
              y1: "0%",
              x2: "0%",
              y2: "0%",
            }}
            animate={{
              x1: "100%",
              y1: "90%",
              x2: "120%",
              y2: "120%",
            }}
            id="gradient-2"
            transition={{
              duration: Math.random() * (7 - 2) + 2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <stop stopColor="#001AFF" stopOpacity={`0`} />
            <stop offset="1" stopColor="#6DD4F5" />
            <stop offset="1" stopColor="#6DD4F5" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="62"
        height="105"
        viewBox="0 0 62 105"
        fill="none"
        className="absolute left-1/2 -translate-x-0  -bottom-2 dark:text-neutral-800 text-neutral-200"
      >
        <path
          d="M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105"
          stroke="currentColor"
          strokeWidth="1"
        />
        <motion.path
          d="M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105"
          stroke="url(#gradient-1)"
          strokeWidth="1"
        />
        <defs>
          <motion.linearGradient
            initial={{
              x1: "0%",
              y1: "0%",
              x2: "0%",
              y2: "0%",
            }}
            animate={{
              x1: "100%",
              y1: "90%",
              x2: "120%",
              y2: "120%",
            }}
            id="gradient-1"
            transition={{
              duration: Math.random() * (7 - 2) + 2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <stop stopColor="#001AFF" stopOpacity={`0`} />
            <stop offset="1" stopColor="#6DD4F5" />
            <stop offset="1" stopColor="#6DD4F5" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto w-full relative z-30 [perspective:1000px] [transform-style:preserve-3d] p-8 sm:p-0">
        {/* <Container
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0], rotateX: [0, 10, 0] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 6,
          }}
          className="overflow-hidden px-2 flex-col justify-center font-mono items-start text-neutral-800 dark:text-neutral-300"
        >
          <p className="text-[8px] bg-transparent ">git add .</p>
          <p className="text-[8px] bg-transparent">
            git commit -m &quot;update&quot;
          </p>
          <p className="text-[8px] bg-transparent">git push</p>
        </Container> */}
        <Container
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0], rotateX: [0, 10, 0] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 6,
          }}
        >
          <GitHubLogo  />
        </Container>
        <Container
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0], rotateX: [0, 10, 0] }}
          transition={{
            duration: 2,
            delay: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 6,
          }}
        >
          <GitHubLogo />
        </Container>
        <Container
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0], rotateX: [0, 10, 0] }}
          transition={{
            duration: 2,
            delay: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 6,
          }}
        >
          <GitHubLogo />
        </Container>
        {/* <Container
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0], rotateX: [0, 10, 0] }}
          transition={{
            duration: 2,
            delay: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 6,
          }}
          className="flex flex-col justify-center items-center"
        >
          <AWSLogo />
          <p className="text-[8px] bg-transparent ">your site is live ✨</p>
        </Container> */}
      </div>
    </div>
  );
};

const GitHubLogo = () => {
  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="503.000000pt" height="218.000000pt" viewBox="0 0 503.000000 218.000000" preserveAspectRatio="xMidYMid meet" className="w-full max-h-full h-auto">

      <g transform="translate(0.000000,218.000000) scale(0.100000,-0.100000)" fill="#FF0000" stroke="none">
        <path d="M4625 2170 c3 -5 11 -10 16 -10 6 0 7 5 4 10 -3 6 -11 10 -16 10 -6 0 -7 -4 -4 -10z"/>
        <path d="M4445 2144 c-55 -12 -595 -165 -1200 -339 -605 -173 -1109 -317 -1119 -320 -40 -9 -201 -58 -205 -61 -3 -2 10 -18 27 -35 l32 -32 624 178 624 178 -2 31 c-1 27 2 31 24 31 20 0 25 -5 24 -23 -1 -19 3 -22 20 -18 12 3 24 6 28 6 4 0 8 15 10 33 2 26 8 33 30 35 22 3 29 -2 34 -22 7 -28 25 -26 61 7 15 14 30 18 50 14 49 -10 1019 275 1102 323 12 7 7 9 -21 10 -22 0 -38 5 -40 14 -2 11 -22 9 -103 -10z"/>
        <path d="M4590 1930 c-74 -21 -143 -41 -153 -45 -20 -9 -34 -54 -19 -64 6 -3 10 -13 9 -21 -1 -8 16 -79 37 -158 36 -131 40 -141 56 -127 9 8 26 15 38 15 19 0 21 4 16 25 -5 22 -1 27 27 39 19 8 66 22 106 31 75 18 110 43 99 70 -10 28 -37 28 -144 1 -61 -15 -109 -23 -114 -18 -13 13 -40 121 -33 132 3 5 51 23 108 40 136 41 147 46 147 69 0 19 -25 52 -38 50 -4 -1 -68 -18 -142 -39z"/>
        <path d="M4339 1856 c-3 -3 -18 -7 -34 -10 -46 -8 -160 -42 -182 -54 -16 -9 -48 -17 -85 -21 -4 -1 -12 -10 -18 -21 -14 -26 23 -68 45 -50 8 7 35 12 61 13 l47 2 43 -154 c24 -84 46 -156 50 -160 4 -3 4 2 1 12 -4 11 -1 17 9 17 12 0 14 7 9 31 -6 26 -4 31 15 36 11 3 19 11 16 18 -18 49 -58 217 -53 228 3 8 30 23 59 32 69 23 82 40 52 69 -16 16 -27 20 -35 12z"/>
        <path d="M3933 1730 c-13 -5 -23 -13 -23 -18 0 -5 18 -71 40 -146 41 -140 46 -166 32 -166 -5 0 -66 52 -138 116 -162 146 -168 150 -199 136 -14 -7 -25 -19 -25 -28 0 -24 118 -451 133 -483 9 -19 19 -25 37 -23 14 2 29 8 34 13 6 5 -6 66 -32 157 -45 157 -47 172 -33 172 5 0 66 -52 135 -115 76 -69 135 -115 147 -115 12 0 23 -8 26 -20 3 -11 9 -20 13 -20 15 0 40 31 40 50 0 24 -117 456 -130 481 -12 21 -23 23 -57 9z"/>
        <path d="M3400 1580 c-14 -5 -55 -16 -93 -26 -37 -9 -71 -23 -76 -32 -11 -19 15 -123 34 -138 8 -6 11 -15 6 -20 -10 -10 80 -339 97 -356 12 -12 91 6 267 60 93 29 111 46 84 78 -15 18 -29 16 -154 -20 -134 -38 -141 -37 -159 27 -32 110 -10 194 36 138 l18 -23 65 17 c86 24 100 34 91 70 -6 25 -10 27 -44 21 -64 -10 -85 -15 -139 -32 -28 -9 -57 -14 -64 -12 -7 2 -20 33 -30 69 -18 63 -18 64 2 79 15 12 17 18 7 28 -9 9 -9 15 -1 23 14 14 33 3 33 -20 0 -17 3 -18 56 -3 51 14 54 17 38 29 -11 8 -19 21 -19 31 0 19 -20 24 -55 12z m10 -44 c0 -8 -4 -18 -10 -21 -5 -3 -10 -4 -10 -1 0 2 -3 11 -6 20 -4 11 -1 16 10 16 9 0 16 -6 16 -14z"/>
        <path d="M3132 1501 c-7 -4 -27 -59 -44 -122 -17 -63 -36 -120 -42 -126 -9 -10 -33 7 -109 78 -80 73 -102 89 -120 83 -12 -3 -26 -10 -31 -15 -12 -11 51 -246 76 -282 12 -17 17 -38 15 -56 -7 -42 4 -55 36 -40 31 14 34 24 11 33 -14 5 -14 8 1 22 10 11 14 25 11 38 -4 12 -9 41 -12 66 l-7 45 39 -35 c88 -80 90 -81 118 -74 22 5 29 17 47 78 22 72 34 95 45 84 3 -4 23 -70 44 -148 21 -79 43 -147 48 -152 7 -7 20 -7 39 -1 24 9 28 15 26 44 -2 34 -103 409 -124 462 -12 27 -40 36 -67 18z"/>
        <path d="M4782 1476 c-51 -18 -60 -24 -50 -34 11 -11 9 -16 -7 -28 -18 -14 -21 -13 -34 5 -18 27 -65 27 -93 1 -19 -18 -20 -20 -4 -20 10 0 14 -5 10 -11 -3 -6 -15 -9 -25 -6 -10 3 -23 -1 -30 -9 -15 -19 11 -29 49 -18 15 4 38 8 52 9 14 1 78 16 142 35 119 34 137 47 116 84 -12 21 -47 19 -126 -8z m-102 -86 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z"/>
        <path d="M1805 1392 c-11 -3 -23 -9 -26 -15 -4 -5 -28 -11 -53 -12 -26 -1 -52 -8 -59 -15 -10 -10 -8 -12 7 -6 17 6 18 2 13 -32 l-5 -39 39 9 c22 6 41 18 44 28 3 10 19 21 35 25 28 6 63 35 42 35 -6 0 -12 6 -14 13 -2 7 -12 11 -23 9z"/>
        <path d="M4275 1348 c9 -41 23 -68 35 -68 14 0 22 18 11 25 -17 10 0 37 20 32 12 -3 17 1 16 14 -1 14 -7 17 -23 13 -12 -3 -25 -1 -28 5 -4 6 -14 11 -22 11 -12 0 -14 -7 -9 -32z"/>
        <path d="M2553 1328 c-13 -6 -23 -16 -23 -23 0 -7 36 -67 79 -134 72 -110 79 -125 74 -158 -5 -26 -3 -34 6 -29 6 4 9 12 6 17 -4 5 -1 9 4 9 6 0 10 15 9 33 -3 28 0 32 22 32 20 0 26 -6 28 -28 2 -15 7 -25 12 -22 14 9 18 -33 5 -59 -10 -19 -10 -28 -2 -40 11 -13 16 -12 44 8 l31 22 -122 189 c-68 105 -129 191 -137 192 -8 1 -24 -3 -36 -9z"/>
        <path d="M1250 1237 c-173 -50 -316 -91 -318 -93 -2 -1 2 -11 9 -22 18 -29 4 -54 -28 -50 -22 2 -29 9 -31 31 -4 29 -6 30 -36 18 -29 -11 -28 -68 1 -76 26 -6 145 24 138 36 -6 8 53 61 63 56 4 -2 19 -9 33 -16 23 -11 49 -6 240 49 118 34 232 66 253 71 62 15 73 24 48 38 -15 8 -22 8 -22 1 0 -5 -4 -10 -10 -10 -14 0 -13 27 2 32 14 5 1 28 -15 27 -7 -1 -154 -42 -327 -92z"/>
        <path d="M4351 1302 c-7 -13 -11 -26 -8 -28 8 -8 29 25 25 38 -3 8 -9 4 -17 -10z"/>
        <path d="M4920 1278 c-25 -5 -112 -27 -195 -50 -120 -33 -154 -46 -171 -67 -19 -22 -25 -24 -47 -14 -14 6 -28 9 -32 5 -3 -4 -18 -8 -33 -9 -15 -1 -467 -128 -1005 -282 -538 -155 -980 -281 -983 -281 -3 0 4 -15 23 -49 4 -7 163 42 163 50 0 5 6 6 13 4 6 -3 521 141 1142 319 999 286 1131 326 1140 345 9 20 16 22 53 18 41 -4 57 5 26 17 -19 7 -37 6 -94 -6z"/>
        <path d="M2303 1263 c-19 -4 -27 -18 -44 -76 -11 -40 -25 -85 -30 -101 -5 -16 -9 -39 -9 -51 0 -13 -7 -26 -16 -29 -16 -6 -26 1 -133 102 -30 29 -57 50 -59 47 -3 -3 -11 0 -18 6 -11 9 -16 6 -23 -12 -7 -18 -10 -19 -10 -6 -1 9 -5 17 -9 17 -17 0 -9 -38 50 -265 58 -219 80 -283 75 -219 -2 25 2 29 23 29 21 0 25 -5 25 -28 -1 -15 4 -26 10 -24 14 6 13 14 -29 171 -21 76 -35 141 -32 143 5 5 77 -48 114 -84 34 -33 68 -5 93 77 34 113 37 110 90 -90 37 -139 46 -154 84 -137 28 13 33 27 10 27 -23 0 -31 31 -11 45 19 15 14 44 -54 284 -41 146 -55 182 -68 180 -4 -1 -17 -4 -29 -6z"/>
        <path d="M2526 1183 c-3 -21 -8 -115 -12 -209 -5 -150 -4 -172 10 -187 36 -35 76 6 76 78 0 53 12 75 41 75 15 0 16 5 7 38 -6 20 -16 41 -24 45 -9 5 -14 25 -14 51 0 32 -8 54 -31 87 -46 64 -46 64 -53 22z"/>
        <path d="M1855 1130 c-3 -5 -2 -10 4 -10 6 0 15 -9 21 -21 9 -15 8 -25 -3 -42 -13 -20 -9 -42 43 -230 32 -115 62 -213 67 -218 6 -6 22 -7 37 -3 20 5 26 12 26 32 0 30 -78 324 -88 332 -4 3 -8 18 -9 33 -1 16 -9 53 -18 83 -14 49 -18 54 -45 54 -16 0 -32 -4 -35 -10z"/>
        <path d="M1765 1105 c-17 -8 -23 -14 -14 -14 18 -1 56 -51 39 -51 -5 0 -10 5 -10 10 0 6 -11 10 -24 10 -21 0 -26 -8 -41 -65 -27 -97 -32 -98 -117 -21 -61 54 -77 64 -98 59 -26 -6 -40 -20 -40 -39 0 -5 45 -54 99 -108 97 -95 99 -98 90 -129 -48 -164 -60 -227 -49 -247 8 -15 17 -19 33 -14 33 9 42 25 66 119 16 60 27 85 38 85 9 0 46 -29 83 -63 59 -56 71 -63 99 -59 26 4 31 9 31 32 0 23 -19 46 -97 119 l-97 91 27 113 c23 97 29 168 16 181 -2 2 -17 -2 -34 -9z"/>
        <path d="M740 1088 c-14 -4 -155 -44 -315 -89 -159 -45 -298 -86 -308 -91 -11 -6 -17 -18 -15 -31 2 -18 -3 -23 -26 -25 -19 -2 -32 2 -38 12 -11 20 -28 21 -28 1 0 -30 44 -39 127 -25 120 19 605 159 626 181 13 14 16 26 10 47 -7 24 -11 27 -33 20z"/>
        <path d="M1292 972 c-8 -5 -10 -19 -6 -40 5 -23 13 -32 34 -37 46 -10 69 -46 100 -156 37 -128 38 -174 6 -208 -20 -22 -22 -31 -14 -58 11 -41 35 -43 70 -5 66 70 72 122 29 271 -40 139 -63 183 -109 208 -45 25 -92 36 -110 25z"/>
        <path d="M2695 950 c4 -6 11 -8 16 -5 14 9 11 15 -7 15 -8 0 -12 -5 -9 -10z"/>
        <path d="M1182 938 c-16 -21 -24 -58 -13 -58 6 0 11 -5 11 -11 0 -6 -9 -9 -20 -6 -24 6 -50 -26 -50 -63 0 -28 57 -246 70 -270 5 -8 17 -15 27 -15 13 0 18 -8 18 -29 1 -25 8 -34 45 -54 31 -16 54 -21 74 -18 38 8 38 7 25 45 -8 23 -22 36 -50 48 -48 19 -54 29 -90 162 -35 130 -36 151 -4 189 32 38 26 92 -10 92 -12 0 -27 -6 -33 -12z"/>
        <path d="M2835 930 c-41 -16 -48 -35 -23 -65 20 -23 27 -25 51 -16 31 12 35 39 10 69 -13 15 -23 18 -38 12z"/>
        <path d="M852 855 c-29 -13 -32 -18 -26 -42 10 -41 19 -47 51 -31 20 10 37 12 53 6 12 -5 24 -7 25 -6 15 25 45 58 45 51 0 -6 9 -13 20 -16 31 -8 37 -37 12 -58 -14 -10 -22 -29 -22 -46 0 -37 -31 -67 -87 -85 -24 -7 -43 -18 -43 -25 0 -17 17 -25 25 -12 4 5 13 8 20 5 7 -2 15 4 18 15 4 15 12 20 29 17 29 -4 32 -40 3 -48 -11 -3 -20 -13 -20 -22 0 -26 30 -52 51 -44 16 6 16 7 0 19 -17 12 -14 17 27 56 99 95 73 239 -50 276 -19 5 -22 3 -16 -11 4 -12 3 -15 -5 -10 -7 4 -12 2 -12 -6 0 -9 -3 -9 -10 2 -8 13 -10 12 -10 -2 0 -20 -25 -24 -35 -8 -4 6 -1 17 5 25 16 20 -3 19 -48 0z"/>
        <path d="M708 803 c-8 -10 -1 -49 27 -151 41 -150 56 -189 52 -132 -2 31 1 35 23 35 21 0 25 -4 23 -27 -1 -20 2 -25 13 -21 8 3 13 11 11 17 -2 6 -21 75 -42 154 l-38 142 -29 -2 c-16 -1 -34 -8 -40 -15z"/>
        <path d="M535 762 c-6 -5 -29 -14 -52 -21 -44 -12 -52 -26 -34 -60 9 -16 16 -17 60 -8 60 13 97 0 111 -39 18 -48 3 -74 -62 -103 -55 -25 -58 -28 -53 -55 3 -16 7 -31 9 -33 6 -6 98 18 128 34 63 31 88 150 45 213 -34 51 -126 95 -152 72z"/>
        <path d="M366 711 c-4 -5 -13 -8 -20 -5 -32 12 -24 -44 39 -276 36 -133 68 -246 71 -251 9 -16 64 -10 71 7 8 21 -123 504 -142 522 -8 9 -15 10 -19 3z"/>
        <path d="M2256 514 c-9 -8 -16 -11 -16 -6 0 10 -365 -91 -384 -107 -6 -5 -22 -9 -36 -9 -27 -1 -1020 -285 -1135 -325 -116 -41 -115 -40 -70 -48 27 -5 65 -1 120 13 196 48 1451 411 1460 421 19 22 54 37 60 27 10 -17 40 -11 53 10 11 17 10 21 -5 27 -10 3 -21 8 -25 10 -3 2 -14 -4 -22 -13z"/>
        <path d="M1084 468 c-4 -7 -3 -8 4 -4 7 4 12 1 12 -9 0 -12 -6 -15 -19 -10 -23 7 -38 -12 -22 -28 7 -7 18 -7 36 1 17 8 33 8 50 2 l26 -10 -18 25 c-10 13 -24 25 -31 25 -7 0 -10 5 -7 10 3 6 -1 10 -9 10 -8 0 -18 -5 -22 -12z"/>
        <path d="M847 444 c-10 -13 -24 -24 -32 -24 -8 0 -12 -6 -9 -13 2 -7 19 -12 39 -12 l34 2 -29 -35 c-24 -29 -27 -38 -18 -58 15 -32 32 -36 57 -13 25 23 26 36 6 86 -8 21 -16 48 -18 60 -5 33 -10 34 -30 7z"/>
      </g>
    </svg>
    // <svg
    //   width="800px"
    //   height="800px"
    //   viewBox="0 0 20 20"
    //   version="1.1"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="h-8 w-8 object-contain text-black dark:text-white"
    // >
    //   <g
    //     id="Page-1"
    //     stroke="none"
    //     strokeWidth="1"
    //     fill="none"
    //     fillRule="evenodd"
    //   >
    //     <g
    //       id="Dribbble-Light-Preview"
    //       transform="translate(-140.000000, -7559.000000)"
    //       fill="currentColor"
    //     >
    //       <g id="icons" transform="translate(56.000000, 160.000000)">
    //         <path
    //           d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
    //           id="github-[#142]"
    //         ></path>
    //       </g>
    //     </g>
    //   </g>
    // </svg>
  );
};
const AWSLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48px"
      height="48px"
      className="h-8 w-8 object-contain text-black dark:text-white"
    >
      <path
        fill="currentColor"
        d="M13.527,21.529c0,0.597,0.064,1.08,0.176,1.435c0.128,0.355,0.287,0.742,0.511,1.161 c0.08,0.129,0.112,0.258,0.112,0.371c0,0.161-0.096,0.322-0.303,0.484l-1.006,0.677c-0.144,0.097-0.287,0.145-0.415,0.145 c-0.16,0-0.319-0.081-0.479-0.226c-0.224-0.242-0.415-0.5-0.575-0.758c-0.16-0.274-0.319-0.58-0.495-0.951 c-1.245,1.483-2.81,2.225-4.694,2.225c-1.341,0-2.411-0.387-3.193-1.161s-1.181-1.806-1.181-3.096c0-1.37,0.479-2.483,1.453-3.321 s2.267-1.258,3.911-1.258c0.543,0,1.102,0.048,1.692,0.129s1.197,0.21,1.836,0.355v-1.177c0-1.225-0.255-2.08-0.75-2.58 c-0.511-0.5-1.373-0.742-2.602-0.742c-0.559,0-1.133,0.064-1.724,0.21c-0.591,0.145-1.165,0.322-1.724,0.548 c-0.255,0.113-0.447,0.177-0.559,0.21c-0.112,0.032-0.192,0.048-0.255,0.048c-0.224,0-0.335-0.161-0.335-0.5v-0.79 c0-0.258,0.032-0.451,0.112-0.564c0.08-0.113,0.224-0.226,0.447-0.339c0.559-0.29,1.229-0.532,2.012-0.726 c0.782-0.21,1.612-0.306,2.49-0.306c1.9,0,3.289,0.435,4.183,1.306c0.878,0.871,1.325,2.193,1.325,3.966v5.224H13.527z M7.045,23.979c0.527,0,1.07-0.097,1.644-0.29c0.575-0.193,1.086-0.548,1.517-1.032c0.255-0.306,0.447-0.645,0.543-1.032 c0.096-0.387,0.16-0.855,0.16-1.403v-0.677c-0.463-0.113-0.958-0.21-1.469-0.274c-0.511-0.064-1.006-0.097-1.501-0.097 c-1.07,0-1.852,0.21-2.379,0.645s-0.782,1.048-0.782,1.854c0,0.758,0.192,1.322,0.591,1.709 C5.752,23.786,6.311,23.979,7.045,23.979z M19.865,25.721c-0.287,0-0.479-0.048-0.607-0.161c-0.128-0.097-0.239-0.322-0.335-0.629 l-3.752-12.463c-0.096-0.322-0.144-0.532-0.144-0.645c0-0.258,0.128-0.403,0.383-0.403h1.565c0.303,0,0.511,0.048,0.623,0.161 c0.128,0.097,0.223,0.322,0.319,0.629l2.682,10.674l2.49-10.674c0.08-0.322,0.176-0.532,0.303-0.629 c0.128-0.097,0.351-0.161,0.639-0.161h1.277c0.303,0,0.511,0.048,0.639,0.161c0.128,0.097,0.239,0.322,0.303,0.629l2.522,10.803 l2.762-10.803c0.096-0.322,0.208-0.532,0.319-0.629c0.128-0.097,0.335-0.161,0.623-0.161h1.485c0.255,0,0.399,0.129,0.399,0.403 c0,0.081-0.016,0.161-0.032,0.258s-0.048,0.226-0.112,0.403l-3.847,12.463c-0.096,0.322-0.208,0.532-0.335,0.629 s-0.335,0.161-0.607,0.161h-1.373c-0.303,0-0.511-0.048-0.639-0.161c-0.128-0.113-0.239-0.322-0.303-0.645l-2.474-10.4 L22.18,24.915c-0.08,0.322-0.176,0.532-0.303,0.645c-0.128,0.113-0.351,0.161-0.639,0.161H19.865z M40.379,26.156 c-0.83,0-1.66-0.097-2.458-0.29c-0.798-0.193-1.421-0.403-1.836-0.645c-0.255-0.145-0.431-0.306-0.495-0.451 c-0.064-0.145-0.096-0.306-0.096-0.451v-0.822c0-0.339,0.128-0.5,0.367-0.5c0.096,0,0.192,0.016,0.287,0.048 c0.096,0.032,0.239,0.097,0.399,0.161c0.543,0.242,1.133,0.435,1.756,0.564c0.639,0.129,1.261,0.193,1.9,0.193 c1.006,0,1.788-0.177,2.331-0.532c0.543-0.355,0.83-0.871,0.83-1.532c0-0.451-0.144-0.822-0.431-1.129 c-0.287-0.306-0.83-0.58-1.612-0.838l-2.315-0.726c-1.165-0.371-2.027-0.919-2.554-1.645c-0.527-0.709-0.798-1.499-0.798-2.338 c0-0.677,0.144-1.274,0.431-1.79s0.671-0.967,1.149-1.322c0.479-0.371,1.022-0.645,1.66-0.838C39.533,11.081,40.203,11,40.906,11 c0.351,0,0.718,0.016,1.07,0.064c0.367,0.048,0.702,0.113,1.038,0.177c0.319,0.081,0.623,0.161,0.91,0.258s0.511,0.193,0.671,0.29 c0.224,0.129,0.383,0.258,0.479,0.403c0.096,0.129,0.144,0.306,0.144,0.532v0.758c0,0.339-0.128,0.516-0.367,0.516 c-0.128,0-0.335-0.064-0.607-0.193c-0.91-0.419-1.932-0.629-3.065-0.629c-0.91,0-1.628,0.145-2.123,0.451 c-0.495,0.306-0.75,0.774-0.75,1.435c0,0.451,0.16,0.838,0.479,1.145c0.319,0.306,0.91,0.613,1.756,0.887l2.267,0.726 c1.149,0.371,1.98,0.887,2.474,1.548s0.734,1.419,0.734,2.257c0,0.693-0.144,1.322-0.415,1.87 c-0.287,0.548-0.671,1.032-1.165,1.419c-0.495,0.403-1.086,0.693-1.772,0.903C41.943,26.043,41.193,26.156,40.379,26.156z"
      />
      <path
        fill="#f90"
        d="M43.396,33.992c-5.252,3.918-12.883,5.998-19.445,5.998c-9.195,0-17.481-3.434-23.739-9.142 c-0.495-0.451-0.048-1.064,0.543-0.709c6.769,3.966,15.118,6.369,23.755,6.369c5.827,0,12.229-1.225,18.119-3.741 C43.508,32.364,44.258,33.347,43.396,33.992z M45.583,31.477c-0.671-0.871-4.438-0.419-6.146-0.21 c-0.511,0.064-0.591-0.387-0.128-0.726c3.001-2.128,7.934-1.516,8.509-0.806c0.575,0.726-0.16,5.708-2.969,8.094 c-0.431,0.371-0.846,0.177-0.655-0.306C44.833,35.927,46.254,32.331,45.583,31.477z"
      />
    </svg>
  );
};

export const SkeletonTwo = () => {
  return (
    <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <Globe className="absolute -right-0 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.0, 0.6, 0.0],
      markerColor: [1, 0.84, 0],
      glowColor: [1, 1, 1],
      markers: [
        { location: [27.4864, -109.9408], size: 0.03 }, // Obregón, Sonora
        { location: [25.7896, -108.9859], size: 0.03 }, // Los Mochis, Sinaloa
        { location: [24.8091, -107.3940], size: 0.03 }, // Culiacán, Sinaloa
        { location: [25.5683, -108.4678], size: 0.03 }, // Guasave, Sinaloa
        { location: [21.5067, -104.8941], size: 0.03 }, // Tepic, Nayarit
        { location: [20.6767, -101.3563], size: 0.03 }, // Irapuato, Guanajuato
        { location: [20.5237, -100.8157], size: 0.03 }, // Celaya, Guanajuato
        { location: [19.9802, -102.2835], size: 0.03 }, // Zamora, Michoacán
        { location: [27.4727, -109.9320], size: 0.03 }, // Valle del Yaqui, Sonora
        // { location: [32.6245, -115.4523], size: 0.05 }, // Mexicali, Baja California
        { location: [19.1957, -100.1310], size: 0.001 }, // Valle de Bravo, Estado de México
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

// Card structure
const CardSkeletonBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("overflow-hidden relative w-full h-full", className)}>
      {children}
    </div>
  );
};

const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("p-6", className)}>{children}</div>;
};

const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "font-sans  text-base font-medium tracking-tight text-neutral-700 dark:text-neutral-100",
        className
      )}
    >
      {children}
    </h3>
  );
};
const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "font-sans max-w-lg text-base font-normal tracking-tight mt-2 text-neutral-500 dark:text-neutral-400",
        className
      )}
    >
      {children}
    </p>
  );
};

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover="animate"
      className={cn(
        "group isolate flex flex-col rounded-2xl bg-white dark:bg-neutral-900 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};



// this code may be used in the future

{/* Card 1 */}
        {/* <Card className="flex flex-col justify-between md:col-span-3">
          <CardSkeletonBody>
            <SkeletonOne />
          </CardSkeletonBody>
          <CardContent className="flex-1">
            <CardTitle>Financiamiento Automatizado y Personalizado</CardTitle>
            <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400 overflow-y-auto max-h-40 sm:max-h-60">
              Obtén acceso rápido a créditos y pólizas diseñados para tus necesidades agrícolas. Con nuestro sistema automatizado, simplificamos el proceso financiero para que puedas concentrarte en lo que importa: tus cultivos.
            </CardDescription>
          </CardContent>
        </Card> */}

        {/* Card 2 */}
        {/* <Card className="flex flex-col justify-between md:col-span-2">
          <CardContent className="flex-1">
            <CardTitle>Toma de Decisiones Inteligente con Gideon</CardTitle>
            <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400 overflow-y-auto max-h-40 sm:max-h-60">
              Nuestro asistente virtual Gideon te guía en cada paso, proporcionando predicciones precisas, modelos de rentabilidad y análisis comprensibles para maximizar el potencial de tus cultivos y mejorar tu estrategia agrícola.
            </CardDescription>
          </CardContent>
          <CardSkeletonBody>
            <div className="max-w-[100%] max-h-[100%] sm:h-56 md:h-64 p-4 rounded-lg bg-neutral-100 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 mx-6 mt-2 overflow-hidden">
            <img
                src="/images/Gideon.jpg"
                alt="Dashboard"
                width={500}
                height={500}
                className="w-full h-full object-cover object-top rounded-lg"
                loading="lazy"
              />
            </div>
          </CardSkeletonBody>
        </Card> */}

        {/* Card 3 */}
        {/* <Card className="flex flex-col justify-between md:col-span-2">
          <CardContent className="flex-1">
            <CardTitle>Monitoreo Global en Tiempo Real</CardTitle>
            <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400 overflow-y-auto max-h-40 sm:max-h-60">
              Observa cada detalle de tus cultivos desde cualquier lugar. Con tecnología avanzada de sensores y monitoreo satelital, te brindamos una visión completa del estado de tus terrenos y cultivos.
            </CardDescription>
          </CardContent>
          <CardSkeletonBody>
            <SkeletonTwo />
          </CardSkeletonBody>
        </Card> */}

        {/* Card 4 */}
        {/* <Card className="flex flex-col justify-between md:col-span-3">
          <CardContent className="flex-1">
            <CardTitle>Análisis y Predicciones a tu Alcance</CardTitle>
            <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400 overflow-y-auto max-h-40 sm:max-h-60">
              Accede a predicciones detalladas y análisis profundos que te ayudarán a anticipar tendencias, maximizar la rentabilidad y tomar decisiones informadas. Con GeoHarvest, conviertes datos en estrategias efectivas.
            </CardDescription>
          </CardContent>
          <CardSkeletonBody>
            <div className=" max-w-[100%] max-h-[100%] sm:h-56 md:h-64 p-4 rounded-lg bg-neutral-100 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 mx-6 mt-2 overflow-hidden">
              <img
                src="/images/analisis.png"
                alt="Dashboard"
                width={500}
                height={500}
                className="w-full h-full object-cover object-top rounded-lg"
                loading="lazy"
              />
            </div>
          </CardSkeletonBody>
        </Card> */}

        {/* Card 5 */}
        {/* <Card className="flex flex-col justify-between md:col-span-2">
          <CardContent className="flex-1">
            <CardTitle>Reportes Diarios Resumidos</CardTitle>
            <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400 overflow-y-auto max-h-40 sm:max-h-60">
              Accede rápidamente a los datos más relevantes de tus cultivos. Con nuestros reportes diarios, obtienes un resumen claro de monitoreo, finanzas y predicciones, ahorrando tiempo y manteniéndote al tanto de todo lo esencial para tomar decisiones informadas sin perder el foco.
            </CardDescription>
          </CardContent>
          <CardSkeletonBody>
            <div className="max-w-[100%] max-h-[100%] sm:h-56 md:h-64 p-4 rounded-lg bg-neutral-100 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 mx-6 mt-2 overflow-hidden">
              <img
                src="/images/reportes.png"
                alt="Dashboard"
                width={500}
                height={500}
                className="w-full h-full object-cover object-top rounded-lg"
                loading="lazy"
              />
            </div>
          </CardSkeletonBody>
        </Card> */}

        {/* Card 6 */}
        {/* <Card className="flex flex-col justify-between md:col-span-3">
          <CardSkeletonBody>
            <SkeletonOne />
          </CardSkeletonBody>
          <CardContent className="flex-1">
            <CardTitle>Conexión Directa con el Mercado</CardTitle>
            <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400 overflow-y-auto max-h-40 sm:max-h-60">
              Vende tus cosechas directamente a los compradores sin intermediarios, eliminando la incertidumbre y el desperdicio. GeoHarvest conecta a los agricultores con la demanda real, asegurando un mercado seguro y eficiente para tus productos.
            </CardDescription>
          </CardContent>
        </Card> */}
