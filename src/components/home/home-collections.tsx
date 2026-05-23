import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Dictionary, Locale } from "@/config/i18n";
import { collections } from "@/services/catalog";

export function HomeCollections({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12">
      <Reveal>
        <h2 className="mb-6 font-black text-3xl">{dictionary.home.categories}</h2>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {collections.map((collection, index) => (
          <Reveal
            className={index % 2 === 1 ? "md:mt-10" : undefined}
            delay={index * 0.05}
            distance={index % 2 === 0 ? 22 : 34}
            key={collection.slug}
          >
            <Card className="overflow-hidden border-2 border-transparent transition-colors hover:border-primary/30">
              <CardContent className="grid gap-5 bg-gradient-to-br from-background to-muted/40 p-8">
                <Badge className="w-fit bg-secondary text-secondary-foreground">
                  {dictionary.home.shopNow}
                </Badge>
                <p className="font-black text-4xl tracking-tight">{collection.label[locale]}</p>
                <Button asChild className="w-fit">
                  <Link href={`/${locale}/collections/${collection.slug}`}>
                    {dictionary.home.shopNow}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
