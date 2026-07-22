import Card from "../../../components/ui/Card";

const TESTIMONIALS = [
  {
    quote:
      "I used this the week before my technical interviews and it caught gaps in my System Design answers I didn't know I had.",
    name: "Early beta user",
    role: "Frontend Developer",
  },
  {
    quote:
      "The feedback isn't generic — it actually references what I wrote and tells me what a stronger answer would include.",
    name: "Early beta user",
    role: "Full Stack Developer",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-semibold text-text">What early users are saying</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t) => (
          <Card key={t.name + t.role}>
            <p className="text-text text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4 text-sm text-text-secondary">
              <span className="text-text font-medium">{t.name}</span> — {t.role}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}