import { ContentPage } from "@/components/shared/content-page";
import { dictionaries, isLocale } from "@/config/i18n";

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];
  return (
    <ContentPage title={dictionary.pages.faq.title} sections={dictionary.pages.faq.sections} />
  );
}
