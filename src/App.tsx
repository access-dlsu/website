import type { Component, JSX } from 'solid-js';
import { createSignal, onMount, createEffect } from 'solid-js';

import styles from './App.module.css';

import accessLogoSrc from '/src/assets/logo/access.png';

const App: Component<{ children?: JSX.Element }> = (props) => {
  const [activeRoute, setActiveRoute] = createSignal('/');
  const [sliderStyle, setSliderStyle] = createSignal('');
  let navRef: HTMLUListElement | undefined;

  const isActive = (route: string) => activeRoute() === route;

  const updateSliderPosition = () => {
    if (!navRef) return;
    
    const activeLink = navRef.querySelector(`a[href="${activeRoute()}"]`);
    if (activeLink) {
      const parentLi = activeLink.parentElement;
      if (parentLi) {
        const rect = parentLi.getBoundingClientRect();
        const navRect = navRef.getBoundingClientRect();
        const left = rect.left - navRect.left;
        const width = rect.width;
        
        setSliderStyle(`transform: translateX(${left}px); width: ${width}px;`);
      }
    }
  };

  onMount(() => {
    setActiveRoute(window.location.pathname);
    
    // Listen for browser back/forward navigation
    const handlePopState = () => {
      setActiveRoute(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  });

  createEffect(() => {
    // Update slider position when active route changes
    activeRoute();
    setTimeout(updateSliderPosition, 0);
  });

  return (
    <>
      <header class={styles.header}>
        <a href="/" class={styles.wordmark}>
          <img src={accessLogoSrc} alt="ACCESS Logo"/>
          <span>ACCESS</span>
        </a>
        <nav class={styles.navList}>
          <ul ref={navRef}>
            <div class={styles.activeSlider} style={sliderStyle()}></div>
            <li class={isActive('/') ? styles.active : ''}>
              <a href="/" onClick={() => setActiveRoute('/')}>Home</a>
            </li>
            <li class={isActive('/teaser') ? styles.active : ''}>
              <a href="/teaser" onClick={() => setActiveRoute('/teaser')}>Teaser</a>
            </li>
            <li class={isActive('/events') ? styles.active : ''}>
              <a href="/events" onClick={() => setActiveRoute('/events')}>Events</a>
            </li>
            <li class={isActive('/reviewers') ? styles.active : ''}>
              <a href="/reviewers" onClick={() => setActiveRoute('/reviewers')}>Reviewers</a>
            </li>
            <li class={isActive('/tutorials') ? styles.active : ''}>
              <a href="/tutorials" onClick={() => setActiveRoute('/tutorials')}>Tutorials</a>
            </li>
            <li class={isActive('/contact') ? styles.active : ''}>
              <a href="/contact" onClick={() => setActiveRoute('/contact')}>Contact</a>
            </li>
          </ul>
        </nav>
        <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;overflow:hidden">
          <defs>
            <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap in="SourceGraphic" in2="blurred" scale="77" xChannelSelector="R"
                  yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      </header>
      
      <main class={styles.main}>
        {props.children}
      </main>
      
      <footer class={styles.footer}>
        {/* Insert footer content */}
      </footer>
    </>
  );
};

export default App;
