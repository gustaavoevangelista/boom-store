import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HomePage } from "@/components/home/home-page";
import { dictionaries } from "@/config/i18n";

vi.mock("@/components/animations/reveal", () => ({
  Reveal: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/animations/stagger-group", () => ({
  StaggerGroup: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/animations/scroll-section", () => ({
  ScrollSection: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the home hero and featured section", () => {
    render(<HomePage locale="en" dictionary={dictionaries.en} />);

    expect(
      screen.getByRole("heading", { name: dictionaries.en.home.heroTitle }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: dictionaries.en.home.featured }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: dictionaries.en.home.categories }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: dictionaries.en.home.storyTitle }),
    ).toBeInTheDocument();
    expect(screen.getByText(dictionaries.en.home.benefits[0])).toBeInTheDocument();
  });
});
