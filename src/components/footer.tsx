'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const accessLogoSrc = '/logo/access.svg';

export function Footer() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Check if user is within 200px of the bottom or at the very bottom
      const isBottom = windowHeight + scrollTop >= documentHeight - 200;
      setIsAtBottom(isBottom);
    };

    // Don't check on mount - start hidden
    // handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <footer className={`footer ${isAtBottom ? 'footer-visible' : 'footer-hidden'}`}>
      <p className="footer-text">
        <Image src={accessLogoSrc} alt="ACCESS Logo" width={32} height={32} className="footer-logo" />
        <span className="max-lg:hidden">© 2025 by The Association of Computer Engineering Students</span>
        <span className="lg:hidden">© ACCESS 2025</span>
      </p>
      <nav className="footer-links">
        <a href="https://www.facebook.com/AccessDLSU/" aria-label="ACCESS DLSU on Facebook" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com/dlsu_access/" aria-label="ACCESS DLSU on Instagram" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://github.com/ACCESS-DLSU" aria-label="ACCESS DLSU on GitHub" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/company/accessdlsu/" aria-label="ACCESS DLSU on LinkedIn" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </nav>
    </footer>
  );
}
