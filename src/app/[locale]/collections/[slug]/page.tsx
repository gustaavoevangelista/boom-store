import { CollectionPage } from "@/components/collections/collection-page";
import { dictionaries, isLocale } from "@/config/i18n";

export default async function CollectionRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];
  return <CollectionPage locale={locale} slug={slug} dictionary={dictionary} />;
}
