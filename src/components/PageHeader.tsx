export function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <section className="hero-lines border-b border-neutral-100 bg-gradient-to-b from-brand-50/60 to-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-brand-700 sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600 sm:text-lg">
            {intro}
          </p>
        )}
        <div className="mt-6 h-0.5 w-16 rounded bg-[#c8a44d]" />
      </div>
    </section>
  );
}
