"use client";

import { useEffect, useRef } from "react";

// Mirrors FoldParameters in DuoLikeAnimation (SwiftUI + Metal):
//   eyeDistanceMillimeters 320, pointsPerMillimeter 6  -> 1920pt
//   blurSpread 0.12   (blur radius per point of glass-to-plane gap)
//   darkening 0.015   (light lost per point of blur radius)
const EYE_DISTANCE_PX = 1920;
const BLUR_SPREAD = 0.12;
const DARKENING = 0.015;

// The blur radius varies with distance from the hinge, so the glass is
// split into bands of increasing radius (the shader does this per pixel).
const STRIPS = 16;

const POINTER_MAX_TILT = 22; // deg, desktop/pointer fallback
const DEVICE_MAX_TILT = 32; // deg, clamp for live device tilt
const SMOOTHING = 0.15;

const FOLD_QUERY =
  "(horizontal-viewport-segments: 2) and (vertical-viewport-segments: 1)";

// Web port of the DuoLikeAnimation frosted-glass fold: the page stays
// put, a glass plane hinged on the fold edge tilts toward the eye, and
// the backdrop seen through it is blurred + dimmed by the gap between
// glass and page. Browsers can't ray-reproject live DOM per pixel, so
// the reprojection is approximated by the CSS 3D tilt (perspective =
// eye distance) and the frost is banded by distance from the hinge.
export function DuoFold() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef(0);
  const zeroRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const hasOrientationRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.style.setProperty("--duo-eye", `${EYE_DISTANCE_PX}px`);

    const mq = window.matchMedia(FOLD_QUERY);
    const strips = Array.from(
      root.querySelectorAll<HTMLElement>(".duo-strip")
    );

    const render = () => {
      rafRef.current = 0;
      if (!mq.matches) return;

      const tilt = tiltRef.current;
      const sin = Math.sin((Math.abs(tilt) * Math.PI) / 180);
      // Positive tilt: the right edge is farther from the viewer, so the
      // interface plane hinges on the right (same convention as the
      // shader's `angle`).
      const hingeRight = tilt > 0;

      root.style.setProperty(
        "--duo-origin",
        hingeRight ? "right center" : "left center"
      );
      root.style.setProperty(
        "--duo-rotate",
        `${hingeRight ? tilt : -tilt}deg`
      );

      const w = window.innerWidth;
      const stripW = w / STRIPS;
      for (let i = 0; i < strips.length; i++) {
        // Distance of this band from the hinge, along the glass.
        const d = hingeRight ? w - (i + 0.5) * stripW : (i + 0.5) * stripW;
        const radius = BLUR_SPREAD * d * sin;
        const el = strips[i];
        const blur = radius < 0.5 ? "none" : `blur(${radius.toFixed(1)}px)`;
        el.style.backdropFilter = blur;
        el.style.setProperty("-webkit-backdrop-filter", blur);
        el.style.setProperty(
          "--duo-dim",
          Math.min(1, DARKENING * radius).toFixed(3)
        );
      }
    };

    const schedule = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(render);
    };

    const nudge = (target: number) => {
      tiltRef.current += (target - tiltRef.current) * SMOOTHING;
      schedule();
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null) return;
      hasOrientationRef.current = true;
      // First sample is the calibrated zero pose (tilt 0 = no effect).
      if (zeroRef.current == null) zeroRef.current = e.gamma;
      const rel = e.gamma - zeroRef.current;
      nudge(Math.max(-DEVICE_MAX_TILT, Math.min(DEVICE_MAX_TILT, rel)));
    };

    const onPointer = (e: PointerEvent) => {
      if (hasOrientationRef.current || !mq.matches) return;
      const x = e.clientX / window.innerWidth; // 0..1
      nudge((x - 0.5) * 2 * POINTER_MAX_TILT);
    };

    const onResize = () => schedule();

    window.addEventListener("deviceorientation", onOrientation, true);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", schedule);
    schedule();

    return () => {
      window.removeEventListener("deviceorientation", onOrientation, true);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="duo" ref={rootRef} aria-hidden>
      <div className="duo-glass">
        {Array.from({ length: STRIPS }, (_, i) => (
          <div className="duo-strip" key={i} />
        ))}
      </div>
    </div>
  );
}
