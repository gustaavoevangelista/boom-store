import { ProductCard } from "@/components/product/product-card";
import type { Dictionary, Locale } from "@/config/i18n";
import type { Product } from "@/types/product";

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
