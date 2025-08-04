"use client";

import { useState } from "react";
import { createWorkOrder } from "@/services/workOrders";
import type { WorkOrderCreateInput } from "@/types";

export default function WorkOrderForm() {
  const [form, setForm] = useState<WorkOrderCreateInput>({
    title: "",
    machineId: "",
    priority: "normal",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await createWorkOrder(form);
      window.location.href = "/work-orders";
    } catch (err: any) {
      setErrorMsg(err.message || "Wystąpił błąd");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-6 space-y-5 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      {errorMsg && (
        <p className="p-2 text-red-600 bg-red-100 rounded">{errorMsg}</p>
      )}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Tytuł
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Maszyna ID
        </label>
        <input
          name="machineId"
          value={form.machineId}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Priorytet
        </label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">niski</option>
          <option value="normal">normalny</option>
          <option value="high">wysoki</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Opis
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 font-medium text-center text-white transition bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Tworzę…" : "Utwórz zlecenie"}
      </button>
    </form>
  );
}
