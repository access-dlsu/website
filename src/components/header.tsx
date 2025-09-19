'use client';

import styles from '@/app/layout.module.css';
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import { Poppins } from 'next/font/google';

const accessLogoSrc = '/img/access.svg';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

export function Header() {
  const pathname = usePathname();
  const isActive = (route: string) => pathname === route;

  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLowQuality, setIsLowQuality] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  let animatingTimeout: ReturnType<typeof setTimeout>;
  let navList = useRef<HTMLUListElement>(null);
  let navMore = useRef<HTMLButtonElement>(null);
  let navSlider = useRef<HTMLDivElement>(null);

  let lgFilterHelper = useRef<HTMLDivElement>(null);
  let feImage = useRef<SVGFEImageElement>(null);
  let redChannel = useRef<SVGFEDisplacementMapElement>(null);
  let greenChannel = useRef<SVGFEDisplacementMapElement>(null);
  let blueChannel = useRef<SVGFEDisplacementMapElement>(null);
  let feGaussianBlur = useRef<SVGFEGaussianBlurElement>(null);

  let lgConfig = {
    icons: false, scale: -180, border: 0.07, lightness: 50, blend: 'difference',
    x: 'R', y: 'B', alpha: 0.93, blur: 11, r: 0, g: 10, b: 20,
    // these are the ones that usually change
    width: 200, height: 80, displace: 0, frost: 0, radius: 28
  };
  const buildLgDisplacementImage = () => {
    const border = Math.min(lgConfig.width, lgConfig.height) * (lgConfig.border * 0.5);

    if (lgFilterHelper.current && feImage.current) {
      lgFilterHelper.current.innerHTML = `
        <svg id="displacement-image" viewBox="0 0 ${lgConfig.width} ${lgConfig.height
        }" xmlns="http://www.w3.org/2000/svg" style="display:none">
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
          <rect x="0" y="0" width="${lgConfig.width}" height="${lgConfig.height
        }" fill="black"></rect>
          <!-- red linear -->
          <rect x="0" y="0" width="${lgConfig.width}" height="${lgConfig.height}" rx="${lgConfig.radius
        }" fill="url(#red)" />
          <!-- blue linear -->
          <rect x="0" y="0" width="${lgConfig.width}" height="${lgConfig.height}" rx="${lgConfig.radius
        }" fill="url(#blue)" style="mix-blend-mode: ${lgConfig.blend}" />
          <!-- block out distortion -->
          <rect x="${border}" y="${Math.min(lgConfig.width, lgConfig.height) * (lgConfig.border * 0.5)
        }" width="${lgConfig.width - border * 2}" height="${lgConfig.height - border * 2
        }" rx="${lgConfig.radius}" fill="hsl(0 0% ${lgConfig.lightness}% / ${lgConfig.alpha
        }" style="filter:blur(${lgConfig.blur}px)" />
        </svg>
      `;
      const svgEl = lgFilterHelper.current.querySelector('#displacement-image') as SVGSVGElement;
      const serialized = new XMLSerializer().serializeToString(svgEl!);
      const encoded = encodeURIComponent(serialized);

      feImage.current.setAttribute('href', `data:image/svg+xml,${encoded}`);

      [redChannel, greenChannel, blueChannel].forEach(ch => {
        ch.current?.setAttribute('xChannelSelector', lgConfig.x);
        ch.current?.setAttribute('yChannelSelector', lgConfig.y);
      });
    }
  }


  const updateSliderPosition = (route: string = '') => {
    if (!navList.current) return;

    const activeLink = navList.current.querySelector(`a[href="${route || pathname}"]`);
    if (activeLink) {
      const parentLi = activeLink.parentElement as HTMLElement;
      if (parentLi) {
        // Use offset properties to ignore transforms like scale()
        const left = parentLi.offsetLeft;
        const top = parentLi.offsetTop;
        const width = parentLi.offsetWidth;
        const height = parentLi.offsetHeight;

        setSliderStyle({ left: left, top: top, width: width, height: height, position: 'absolute' });
      }
    } else {
      setSliderStyle({ display: 'none' });
    }
  };

  // Update slider position when active route changes
  const handleNavClick = (route: string) => {
    if (!navSlider.current) return;

    setTimeout(() => updateSliderPosition(route), 0);
    setIsAnimating(true);
  };
  useEffect(() => {
    if (!navSlider.current) return;

    // Get animation duration from CSS
    const computedStyle = getComputedStyle(navSlider.current);
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
      setIsNavOpen(false);
    }, durationMs);
  }, [isAnimating])

  useEffect(() => {
    updateSliderPosition(pathname);
  }, [pathname]);

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

  const updateLowQuality = () => {
    // 64rem = 1024px (assuming 1rem = 16px)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsLowQuality(!document.startViewTransition || window.innerWidth < 64 * 16 || isSafari);
  };

  useEffect(() => {
    setHasMounted(true);

    updateLowQuality();
    updateSliderPosition();
    const updateSliderPositionRef = () => updateSliderPosition();
    window.addEventListener('resize', updateLowQuality);
    window.addEventListener('resize', updateSliderPositionRef);

    if (navList.current) {
      lgConfig.width = navList.current.getBoundingClientRect().width;
      lgConfig.height = navList.current.getBoundingClientRect().height;

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          buildLgDisplacementImage();
          [redChannel, greenChannel, blueChannel].forEach(ch => {
            ch.current?.setAttribute('scale', String(lgConfig.scale));
          });
          redChannel.current?.setAttribute('scale', String(lgConfig.scale + lgConfig.r));
          greenChannel.current?.setAttribute('scale', String(lgConfig.scale + lgConfig.g));
          blueChannel.current?.setAttribute('scale', String(lgConfig.scale + lgConfig.b));
          feGaussianBlur.current?.setAttribute('stdDeviation', String(lgConfig.displace));
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
    setIsNavOpen(prev => !prev);
    navList.current?.focus();
    updateSliderPosition();
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
            styles.nav,
            isLowQuality ? styles.lowQuality : '',
            isAnimating ? styles.animating : ''
          ].filter(Boolean).join(' ')}
        >
          <button
            className={styles.navMore}
            ref={navMore}
            onClick={handleNavMoreClick}
            tabIndex={0}
            type="button"
            aria-label="Toggle navigation menu"
            aria-haspopup="true"
            {...(hasMounted && typeof window !== "undefined"
              ? { 'aria-expanded': isNavOpen }
              : {})}
          >
            <i className="fas fa-ellipsis-vertical"></i>
          </button>
          <div
            className={[
              styles.navList,
              isNavOpen ? styles.open : ''
            ].filter(Boolean).join(' ')}
          >
            <menu
              ref={navList}
              tabIndex={-1}
            >
              {navLink('/', 'Home')}
              {/*{navLink('/teaser', 'Teaser')}*/}
              {navLink('/about', 'About')}
              {navLink('/events', 'Events')}
              {navLink('/academics', 'Academics')}
              {navLink('/members-hub', 'Members Hub')}
            </menu>
            <div ref={navSlider} className={`${styles.activeSlider} ${isAnimating ? styles.animating : ''}`} style={sliderStyle}></div>
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
            <div ref={lgFilterHelper}></div>
          </div>
        </nav>
      </header>
    </>
  );
};
