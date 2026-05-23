"use client";

import { ProductGrid } from "@/components/product/product-grid";
import { PageHeader } from "@/components/shared/page-header";
import type { Dictionary, Locale } from "@/config/i18n";
import { useCart } from "@/hooks/use-cart";
import { products } from "@/services/catalog";

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
  return (
    <PageHeader title={dictionary.favorites.title}>
      <ProductGrid products={favoriteProducts} locale={locale} dictionary={dictionary} />
    </PageHeader>
  );
}
