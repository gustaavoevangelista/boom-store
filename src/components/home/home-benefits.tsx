import { Reveal } from "@/components/animations/reveal";
import type { Dictionary } from "@/config/i18n";

export function HomeBenefits({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="border-y bg-muted/45">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-3">
        {dictionary.home.benefits.map((label) => (
          <Reveal key={label}>
            <div className="flex items-center gap-3 font-semibold">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span>{label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
