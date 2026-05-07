"use client";

import { ProductGrid } from "@/components/product-grid";
import { useCart } from "@/components/store/cart-provider";
import { products } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";

export function FavoritesClient({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const cart = useCart();
  const favoriteProducts = products.filter((product) => cart.favorites.includes(product.id));
  if (favoriteProducts.length === 0) {
    return (
      <p className="rounded-lg border p-8 text-center text-muted-foreground">
        {dictionary.favorites.empty}
      </p>
    );
  }
  return <ProductGrid products={favoriteProducts} locale={locale} dictionary={dictionary} />;
}
