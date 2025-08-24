'use client';

import styles from '@/app/layout.module.css';

const accessLogoSrc = '/img/access.svg';

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          <img src={accessLogoSrc} alt="ACCESS Logo" />
          <span className="max-lg:hidden">© 2025 by The Association of Computer Engineering Students</span>
          <span className="lg:hidden">© ACCESS 2025</span>
        </p>
        <nav className={styles.footerLinks}>
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
    </>
  )
}
