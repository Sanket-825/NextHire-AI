import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Button from "../../../components/ui/Button";

export default function Hero() {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.5 })
        .from(
          ".hero-headline-line",
          { opacity: 0, y: 24, duration: 0.7, stagger: 0.12 },
          "-=0.2"
        )
        .from(".hero-subtext", { opacity: 0, y: 16, duration: 0.6 }, "-=0.3")
        .from(
          ".hero-cta",
          { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24"
    >
      <span className="hero-eyebrow inline-block text-xs font-medium text-accent-green border border-accent-green/30 bg-accent-green/10 rounded-full px-3 py-1 mb-6">
        AI-powered interview prep
      </span>

      <h1 className="max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight text-text leading-tight">
        <span className="hero-headline-line block">Practice interviews</span>
        <span className="hero-headline-line block">that actually prepare you.</span>
      </h1>

      <p className="hero-subtext max-w-xl mt-6 text-text-secondary text-base md:text-lg">
        Generate role-specific interview questions, answer them, and get instant
        AI feedback with a score, ideal answers, and concrete ways to improve.
      </p>

      <div className="flex items-center gap-4 mt-10">
        <Link to="/register" className="hero-cta">
          <Button size="lg">Start practicing free</Button>
        </Link>
        <a href="#features" className="hero-cta">
          <Button variant="secondary" size="lg">See how it works</Button>
        </a>
      </div>
    </section>
  );
}