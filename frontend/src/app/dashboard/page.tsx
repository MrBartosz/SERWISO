import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <DashboardLayout />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Witaj w panelu Serwiso</h1>
        <p className="text-neutral-500">
          Tutaj będą wyświetlane dane z systemu.
        </p>
      </main>
    </div>
  );
}
