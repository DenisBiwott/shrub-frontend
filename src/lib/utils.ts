import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  const merged = twMerge(clsx(inputs))
  console.log('Merged class names:', merged)
  return merged
}
