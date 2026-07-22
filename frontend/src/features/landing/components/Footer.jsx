export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-text-secondary text-sm">
          © {new Date().getFullYear()} NextHire-AI. Built as a personal project.
        </span>
        <div className="flex gap-6 text-sm text-text-secondary">
          <a href="#features" className="hover:text-text transition-colors">Features</a>
          <a href="#faq" className="hover:text-text transition-colors">FAQ</a>
        </div>
      </div>
    </footer>
  );
}