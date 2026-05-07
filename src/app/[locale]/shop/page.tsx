import { ShopView } from "@/components/shop-view";
import { products } from "@/lib/catalog";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-black text-4xl">{dictionary.shop.title}</h1>
        <p className="mt-2 text-muted-foreground">{dictionary.shop.copy}</p>
      </div>
      <ShopView products={products} locale={locale} dictionary={dictionary} />
    </section>
  );
}
