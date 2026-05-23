type ContentSection = {
  readonly title?: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly string[];
};

export function ContentPage({
  title,
  sections,
}: {
  title: string;
  sections: ReadonlyArray<ContentSection>;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-black text-4xl">{title}</h1>
      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <article
            className="space-y-4"
            key={section.title ?? section.paragraphs?.[0] ?? section.bullets?.[0] ?? "section"}
          >
            {section.title ? <h2 className="font-bold text-2xl">{section.title}</h2> : null}
            {section.paragraphs?.map((paragraph) => (
              <p className="text-lg text-muted-foreground" key={paragraph}>
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="list-disc space-y-2 pl-5 text-lg text-muted-foreground">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
