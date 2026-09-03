export function WhoWeAre() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 md:pr-12">
            <h2 className="text-3xl font-bold leading-tight text-ink md:text-5xl font-montserrat">
              Who We Are & What We do ?
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            <p className="font-medium text-ink">
              Medexa Research is the founder and market leader of the clinical intelligence network,
              and the world's leading platform for trusted medical expertise.
            </p>
            <p>
              Clinical networks connect our partners — leading research institutions and
              pharmaceutical developers — with medical professionals whose expertise helps them
              navigate pressing clinical decisions.
            </p>
            <p>
              We created this category to solve a fundamental problem: researchers were spending
              hours poring over medical literature when they really needed to speak directly with
              the specialized physicians treating these patient cohorts.
            </p>
            <p>
              Today, our networks are used by leading clinical organizations around the world to
              accelerate trial design, validate biomarker hypotheses, gather critical market
              feedback, and ultimately bring life-saving therapies to patients faster.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
