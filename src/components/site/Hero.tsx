import { useState, useEffect } from "react";
import hero1 from "@/assets/healthcare-hero-1.jpg";
import hero2 from "@/assets/healthcare-hero-2.jpg";
import hero3 from "@/assets/healthcare-hero.png";
import { WaitlistModal } from "./WaitlistModal";

const images = [hero1, hero2, hero3];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink font-montserrat">
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt="Modern clinical research environment"
          width={1920}
          height={1080}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === currentImageIndex ? "opacity-100" : "opacity-0"
          } ${img === hero1 ? "-scale-x-100" : ""}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
        <div className="max-w-4xl text-white">
          <h1
            className="font-montserrat text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.15] tracking-tight"
            style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)" }}
          >
            Accelerating the future of
            <br />
            <span className="font-light">precision medicine.</span>
          </h1>
          <p
            className="mt-7 max-w-md text-sm leading-relaxed text-white/90 md:text-base"
            style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.5), 0 1px 1px rgba(0, 0, 0, 0.3)" }}
          >
            Medexa Research provides the clinical intelligence platform that connects researchers,
            oncologists, and diverse patient cohorts to accelerate life-saving therapies.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white/95 py-2 pl-2 pr-5 text-xs font-medium text-ink shadow-lg backdrop-blur transition hover:bg-white cursor-pointer"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                <circle cx="12" cy="12" r="6" />
              </svg>
            </span>
            Join our waitlist
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
      <WaitlistModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}
