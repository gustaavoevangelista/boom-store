import Link from "next/link";
import type { Dictionary, Locale } from "@/config/i18n";

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const links = [
    { href: "faq", label: dictionary.footer.links.faq },
    { href: "shipping-returns", label: dictionary.footer.links.shippingReturns },
    { href: "privacy", label: dictionary.footer.links.privacy },
    { href: "terms", label: dictionary.footer.links.terms },
    { href: "cookies", label: dictionary.footer.links.cookies },
  ];
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-black text-2xl">BOOM T-Shirteria</p>
          <p className="mt-3 max-w-md text-muted-foreground">{dictionary.home.story}</p>
        </div>
        <div>
          <p className="mb-3 font-semibold">{dictionary.nav.shop}</p>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <Link href={`/${locale}/shop`}>{dictionary.nav.shop}</Link>
            <Link href={`/${locale}/collections/t-shirts`}>{dictionary.nav.tshirts}</Link>
            <Link href={`/${locale}/collections/prints`}>{dictionary.nav.prints}</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">{dictionary.footer.info}</p>
          <div className="grid gap-2 text-sm text-muted-foreground">
            {links.map((link) => (
              <Link href={`/${locale}/${link.href}`} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
