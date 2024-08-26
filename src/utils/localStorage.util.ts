'use client'

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function getLocalStorageItem<T>(key: string): T | null {
  if (!isClient()) return null;
  const item = localStorage.getItem(key);
  console.log(item, "item")
  return item ? JSON.parse(item) : null;
}

function setLocalStorageItem<T>(key: string, value: T): void {
  if (!isClient()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

function removeLocalStorageItem(key: string): void {
  if (!isClient()) return;
  localStorage.removeItem(key);
}

export const localStorageUtil = {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
};
