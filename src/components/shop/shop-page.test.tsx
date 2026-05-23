import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { ShopPage } from "@/components/shop/shop-page";
import { dictionaries } from "@/config/i18n";

vi.mock("@/components/shop/shop-view", () => ({
  ShopView: ({ children }: { children?: ReactNode }) => (
    <div data-testid="shop-view">{children}</div>
  ),
}));

describe("ShopPage", () => {
  it("renders the shop shell", () => {
    render(<ShopPage locale="en" dictionary={dictionaries.en} />);

    expect(screen.getByRole("heading", { name: dictionaries.en.shop.title })).toBeInTheDocument();
    expect(screen.getByTestId("shop-view")).toBeInTheDocument();
  });
});
