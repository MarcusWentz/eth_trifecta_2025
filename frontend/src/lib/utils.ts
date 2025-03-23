import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely check if we're running in a browser environment
 * Used to prevent SSR issues with recharts
 */
export const isBrowser = typeof window !== 'undefined'
