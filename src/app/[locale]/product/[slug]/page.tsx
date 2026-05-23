import { ProductPage } from "@/components/product/product-page";
import { dictionaries, isLocale } from "@/config/i18n";

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];

  return <ProductPage slug={slug} locale={locale} dictionary={dictionary} />;
}
