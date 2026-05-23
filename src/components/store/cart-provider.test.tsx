import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CartProvider } from "@/components/store/cart-provider";
import { useCart } from "@/hooks/use-cart";

function CartStateProbe() {
  const cart = useCart();
  return <div data-testid="cart-count">{cart.lines.length}</div>;
}

function FavoritesStateProbe() {
  const cart = useCart();
  return <div data-testid="favorites-count">{cart.favorites.length}</div>;
}

describe("CartProvider hydration", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("loads validated cart lines from localStorage", async () => {
    window.localStorage.setItem(
      "boom-cart",
      JSON.stringify([
        { productId: "sun-burst", variantId: "sun-s-white", quantity: 2 },
        { productId: "missing-product", variantId: "missing-variant", quantity: 1 },
      ]),
    );

    render(
      <CartProvider locale="pt">
        <CartStateProbe />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
    });
  });

  it("ignores corrupt localStorage payloads without crashing", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    window.localStorage.setItem("boom-cart", "{not-json}");

    render(
      <CartProvider locale="pt">
        <CartStateProbe />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
    });

    errorSpy.mockRestore();
  });

  it("preserves favorites across hydration and remounts", async () => {
    window.localStorage.setItem("boom-favorites", JSON.stringify(["sun-burst"]));

    const firstRender = render(
      <CartProvider locale="pt">
        <FavoritesStateProbe />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
    });
    expect(window.localStorage.getItem("boom-favorites")).toBe(JSON.stringify(["sun-burst"]));

    firstRender.unmount();

    render(
      <CartProvider locale="en">
        <FavoritesStateProbe />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
    });
  });
});
