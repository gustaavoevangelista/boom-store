import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/store/cart-provider";
import { dictionaries } from "@/config/i18n";

describe("CartDrawer", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("labels cart quantity controls for screen readers", async () => {
    window.localStorage.setItem(
      "boom-cart",
      JSON.stringify([{ productId: "sun-burst", variantId: "sun-s-white", quantity: 1 }]),
    );

    render(
      <CartProvider locale="pt">
        <CartDrawer locale="pt" dictionary={dictionaries.pt} />
      </CartProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: dictionaries.pt.nav.cart }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: dictionaries.pt.cart.decreaseQuantity,
        }),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", {
        name: dictionaries.pt.cart.increaseQuantity,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: dictionaries.pt.cart.remove,
      }),
    ).toBeInTheDocument();
  });
});
