import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { StaggerGroup } from "@/components/animations/stagger-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Dictionary, Locale } from "@/config/i18n";
import { formatMoney } from "@/lib/utils";
import { products } from "@/services/catalog";

export function HomeFeatured({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const featured = products.filter((product) => product.featured);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <Reveal>
            <h2 className="font-black text-3xl">{dictionary.home.featured}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-muted-foreground">{dictionary.shop.copy}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Button asChild variant="outline">
            <Link href={`/${locale}/shop`}>{dictionary.nav.shop}</Link>
          </Button>
        </Reveal>
      </div>

      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => {
          const copy = product.copy[locale];
          return (
            <Card className="group overflow-hidden" key={product.id}>
              <Link href={`/${locale}/product/${product.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <Image
                    src={product.images[0]}
                    alt={copy.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge ? (
                    <Badge className="absolute left-3 top-3 bg-background text-foreground">
                      {product.badge === "sale" ? dictionary.common.sale : dictionary.common.new}
                    </Badge>
                  ) : null}
                </div>
              </Link>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Link
                    href={`/${locale}/product/${product.slug}`}
                    className="font-semibold hover:text-primary"
                  >
                    {copy.name}
                  </Link>
                  <p className="truncate text-muted-foreground text-sm">{copy.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">{formatMoney(product.price, locale)}</span>
                  <Button asChild size="sm">
                    <Link href={`/${locale}/product/${product.slug}`}>
                      {dictionary.home.shopNow}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
