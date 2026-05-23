import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { ShopView } from "@/components/shop/shop-view";
import type { Dictionary, Locale } from "@/config/i18n";
import { getCollection, products } from "@/services/catalog";

export function CollectionPage({
  locale,
  slug,
  dictionary,
}: {
  locale: Locale;
  slug: string;
  dictionary: Dictionary;
}) {
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <PageHeader title={collection.label[locale]} description={dictionary.shop.copy}>
      <ShopView
        products={products}
        locale={locale}
        dictionary={dictionary}
        initialType={collection.type}
      />
    </PageHeader>
  );
}
