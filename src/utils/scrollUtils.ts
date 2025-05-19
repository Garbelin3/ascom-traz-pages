
/**
 * Smoothly scrolls to an element with the specified ID
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top of the element (default: 0)
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Gets the current scroll position
 * @returns The current scroll position from the top of the page
 */
export const getScrollPosition = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

/**
 * Checks if an element is in viewport
 * @param element - The DOM element to check
 * @param offset - Optional offset (default: 0)
 * @returns Boolean indicating if the element is in viewport
 */
export const isElementInViewport = (element: HTMLElement, offset: number = 0): boolean => {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
};
