const screens = [
  {
    type: "STUDY",
    name: "STUDY",
    tag: "CLINICAL STUDY",
    caption: "Real-time tracking of patient enrollment and trial metrics.",
  },
  {
    type: "BIOMARKERS",
    name: "BIOMARKERS",
    tag: "EXPRESSION PROFILING",
    caption: "Continuous monitoring of protein expression and anomaly detection.",
  },
  {
    type: "GENOMICS",
    name: "GENOMICS",
    tag: "DNA MAPPING",
    caption: "High-throughput sequencing diagnostics and genomic variation charts.",
  },
];

export function Guardian() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 md:py-36"
      style={{
        background: "linear-gradient(180deg, var(--cream) 0%, oklch(0.92 0.04 55) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] text-ink">
            Pioneering Insights at Scale
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Accelerating the pace of clinical translation with advanced study tracking, patient
            cohort analytics, and secure data sharing protocols.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {screens.map((s, i) => (
            <Phone key={i} {...s} offset={i === 1 ? -28 : 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Phone({
  type,
  name,
  tag,
  caption,
  offset,
}: {
  type: string;
  name: string;
  tag: string;
  caption: string;
  offset: number;
}) {
  return (
    <div className="flex justify-center" style={{ transform: `translateY(${offset}px)` }}>
      <div className="relative w-[260px] rounded-[2.6rem] bg-black p-2 shadow-2xl ring-1 ring-black/20">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem] bg-neutral-950 text-white flex flex-col font-sans select-none">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          {/* Status bar */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-2 text-[10px] font-medium text-white">
            <span>9:41</span>
            <span className="opacity-80">•••• ▾ ▮</span>
          </div>
          {/* Tabs */}
          <div className="absolute left-0 right-0 top-9 z-10 flex justify-center gap-4 text-[10px] uppercase tracking-wider text-white/80">
            <span className="opacity-50">COHORT</span>
            <span className="border-b border-white pb-1">{name}</span>
            <span className="opacity-50">LABS</span>
          </div>

          {/* Screen Content */}
          <div className="flex-1 px-4 pt-16 pb-24 flex flex-col overflow-hidden text-left">
            {type === "STUDY" && <StudyDashboard />}
            {type === "BIOMARKERS" && <BiomarkerDashboard />}
            {type === "GENOMICS" && <GenomicsDashboard />}
          </div>

          {/* Bottom info */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/85 to-transparent p-4 pt-10 text-white text-left">
            <p className="text-[10px] uppercase tracking-[0.18em] opacity-80">{tag}</p>
            <p className="mt-1 text-sm leading-snug">{caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudyDashboard() {
  return (
    <>
      <div className="mt-2">
        <div className="text-[8px] text-emerald-400 uppercase tracking-widest font-bold">
          COHORT MONITOR
        </div>
        <div className="text-base font-semibold text-white">Trial Progress</div>
      </div>

      {/* Progress ring */}
      <div className="flex items-center gap-3 mt-4 bg-white/5 p-2.5 rounded-xl border border-white/5">
        <div className="relative flex items-center justify-center h-10 w-10 flex-shrink-0">
          <svg className="h-full w-full transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="16"
              className="text-white/10"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              className="text-emerald-400"
              strokeWidth="2.5"
              strokeDasharray={100.4}
              strokeDashoffset={100.4 * (1 - 0.84)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-[8px] font-bold text-emerald-400">84%</span>
        </div>
        <div>
          <div className="text-[8px] text-white/50 uppercase">Cohort Enrollment</div>
          <div className="text-[10px] font-semibold text-white">2,410 / 2,800 Patients</div>
        </div>
      </div>

      {/* Trend line */}
      <div className="mt-3 bg-white/5 p-2.5 rounded-xl border border-white/5 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="text-[8px] text-white/50 uppercase">Enrollment Growth</div>
        <div className="h-14 w-full mt-2">
          <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0,35 Q15,10 30,25 T60,15 T90,5 L100,5 L100,40 L0,40 Z"
              fill="url(#grad-study)"
            />
            <path
              d="M0,35 Q15,10 30,25 T60,15 T90,5"
              fill="none"
              stroke="#34d399"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id="grad-study" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex justify-between text-[6px] text-white/40 mt-1 uppercase font-semibold">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
        </div>
      </div>

      {/* Badges */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="bg-white/5 p-2 rounded-xl border border-white/5 text-center">
          <div className="text-[6px] text-white/40 uppercase">Active Sites</div>
          <div className="text-[10px] font-bold text-white mt-0.5">128</div>
        </div>
        <div className="bg-white/5 p-2 rounded-xl border border-white/5 text-center">
          <div className="text-[6px] text-white/40 uppercase">Retention Rate</div>
          <div className="text-[10px] font-bold text-white mt-0.5">96.4%</div>
        </div>
      </div>
    </>
  );
}

function BiomarkerDashboard() {
  return (
    <>
      <div className="mt-2">
        <div className="text-[8px] text-blue-400 uppercase tracking-widest font-bold">
          EXPRESSION ANALYSIS
        </div>
        <div className="text-base font-semibold text-white">Biomarkers</div>
      </div>

      {/* Line Chart */}
      <div className="mt-4 bg-white/5 p-2.5 rounded-xl border border-white/5">
        <div className="text-[8px] text-white/50 uppercase mb-1">Kinetics (IL-6 vs TNF-α)</div>
        <div className="h-16 w-full relative">
          <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0,25 C20,10 40,35 60,15 C80,0 90,20 100,10"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1.5"
            />
            <path
              d="M0,15 C20,30 40,5 60,25 C80,10 90,30 100,20"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="1.5"
            />
          </svg>
          <div className="absolute top-0 right-0 flex gap-1.5 text-[6px] font-semibold">
            <span className="flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-blue-400"></span>IL-6
            </span>
            <span className="flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-purple-400"></span>TNF-α
            </span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="mt-3 bg-white/5 p-2.5 rounded-xl border border-white/5 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="text-[8px] text-white/50 uppercase mb-2">High-Throughput Matrix</div>
        <div className="grid grid-cols-6 gap-1 my-auto">
          {[
            0.9, 0.4, 0.7, 0.2, 0.8, 0.5, 0.3, 0.9, 0.5, 0.8, 0.1, 0.6, 0.7, 0.1, 0.9, 0.4, 0.6,
            0.8,
          ].map((op, i) => (
            <div
              key={i}
              className="aspect-square rounded-[1px]"
              style={{ backgroundColor: `rgba(96, 165, 250, ${op})` }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function GenomicsDashboard() {
  return (
    <>
      <div className="mt-2">
        <div className="text-[8px] text-purple-400 uppercase tracking-widest font-bold">
          DNA SEQUENCING
        </div>
        <div className="text-base font-semibold text-white">Target Mapping</div>
      </div>

      {/* Sequence Bar */}
      <div className="mt-4 bg-white/5 p-2.5 rounded-xl border border-white/5">
        <div className="text-[8px] text-white/50 uppercase mb-2">Chromosome 19 Target</div>
        <div className="flex flex-col gap-1 font-mono text-[7px] text-white/40 tracking-wider">
          <div>5'- ACGTTGCCATGCATGC -3'</div>
          <div className="h-3.5 w-full bg-gradient-to-r from-cyan-500/20 via-pink-500/25 to-blue-500/20 rounded relative overflow-hidden border border-white/5">
            <div className="absolute top-0 bottom-0 left-[35%] w-0.5 bg-yellow-400 shadow-md" />
            <div className="absolute top-0 bottom-0 left-[65%] w-0.5 bg-yellow-400 shadow-md" />
          </div>
          <div>3'- TGCAACGGTACGTACG -5'</div>
        </div>
      </div>

      {/* Coverage Bars */}
      <div className="mt-3 bg-white/5 p-2.5 rounded-xl border border-white/5 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="text-[8px] text-white/50 uppercase mb-2">Sequence Coverage</div>
        <div className="flex items-end justify-between h-14 gap-0.5 px-0.5">
          {[30, 45, 60, 25, 70, 85, 90, 40, 55, 65, 80, 95, 50, 45, 60, 75].map((h, i) => (
            <div
              key={i}
              className="w-full bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-[1px]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
