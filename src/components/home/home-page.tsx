import { HomeBenefits } from "@/components/home/home-benefits";
import { HomeCollections } from "@/components/home/home-collections";
import { HomeFeatured } from "@/components/home/home-featured";
import { HomeHero } from "@/components/home/home-hero";
import { HomeStory } from "@/components/home/home-story";
import type { Dictionary, Locale } from "@/config/i18n";

export function HomePage({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <div>
      <HomeHero locale={locale} dictionary={dictionary} />
      <HomeBenefits dictionary={dictionary} />
      <HomeFeatured locale={locale} dictionary={dictionary} />
      <HomeCollections locale={locale} dictionary={dictionary} />
      <HomeStory dictionary={dictionary} />
    </div>
  );
}
