"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type ScrollSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  fullHeight?: boolean;
  pinned?: boolean;
  pinSpacing?: boolean;
  start?: string;
  end?: string;
};

export function ScrollSection({
  children,
  className,
  fullHeight = false,
  pinned = false,
  pinSpacing = true,
  start = "top top",
  end = "bottom top",
  ...props
}: ScrollSectionProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !pinned || !rootRef.current) {
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

      const trigger = ScrollTrigger.create({
        end,
        pin: true,
        pinSpacing,
        start,
        trigger: root,
      });

      cleanup = () => {
        trigger.kill();
      };
    })().catch(() => {});

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [end, pinSpacing, pinned, prefersReducedMotion, start]);

  return (
    <section
      ref={rootRef}
      data-scroll-section="true"
      className={cn(fullHeight && "min-h-screen", className)}
      {...props}
    >
      {children}
    </section>
  );
}
