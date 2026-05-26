
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DEPARTMENT_OPTIONS } from './data'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatBirthday = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  })
}

export const getDepartmentLabel = (value: string) => {
  return (
    DEPARTMENT_OPTIONS.find(
      (dept) => dept.value === value
    )?.label ?? value
  )
}


export const getDepartmentIcon = (value: string) => {
    return (
    DEPARTMENT_OPTIONS.find(
      (dept) => dept.value === value
    )?.icon
  )
  };

export const getDepartmentShort = (value: string) => {
 return (
    DEPARTMENT_OPTIONS.find(
      (dept) => dept.value === value
    )?.short
  )
}

export const getTimeAgo=(dateString: string)=> {
  const date = new Date(dateString)
  const now = new Date()

  const seconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000,
  )

  if (seconds < 60) {
    return `${seconds}s ago`
  }

  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes}m ago`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours}h ago`
  }

  const days = Math.floor(hours / 24)

  if (days < 30) {
    return `${days}d ago`
  }

  const months = Math.floor(days / 30)

  if (months < 12) {
    return `${months}mo ago`
  }

  const years = Math.floor(months / 12)

  return `${years}y ago`
}


export const getDaysUntilBirthday = (birthdayStr: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const birthday = new Date(birthdayStr);
  birthday.setFullYear(today.getFullYear());

  if (birthday < today) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = birthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const generateWhatsAppLink = (
  phoneNumber: string,
  name: string
): string => {
  // Keep only digits
  const digits = phoneNumber.replace(/\D/g, "");
  // Take last 10 digits and prepend India code
  const formattedPhone = `91${digits.slice(-10)}`;
  const message = `Happy Birthday ${name}`;

  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    message
  )}`;
};

export const getDeptShortForm = (department: string): string => {
  const deptMap: Record<string, string> = {
    "Computer Science": "CSE",
    "Electrical Engineering": "EEE",
    "Electronics Engineering": "ECE",
    "Mechanical Engineering": "MECH",
    "Civil Engineering": "CIVIL",
  };
  return deptMap[department] || department;
};

export const getRotation = (id: number): string => {
  const rotations = [
    "rotate-1",
    "-rotate-1",
    "rotate-2",
    "-rotate-2",
    "rotate-[0.5deg]",
    "-rotate-[1.5deg]",
  ];
  return rotations[id % rotations.length];
};
