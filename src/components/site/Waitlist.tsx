import { useState } from "react";
import { WaitlistModal } from "./WaitlistModal";

export function Waitlist() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="waitlist" className="bg-ink py-28 text-white md:py-36">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05]">
          Join our waitlist today
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
          Subscribe to receive early research updates, publication digests, and collaboration
          opportunities from Medexa Research.
        </p>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-full bg-white px-8 py-4 text-base font-medium text-ink shadow-lg transition hover:bg-white/90"
          >
            Apply to Network
          </button>
        </div>
      </div>
      <WaitlistModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}
