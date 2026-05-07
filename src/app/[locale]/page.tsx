import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { collections, products } from "@/lib/catalog";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];
  const featured = products.filter((product) => product.featured);

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:py-16">
        <div className="space-y-6">
          <Badge className="bg-secondary text-secondary-foreground">T-shirts + prints</Badge>
          <h1 className="max-w-3xl font-black text-5xl tracking-tight md:text-7xl">
            {dictionary.home.heroTitle}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">{dictionary.home.heroCopy}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={`/${locale}/shop`}>{dictionary.home.shopNow}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${locale}/collections/prints`}>{dictionary.home.viewPrints}</Link>
            </Button>
          </div>
        </div>
        <div className="relative min-h-[440px] overflow-hidden rounded-lg bg-secondary">
          <Image
            src="/boom-logo.png"
            alt="BOOM T-Shirteria logo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="border-y bg-muted/45">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-3">
          {[
            [Truck, "EU-wide shipping"],
            [ShieldCheck, "Secure checkout ready"],
            [Sparkles, "Small drops, strong graphics"],
          ].map(([Icon, label]) => (
            <div className="flex items-center gap-3 font-semibold" key={label as string}>
              <Icon className="h-5 w-5 text-primary" />
              <span>{label as string}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-black text-3xl">{dictionary.home.featured}</h2>
            <p className="text-muted-foreground">{dictionary.shop.copy}</p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/${locale}/shop`}>{dictionary.nav.shop}</Link>
          </Button>
        </div>
        <ProductGrid products={featured} locale={locale} dictionary={dictionary} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="mb-6 font-black text-3xl">{dictionary.home.categories}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {collections.map((collection) => (
            <Card className="overflow-hidden" key={collection.slug}>
              <CardContent className="grid gap-4 p-8">
                <p className="font-black text-4xl">{collection.label[locale]}</p>
                <Button asChild className="w-fit">
                  <Link href={`/${locale}/collections/${collection.slug}`}>
                    {dictionary.home.shopNow}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-14 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="max-w-2xl font-black text-4xl">{dictionary.home.storyTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg">{dictionary.home.story}</p>
        </div>
      </section>
    </div>
  );
}
