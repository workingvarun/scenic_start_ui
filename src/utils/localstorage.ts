// Get a string value from localStorage
export const getDataFromLocalStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting "${key}" from localStorage:`, error);
    return null;
  }
};

// Set a string value in localStorage
export const setDataToLocalStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting "${key}" in localStorage:`, error);
  }
};
