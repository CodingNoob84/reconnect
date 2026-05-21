
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