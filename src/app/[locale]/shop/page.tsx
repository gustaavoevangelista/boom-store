import { ShopPage } from "@/components/shop/shop-page";
import { dictionaries, isLocale } from "@/config/i18n";

export default async function ShopRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];
  return <ShopPage locale={locale} dictionary={dictionary} />;
}
