/**
 * Formats a date string into a more readable format
 * @param dateString - The date string to format
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Truncates text to a specified length and adds an ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - The maximum length of the text before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Generates a random ID
 * @param length - The length of the ID (default: 8)
 * @returns A random alphanumeric ID
 */
export const generateId = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Debounce a function call
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to wait before invoking the function
 * @returns A debounced version of the function
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<F>): void => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Scrolls the window to a specific element with an offset
 * @param id - The ID of the element to scroll to
 * @param offset - The offset in pixels from the top of the element (default: 80)
 */
export const scrollToElement = (id: string, offset = 80): void => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  }
};

/**
 * Copies text to the clipboard
 * @param text - The text to copy
 * @returns A promise that resolves when the text has been copied
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    throw err;
  }
};

/**
 * Formats a number with commas as thousand separators
 * @param num - The number to format
 * @returns Formatted number string (e.g., "1,234,567")
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Checks if the current device is a mobile device
 * @returns Boolean indicating if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

/**
 * Safely parses a JSON string
 * @param jsonString - The JSON string to parse
 * @returns The parsed object or null if parsing fails
 */
export const safeJsonParse = <T>(jsonString: string): T | null => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    return null;
  }
};
