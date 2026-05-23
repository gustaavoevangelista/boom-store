"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type StaggerGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  stagger?: number;
  start?: string;
};

export function StaggerGroup({
  children,
  className,
  delay = 0,
  distance = 20,
  duration = 0.6,
  stagger = 0.08,
  start = "top 82%",
  ...props
}: StaggerGroupProps) {
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

      const items = Array.from(root.children) as HTMLElement[];
      if (!items.length) {
        return;
      }

      const context = gsap.context(() => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: distance },
          {
            autoAlpha: 1,
            delay,
            duration,
            ease: "power2.out",
            stagger,
            scrollTrigger: {
              trigger: root,
              once: true,
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
  }, [delay, distance, duration, prefersReducedMotion, stagger, start]);

  return (
    <div
      ref={rootRef}
      data-stagger-group="true"
      data-testid="stagger-group-root"
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
}
