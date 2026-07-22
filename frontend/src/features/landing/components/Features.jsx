import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "../../../components/ui/Card";
import { HiOutlineSparkles, HiOutlineChartBar, HiOutlineBookmark } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: HiOutlineSparkles,
    title: "AI-generated questions",
    description:
      "Get interview questions tailored to your exact role, experience level, and difficulty — generated fresh every session, never the same static bank.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Instant, structured feedback",
    description:
      "Every answer gets scored with correctness, a confidence rating, an ideal-answer comparison, and specific ways to improve — not just a vague grade.",
  },
  {
    icon: HiOutlineBookmark,
    title: "Track your progress",
    description:
      "Bookmark tough questions, review your session history, and watch your average score trend upward across a real dashboard, not a spreadsheet.",
  },
];

export default function Features() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-semibold text-text">Built for real interview prep</h2>
        <p className="text-text-secondary mt-3 max-w-lg mx-auto">
          Not another generic quiz app — every part of the flow is designed around
          how technical interviews actually work.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
          <Card key={feature.title} className="feature-card">
            <feature.icon className="text-accent-green" size={28} />
            <h3 className="text-text font-medium mt-4">{feature.title}</h3>
            <p className="text-text-secondary text-sm mt-2 leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}