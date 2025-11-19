import { useCallback } from 'react';

// Hook that returns a scroll-to function. Pass the target element id to scroll to.
export const useScrollTo = () => {
  const handleClick = useCallback((elementId: string) => {
    if (!elementId) return;
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.warn(`Element with id "${elementId}" not found`);
    }
  }, []);

  return handleClick;
};
