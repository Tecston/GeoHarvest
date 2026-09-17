"use client"; // <-- IMPORTANTE: Añadir para componentes de cliente

// components/team.tsx
import React from 'react';
import { motion } from 'framer-motion'; // <-- Importar motion

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  altText: string;
}

const teamData: TeamMemberProps[] = [
  {
    name: "Jesús Medina",
    role: "Director de Proyecto",
    imageUrl: "/images/team/Jesus-Medina.png",
    altText: "Foto de perfil de Jesús Medina, Director de Proyecto",
  },
  {
    name: "Jorge Coronado",
    role: "Líder Técnico",
    imageUrl: "/images/team/Jorge.png",
    altText: "Foto de perfil de Jorge Coronado, Líder Técnico",
  },
];

// Variantes para el contenedor de los miembros del equipo (para stagger)
const teamContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Delay entre la aparición de cada miembro
      delayChildren: 0.2,   // Pequeño delay antes de que el primer miembro comience
    },
  },
};

// Variantes para cada tarjeta de miembro del equipo
const memberCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "circOut",
      staggerChildren: 0.1, // Stagger para imagen, nombre y rol dentro de la tarjeta
    },
  },
};

// Variantes para los elementos internos de cada tarjeta (imagen, nombre, rol)
const innerElementVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Team() {
  return (
    <section id='team' className="bg-white dark:bg-neutral-950 pt-16 md:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
    </section>
  );
}
