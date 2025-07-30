import { Bell } from "lucide-react";
export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-muted">
      <Bell className="mb-2 text-4xl text-border" />
      <p>{message}</p>
    </div>
  );
}
