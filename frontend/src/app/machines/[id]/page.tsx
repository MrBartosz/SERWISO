"use client";

import { useState, useEffect, Fragment } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  ArrowLeft,
  Cpu,
  Info,
  Wrench,
  ClipboardList,
  CalendarDays,
  Edit,
  Trash2,
  X,
} from "lucide-react";

const mockMachines = [
  {
    id: 1,
    name: "Prasa hydrauliczna H-220",
    location: "Hala A1",
    status: "online",
    history: "Przegląd wykonany 2025-06-12",
    condition: "Sprawna",
    orders: "Brak",
    scheduled: "2025-09-10",
    notes: [{ id: 1, text: "Wymieniono uszczelki", date: "2025-08-05" }],
  },
  {
    id: 2,
    name: "Frezarka CNC X500",
    location: "Hala B3",
    status: "offline",
    history: "Przegląd wykonany 2025-05-03",
    condition: "W naprawie",
    orders: "Zlecenie #1024",
    scheduled: "2025-08-15",
    notes: [],
  },
  {
    id: 3,
    name: "Tokarka T-250",
    location: "Hala A2",
    status: "online",
    history: "Przegląd wykonany 2025-07-20",
    condition: "Sprawna",
    orders: "Brak",
    scheduled: "2025-10-02",
    notes: [],
  },
];

