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
  mistakeKey?: string;
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
  // === BASICS ===
  {
    id: "ppe",
    slug: "ppe-safety",
    category: "basics",
    titleKey: "ppeTitle",
    mistakeKey: "ppeMistake",
    iconName: "ShieldCheck",
    durationMin: 5,
    status: "available",
    color: "#2E8B57",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      { id: 1, titleKey: "ppe1t", bodyKey: "ppe1b", iconBg: "#FEF3C7", iconName: "ShieldCheck" },
      {
        id: 2,
        titleKey: "ppe2t",
        bodyKey: "ppe2b",
        iconBg: "#FEE2E2",
        iconName: "Hand",
        chip: { label: "Always", color: "#DC4136" },
      },
      { id: 3, titleKey: "ppe3t", bodyKey: "ppe3b", iconBg: "#FEF3C7", iconName: "ShieldCheck" },
      { id: 4, titleKey: "ppe4t", bodyKey: "ppe4b", iconBg: "#E0F2FE", iconName: "Eye" },
      { id: 5, titleKey: "ppe5t", bodyKey: "ppe5b", iconBg: "#FBEAE9", iconName: "AlertTriangle" },
    ],
    checklist: [
      { key: "ppeChk1" },
      { key: "ppeChk2" },
      { key: "ppeChk3" },
      { key: "ppeChk4" },
      { key: "ppeChk5" },
      { key: "ppeChk6" },
    ],
    quiz: [
      {
        id: "q1",
        questionKey: "ppeQ1",
        correctValue: "a",
        options: [
          { id: "a", labelKey: "ppeQ1a" },
          { id: "b", labelKey: "ppeQ1b" },
          { id: "c", labelKey: "ppeQ1c" },
          { id: "d", labelKey: "ppeQ1d" },
        ],
      },
      {
        id: "q2",
        questionKey: "ppeQ2",
        correctValue: "a",
        options: [
          { id: "a", labelKey: "ppeQ2a" },
          { id: "b", labelKey: "ppeQ2b" },
          { id: "c", labelKey: "ppeQ2c" },
          { id: "d", labelKey: "ppeQ2d" },
        ],
      },
      {
        id: "q3",
        questionKey: "ppeQ3",
        correctValue: "a",
        options: [
          { id: "a", labelKey: "ppeQ3a" },
          { id: "b", labelKey: "ppeQ3b" },
          { id: "c", labelKey: "ppeQ3c" },
          { id: "d", labelKey: "ppeQ3d" },
        ],
      },
    ],
  },
  {
    id: "cloth",
    slug: "cloth-coding",
    category: "basics",
    titleKey: "clothTitle",
    mistakeKey: "clothMistake",
    iconName: "Sparkles",
    durationMin: 4,
    status: "available",
    color: "#3B82F6",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      {
        id: 1,
        titleKey: "cloth1t",
        bodyKey: "cloth1b",
        iconBg: "#FEE2E2",
        iconName: "Hand",
        chip: { label: "RED", color: "#D9434A" },
      },
      {
        id: 2,
        titleKey: "cloth2t",
        bodyKey: "cloth2b",
        iconBg: "#FEF3C7",
        iconName: "Sparkles",
        chip: { label: "YELLOW", color: "#F4A621" },
      },
      {
        id: 3,
        titleKey: "cloth3t",
        bodyKey: "cloth3b",
        iconBg: "#DBEAFE",
        iconName: "Sparkles",
        chip: { label: "BLUE", color: "#3B82F6" },
      },
      {
        id: 4,
        titleKey: "cloth4t",
        bodyKey: "cloth4b",
        iconBg: "#E6F4ED",
        iconName: "Sparkles",
        chip: { label: "GREEN", color: "#2E8B57" },
      },
      {
        id: 5,
        titleKey: "cloth5t",
        bodyKey: "cloth5b",
        iconBg: "#F1F5F9",
        iconName: "Sparkles",
        chip: { label: "WHITE", color: "#64748B" },
      },
      { id: 6, titleKey: "cloth6t", bodyKey: "cloth6b", iconBg: "#FBEAE9", iconName: "AlertTriangle" },
    ],
    checklist: [
      { key: "clothChk1" },
      { key: "clothChk2" },
      { key: "clothChk3" },
      { key: "clothChk4" },
      { key: "clothChk5" },
      { key: "clothChk6" },
      { key: "clothChk7" },
    ],
    quiz: [
      {
        id: "q1",
        questionKey: "clothQ1",
        correctValue: "a",
        options: [
          { id: "a", labelKey: "clothQ1a", color: "#D9434A" },
          { id: "b", labelKey: "clothQ1b", color: "#F4C842" },
          { id: "c", labelKey: "clothQ1c", color: "#3B82F6" },
          { id: "d", labelKey: "clothQ1d", color: "#5BA055" },
        ],
      },
      {
        id: "q2",
        questionKey: "clothQ2",
        correctValue: "b",
        options: [
          { id: "a", labelKey: "clothQ2a", color: "#D9434A" },
          { id: "b", labelKey: "clothQ2b", color: "#5BA055" },
          { id: "c", labelKey: "clothQ2c", color: "#F4C842" },
          { id: "d", labelKey: "clothQ2d", color: "#3B82F6" },
        ],
      },
      {
        id: "q3",
        questionKey: "clothQ3",
        correctValue: "c",
        options: [
          { id: "a", labelKey: "clothQ3a", color: "#D9434A" },
          { id: "b", labelKey: "clothQ3b", color: "#E2E8F0" },
          { id: "c", labelKey: "clothQ3c", color: "#3B82F6" },
          { id: "d", labelKey: "clothQ3d", color: "#F4C842" },
        ],
      },
    ],
  },

  // === ROOMS ===
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
    titleKey: "kitchenTitle",
    mistakeKey: "kitchenMistake",
    iconName: "ChefHat",
    durationMin: 14,
    status: "available",
    color: "#F4A621",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      { id: 1, titleKey: "kitchen1t", bodyKey: "kitchen1b", iconBg: "#E0F2FE", iconName: "Wind" },
      {
        id: 2,
        titleKey: "kitchen2t",
        bodyKey: "kitchen2b",
        iconBg: "#E6F4ED",
        iconName: "ShieldCheck",
        chip: { label: "GREEN", color: "#2E8B57" },
      },
      { id: 3, titleKey: "kitchen3t", bodyKey: "kitchen3b", iconBg: "#FEF3C7", iconName: "Sparkles" },
      {
        id: 4,
        titleKey: "kitchen4t",
        bodyKey: "kitchen4b",
        iconBg: "#DBEAFE",
        iconName: "FlaskConical",
        chip: { label: "2 min", color: "#4B8EC8" },
      },
      {
        id: 5,
        titleKey: "kitchen5t",
        bodyKey: "kitchen5b",
        iconBg: "#FEF3C7",
        iconName: "FlaskConical",
        chip: { label: "3 min", color: "#F4A621" },
      },
      {
        id: 6,
        titleKey: "kitchen6t",
        bodyKey: "kitchen6b",
        iconBg: "#DBEAFE",
        iconName: "Sparkles",
        chip: { label: "1:20", color: "#4B8EC8" },
      },
      { id: 7, titleKey: "kitchen7t", bodyKey: "kitchen7b", iconBg: "#E6F4ED", iconName: "Droplets" },
      { id: 8, titleKey: "kitchen8t", bodyKey: "kitchen8b", iconBg: "#F1F5F9", iconName: "Sparkles" },
    ],
    checklist: [
      { key: "kitchenChk1" },
      { key: "kitchenChk2" },
      { key: "kitchenChk3" },
      { key: "kitchenChk4" },
      { key: "kitchenChk5" },
      { key: "kitchenChk6" },
      { key: "kitchenChk7" },
      { key: "kitchenChk8" },
    ],
    quiz: [
      {
        id: "q1",
        questionKey: "kitchenQ1",
        correctValue: "d",
        options: [
          { id: "a", labelKey: "kitchenQ1a", color: "#D9434A" },
          { id: "b", labelKey: "kitchenQ1b", color: "#F4C842" },
          { id: "c", labelKey: "kitchenQ1c", color: "#3B82F6" },
          { id: "d", labelKey: "kitchenQ1d", color: "#5BA055" },
        ],
      },
      {
        id: "q2",
        questionKey: "kitchenQ2",
        correctValue: "a",
        options: [
          { id: "a", labelKey: "kitchenQ2a" },
          { id: "b", labelKey: "kitchenQ2b" },
          { id: "c", labelKey: "kitchenQ2c" },
          { id: "d", labelKey: "kitchenQ2d" },
        ],
      },
      {
        id: "q3",
        questionKey: "kitchenQ3",
        correctValue: "c",
        options: [
          { id: "a", labelKey: "kitchenQ3a" },
          { id: "b", labelKey: "kitchenQ3b" },
          { id: "c", labelKey: "kitchenQ3c" },
          { id: "d", labelKey: "kitchenQ3d" },
        ],
      },
    ],
  },

  // === MACHINES ===
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

  // === SPECIAL ===
  {
    id: "sofa",
    slug: "sofa-shampoo",
    category: "special",
    titleKey: "sofaTitle",
    mistakeKey: "sofaMistake",
    iconName: "Sofa",
    durationMin: 22,
    status: "available",
    color: "#D9434A",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      { id: 1, titleKey: "sofa1t", bodyKey: "sofa1b", iconBg: "#FEF3C7", iconName: "Eye" },
      { id: 2, titleKey: "sofa2t", bodyKey: "sofa2b", iconBg: "#F1F5F9", iconName: "Wind" },
      {
        id: 3,
        titleKey: "sofa3t",
        bodyKey: "sofa3b",
        iconBg: "#E0F2FE",
        iconName: "FlaskConical",
        chip: { label: "5 min", color: "#F4A621" },
      },
      {
        id: 4,
        titleKey: "sofa4t",
        bodyKey: "sofa4b",
        iconBg: "#FEE2E2",
        iconName: "Sparkles",
        chip: { label: "5 min", color: "#F4A621" },
      },
      {
        id: 5,
        titleKey: "sofa5t",
        bodyKey: "sofa5b",
        iconBg: "#DBEAFE",
        iconName: "RotateCw",
        chip: { label: "1:20", color: "#4B8EC8" },
      },
      { id: 6, titleKey: "sofa6t", bodyKey: "sofa6b", iconBg: "#E6F4ED", iconName: "Droplets" },
      { id: 7, titleKey: "sofa7t", bodyKey: "sofa7b", iconBg: "#F1F5F9", iconName: "Sparkles" },
      {
        id: 8,
        titleKey: "sofa8t",
        bodyKey: "sofa8b",
        iconBg: "#FEF3C7",
        iconName: "Clock",
        chip: { label: "4-6 hr", color: "#F4A621" },
      },
    ],
    checklist: [
      { key: "sofaChk1" },
      { key: "sofaChk2" },
      { key: "sofaChk3" },
      { key: "sofaChk4" },
      { key: "sofaChk5" },
      { key: "sofaChk6" },
      { key: "sofaChk7" },
      { key: "sofaChk8" },
    ],
    quiz: [
      {
        id: "q1",
        questionKey: "sofaQ1",
        correctValue: "a",
        options: [
          { id: "a", labelKey: "sofaQ1a" },
          { id: "b", labelKey: "sofaQ1b" },
          { id: "c", labelKey: "sofaQ1c" },
          { id: "d", labelKey: "sofaQ1d" },
        ],
      },
      {
        id: "q2",
        questionKey: "sofaQ2",
        correctValue: "c",
        options: [
          { id: "a", labelKey: "sofaQ2a" },
          { id: "b", labelKey: "sofaQ2b" },
          { id: "c", labelKey: "sofaQ2c" },
          { id: "d", labelKey: "sofaQ2d" },
        ],
      },
      {
        id: "q3",
        questionKey: "sofaQ3",
        correctValue: "c",
        options: [
          { id: "a", labelKey: "sofaQ3a" },
          { id: "b", labelKey: "sofaQ3b" },
          { id: "c", labelKey: "sofaQ3c" },
          { id: "d", labelKey: "sofaQ3d" },
        ],
      },
    ],
  },
  {
    id: "mattress",
    slug: "mattress-clean",
    category: "special",
    titleKey: "mattressTitle",
    mistakeKey: "mattressMistake",
    iconName: "Bed",
    durationMin: 18,
    status: "available",
    color: "#7C3AED",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      { id: 1, titleKey: "mattress1t", bodyKey: "mattress1b", iconBg: "#F1F5F9", iconName: "Sparkles" },
      { id: 2, titleKey: "mattress2t", bodyKey: "mattress2b", iconBg: "#E0F2FE", iconName: "Wind" },
      { id: 3, titleKey: "mattress3t", bodyKey: "mattress3b", iconBg: "#FEE2E2", iconName: "FlaskConical" },
      { id: 4, titleKey: "mattress4t", bodyKey: "mattress4b", iconBg: "#FEF3C7", iconName: "Sparkles" },
      {
        id: 5,
        titleKey: "mattress5t",
        bodyKey: "mattress5b",
        iconBg: "#FEF3C7",
        iconName: "Clock",
        chip: { label: "15 min", color: "#F4A621" },
      },
      { id: 6, titleKey: "mattress6t", bodyKey: "mattress6b", iconBg: "#E0F2FE", iconName: "Wind" },
      { id: 7, titleKey: "mattress7t", bodyKey: "mattress7b", iconBg: "#DBEAFE", iconName: "ShieldCheck" },
      {
        id: 8,
        titleKey: "mattress8t",
        bodyKey: "mattress8b",
        iconBg: "#E0F2FE",
        iconName: "Wind",
        chip: { label: "1-2 hr", color: "#F4A621" },
      },
    ],
    checklist: [
      { key: "mattressChk1" },
      { key: "mattressChk2" },
      { key: "mattressChk3" },
      { key: "mattressChk4" },
      { key: "mattressChk5" },
      { key: "mattressChk6" },
      { key: "mattressChk7" },
      { key: "mattressChk8" },
    ],
    quiz: [
      {
        id: "q1",
        questionKey: "mattressQ1",
        correctValue: "b",
        options: [
          { id: "a", labelKey: "mattressQ1a" },
          { id: "b", labelKey: "mattressQ1b" },
          { id: "c", labelKey: "mattressQ1c" },
          { id: "d", labelKey: "mattressQ1d" },
        ],
      },
      {
        id: "q2",
        questionKey: "mattressQ2",
        correctValue: "b",
        options: [
          { id: "a", labelKey: "mattressQ2a" },
          { id: "b", labelKey: "mattressQ2b" },
          { id: "c", labelKey: "mattressQ2c" },
          { id: "d", labelKey: "mattressQ2d" },
        ],
      },
      {
        id: "q3",
        questionKey: "mattressQ3",
        correctValue: "c",
        options: [
          { id: "a", labelKey: "mattressQ3a" },
          { id: "b", labelKey: "mattressQ3b" },
          { id: "c", labelKey: "mattressQ3c" },
          { id: "d", labelKey: "mattressQ3d" },
        ],
      },
    ],
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
