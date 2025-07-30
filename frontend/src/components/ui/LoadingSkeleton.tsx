export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 rounded bg-elevated"></div>
      <div className="h-48 rounded bg-elevated"></div>
    </div>
  );
}
