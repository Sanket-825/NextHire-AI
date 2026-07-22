import useLenis from "../hooks/useLenis";
import Navbar from "../features/landing/components/Navbar";
import Hero from "../features/landing/components/Hero";
import Features from "../features/landing/components/Features";
import Testimonials from "../features/landing/components/Testimonials";
import FAQ from "../features/landing/components/FAQ";
import Footer from "../features/landing/components/Footer";

export default function LandingPage() {
  
  useLenis();

  return (
    <div className="bg-background text-text">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}