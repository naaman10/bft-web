import { LOCAL_AREA_PHRASE } from "@/lib/site-location";

const reasons = [
  {
    title: "1:1 Personalised Learning",
    description:
      "Focused support designed around your child's needs.",
  },
  {
    title: "Engaging & Fun Sessions",
    description:
      "Sessions that build confidence and keep learners motivated.",
  },
  {
    title: "Weekly Progress Feedback",
    description:
      "Clear updates so you know how your child is getting on.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold text-center text-slate-900 mb-4">
        Why Parents Choose Us
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-base text-slate-600">
        Trusted tutoring for ages 5–14 {LOCAL_AREA_PHRASE}.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {reasons.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-primary-100 bg-primary-50/50 p-6 shadow-sm"
          >
            <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
