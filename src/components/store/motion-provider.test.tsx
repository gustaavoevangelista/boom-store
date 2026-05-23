import { act, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/store/motion-provider";

const motionMocks = vi.hoisted(() => ({
  registerPlugin: vi.fn(),
  tickerAdd: vi.fn(),
  tickerRemove: vi.fn(),
  lagSmoothing: vi.fn(),
  lenisConstructor: vi.fn(),
  lenisDestroy: vi.fn(),
  lenisOn: vi.fn(),
  lenisRaf: vi.fn(),
  scrollTriggerGetAll: vi.fn(),
  scrollTriggerKill: vi.fn(),
  scrollTriggerUpdate: vi.fn(),
}));

vi.mock("gsap", () => ({
  default: {
    registerPlugin: motionMocks.registerPlugin,
    ticker: {
      add: motionMocks.tickerAdd,
      remove: motionMocks.tickerRemove,
      lagSmoothing: motionMocks.lagSmoothing,
    },
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    update: motionMocks.scrollTriggerUpdate,
    getAll: motionMocks.scrollTriggerGetAll,
  },
}));

vi.mock("lenis", () => ({
  default: motionMocks.lenisConstructor.mockImplementation(() => ({
    destroy: motionMocks.lenisDestroy,
    on: motionMocks.lenisOn,
    raf: motionMocks.lenisRaf,
  })),
}));

function createMatchMedia(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  let currentMatches = matches;
  const mediaQueryList = {
    get matches() {
      return currentMatches;
    },
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
    addListener: (_listener: never) => {},
    removeListener: (_listener: never) => {},
    dispatchEvent: () => true,
    setMatches(nextMatches: boolean) {
      currentMatches = nextMatches;
      const event = { matches: nextMatches, media: mediaQueryList.media } as MediaQueryListEvent;
      for (const listener of listeners) {
        listener(event);
      }
    },
  } satisfies MediaQueryList & { setMatches(nextMatches: boolean): void };

  return vi.fn(() => mediaQueryList);
}

describe("MotionProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    motionMocks.scrollTriggerGetAll.mockReturnValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders children without injecting script tags when reduced motion is on", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: createMatchMedia(true),
    });

    const { container } = render(
      <MotionProvider>
        <div data-testid="content">motion</div>
      </MotionProvider>,
    );

    await waitFor(() => {
      expect(motionMocks.registerPlugin).toHaveBeenCalled();
    });

    expect(motionMocks.lenisConstructor).not.toHaveBeenCalled();
    expect(motionMocks.tickerAdd).not.toHaveBeenCalled();
    expect(container.querySelector("script")).toBeNull();
    expect(container.innerHTML).toBe('<div data-testid="content">motion</div>');
  });

  it("initializes Lenis and cleans it up when reduced motion is off", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: createMatchMedia(false),
    });
    motionMocks.scrollTriggerGetAll.mockReturnValue([{ kill: motionMocks.scrollTriggerKill }]);

    const { container, unmount } = render(
      <MotionProvider>
        <div data-testid="content">motion</div>
      </MotionProvider>,
    );

    await waitFor(() => {
      expect(motionMocks.lenisConstructor).toHaveBeenCalledTimes(1);
    });

    expect(motionMocks.registerPlugin).toHaveBeenCalled();
    expect(motionMocks.lenisOn).toHaveBeenCalledWith("scroll", motionMocks.scrollTriggerUpdate);
    expect(motionMocks.tickerAdd).toHaveBeenCalledTimes(1);
    expect(motionMocks.lagSmoothing).toHaveBeenCalledWith(0);
    expect(container.querySelector("script")).toBeNull();
    expect(container.innerHTML).toBe('<div data-testid="content">motion</div>');

    const tickerCallback = motionMocks.tickerAdd.mock.calls[0][0];

    unmount();

    expect(motionMocks.tickerRemove).toHaveBeenCalledWith(tickerCallback);
    expect(motionMocks.lenisDestroy).toHaveBeenCalledTimes(1);
    expect(motionMocks.scrollTriggerKill).toHaveBeenCalledTimes(1);
  });

  it("tears down and reinitializes motion when the reduced motion preference changes", async () => {
    const mediaQueryList = createMatchMedia(false)();

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => mediaQueryList),
    });
    motionMocks.scrollTriggerGetAll.mockReturnValue([{ kill: motionMocks.scrollTriggerKill }]);

    const { unmount } = render(
      <MotionProvider>
        <div data-testid="content">motion</div>
      </MotionProvider>,
    );

    await waitFor(() => {
      expect(motionMocks.lenisConstructor).toHaveBeenCalledTimes(1);
    });

    act(() => {
      mediaQueryList.setMatches(true);
    });

    await waitFor(() => {
      expect(motionMocks.lenisDestroy).toHaveBeenCalledTimes(1);
    });
    expect(motionMocks.scrollTriggerKill).toHaveBeenCalledTimes(1);

    act(() => {
      mediaQueryList.setMatches(false);
    });

    await waitFor(() => {
      expect(motionMocks.lenisConstructor).toHaveBeenCalledTimes(2);
    });

    unmount();
  });
});
