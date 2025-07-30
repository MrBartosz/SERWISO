export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-surface border border-border text-muted text-xs px-2 py-0.5 rounded-full">
      {children}
    </span>
  );
}
