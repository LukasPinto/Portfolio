export type ExperienceEntry = {
  id: string;
  period: string;
  title: string;
  organization?: string;
  description: string;
  tags?: string[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "conecta360",
    period: "Abril 2026 – Presente",
    title: "Desarrollador Full Stack",
    organization: "Conecta360",
    description:
      "Desarrollo full stack en Conecta360: diseño e implementación de aplicaciones web end-to-end, desde la interfaz hasta la capa de servicios.",
    tags: ["Full Stack", "Actualidad"],
  },
  {
    id: "uv-degree",
    period: "2019 – 2025",
    title: "Ingeniero Civil Informático",
    organization: "Universidad de Valparaíso",
    description:
      "Formación en ingeniería informática con enfoque en desarrollo de software, sistemas y ciberseguridad. Titulado.",
    tags: ["Ingeniero Civil Informático Titulado"],
  },
  {
    id: "tesis-aula-virtual",
    period: "2024 – 2025",
    title: "Tesis — Portal web Aula Virtual",
    organization: "Universidad de Valparaíso",
    description:
      "Desarrollo de un sistema de unión de asignaturas (portal web) para el Aula Virtual de la Universidad de Valparaíso, como trabajo de titulación.",
    tags: ["Tesis"],
  },
  {
    id: "securt-emprendeuv",
    period: "2023",
    title: "SECURT — App de seguridad vecinal",
    organization: "EmprendeUV",
    description:
      "Proyecto adjudicado con fondos EmprendeUV: desarrollo de una aplicación móvil para la seguridad en comunidades vecinales.",
    tags: ["EmprendeUV", "Mobile"],
  },
];
