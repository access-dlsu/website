'use client';

import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import styles from '@/app/layout.module.css';

export function LoadingBar() {
  let loadingBar = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Find the closest anchor tag
      const anchor = target.closest('a');

      if (anchor) {
        const targetUrl = new URL(anchor.href);
        const currentUrl = new URL(window.location.href);

        // Check if it's an internal navigation to a different page
        if (targetUrl.origin === currentUrl.origin && targetUrl.pathname !== currentUrl.pathname) {
          loadingBar.current?.classList.add(styles.animating);
        }
      }
    };

    // Add the click listener to the document
    document.addEventListener('click', handleAnchorClick);

    // On a new page load, remove the animating class
    loadingBar.current?.classList.remove(styles.animating);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [pathname]); // Rerun the effect when the pathname changes

  return (
    <div ref={loadingBar} className={styles.loadingBar} />
  );
}
