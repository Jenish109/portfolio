// Storage keys
export const STORAGE_KEYS = {
  THEME: "portfolio-theme",
  CHAT_STATE: "portfolio-chat-state",
  LEADS: "portfolio-leads",
} as const;

/**
 * Safely get item from localStorage (SSR-safe)
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      return defaultValue;
    }
    return JSON.parse(stored) as T;
  } catch (error) {
    console.warn(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely set item in localStorage (SSR-safe)
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
}

/**
 * Safely remove item from localStorage (SSR-safe)
 */
export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
}
