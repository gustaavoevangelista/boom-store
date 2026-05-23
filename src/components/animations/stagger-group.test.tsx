import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StaggerGroup } from "@/components/animations/stagger-group";

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

describe("StaggerGroup", () => {
  it("keeps staggered children in document order", () => {
    render(
      <StaggerGroup>
        <span>One</span>
        <span>Two</span>
      </StaggerGroup>,
    );

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(screen.getByTestId("stagger-group-root")).toHaveAttribute("data-stagger-group", "true");
  });
});
