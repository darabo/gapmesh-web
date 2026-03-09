import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive image URLs based on viewport width.
 * Handles debouncing to avoid excessive re-renders during window resizing.
 *
 * @param {string} baseUrl - The Unsplash image URL pattern with {width} placeholder
 * @returns {string} The responsive image URL
 */
export function useResponsiveImageUrl(baseUrl) {
  const getConnectionProfile = () => {
    if (typeof navigator === 'undefined' || !navigator.connection) {
      return { saveData: false, effectiveType: '' };
    }

    return {
      saveData: Boolean(navigator.connection.saveData),
      effectiveType: navigator.connection.effectiveType || '',
    };
  };

  const getImageWidth = (viewportWidth, connection) => {
    const effectiveType = connection.effectiveType;

    // Respect user's data saver and degraded network hints first.
    if (connection.saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 480;
    }
    if (effectiveType === '3g') {
      return 640;
    }

    if (viewportWidth <= 768) return 800;
    if (viewportWidth <= 1440) return 1400;
    return 1920;
  };

  // Initialize with the correct URL based on current viewport
  const initialViewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const initialConnection = getConnectionProfile();
  const initialWidth = getImageWidth(initialViewportWidth, initialConnection);
  const initialUrl = baseUrl.replace('{width}', initialWidth);

  const [imageUrl, setImageUrl] = useState(initialUrl);

  useEffect(() => {
    let timeoutId = null;
    let currentWidth = getImageWidth(window.innerWidth || 1280, getConnectionProfile());

    const updateImageUrl = () => {
      const viewportWidth = window.innerWidth || 1280;
      const connection = getConnectionProfile();
      const newWidth = getImageWidth(viewportWidth, connection);

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
    navigator.connection?.addEventListener?.('change', updateImageUrl);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
      navigator.connection?.removeEventListener?.('change', updateImageUrl);
    };
  }, [baseUrl]);

  return imageUrl;
}
