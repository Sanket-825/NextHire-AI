// Temporary placeholder used while scaffolding routes in Phase 3, Part 2.
// Every page below gets replaced with real, designed UI in later phases —
// this just proves routing, layout, and navigation work end-to-end first.
export default function PagePlaceholder({ name, note }) {
  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center p-6">
      <div className="bg-surface border border-border rounded-xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <p className="text-text-secondary mt-2 text-sm">{note}</p>
      </div>
    </div>
  );
}