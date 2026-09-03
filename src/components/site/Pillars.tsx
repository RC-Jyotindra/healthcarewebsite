const pillars = [
  {
    kicker: "Rigor",
    title: "Evidence-based discovery",
    body: "We apply clinical trial rigor and statistical analysis to ensure every research finding is reproducible and validated.",
  },
  {
    kicker: "Network",
    title: "Collaborative science",
    body: "Connecting leading health institutions, genomic centers, and laboratory scientists in a unified research ecosystem.",
  },
  {
    kicker: "Ethics",
    title: "Patient-first integrity",
    body: "Committed to absolute transparency, ethical review board approvals, and secure health data privacy standards.",
  },
];

export function Pillars() {
  return (
    <section className="bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {pillars.map((p) => (
            <div key={p.kicker} className="flex flex-col">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {p.kicker}
              </p>
              <h3 className="mt-5 text-2xl leading-tight text-ink md:text-3xl">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
