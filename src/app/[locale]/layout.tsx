import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { dictionaries, isLocale } from "@/lib/i18n";

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
