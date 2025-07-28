import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="mb-2 text-3xl font-bold text-accent">
        Witaj w panelu Serwiso
      </h1>
      <p className="text-muted">Tutaj będą wyświetlane dane z systemu.</p>
    </DashboardLayout>
  );
}
