function getLocalStorageItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function setLocalStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeLocalStorageItem(key: string): void {
  localStorage.removeItem(key);
}

export const localStorageUtil = {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
}