import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";

export function ProductGrid({
  products,
  locale,
  dictionary,
}: {
  products: Product[];
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard product={product} locale={locale} dictionary={dictionary} key={product.id} />
      ))}
    </div>
  );
}
