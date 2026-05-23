import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Reveal } from "@/components/animations/reveal";

vi.mock("gsap", () => ({
  default: {
    context: vi.fn((_callback: () => void) => ({
      revert: vi.fn(),
    })),
    fromTo: vi.fn(),
    registerPlugin: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(),
  },
}));

describe("Reveal", () => {
  it("renders children and exposes a stable motion wrapper", () => {
    render(
      <Reveal>
        <h2>Featured</h2>
      </Reveal>,
    );

    expect(screen.getByRole("heading", { name: "Featured" })).toBeInTheDocument();
    expect(screen.getByTestId("reveal-root")).toHaveAttribute("data-reveal", "true");
  });
});
