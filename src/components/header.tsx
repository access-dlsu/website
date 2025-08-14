'use client';

import styles from '@/app/layout.module.css';
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import { Poppins } from 'next/font/google';

const accessLogoSrc = '/logo/access.png';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export function Header() {
  const pathname = usePathname();
  const isActive = (route: string) => pathname === route;

  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLowQuality, setIsLowQuality] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  let animatingTimeout: ReturnType<typeof setTimeout>;
  let navList = useRef<HTMLElement>(null);
  let navRef = useRef<HTMLUListElement>(null);
  let navMoreRef = useRef<HTMLSpanElement>(null);
  let slider = useRef<HTMLDivElement>(null);

  let debugPen = useRef<HTMLDivElement>(null);
  let feImage = useRef<SVGFEImageElement>(null);
  let redChannel = useRef<SVGFEDisplacementMapElement>(null);
  let greenChannel = useRef<SVGFEDisplacementMapElement>(null);
  let blueChannel = useRef<SVGFEDisplacementMapElement>(null);
  let feGaussianBlur = useRef<SVGFEGaussianBlurElement>(null);

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
      <svg className="displacement-image" viewBox="0 0 ${config.width} ${config.height
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
      <div className="label">
        <span>displacement image</span>
      </div>
    `;

    if (debugPen) {
      debugPen.current!.innerHTML = kids;
    }

    const svgEl = debugPen.current?.querySelector('.displacement-image') as SVGSVGElement;
    if (svgEl) {
      const serialized = new XMLSerializer().serializeToString(svgEl);
      const encoded = encodeURIComponent(serialized);

      feImage.current?.setAttribute('href', `data:image/svg+xml,${encoded}`);

      [redChannel, greenChannel, blueChannel].forEach(ch => {
        ch.current?.setAttribute('xChannelSelector', config.x);
        ch.current?.setAttribute('yChannelSelector', config.y);
      });
    }
  }


  const updateSliderPosition = (route: string = '') => {
    if (!navRef) return;

    const activeLink = navRef.current?.querySelector(`a[href="${route || window.location.pathname}"]`);
    if (activeLink) {
      const parentLi = activeLink.parentElement as HTMLElement;
      if (parentLi && navRef) {
        // Use offset properties to ignore transforms like scale()
        const left = parentLi.offsetLeft;
        const top = parentLi.offsetTop;
        const width = parentLi.offsetWidth;
        const height = parentLi.offsetHeight;

        setSliderStyle({ left: left, top: top, width: width, height: height, position: 'absolute' });
      }
    }
  };

  // Update slider position when active route changes
  const handleNavClick = (route: string) => {
    if (!slider.current) return;

    setTimeout(() => updateSliderPosition(route), 0);
    setIsAnimating(true);
  };
  useEffect(() => {
    if (!slider.current) return;

    // Get animation duration from CSS
    const computedStyle = getComputedStyle(slider.current!);
    const animationDuration = computedStyle.animationDuration;

    // Convert CSS duration (e.g., "0.3s") to milliseconds
    const durationMs = parseFloat(animationDuration) * 1000;

    if (isAnimating) {
      clearTimeout(animatingTimeout);
      setIsAnimating(false);
      requestAnimationFrame(() => setIsAnimating(true));
    }

    animatingTimeout = setTimeout(() => {
      setIsAnimating(false);
      // Call handleNavBlur to close nav menu if open
      handleNavBlur();
    }, durationMs);
  }, [isAnimating])

  // Track last pointer type to prevent double execution
  let lastPointerType: 'touch' | 'mouse' | null = null;

  const handleNavPointer = (
    route: string,
    e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>
  ) => {
    if (e.type === 'touchstart') {
      lastPointerType = 'touch';
    } else if (e.type === 'click') {
      if (lastPointerType === 'touch') {
        lastPointerType = null;
        return;
      }
      lastPointerType = 'mouse';
    }
    handleNavClick(route);
  };

  const navLink = (route: string, title: string) => {
    return (
      <li className={isActive(route) ? styles.active : ''}>
        <Link
          href={route}
          onTouchStart={e => handleNavPointer(route, e)}
          onClick={e => handleNavPointer(route, e)}
        >
          {title}
        </Link>
      </li>
    );
  }

  // Helper to update lowQuality class based on screen width
  const updateLowQuality = () => {
    // 64rem = 1024px (assuming 1rem = 16px)
    setIsLowQuality(!document.startViewTransition || window.innerWidth < 64 * 16);
  };

  useEffect(() => {
    updateLowQuality();
    updateSliderPosition();
    const updateSliderPositionRef = () => updateSliderPosition();
    window.addEventListener('resize', updateLowQuality);
    window.addEventListener('resize', updateSliderPositionRef);

    if (navList) {
      config.width = navList.current!.getBoundingClientRect().width;
      config.height = navList.current!.getBoundingClientRect().height;

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          buildDisplacementImage();
          [redChannel, greenChannel, blueChannel].forEach(ch => {
            ch.current?.setAttribute('scale', String(config.scale));
          });
          redChannel.current?.setAttribute('scale', String(config.scale + config.r));
          greenChannel.current?.setAttribute('scale', String(config.scale + config.g));
          blueChannel.current?.setAttribute('scale', String(config.scale + config.b));
          feGaussianBlur.current?.setAttribute('stdDeviation', String(config.displace));
        });
      }
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateLowQuality);
      window.removeEventListener('resize', updateSliderPositionRef);
    };
  }, []);

  // Show and focus nav menu on .navMore click
  const handleNavMoreClick = (
    e: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>
  ) => {
    if (e.type === "touchstart") {
      e.stopPropagation();
    }
    setIsNavOpen(true);
    navRef.current?.focus();
    updateSliderPosition();
  };

  // Hide nav menu when focus is lost
  const handleNavBlur = (e?: React.FocusEvent) => {
    if (!navRef.current) return;
    const relatedTarget = e?.relatedTarget as Node | null;
    if (!relatedTarget || !navRef.current.contains(relatedTarget)) {
      setIsNavOpen(false);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark}>
          <img src={accessLogoSrc} alt="ACCESS Logo" />
          <span className={poppins.className}>ACCESS</span>
        </Link>
        <nav
          className={[
            styles.navList,
            isLowQuality ? styles.lowQuality : '',
            isAnimating ? styles.animating : ''
          ].filter(Boolean).join(' ')}
          ref={navList}
        >
          <span
            className={styles.navMore}
            ref={navMoreRef}
            onClick={handleNavMoreClick}
            onTouchStart={handleNavMoreClick}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            //aria-expanded={isNavOpen}
          >
            <i className="fas fa-ellipsis-vertical"></i>
          </span>
          <ul
            ref={navRef}
            tabIndex={-1}
            className={[ isNavOpen ? styles.open : '' ].filter(Boolean).join(' ')}
            onBlur={handleNavBlur}
          >
            <div ref={slider} className={`${styles.activeSlider} ${isAnimating ? styles.animating : ''}`} style={sliderStyle}></div>
            {navLink('/', 'Home')}
            {navLink('/teaser', 'Teaser')}
            {navLink('/about', 'About')}
            {navLink('/events', 'Events')}
            {navLink('/academics', 'Academics')}
            {navLink('/members-hub', 'Members Hub')}
          </ul>
          <svg className={styles.filter} xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* https://github.com/archisvaze/liquid-glass/ */}
              <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
                <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
                <feDisplacementMap in="SourceGraphic" in2="blurred" scale="77" xChannelSelector="R"
                  yChannelSelector="G" />
              </filter>
              {/* https://codepen.io/jh3y/pen/EajLxJV */}
              <filter id="lg-filter" colorInterpolationFilters="sRGB">
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
        <div ref={debugPen} style={{ display: 'none' }}></div>
      </header>
    </>
  );
};
