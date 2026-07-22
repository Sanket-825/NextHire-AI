import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scrolling for the lifetime of the component
 * that calls this hook, and destroys it on unmount. Deliberately scoped
 * to individual pages (the Landing Page) rather than the whole app —
 * smooth-scroll libraries can conflict with sticky headers, modal
 * scroll-locking, and long scrollable lists inside the logged-in app,
 * so we only enable it where it's purely a marketing-page enhancement.
 *
 * Synced to GSAP's ticker (instead of a separate requestAnimationFrame
 * loop) because this page also uses ScrollTrigger (Features.jsx). Running
 * two independent scroll-driven raf loops causes exactly the "fast/jerky,
 * not smooth" feel, and without `lenis.on("scroll", ScrollTrigger.update)`,
 * ScrollTrigger never learns that Lenis moved the scroll position.
 */
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    // GSAP's own lag-smoothing fights with Lenis's smoothing (both trying
    // to compensate for frame timing), producing a "double smoothing" jank.
    // Lenis already handles this, so GSAP's is turned off here.
    gsap.ticker.lagSmoothing(0);

    // Intercept clicks on same-page hash links (e.g. "#features" in the
    // Navbar/Footer). Without this, the browser's native anchor-jump
    // behavior fires instantly and completely bypasses Lenis — this is
    // what makes nav-link clicks smooth-scroll too, matching the feel
    // of scrolling with the mouse wheel.
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      // Offset accounts for the fixed Navbar height so the section
      // heading isn't left hidden underneath it after scrolling.
      lenis.scrollTo(targetEl, { offset: -80 });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}