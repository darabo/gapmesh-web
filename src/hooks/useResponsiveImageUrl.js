import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive image URLs based on viewport width.
 * Handles debouncing to avoid excessive re-renders during window resizing.
 *
 * @param {string} baseUrl - The Unsplash image URL pattern with {width} placeholder
 * @returns {string} The responsive image URL
 */
export function useResponsiveImageUrl(baseUrl) {
  // Calculate initial width immediately to avoid flash
  const getImageWidth = (viewportWidth) => {
    if (viewportWidth <= 768) return 800;
    if (viewportWidth <= 1440) return 1400;
    return 1920;
  };

  // Initialize with the correct URL based on current viewport
  const initialWidth = getImageWidth(window.innerWidth);
  const initialUrl = baseUrl.replace('{width}', initialWidth);

  const [imageUrl, setImageUrl] = useState(initialUrl);

  useEffect(() => {
    let timeoutId = null;
    let currentWidth = initialWidth;

    const updateImageUrl = () => {
      const viewportWidth = window.innerWidth;
      const newWidth = getImageWidth(viewportWidth);

      // Only update if the breakpoint actually changed
      if (newWidth !== currentWidth) {
        currentWidth = newWidth;
        setImageUrl(baseUrl.replace('{width}', newWidth));
      }
    };

    // Debounced resize handler - only fires 150ms after user stops resizing
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(updateImageUrl, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [baseUrl, initialWidth]);

  return imageUrl;
}
