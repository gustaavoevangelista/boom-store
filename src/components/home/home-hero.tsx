import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/config/i18n";

export function HomeHero({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:py-16">
      <div className="space-y-6">
        <Reveal>
          <Badge className="bg-secondary text-secondary-foreground">
            {dictionary.home.eyebrow}
          </Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-3xl font-black text-5xl tracking-tight md:text-7xl">
            {dictionary.home.heroTitle}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-lg text-muted-foreground">{dictionary.home.heroCopy}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={`/${locale}/shop`}>{dictionary.home.shopNow}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${locale}/collections/prints`}>{dictionary.home.viewPrints}</Link>
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal distance={32}>
        <div className="relative min-h-[440px] overflow-hidden rounded-lg bg-secondary">
          <Image
            src="/boom-logo.png"
            alt="BOOM T-Shirteria logo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Reveal>
    </section>
  );
}
