"use client"
// components/who-we-help.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importar motion

// Define la estructura de los datos para cada tarjeta
interface HelpCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  buttonLink: string;
}

// Datos para las tarjetas
const helpData: HelpCardProps[] = [
  {
    title: "Agricultores",
    description: "Optimiza tu producción con datos en tiempo real. Accede a análisis satelitales, monitoreo de cultivos y financiamiento especializado.",
    imageUrl: "/images/agricultores.png",
    imageAlt: "Agricultores revisando sus cultivos",
    buttonText: "Explora tu análisis",
    buttonLink: "#agricultores-link" 
  },
  {
    title: "Financiadores",
    description: "Evalúa riesgos en el sector agro con datos satelitales y métricas avanzadas. Conecta con productores y ofrece financiamiento inteligente.",
    imageUrl: "/images/financiadores.png",
    imageAlt: "Dos personas estrechando manos en un campo agrícola",
    buttonText: "Analiza oportunidades",
    buttonLink: "#financiadores-link"
  },
  {
    title: "Comercializadores",
    description: "Conéctate con productores confiables, accede a proveedores de calidad y optimiza tu cadena de suministro con GeoHarvest.",
    imageUrl: "/images/comercializadores.png", 
    imageAlt: "Una cosechadora trabajando en un campo al atardecer",
    buttonText: "Encuentra proveedores",
    buttonLink: "#comercializadores-link"
  }
];

// Propiedades base para las animaciones de aparición
const sectionAnimationProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 }, // amount: 0.2 para que se active cuando el 20% sea visible
  transition: { duration: 0.7, ease: "easeOut" },
};

const cardAnimationProps = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1, ease: "easeOut" },
};

export function WhoWeHelp() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          {...sectionAnimationProps}
          className="text-3xl md:text-4xl font-bold text-center text-neutral-800 dark:text-neutral-100 mb-12 md:mb-16"
        >
          ¿A quién ayudamos?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpData.map((item, index) => (
            <motion.div
              key={item.title} // Usar un key único como el título o un id si lo tuvieras
              initial={cardAnimationProps.initial}
              whileInView={cardAnimationProps.whileInView}
              viewport={cardAnimationProps.viewport}
              transition={{ ...cardAnimationProps.transition, delay: index * 0.15 }} // Delay escalonado para cada tarjeta
              className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative w-full h-56 sm:h-60">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  
                  className="rounded-t-xl" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl lg:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>
                {/* El botón está comentado en tu código original, si lo activas, podría animarse también */}
                {/* <Link
                  href={item.buttonLink}
                  className="mt-auto inline-block text-center w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                  {item.buttonText}
                </Link> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
