import type { WorkOrder, WorkOrderCreateInput } from "@/types";

const mockWorkOrders: WorkOrder[] = [
  {
    id: "1",
    title: "Przegląd silnika",
    machineId: "M-100",
    machineName: "Silnik A1",
    priority: "high",
    description: "Sprawdzenie poziomu oleju i luzów.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Kalibracja czujników",
    machineId: "M-200",
    machineName: "Czujnik B2",
    priority: "normal",
    description: "Regulacja i test działania.",
    createdAt: new Date().toISOString(),
  },
];

export async function fetchWorkOrders(): Promise<WorkOrder[]> {
  await new Promise((r) => setTimeout(r, 300));
  return mockWorkOrders;
}

export async function createWorkOrder(
  data: WorkOrderCreateInput
): Promise<WorkOrder> {
  await new Promise((r) => setTimeout(r, 300));
  const newWO: WorkOrder = {
    ...data,
    id: `${mockWorkOrders.length + 1}`,
    machineName: `Maszyna ${data.machineId}`,
    createdAt: new Date().toISOString(),
  };
  mockWorkOrders.push(newWO);
  return newWO;
}
