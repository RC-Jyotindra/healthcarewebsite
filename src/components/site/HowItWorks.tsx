export function HowItWorks() {
  const steps = [
    {
      title: "Complete a Medexa Profile",
      description:
        "Tell us about your clinical history, research focus, and set a consultation rate of your choosing.",
    },
    {
      title: "Our Process",
      description:
        "When you match an active clinical trial or research project, we will ask you to answer a few questions to confirm your knowledge fits our project's precise need.",
    },
    {
      title: "Confirm Your Availability",
      description:
        "After our client reviews your profile and asks to speak with you, we'll find a mutual time to connect you through a 1:1 call. Rarely is any prep work required in advance.",
    },
    {
      title: "Get Paid",
      description:
        "Once the consultation is completed, you'll receive payment based on your set rate.",
    },
    {
      title: "Stay Connected",
      description:
        "Keep your Medexa profile up to date to increase the likelihood of being matched to another relevant clinical opportunity.",
    },
  ];

  return (
    <section className="bg-[#0f111a] py-24 md:py-32 text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-bold text-white md:text-5xl font-montserrat sticky top-32">
              How It Works
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-col">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 border-b border-white/10 last:border-b-0 hover:border-white/30 transition-colors"
                >
                  <h3 className="text-xl md:text-2xl font-semibold w-full md:w-1/3 mb-4 md:mb-0 text-white/90 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/60 w-full md:w-2/3 md:pl-12">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
