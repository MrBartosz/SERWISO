import type { WorkOrder } from "@/types";

type Props = { order: WorkOrder };

export default function WorkOrderCard({ order }: Props) {
  return (
    <article className="p-6 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
      <h3 className="mb-3 text-lg font-medium text-gray-900">{order.title}</h3>
      <p className="mb-1 text-sm text-gray-700">
        <span className="font-semibold">Maszyna:</span> {order.machineName}
      </p>
      <p className="mb-1 text-sm text-gray-700">
        <span className="font-semibold">Priorytet:</span>{" "}
        <span
          className={
            order.priority === "high"
              ? "text-red-600"
              : order.priority === "low"
              ? "text-green-600"
              : "text-yellow-600"
          }
        >
          {order.priority}
        </span>
      </p>
      <p className="mb-4 text-sm text-gray-700">
        <span className="font-semibold">Utworzono:</span>{" "}
        {new Date(order.createdAt).toLocaleDateString("pl-PL")}
      </p>
      <a
        href={`/work-orders/${order.id}`}
        className="font-medium text-blue-600 hover:underline"
      >
        Szczegóły…
      </a>
    </article>
  );
}
