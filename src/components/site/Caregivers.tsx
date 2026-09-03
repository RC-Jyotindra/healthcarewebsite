const r1 =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300&q=80";
const r2 =
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&h=300&q=80";
const r3 =
  "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1";
const r4 =
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&h=300&q=80";
const r5 =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&h=300&q=80";
const r6 =
  "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=300&h=300&q=80";

type Bubble = {
  img: string;
  alt: string;
  label?: string;
  labelSide?: "left" | "right";
  size: number; // px
  top: string;
  left: string;
};

const bubbles: Bubble[] = [
  {
    img: r1,
    alt: "Dr. Chen",
    // label: "Can immunotherapies target micro-metastatic disease?",
    labelSide: "left",
    size: 96,
    top: "4%",
    left: "32%",
  },
  {
    img: r2,
    alt: "Dr. Vance",
    // label: "How do genomic variants alter cardiovascular drug efficacy?",
    labelSide: "right",
    size: 104,
    top: "8%",
    left: "60%",
  },
  {
    img: r3,
    alt: "Dr. Patel",
    // label: "Can AI diagnostics forecast sepsis onset hours in advance?",
    labelSide: "right",
    size: 92,
    top: "26%",
    left: "16%",
  },
  {
    img: r4,
    alt: "Dr. Silva",
    // label: "Which environmental biomarkers trace neural decline?",
    labelSide: "right",
    size: 92,
    top: "30%",
    left: "72%",
  },
  {
    img: r5,
    alt: "Dr. Taylor",
    // label: "What determines patient response consistency in Phase II trials?",
    labelSide: "right",
    size: 100,
    top: "58%",
    left: "10%",
  },
  {
    img: r6,
    alt: "Dr. Yamamoto",
    // label: "Can longitudinal EHR modeling prevent chronic kidney injury?",
    labelSide: "left",
    size: 100,
    top: "60%",
    left: "82%",
  },
];

export function Caregivers() {
  return (
    <section className="relative bg-cream py-28 md:py-40">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="relative min-h-[640px] md:min-h-[720px]">
          {/* Floating bubbles - hidden on mobile, shown on md+ */}
          <div className="absolute inset-0 hidden md:block">
            {bubbles.map((b, i) => (
              <FloatingBubble key={i} {...b} delay={i * 0.4} />
            ))}
          </div>

          {/* Center text */}
          <div className="relative flex min-h-[640px] flex-col items-center justify-center text-center md:min-h-[720px]">
            <h2 className="max-w-2xl text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] text-ink">
              Answering the critical
              <br />
              questions in medicine
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Our researchers investigate the complex interactions between genetics, immunology, and
              digital health markers to define the future of clinical medicine.
            </p>
          </div>

          {/* Mobile fallback grid */}
          <div className="mt-12 grid grid-cols-3 gap-4 md:hidden">
            {bubbles.map((b, i) => (
              <img
                key={i}
                src={b.img}
                alt={b.alt}
                loading="lazy"
                className="aspect-square w-full rounded-full object-cover shadow-md ring-1 ring-black/5"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingBubble({
  img,
  alt,
  label,
  labelSide,
  size,
  top,
  left,
  delay,
}: Bubble & { delay: number }) {
  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        animation: `floaty 7s ease-in-out ${delay}s infinite`,
      }}
    >
      <div className="relative">
        <img
          src={img}
          alt={alt}
          loading="lazy"
          className="rounded-full object-cover shadow-md ring-1 ring-black/5"
          style={{ width: size, height: size }}
        />
        {label && (
          <div
            className={`absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-border/70 bg-card/90 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur lg:block ${
              labelSide === "left" ? "right-full mr-3" : "left-full ml-3"
            }`}
          >
            {label}
          </div>
        )}
      </div>
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
