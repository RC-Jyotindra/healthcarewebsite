import { useState } from "react";

type Publication = {
  title: string;
  authors: string;
  journal: string;
  date: string;
  category: string;
  doi: string;
};

const publications: Publication[] = [
  {
    title:
      "Single-Cell Transcriptomics Reveals Immunotherapy Resistance Markers in Triple-Negative Breast Cancer",
    authors: "Chen, S., Vance, M., et al.",
    journal: "Journal of Clinical Oncology",
    date: "May 2026",
    category: "Oncology",
    doi: "10.1200/JCO.2026.88.109",
  },
  {
    title:
      "Genomic Predictors of Adverse Events in Novel Antihypertensive Therapies: A Cohort Study",
    authors: "Vance, M., Patel, A., et al.",
    journal: "Nature Medicine",
    date: "March 2026",
    category: "Genomics",
    doi: "10.1038/s41591-026-0312-x",
  },
  {
    title:
      "Real-time Machine Learning for Sepsis Prediction in Emergency Departments: A Multi-Center Trial",
    authors: "Patel, A., Silva, J., et al.",
    journal: "The Lancet Digital Health",
    date: "January 2026",
    category: "Digital Health",
    doi: "10.1016/S2589-7500(25)00242-1",
  },
  {
    title: "Longitudinal Biomarker Analysis of Neurodegenerative Decline in Age-Related Syndromes",
    authors: "Silva, J., Taylor, L., et al.",
    journal: "New England Journal of Medicine",
    date: "November 2025",
    category: "Neurology",
    doi: "10.1056/NEJMoa2510204",
  },
];

const categories = ["All", "Oncology", "Genomics", "Neurology", "Digital Health"];

export function Publications() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPublications =
    activeCategory === "All"
      ? publications
      : publications.filter((p) => p.category === activeCategory);

  return (
    <section id="publications" className="bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            PUBLICATIONS
          </p>
          <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] text-ink">
            Peer-Reviewed Research
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Our findings are regularly published in top-tier journals. Browse our latest
            peer-reviewed studies across various clinical disciplines.
          </p>
        </div>

        {/* Categories Tab Filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-ink text-white"
                  : "bg-white/80 text-muted-foreground hover:bg-white hover:text-ink"
              } shadow-sm`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Publications Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {filteredPublications.map((pub, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition hover:shadow-md md:p-8"
            >
              <div>
                <span className="inline-block rounded-full bg-cream-deep px-3 py-1 text-xs font-medium text-ink">
                  {pub.category}
                </span>
                <h3 className="mt-4 text-xl font-medium leading-snug text-ink md:text-2xl">
                  {pub.title}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-ink">Authors:</span> {pub.authors}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-semibold text-ink">Journal:</span> {pub.journal} ({pub.date}
                  )
                </p>
              </div>
              <div className="mt-6 border-t border-border/40 pt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground/85">DOI: {pub.doi}</span>
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition hover:underline"
                >
                  Read Study
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
