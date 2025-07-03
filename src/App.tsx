import type { Component, JSX } from 'solid-js';
import { createSignal, onMount, createEffect } from 'solid-js';

import styles from './App.module.css';

import accessLogoSrc from '/src/assets/logo/access.png';

const App: Component<{ children?: JSX.Element }> = (props) => {
  const [activeRoute, setActiveRoute] = createSignal('/');
  const [sliderStyle, setSliderStyle] = createSignal('');
  const [isAnimating, setIsAnimating] = createSignal(false);
  let animatingTimeout: number;
  let navList: HTMLElement | undefined;
  let navRef: HTMLUListElement | undefined;

  const isActive = (route: string) => activeRoute() === route;

  let debugPen: HTMLDivElement | undefined;
  let feImage: SVGFEImageElement | undefined;
  let redChannel: SVGFEDisplacementMapElement | undefined;
  let greenChannel: SVGFEDisplacementMapElement | undefined;
  let blueChannel: SVGFEDisplacementMapElement | undefined;
  let feGaussianBlur: SVGFEGaussianBlurElement | undefined;

  let config = {
    icons: false,
    scale: -180,
    border: 0.07,
    lightness: 50,
    blend: 'difference',
    x: 'R',
    y: 'B',
    alpha: 0.93,
    blur: 11,
    r: 0,
    g: 10,
    b: 20,
    // these are the ones that usually change
    width: 200,
    height: 80,
    displace: 0,
    frost: 0,
    radius: 28
  };
  const buildDisplacementImage = () => {
    const border = Math.min(config.width, config.height) * (config.border * 0.5);
    const kids = `
      <svg class="displacement-image" viewBox="0 0 ${config.width} ${config.height
      }" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <!-- backdrop -->
        <rect x="0" y="0" width="${config.width}" height="${config.height
      }" fill="black"></rect>
        <!-- red linear -->
        <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius
      }" fill="url(#red)" />
        <!-- blue linear -->
        <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius
      }" fill="url(#blue)" style="mix-blend-mode: ${config.blend}" />
        <!-- block out distortion -->
        <rect x="${border}" y="${Math.min(config.width, config.height) * (config.border * 0.5)
      }" width="${config.width - border * 2}" height="${config.height - border * 2
      }" rx="${config.radius}" fill="hsl(0 0% ${config.lightness}% / ${config.alpha
      }" style="filter:blur(${config.blur}px)" />
      </svg>
      <div class="label">
        <span>displacement image</span>
      </div>
    `;

    if (debugPen) {
      debugPen.innerHTML = kids;
    }

    const svgEl = debugPen?.querySelector('.displacement-image') as SVGSVGElement;
    if (svgEl) {
      const serialized = new XMLSerializer().serializeToString(svgEl);
      const encoded = encodeURIComponent(serialized);

      feImage?.setAttribute('href', `data:image/svg+xml,${encoded}`);

      [redChannel, greenChannel, blueChannel].forEach(ch => {
        ch?.setAttribute('xChannelSelector', config.x);
        ch?.setAttribute('yChannelSelector', config.y);
      });
    }
  }


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

        setSliderStyle(`left: ${left}px; width: ${width}px;`);
      }
    }
  };

  const handleNavClick = (route: string) => {
    setActiveRoute(route);
    setIsAnimating(true);

    // Get animation duration from CSS
    const slider = navRef!.querySelector(`.${styles.activeSlider}`) as HTMLElement;
    const computedStyle = getComputedStyle(slider);
    const animationDuration = computedStyle.animationDuration;

    // Convert CSS duration (e.g., "0.3s") to milliseconds
    const durationMs = parseFloat(animationDuration) * 1000;

    if (isAnimating()) {
      clearTimeout(animatingTimeout);
      setIsAnimating(false);
      requestAnimationFrame(() => setIsAnimating(true));
    }

    animatingTimeout = setTimeout(() => setIsAnimating(false), durationMs);
  };

  onMount(() => {
    if (navList) {
      config.width = navList.getBoundingClientRect().width;
      config.height = navList.getBoundingClientRect().height;

      if (!document.startViewTransition) {
        navList.classList.add(styles.lowQuality);
      }
      else document.startViewTransition(() => {
        buildDisplacementImage();
        [redChannel, greenChannel, blueChannel].forEach(ch => {
          ch?.setAttribute('scale', String(config.scale));
        });
        redChannel?.setAttribute('scale', String(config.scale + config.r));
        greenChannel?.setAttribute('scale', String(config.scale + config.g));
        blueChannel?.setAttribute('scale', String(config.scale + config.b));
        feGaussianBlur?.setAttribute('stdDeviation', String(config.displace));
      });
    }

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
          <img src={accessLogoSrc} alt="ACCESS Logo" />
          <span>ACCESS</span>
        </a>
        <nav class={`${styles.navList} ${isAnimating() ? styles.animating : ''}`} ref={navList}>
          <ul ref={navRef}>
            <div class={`${styles.activeSlider} ${isAnimating() ? styles.animating : ''}`} style={sliderStyle()}></div>
            <li class={isActive('/') ? styles.active : ''}>
              <a href="/" onClick={() => handleNavClick('/')}>Home</a>
            </li>
            <li class={isActive('/teaser') ? styles.active : ''}>
              <a href="/teaser" onClick={() => handleNavClick('/teaser')}>Teaser</a>
            </li>
            <li class={isActive('/events') ? styles.active : ''}>
              <a href="/events" onClick={() => handleNavClick('/events')}>Events</a>
            </li>
            <li class={isActive('/reviewers') ? styles.active : ''}>
              <a href="/reviewers" onClick={() => handleNavClick('/reviewers')}>Reviewers</a>
            </li>
            <li class={isActive('/tutorials') ? styles.active : ''}>
              <a href="/tutorials" onClick={() => handleNavClick('/tutorials')}>Tutorials</a>
            </li>
            <li class={isActive('/members-hub') ? styles.active : ''}>
              <a href="/members-hub" onClick={() => handleNavClick('/members-hub')}>Members Hub</a>
            </li>
            <li class={isActive('/contact') ? styles.active : ''}>
              <a href="/contact" onClick={() => handleNavClick('/contact')}>Contact</a>
            </li>
          </ul>
          <svg class={styles.filter} xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* https://github.com/archisvaze/liquid-glass/ */}
              <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
                <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
                <feDisplacementMap in="SourceGraphic" in2="blurred" scale="77" xChannelSelector="R"
                  yChannelSelector="G" />
              </filter>
              {/* https://codepen.io/jh3y/pen/EajLxJV */}
              <filter id="lg-filter" color-interpolation-filters="sRGB">
                <feImage
                  ref={feImage}
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  result="map"
                ></feImage>
                <feDisplacementMap
                  ref={redChannel}
                  in="SourceGraphic"
                  in2="map"
                  id="redchannel"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="dispRed"
                />
                <feColorMatrix
                  in="dispRed"
                  type="matrix"
                  values="1 0 0 0 0
                          0 0 0 0 0
                          0 0 0 0 0
                          0 0 0 1 0"
                  result="red"
                />
                <feDisplacementMap
                  ref={greenChannel}
                  in="SourceGraphic"
                  in2="map"
                  id="greenchannel"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="dispGreen"
                />
                <feColorMatrix
                  in="dispGreen"
                  type="matrix"
                  values="0 0 0 0 0
                          0 1 0 0 0
                          0 0 0 0 0
                          0 0 0 1 0"
                  result="green"
                />
                <feDisplacementMap
                  ref={blueChannel}
                  in="SourceGraphic"
                  in2="map"
                  id="bluechannel"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="dispBlue"
                />
                <feColorMatrix
                  in="dispBlue"
                  type="matrix"
                  values="0 0 0 0 0
                          0 0 0 0 0
                          0 0 1 0 0
                          0 0 0 1 0"
                  result="blue"
                />
                <feBlend in="red" in2="green" mode="screen" result="rg" />
                <feBlend in="rg" in2="blue" mode="screen" result="output" />
                <feGaussianBlur ref={feGaussianBlur} in="output" stdDeviation="0.7" />
              </filter>
            </defs>
          </svg>
        </nav>
        <div ref={debugPen} style="display: none"></div>
      </header>

      <main class={styles.main}>
        {props.children}
      </main>

      <footer class={styles.footer}>
        <p class={styles.footerText}>
          <img src={accessLogoSrc} alt="ACCESS Logo" />
          <span>© 2025 by The Association of Computer Engineering Students</span>
        </p>
        <nav class={styles.footerLinks}>
          <a href="https://www.facebook.com/AccessDLSU/"><i class="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/dlsu_access/"><i class="fab fa-instagram"></i></a>
          <a href="https://github.com/ACCESS-DLSU"><i class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/company/accessdlsu/"><i class="fab fa-linkedin-in"></i></a>
        </nav>
      </footer>
    </>
  );
};

export default App;
