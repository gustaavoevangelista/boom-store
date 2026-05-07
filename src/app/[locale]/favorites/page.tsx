import { FavoritesClient } from "@/components/favorites-client";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function FavoritesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 font-black text-4xl">{dictionary.favorites.title}</h1>
      <FavoritesClient locale={locale} dictionary={dictionary} />
    </section>
  );
}
