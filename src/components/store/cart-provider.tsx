"use client";

import type { ReactNode } from "react";
import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Locale } from "@/config/i18n";
import { getCartTotal, validateCart } from "@/services/cart";
import type { CartLine } from "@/types/cart";

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

export const CartContext = createContext<CartContextValue | undefined>(undefined);

function readStoredJson<T>(key: string): T | undefined {
  const raw = window.localStorage.getItem(key);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export function CartProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedCart = readStoredJson<CartLine[]>("boom-cart");
    const storedFavorites = readStoredJson<string[]>("boom-favorites");
    if (storedCart !== undefined) setLines(validateCart(storedCart));
    if (storedFavorites !== undefined) setFavorites(storedFavorites);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("boom-cart", JSON.stringify(lines));
  }, [hydrated, lines]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("boom-favorites", JSON.stringify(favorites));
  }, [favorites, hydrated]);

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
