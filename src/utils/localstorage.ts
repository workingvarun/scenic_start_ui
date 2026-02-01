// Get a value from localStorage
export const getDataFromLocalStorage = <T = unknown>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    // Try to parse JSON. If it fails, return string as-is
    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  } catch (error) {
    console.error(`Error getting "${key}" from localStorage:`, error);
    return null;
  }
};

// Set a value in localStorage
export const setDataToLocalStorage = (key: string, value: unknown): void => {
  try {
    // If value is primitive (string, number, boolean, null), store as JSON
    // Objects / arrays will also be serialized properly
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  } catch (error) {
    console.error(`Error setting "${key}" in localStorage:`, error);
  }
};
