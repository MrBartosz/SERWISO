export type WorkOrder = {
  id: string;
  title: string;
  machineId: string;
  machineName: string;
  priority: "low" | "normal" | "high";
  description: string;
  createdAt: string;
};

export type WorkOrderCreateInput = {
  title: string;
  machineId: string;
  priority: "low" | "normal" | "high";
  description: string;
};
