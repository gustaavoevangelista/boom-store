"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type MotionGSAP = typeof import("gsap").default;
type MotionScrollTrigger = typeof import("gsap/ScrollTrigger").ScrollTrigger;

type LenisInstance = {
  destroy: () => void;
  on: (event: "scroll", callback: (...args: unknown[]) => void) => void;
  raf: (time: number) => void;
};

export function MotionProvider({ children }: { children: ReactNode }) {
  const gsapRef = useRef<MotionGSAP | null>(null);
  const scrollTriggerRef = useRef<MotionScrollTrigger | null>(null);
  const lenisRef = useRef<LenisInstance | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let cancelled = false;

    async function initializeMotion() {
      let lenis: LenisInstance | null = null;

      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (cancelled) {
          return;
        }

        gsap.registerPlugin(ScrollTrigger);
        gsapRef.current = gsap;
        scrollTriggerRef.current = ScrollTrigger;

        if (prefersReducedMotion) {
          return;
        }

        const { default: Lenis } = await import("lenis");

        if (cancelled) {
          return;
        }

        lenis = new Lenis();
        const currentLenis = lenis;
        const tick = (time: number) => {
          currentLenis.raf(time * 1000);
        };

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        lenisRef.current = lenis;
        tickerRef.current = tick;
      } catch (error) {
        if (lenis) {
          lenis.destroy();
        }
        if (!cancelled) {
          console.error("MotionProvider failed to initialize.", error);
        }
        return;
      }
    }

    void initializeMotion();

    return () => {
      cancelled = true;

      if (gsapRef.current && tickerRef.current) {
        gsapRef.current.ticker.remove(tickerRef.current);
      }

      for (const trigger of scrollTriggerRef.current?.getAll() ?? []) {
        trigger.kill();
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
      tickerRef.current = null;
      scrollTriggerRef.current = null;
      gsapRef.current = null;
    };
  }, [prefersReducedMotion]);

  return children;
}