export default function MachineDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [machines, setMachines] = useState(mockMachines);
  const idx = machines.findIndex((m) => m.id === Number(id));
  const machine = machines[idx];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"note" | "schedule">("note");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [confirmDeleteNoteId, setConfirmDeleteNoteId] = useState<number | null>(
    null
  );

  const [confirmDeleteMachine, setConfirmDeleteMachine] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  if (!machine) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-16 text-center"
      >
        <p className="text-lg font-semibold text-red-500">
          ❌ Nie znaleziono danych o maszynie.
        </p>
        <Button
          onClick={() => router.push("/machines")}
          className="px-6 py-2 mt-6 text-white shadow-md bg-accent rounded-xl hover:bg-accentHover"
        >
          Powrót do listy maszyn
        </Button>
      </motion.div>
    );
  }

  const handleSave = () => {
    const updated = [...machines];
    if (activeTab === "note") {
      if (!note.trim()) {
        setToast({ msg: "Notatka nie może być pusta", type: "error" });
        return;
      }
      if (editNoteId) {
        updated[idx].notes = updated[idx].notes.map((n) =>
          n.id === editNoteId ? { ...n, text: note } : n
        );
        setToast({ msg: "Notatka zaktualizowana", type: "success" });
      } else {
        updated[idx].notes.push({
          id: Date.now(),
          text: note,
          date: new Date().toISOString().slice(0, 10),
        });
        setToast({ msg: "Dodano notatkę", type: "success" });
      }
    } else {
      if (!date) {
        setToast({ msg: "Wybierz datę przeglądu", type: "error" });
        return;
      }
      updated[idx].scheduled = date;
      setToast({ msg: "Przegląd zaplanowany", type: "success" });
    }
    setMachines(updated);
    setIsModalOpen(false);
    setNote("");
    setDate("");
    setEditNoteId(null);
  };

  const handleDeleteNote = (nid: number) => {
    const updated = [...machines];
    updated[idx].notes = updated[idx].notes.filter((n) => n.id !== nid);
    setMachines(updated);
    setConfirmDeleteNoteId(null);
    setToast({ msg: "Notatka usunięta", type: "info" });
  };

  const handleConfirmDeleteMachine = () => {
    if (deletePassword !== "admin") {
      setToast({ msg: "Niepoprawne hasło", type: "error" });
      return;
    }
    const updated = machines.filter((m) => m.id !== machine.id);
    setMachines(updated);
    setConfirmDeleteMachine(false);
    setToast({ msg: "Maszyna usunięta", type: "info" });
    setTimeout(() => router.push("/machines"), 300);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto mt-10 space-y-6"
      >
        <div className="flex items-center justify-between">
          <Button
            onClick={() => router.push("/machines")}
            className="flex items-center gap-2 px-4 py-2 text-white shadow-md bg-accent rounded-xl hover:bg-accentHover"
          >
            <ArrowLeft size={18} />
            Powrót
          </Button>
          <Button
            variant="ghost"
            onClick={() => setConfirmDeleteMachine(true)}
            className="p-2 text-red-600 hover:bg-red-100"
          >
            <Trash2 size={18} />
          </Button>
        </div>

        <Card className="shadow-xl border-white/20 rounded-2xl bg-gradient-to-br from-surface/90 to-surface/40 backdrop-blur-md">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-accent/20">
                <Cpu size={36} className="text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-foreground">
                  {machine.name}
                </h1>
                <p className="text-sm text-muted">
                  Lokalizacja: {machine.location}
                </p>
              </div>
            </div>

            <p className="text-lg">
              Status:{" "}
              <span
                className={`px-2 py-0.5 rounded-md text-sm font-medium ${
                  machine.status === "online"
                    ? "bg-green-500/70 text-white"
                    : "bg-red-500/70 text-white"
                }`}
              >
                {machine.status === "online" ? "Online" : "Offline"}
              </span>
            </p>

            <div className="grid gap-4 pt-2 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Info size={18} className="text-accent" />
                Historia przeglądów:{" "}
                <span className="font-medium">{machine.history}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench size={18} className="text-accent" />
                Aktualny stan:{" "}
                <span className="font-medium">{machine.condition}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardList size={18} className="text-accent" />
                Zlecenia konserwacyjne:{" "}
                <span className="font-medium">{machine.orders}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-accent" />
                Przyszłe przeglądy:{" "}
                <span className="font-medium">{machine.scheduled}</span>
              </div>
            </div>

            {machine.notes.length > 0 && (
              <div className="pt-6">
                <h3 className="mb-2 text-lg font-semibold">
                  📝 Ostatnie notatki:
                </h3>
                <div className="space-y-2">
                  {machine.notes
                    .slice()
                    .reverse()
                    .map((n) => (
                      <div
                        key={n.id}
                        className="flex items-start justify-between p-3 border rounded-lg bg-accent/10 border-accent/20"
                      >
                        <div>
                          <p className="text-sm text-foreground">{n.text}</p>
                          <span className="text-xs text-muted">
                            📅 {n.date}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditNoteId(n.id);
                              setNote(n.text);
                              setActiveTab("note");
                              setIsModalOpen(true);
                            }}
                            className="p-1 rounded-md hover:bg-accent/20"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteNoteId(n.id)}
                            className="p-1 text-red-600 rounded-md hover:bg-red-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="pt-6">
              <Button
                onClick={() => {
                  setActiveTab("note");
                  setIsModalOpen(true);
                }}
                className="px-6 py-2 text-white shadow-md bg-gradient-to-r from-accent to-accentHover rounded-xl hover:brightness-110"
              >
                Dodaj notatkę / zaplanuj przegląd
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Fragment>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="w-full max-w-lg p-6 shadow-xl bg-gradient-to-br from-surface/95 to-surface/70 rounded-2xl border-accent/30 backdrop-blur-md">
                <div className="flex items-center justify-between pb-4 border-b border-accent/20">
                  <h2 className="text-xl font-semibold text-foreground">
                    {activeTab === "note"
                      ? editNoteId
                        ? "✏️ Edytuj notatkę"
                        : "📝 Dodaj notatkę"
                      : "📅 Zaplanuj przegląd"}
                  </h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditNoteId(null);
                      setNote("");
                      setDate("");
                    }}
                    className="p-1 rounded-md hover:bg-accent/10"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button
                    className={`flex-1 py-2 rounded-lg ${
                      activeTab === "note"
                        ? "bg-accent text-white"
                        : "bg-accent/10 text-foreground"
                    }`}
                    onClick={() => setActiveTab("note")}
                  >
                    📝 Notatka
                  </Button>
                  <Button
                    className={`flex-1 py-2 rounded-lg ${
                      activeTab === "schedule"
                        ? "bg-accent text-white"
                        : "bg-accent/10 text-foreground"
                    }`}
                    onClick={() => setActiveTab("schedule")}
                  >
                    📅 Przegląd
                  </Button>
                </div>

                <div className="mt-4">
                  {activeTab === "note" ? (
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      className="w-full p-3 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Wpisz treść notatki..."
                    />
                  ) : (
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-3 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  )}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditNoteId(null);
                      setNote("");
                      setDate("");
                    }}
                  >
                    Anuluj
                  </Button>
                  <Button onClick={handleSave}>
                    {activeTab === "note"
                      ? editNoteId
                        ? "Zapisz zmiany"
                        : "Dodaj notatkę"
                      : "Zaplanuj przegląd"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDeleteNoteId !== null && (
          <Fragment>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full max-w-sm p-6 shadow-lg bg-surface rounded-2xl">
                <h3 className="mb-4 text-lg font-semibold">
                  Czy na pewno chcesz usunąć tę notatkę?
                </h3>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => setConfirmDeleteNoteId(null)}
                  >
                    Anuluj
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteNote(confirmDeleteNoteId!)}
                  >
                    Usuń
                  </Button>
                </div>
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDeleteMachine && (
          <Fragment>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full max-w-md p-6 shadow-lg bg-surface rounded-2xl">
                <h3 className="mb-4 text-lg font-semibold text-red-600">
                  Usuwanie maszyny
                </h3>
                <p className="mb-4">
                  Wpisz hasło, aby potwierdzić usunięcie maszyny "{machine.name}
                  ".
                </p>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full p-3 mb-6 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Hasło"
                />
                <div className="flex justify-end gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setConfirmDeleteMachine(false);
                      setDeletePassword("");
                    }}
                  >
                    Anuluj
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleConfirmDeleteMachine}
                  >
                    Potwierdź
                  </Button>
                </div>
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>

      {toast && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed z-[9999] flex items-center gap-4 px-6 py-4 top-24 right-6
                     rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                     border border-white/10 backdrop-blur-xl
                     bg-gradient-to-r from-slate-900/80 to-slate-800/70 text-white min-w-[300px]"
        >
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full 
              ${toast.type === "success" && "bg-green-500/20 text-green-400"}
              ${toast.type === "error" && "bg-red-500/20 text-red-400"}
              ${toast.type === "info" && "bg-blue-500/20 text-blue-400"}`}
          >
            {toast.type === "success" && <span className="text-2xl">✔</span>}
            {toast.type === "error" && <span className="text-2xl">⚠</span>}
            {toast.type === "info" && <span className="text-2xl">ℹ</span>}
          </div>

          <div className="flex-1 text-sm font-medium leading-snug">
            {toast.msg}
          </div>

          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3.5, ease: "linear" }}
            className={`absolute bottom-0 left-0 h-[3px] rounded-b-2xl
              ${
                toast.type === "success" &&
                "bg-gradient-to-r from-green-400 to-emerald-500"
              }
              ${
                toast.type === "error" &&
                "bg-gradient-to-r from-red-400 to-pink-500"
              }
              ${
                toast.type === "info" &&
                "bg-gradient-to-r from-blue-400 to-indigo-500"
              }`}
          />
        </motion.div>
      )}
    </>
  );
}
