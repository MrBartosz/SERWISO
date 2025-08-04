"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  ArrowLeft,
  ClipboardList,
  Info,
  Wrench,
  CalendarDays,
  Edit,
  Trash2,
  X,
} from "lucide-react";

export default function WorkOrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const initialOrders = [
    {
      id: "1",
      title: "Diagnostyka pompy hydraulicznej",
      description:
        "Sprawdzenie ciśnienia i szczelności układu hydraulicznego pompy H200.",
      machineName: "Pompa H200",
      priority: "medium",
      status: "otwarte",
      createdAt: "2025-07-30",
      dueDate: "2025-08-05",
      relatedOrders: 1,
      scheduledActions: "Wymiana uszczelek",
      notes: [],
    },
    {
      id: "2",
      title: "Konserwacja linii produkcyjnej",
      description:
        "Wymiana łożysk i smarowanie ruchomych części na odcinku L5.",
      machineName: "Linia L5",
      priority: "high",
      status: "w toku",
      createdAt: "2025-08-01",
      dueDate: "2025-08-08",
      relatedOrders: 0,
      scheduledActions: "Mechanika, automatyka",
      notes: [
        { id: "n21", text: "Zamówiono nowe łożyska", date: "2025-08-02" },
      ],
    },
    {
      id: "3",
      title: "Kalibracja wagi systemu",
      description:
        "Sprawdzenie i korekta dokładności wagi S1 przed kolejną serią produkcji.",
      machineName: "Waga S1",
      priority: "low",
      status: "zakończone",
      createdAt: "2025-07-20",
      dueDate: "2025-07-22",
      relatedOrders: 0,
      scheduledActions: "Elektronika",
      notes: [
        {
          id: "n31",
          text: "Kalibracja potwierdzona – odchyłka <0.5%",
          date: "2025-07-21",
        },
      ],
    },
    {
      id: "4",
      title: "Wymiana filtra powietrza",
      description:
        "Uzupełnienie filtrów w kompresorze i sprawdzenie ciśnienia.",
      machineName: "Kompresor K3",
      priority: "medium",
      status: "oczekuje",
      createdAt: "2025-08-03",
      dueDate: "2025-08-10",
      relatedOrders: 2,
      scheduledActions: "Mechanika",
      notes: [],
    },
    {
      id: "5",
      title: "Aktualizacja oprogramowania robota",
      description:
        "Instalacja firmware v2.3 oraz testy funkcjonalne robota R7.",
      machineName: "Robot R7",
      priority: "high",
      status: "przypisane",
      createdAt: "2025-08-02",
      dueDate: "2025-08-06",
      relatedOrders: 3,
      scheduledActions: "Programowanie, testy",
      notes: [
        {
          id: "n51",
          text: "Wykonano backup ustawień poprzedniej wersji",
          date: "2025-08-02",
        },
        {
          id: "n52",
          text: "Uruchomiono testy podstawowych ruchów",
          date: "2025-08-03",
        },
      ],
    },
  ];

  const order = initialOrders.find((o) => o.id === id);
  const [notes, setNotes] = useState(order?.notes ?? []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"note" | "schedule">("note");
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [confirmDeleteNoteId, setConfirmDeleteNoteId] = useState<string | null>(
    null
  );
  const [confirmDeleteOrder, setConfirmDeleteOrder] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSave = () => {
    if (activeTab === "note") {
      if (!note.trim()) {
        setToast({ msg: "Treść notatki nie może być pusta", type: "error" });
        return;
      }
      if (editNoteId) {
        setNotes((prev) =>
          prev.map((n) => (n.id === editNoteId ? { ...n, text: note } : n))
        );
      } else {
        const newNote = {
          id: String(Date.now()),
          text: note,
          date: new Date().toISOString().slice(0, 10),
        };
        setNotes((prev) => [...prev, newNote]);
      }
      setToast({ msg: "Notatka zapisana", type: "success" });
    } else {
      if (!date) {
        setToast({ msg: "Wybierz datę przeglądu", type: "error" });
        return;
      }
      setToast({ msg: "Przegląd zaplanowany", type: "success" });
    }
    setIsModalOpen(false);
    setNote("");
    setDate("");
    setEditNoteId(null);
  };

  const handleDeleteNote = (nid: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== nid));
    setConfirmDeleteNoteId(null);
    setToast({ msg: "Notatka usunięta", type: "info" });
  };

  const handleConfirmDeleteOrder = () => {
    if (deletePassword !== "admin") {
      setToast({ msg: "Niepoprawne hasło", type: "error" });
      return;
    }
    setConfirmDeleteOrder(false);
    setDeletePassword("");
    setToast({ msg: "Zlecenie usunięte", type: "info" });
    setTimeout(() => router.push("/work-orders"), 300);
  };

  if (!order) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 text-center text-muted"
      >
        Nie znaleziono zlecenia o numerze {id}.
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <header className="flex items-center gap-4 p-6 rounded-2xl">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
            <ArrowLeft size={20} className="text-foreground" />
          </Button>
          <div className="p-3 rounded-full bg-accent">
            <ClipboardList size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-wide text-foreground">
              Szczegóły zlecenia
            </h1>
            <p className="text-sm text-muted">Numer {order.id}</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setConfirmDeleteOrder(true)}
            className="p-2 text-red-600 hover:bg-red-100"
          >
            <Trash2 size={20} />
          </Button>
        </header>

        <Card className="border shadow-sm border-border/20 bg-surface/40 backdrop-blur-md rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                {order.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{order.description}</p>
            </div>

            <div className="grid gap-4 pt-2 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Info size={18} className="text-accent" />
                Maszyna:
                <span className="font-medium">{order.machineName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench size={18} className="text-accent" />
                Status:
                <span className="font-medium">{order.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardList size={18} className="text-accent" />
                Powiązane zlecenia:
                <span className="font-medium">{order.relatedOrders}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-accent" />
                Zaplanowane działania:
                <span className="font-medium">{order.scheduledActions}</span>
              </div>
            </div>

            {notes.length > 0 && (
              <div>
                <h3 className="mb-2 text-lg font-semibold">📝 Notatki:</h3>
                <div className="space-y-2">
                  {notes
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
                  setEditNoteId(null);
                  setNote("");
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
          <Fragment key="modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-lg p-6 border shadow-xl bg-gradient-to-br from-surface/95 to-surface/70 rounded-2xl border-accent/30 backdrop-blur-md"
              >
                <div className="flex items-center justify-between pb-4 border-b border-accent/20">
                  <h2 className="text-xl font-semibold text-foreground">
                    {activeTab === "note"
                      ? editNoteId
                        ? "✏️ Edytuj notatkę"
                        : "📝 Dodaj notatkę"
                      : "📅 Zaplanuj przegląd"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
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
                    className={`flex-1 py-2 rounded-lg  ${
                      activeTab === "schedule"
                        ? "bg-accent text-white"
                        : "bg-accent/10 text-foreground"
                    }`}
                    onClick={() => setActiveTab("schedule")}
                  >
                    📅 Przegląd
                  </Button>
                </div>

                <div className="pt-4 space-y-4">
                  {activeTab === "note" && (
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Wpisz treść notatki..."
                      className="w-full p-4 text-lg text-gray-800 border rounded-lg shadow-inner border-accent/40 bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent"
                      rows={5}
                    />
                  )}

                  {activeTab === "schedule" && (
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-3 text-lg text-gray-800 border rounded-lg border-accent/40 bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 rounded-lg"
                  >
                    Anuluj
                  </Button>
                  <Button
                    className="px-5 py-2 text-white rounded-lg shadow-md bg-gradient-to-r from-accent to-accentHover hover:brightness-110"
                    onClick={handleSave}
                  >
                    Zapisz
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDeleteNoteId && (
          <Fragment key="confirm-note">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="w-full max-w-sm p-6 shadow-lg bg-surface rounded-2xl">
                  <h3 className="mb-4 text-lg font-semibold">
                    Czy na pewno chcesz usunąć tę notatkę?
                  </h3>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setConfirmDeleteNoteId(null)}
                    >
                      Anuluj
                    </Button>
                    <Button
                      className="text-white bg-red-500 hover:bg-red-600"
                      onClick={() => handleDeleteNote(confirmDeleteNoteId)}
                    >
                      Usuń
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDeleteOrder && (
          <Fragment key="confirm-order">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="w-full max-w-md p-6 shadow-lg bg-surface rounded-2xl">
                  <h3 className="mb-4 text-lg font-semibold text-red-600">
                    Usuwanie zlecenia
                  </h3>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Hasło"
                    className="w-full p-3 mb-6 text-lg text-gray-800 border rounded-lg border-accent/40 bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setConfirmDeleteOrder(false);
                        setDeletePassword("");
                      }}
                    >
                      Anuluj
                    </Button>
                    <Button
                      className="text-white bg-red-500 hover:bg-red-600"
                      onClick={handleConfirmDeleteOrder}
                    >
                      Usuń
                    </Button>
                  </div>
                </div>
              </motion.div>
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
