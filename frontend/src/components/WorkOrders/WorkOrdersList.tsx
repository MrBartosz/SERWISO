import WorkOrderCard from "./WorkOrderCard";
import type { WorkOrder } from "@/types";

type Props = { data: WorkOrder[] };

export default function WorkOrdersList({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="text-center text-gray-500">Brak zleceń do wyświetlenia.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((wo) => (
        <WorkOrderCard key={wo.id} order={wo} />
      ))}
    </div>
  );
}
