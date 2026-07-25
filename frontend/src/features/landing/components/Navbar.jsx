import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Logo from "../../../components/brand/Logo";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="flex items-center gap-2 font-semibold text-text tracking-tight">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent-green/10 border border-accent-green/30">
            <Logo className="w-3.5 h-3.5 text-accent-green" />
          </span>
          NextHire-AI
        </span>
        <nav className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
          <a href="#features" className="hover:text-text transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-text transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-text transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}