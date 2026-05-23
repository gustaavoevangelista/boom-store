import { HomePage } from "@/components/home/home-page";
import { dictionaries, isLocale } from "@/config/i18n";

export default async function HomeRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];

  return <HomePage locale={locale} dictionary={dictionary} />;
}
