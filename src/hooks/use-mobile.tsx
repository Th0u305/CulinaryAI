
'use client';

import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (to avoid SSR issues)
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Set initial value
      checkIsMobile();

      // Add event listener
      window.addEventListener('resize', checkIsMobile);

      // Clean up
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, []);

  return isMobile;
}
