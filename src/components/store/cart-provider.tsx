"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { CartLine } from "@/lib/cart";
import { getCartTotal } from "@/lib/cart";
import type { Locale } from "@/lib/i18n";

type CartContextValue = {
  lines: CartLine[];
  favorites: string[];
  total: number;
  addLine: (line: CartLine) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeLine: (variantId: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedCart = window.localStorage.getItem("boom-cart");
    const storedFavorites = window.localStorage.getItem("boom-favorites");
    if (storedCart) setLines(JSON.parse(storedCart));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("boom-cart", JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    window.localStorage.setItem("boom-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      favorites,
      total: getCartTotal(lines),
      addLine: (line) => {
        setLines((current) => {
          const existing = current.find((item) => item.variantId === line.variantId);
          if (existing) {
            return current.map((item) =>
              item.variantId === line.variantId
                ? { ...item, quantity: item.quantity + line.quantity }
                : item,
            );
          }
          return [...current, line];
        });
        toast.success(
          locale === "pt"
            ? "Adicionado ao carrinho"
            : locale === "es"
              ? "Añadido al carrito"
              : "Added to cart",
        );
      },
      updateQuantity: (variantId, quantity) => {
        setLines((current) =>
          quantity < 1
            ? current.filter((line) => line.variantId !== variantId)
            : current.map((line) => (line.variantId === variantId ? { ...line, quantity } : line)),
        );
      },
      removeLine: (variantId) =>
        setLines((current) => current.filter((line) => line.variantId !== variantId)),
      toggleFavorite: (productId) =>
        setFavorites((current) =>
          current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        ),
      isFavorite: (productId) => favorites.includes(productId),
      clearCart: () => setLines([]),
    }),
    [favorites, lines, locale],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
