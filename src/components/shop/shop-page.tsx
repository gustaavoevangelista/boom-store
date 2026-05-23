import { PageHeader } from "@/components/shared/page-header";
import { ShopView } from "@/components/shop/shop-view";
import type { Dictionary, Locale } from "@/config/i18n";
import { products } from "@/services/catalog";

export function ShopPage({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <PageHeader title={dictionary.shop.title} description={dictionary.shop.copy}>
      <ShopView products={products} locale={locale} dictionary={dictionary} />
    </PageHeader>
  );
}
