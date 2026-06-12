export type Step = {
  id: number;
  titleKey: string;
  bodyKey: string;
  iconBg: string;
  iconName: string;
  chip?: { label: string; color: string };
};

export type ChecklistItem = {
  key: string;
};

export type QuizQuestion = {
  id: string;
  questionKey: string;
  correctValue: string;
  options: {
    id: string;
    labelKey: string;
    color?: string;
  }[];
};

export type Module = {
  id: string;
  slug: string;
  category: "basics" | "rooms" | "machines" | "special";
  titleKey: string;
  descriptionKey?: string;
  iconName: string;
  durationMin: number;
  status: "available" | "locked";
  color: string;
  videoUrl?: string;
  steps: Step[];
  checklist: ChecklistItem[];
  quiz: QuizQuestion[];
};

export const MODULES: Module[] = [
  {
    id: "ppe",
    slug: "ppe-usage",
    category: "basics",
    titleKey: "ppe",
    iconName: "ShieldCheck",
    durationMin: 5,
    status: "available",
    color: "#2E8B57",
    steps: [],
    checklist: [],
    quiz: [],
  },
  {
    id: "cloth",
    slug: "cloth-color-coding",
    category: "basics",
    titleKey: "clothCoding",
    iconName: "Sparkles",
    durationMin: 4,
    status: "available",
    color: "#3B82F6",
    steps: [],
    checklist: [],
    quiz: [],
  },
  {
    id: "bathroom",
    slug: "bathroom-standard",
    category: "rooms",
    titleKey: "bathroomStandard",
    iconName: "Bath",
    durationMin: 12,
    status: "available",
    color: "#4B8EC8",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      { id: 1, titleKey: "bath1t", bodyKey: "bath1b", iconBg: "#E0F2FE", iconName: "Wind" },
      { id: 2, titleKey: "bath2t", bodyKey: "bath2b", iconBg: "#FEF3C7", iconName: "ShieldCheck" },
      {
        id: 3,
        titleKey: "bath3t",
        bodyKey: "bath3b",
        iconBg: "#DBEAFE",
        iconName: "FlaskConical",
        chip: { label: "1:10", color: "#4B8EC8" },
      },
      {
        id: 4,
        titleKey: "bath4t",
        bodyKey: "bath4b",
        iconBg: "#FEF3C7",
        iconName: "Clock",
        chip: { label: "5 min", color: "#F4A621" },
      },
      {
        id: 5,
        titleKey: "bath5t",
        bodyKey: "bath5b",
        iconBg: "#FEE2E2",
        iconName: "Hand",
        chip: { label: "RED", color: "#D9434A" },
      },
      { id: 6, titleKey: "bath6t", bodyKey: "bath6b", iconBg: "#DBEAFE", iconName: "Droplets" },
      { id: 7, titleKey: "bath7t", bodyKey: "bath7b", iconBg: "#E6F4ED", iconName: "Sparkles" },
    ],
    checklist: [
      { key: "chk1" },
      { key: "chk2" },
      { key: "chk3" },
      { key: "chk4" },
      { key: "chk5" },
      { key: "chk6" },
      { key: "chk7" },
      { key: "chk8" },
    ],
    quiz: [
      {
        id: "q1",
        questionKey: "qBathQ",
        correctValue: "red",
        options: [
          { id: "red", labelKey: "qRed", color: "#D9434A" },
          { id: "yellow", labelKey: "qYellow", color: "#F4C842" },
          { id: "blue", labelKey: "qBlue", color: "#3B82F6" },
          { id: "green", labelKey: "qGreen", color: "#5BA055" },
        ],
      },
      {
        id: "q2",
        questionKey: "qPPEQ",
        correctValue: "gloves",
        options: [
          { id: "gloves", labelKey: "qGloves" },
          { id: "apron", labelKey: "qApron" },
          { id: "nothing", labelKey: "qNothing" },
          { id: "goggles", labelKey: "qGoggles" },
        ],
      },
      {
        id: "q3",
        questionKey: "qDilutionQ",
        correctValue: "1to10",
        options: [
          { id: "1to5", labelKey: "q1to5" },
          { id: "1to10", labelKey: "q1to10" },
          { id: "1to20", labelKey: "q1to20" },
          { id: "undiluted", labelKey: "qUndiluted" },
        ],
      },
    ],
  },
  {
    id: "bedroom",
    slug: "bedroom-standard",
    category: "rooms",
    titleKey: "bedroomStandard",
    iconName: "Bed",
    durationMin: 8,
    status: "locked",
    color: "#7C3AED",
    steps: [],
    checklist: [],
    quiz: [],
  },
  {
    id: "kitchen",
    slug: "kitchen-standard",
    category: "rooms",
    titleKey: "kitchenStandard",
    iconName: "ChefHat",
    durationMin: 14,
    status: "locked",
    color: "#F4A621",
    steps: [],
    checklist: [],
    quiz: [],
  },
  {
    id: "singledisc",
    slug: "single-disc-machine",
    category: "machines",
    titleKey: "singleDisc",
    iconName: "RotateCw",
    durationMin: 18,
    status: "locked",
    color: "#1F2A3A",
    steps: [],
    checklist: [],
    quiz: [],
  },
  {
    id: "sofa",
    slug: "sofa-shampooing",
    category: "special",
    titleKey: "sofaShampoo",
    iconName: "Sofa",
    durationMin: 22,
    status: "locked",
    color: "#D9434A",
    steps: [],
    checklist: [],
    quiz: [],
  },
  {
    id: "descaling",
    slug: "bathroom-descaling",
    category: "special",
    titleKey: "descaling",
    iconName: "Droplets",
    durationMin: 15,
    status: "locked",
    color: "#0EA5E9",
    steps: [],
    checklist: [],
    quiz: [],
  },
];

export function getModuleBySlug(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}
