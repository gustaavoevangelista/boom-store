import { ContentPage } from "@/components/shared/content-page";
import { dictionaries, isLocale } from "@/config/i18n";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];
  return (
    <ContentPage
      title={dictionary.pages.contact.title}
      sections={dictionary.pages.contact.sections}
    />
  );
}
