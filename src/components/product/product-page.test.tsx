import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductPage } from "@/components/product/product-page";
import { dictionaries } from "@/config/i18n";

vi.mock("@/components/animations/reveal", () => ({
  Reveal: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/product/add-to-cart-panel", () => ({
  AddToCartPanel: () => <div data-testid="add-to-cart-panel" />,
}));

vi.mock("@/components/product/product-grid", () => ({
  ProductGrid: () => <div data-testid="related-grid" />,
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("ProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the product detail shell", () => {
    render(<ProductPage slug="sun-burst-tee" locale="en" dictionary={dictionaries.en} />);

    expect(screen.getByRole("heading", { name: "Sun Burst T-shirt" })).toBeInTheDocument();
    expect(screen.getByTestId("add-to-cart-panel")).toBeInTheDocument();
    expect(screen.getByTestId("related-grid")).toBeInTheDocument();
  });
});
