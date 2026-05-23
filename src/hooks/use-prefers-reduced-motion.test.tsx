import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function createMatchMedia(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQueryList = {
    matches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
      if (typeof listener === "function") {
        listeners.add(listener as (event: MediaQueryListEvent) => void);
      }
    },
    removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
      if (typeof listener === "function") {
        listeners.delete(listener as (event: MediaQueryListEvent) => void);
      }
    },
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => true,
    setMatches(nextMatches: boolean) {
      mediaQueryList.matches = nextMatches;
      const event = { matches: nextMatches, media: mediaQueryList.media } as MediaQueryListEvent;
      for (const listener of listeners) {
        listener(event);
      }
    },
  } satisfies MediaQueryList & { setMatches(nextMatches: boolean): void };

  return mediaQueryList;
}

describe("usePrefersReducedMotion", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("updates when the OS preference changes", () => {
    const mediaQueryList = createMatchMedia(true);

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => mediaQueryList),
    });

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);

    act(() => {
      mediaQueryList.setMatches(false);
    });

    expect(result.current).toBe(false);
  });
});
