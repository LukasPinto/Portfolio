export const skillGroups = [
  { label: "Frontend", items: ["react", "angular"] },
  { label: "Backend", items: ["python", "go", "sql"] },
  { label: "Infra & herramientas", items: ["linux", "bash"] },
] as const;

export type SkillGroup = (typeof skillGroups)[number];
export type SkillItem = SkillGroup["items"][number];
