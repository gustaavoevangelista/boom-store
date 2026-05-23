"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
  start?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  duration = 0.7,
  once = true,
  start = "top 80%",
  ...props
}: RevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !rootRef.current) {
      return;
    }

    let cancelled = false;
    let cleanup = () => {};

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const root = rootRef.current;
      if (!root) {
        return;
      }

      const context = gsap.context(() => {
        gsap.fromTo(
          root,
          { autoAlpha: 0, y: distance },
          {
            autoAlpha: 1,
            delay,
            duration,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root,
              once,
              start,
            },
            y: 0,
          },
        );
      }, root);

      cleanup = () => {
        context.revert();
      };
    })().catch(() => {});

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [delay, distance, duration, once, prefersReducedMotion, start]);

  return (
    <div
      ref={rootRef}
      data-reveal="true"
      data-testid="reveal-root"
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </div>
  );
}
