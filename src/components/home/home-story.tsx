import { Reveal } from "@/components/animations/reveal";
import { ScrollSection } from "@/components/animations/scroll-section";
import type { Dictionary } from "@/config/i18n";

export function HomeStory({ dictionary }: { dictionary: Dictionary }) {
  return (
    <ScrollSection className="bg-secondary py-14 text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <h2 className="max-w-2xl font-black text-4xl">{dictionary.home.storyTitle}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-lg">{dictionary.home.story}</p>
        </Reveal>
      </div>
    </ScrollSection>
  );
}
