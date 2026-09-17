"use client";

// components/alliances.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Interfaces para tipado (ya las tienes en tu archivo)
interface LogoItemProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

interface MentorItemProps {
  src: string;
  alt: string;
  name: string;
}

interface AllianceSectionProps {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

// --- Tus constantes de assets (las omito por brevedad pero deben estar aquí) ---
const tecDeMonterreyLogo: LogoItemProps = {
  src: '/images/alliances/tec-bg.png',
  alt: 'Tecnológico de Monterrey e Instituto de Emprendimiento Eugenio Garza Lagüera',
  width: 500, height: 100, className: 'max-h-16 sm:max-h-20 w-auto'
};
const nasaMentorsData: MentorItemProps[] = [
  { src: '/images/alliances/Mike-Taylor.png', alt: 'Mike Taylor', name: 'Mike Taylor' },
  { src: '/images/alliances/Vicky-Espinoza.png', alt: 'Vicky Espinoza', name: 'Vicky Espinoza' },
  { src: '/images/alliances/Laura-Vega.png', alt: 'Laura Vega', name: 'Laura Vega' },
  { src: '/images/alliances/Sabrina-Delgado.png', alt: 'Sabrina Delgado', name: 'Sabrina Delgado' },
  { src: '/images/alliances/Peder-Nelson.png', alt: 'Peder Nelson', name: 'Peder Nelson' },
  { src: '/images/alliances/Brian-Campbell.png', alt: 'Brian Campbell', name: 'Brian Campbell' },
];
const mitOrbitCombinedLogo: LogoItemProps = {
    src: '/images/alliances/mit.png',
    alt: 'MIT, Orbit Startups, and Martin Trust Center Logos',
    width: 700, 
    height: 100,
    className: 'max-h-14 sm:max-h-16 w-auto',
  };
const isjSonoraLogo: LogoItemProps = {
  src: '/images/alliances/instituto.png',
  alt: 'Instituto Sonorense de la Juventud',
  width: 200, height: 200, className: 'max-h-28 sm:max-h-32 w-auto rounded-lg '
};
const oxfordUniLogo: LogoItemProps = {
  src: '/images/alliances/oxford.png',
  alt: 'Universidad de Oxford',
  width: 150, height: 150, className: 'max-h-24 sm:max-h-28 w-auto'
};
const sonoraOportunidadesLogo: LogoItemProps = {
  src: '/images/alliances/sonora.jpg',
  alt: 'Sonora Tierra de Oportunidades Logo',
  width: 250, height: 80, className: 'max-h-14 sm:max-h-16 w-auto rounded-md'
};
const codesoLogo: LogoItemProps = {
  src: '/images/alliances/codeso.png',
  alt: 'CODESO Logo',
  width: 200, height: 80, className: 'max-h-14 sm:max-h-16 w-auto rounded-md '
};
const acceptanceLetterImage: LogoItemProps = {
  src: '/images/alliances/taiwan.jpg',
  alt: 'Carta de aceptación al programa Talento Sonorense Rumbo a la República de China (Taiwán)',
  width: 800, 
  height: 1131,
  className: 'w-full max-w-md md:max-w-lg mx-auto rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700' 
};
// --- Fin de constantes de assets ---


// --- Estructura de la sección de alianzas (ya la tienes, la omito por brevedad) ---
const alliancesList: AllianceSectionProps[] = [
  {
    id: 'tec-monterrey',
    title: 'Tecnológico de Monterrey',
    description: 'Formación, incubación y visibilidad',
    content: (
      <img src={tecDeMonterreyLogo.src} alt={tecDeMonterreyLogo.alt} width={tecDeMonterreyLogo.width} height={tecDeMonterreyLogo.height} className={tecDeMonterreyLogo.className} />
    ),
  },
  {
    id: 'nasa',
    title: 'NASA',
    description: 'Apoyo y mentoría por parte de especialistas como:',
    content: (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 mt-6 max-w-4xl mx-auto">
        {nasaMentorsData.map(mentor => (
          <div key={mentor.name} className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-2.5 overflow-hidden rounded-full border-2 border-neutral-200 dark:border-neutral-700">
              <img src={mentor.src} alt={mentor.alt} className="h-full w-full object-cover" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">{mentor.name}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'mit-orbit',
    title: 'MIT / Orbit Startups',
    description: 'Selección para programa de aceleración internacional',
    content: (
      <div className="inline-block p-2 dark:bg-white dark:rounded-lg mt-4">
        <img
          src={mitOrbitCombinedLogo.src}
          alt={mitOrbitCombinedLogo.alt}
          width={mitOrbitCombinedLogo.width}
          height={mitOrbitCombinedLogo.height}
          className={mitOrbitCombinedLogo.className}
        />
      </div>
    ),
  },
  {
    id: 'gobierno-sonora',
    title: 'Gobierno del Estado de Sonora',
    description: 'Premio Estatal de la Juventud 2024',
    content: (
      <img src={isjSonoraLogo.src} alt={isjSonoraLogo.alt} width={isjSonoraLogo.width} height={isjSonoraLogo.height} className={isjSonoraLogo.className} />
    ),
  },
  {
    id: 'oxford',
    title: 'Universidad de Oxford',
    description: 'Participamos en una investigación colaborativa, en alianza con expertos del área de sostenibilidad agrícola.',
    content: (
      <img src={oxfordUniLogo.src} alt={oxfordUniLogo.alt} width={oxfordUniLogo.width} height={oxfordUniLogo.height} className={oxfordUniLogo.className} />
    ),
  },
  {
    id: 'plan-sonora-codeso',
    title: 'Plan Sonora y CODESO',
    description: "GeoHarvest: Alineados con el Plan Sonora de CODESO. Nuestro equipo se encuentra especializandose en la República de China para potenciar el desarrollo de Sonora y México.",
    content: (
      <div className="flex flex-col items-center w-full space-y-8 mt-4">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-6 gap-y-4 sm:gap-x-10">
          <img src={sonoraOportunidadesLogo.src} alt={sonoraOportunidadesLogo.alt} width={sonoraOportunidadesLogo.width} height={sonoraOportunidadesLogo.height} className={sonoraOportunidadesLogo.className} />
          <img src={codesoLogo.src} alt={codesoLogo.alt} width={codesoLogo.width} height={codesoLogo.height} className={codesoLogo.className} />
        </div>
        <div className="w-full">
          <img
            src={acceptanceLetterImage.src}
            alt={acceptanceLetterImage.alt}
            width={acceptanceLetterImage.width}
            height={acceptanceLetterImage.height}
            className={acceptanceLetterImage.className}
          />
        </div>
      </div>
    ),
  },
];
// --- Fin de estructura de alianzas ---


// Variantes para cada bloque de alianza individual
const allianceBlockVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "circOut", // Una transición suave y con un poco de "rebote"
      staggerChildren: 0.15, // Animará los hijos (título, desc, contenido) en secuencia
    },
  },
};

// Variantes para los elementos internos de cada bloque (título, descripción, contenido)
const innerContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Alliances() {
  return (
    <section id='alliances' className="bg-white dark:bg-neutral-950 py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "circOut" }}
          className="text-3xl md:text-4xl font-bold text-center text-neutral-800 dark:text-neutral-100 mb-12 md:mb-16"
        >
          Alianzas y Apoyos
        </motion.h2>

        {/* El div que contiene los bloques ya NO necesita ser motion para staggerChildren aquí */}
        <div className="space-y-14 md:space-y-20">
          {alliancesList.map((alliance) => (
            // Cada bloque de alianza ahora tiene su propia detección de whileInView
            <motion.div
              key={alliance.id}
              variants={allianceBlockVariants}
              initial="hidden"
              whileInView="visible"
              // amount: 0.2 significa que la animación del bloque comienza cuando el 20% del bloque es visible
              viewport={{ once: true, amount: 0.2 }} 
              className="text-center"
            >
              <motion.h3
                variants={innerContentVariants} // Estos se animan debido al staggerChildren del padre
                className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2"
              >
                {alliance.title}
              </motion.h3>
              <motion.p
                variants={innerContentVariants}
                className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 max-w-xl mx-auto"
              >
                {alliance.description}
              </motion.p>
              <motion.div
                variants={innerContentVariants}
                className="flex justify-center items-center"
              >
                {alliance.content}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
