import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/store/providers";
import { dictionaries, isLocale } from "@/config/i18n";

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }, { locale: "es" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = dictionaries[locale];

  return (
    <Providers locale={locale}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader locale={locale} dictionary={dictionary} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} dictionary={dictionary} />
      </div>
    </Providers>
  );
}
