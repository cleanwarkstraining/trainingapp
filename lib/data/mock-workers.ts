export type Worker = {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

export const WORKERS: Worker[] = [
  { id: "w1", name: "Rajan", role: "Cleaner", initials: "R", color: "#F4A621" },
  { id: "w2", name: "Priya", role: "Cleaner", initials: "P", color: "#D9434A" },
  { id: "w3", name: "Anil", role: "Team Lead", initials: "A", color: "#2E8B57" },
  { id: "w4", name: "Lakshmi", role: "Cleaner", initials: "L", color: "#3B82F6" },
  { id: "w5", name: "Suresh", role: "Machine Op.", initials: "S", color: "#7C3AED" },
  { id: "w6", name: "Meera", role: "Cleaner", initials: "M", color: "#EC4899" },
];
