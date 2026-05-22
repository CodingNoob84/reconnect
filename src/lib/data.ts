import { Building2, Cog, Laptop, Radio, Zap, type LucideIcon } from "lucide-react";

export type Department =
  | "mech"
  | "eee"
  | "ece"
  | "cse"
  | "civil";

export type DepartmentOption = {
  id: number;
  value: Department;
  label: string;
  short: string;
  icon: LucideIcon;
  stat: string;
  description: string;
};

export const DEPARTMENT_OPTIONS :DepartmentOption[] = [
  { id: 1, value: "mech", label: "Mechanical Engineering", short:"Mechanical", icon:Cog,stat: '75',
    description: 'Designing machines and industrial systems.', },
  { id: 2, value: "eee", label: "Electrical and Electronics Engineering", short:"Electrical", icon:Zap,  stat: '72',
    description: 'Power systems and automation solutions.', },
  { id: 3, value: "ece", label: "Electronics and Communication Engineering", short:"Electronics",icon:Radio,     stat: '74',
    description: 'Embedded tech and modern electronics.', },
  { id: 4, value: "cse", label: "Computer Science and Engineering", short:"Computer",icon:Laptop,   stat: '73',
    description: 'AI systems and digital experiences.', },
  { id: 5, value: "civil", label: "Civil Engineering", short:"Civil",icon:Building2,  stat: '10',
    description: 'Sustainable infra and landmark structures.', },
];

export const INDUSTRY_OPTIONS = [
  "Mechanical",
  "Electrical & Electronics",
  "Electronics & Communication",
  "Computer Science",
  "Civil",
  "Government / Public Sector",
  "Police / Law Enforcement",
  "Legal / Lawyer",
  "Medical / Healthcare",
  "Home Maker",
  "Education",
  "Finance / Banking",
  "IT Services",
  "Other",
];