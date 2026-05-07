export function ContentPage({ title, body }: { title: string; body: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-black text-4xl">{title}</h1>
      <p className="mt-5 text-lg text-muted-foreground">{body}</p>
    </section>
  );
}
