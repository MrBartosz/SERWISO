// app/work-orders/page.tsx
"use client";

import { useState, useMemo, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ClipboardList, Search, Trash2 } from "lucide-react";
import Link from "next/link";

export default function WorkOrdersPage() {
  const initialWorkOrders = [
    {
      id: "1",
      title: "Diagnostyka pompy hydraulicznej",
      machineName: "Pompa H200",
      priority: "medium",
      createdAt: "2025-07-30",
      dueDate: "2025-08-05",
    },
    {
      id: "2",
      title: "Konserwacja linii produkcyjnej",
      machineName: "Linia L5",
      priority: "high",
      createdAt: "2025-08-01",
      dueDate: "2025-08-08",
    },
    {
      id: "3",
      title: "Kalibracja wagi systemu",
      machineName: "Waga S1",
      priority: "low",
      createdAt: "2025-07-20",
      dueDate: "2025-07-22",
    },
    {
      id: "4",
      title: "Wymiana filtra powietrza",
      machineName: "Kompresor K3",
      priority: "medium",
      createdAt: "2025-08-03",
      dueDate: "2025-08-10",
    },
    {
      id: "5",
      title: "Aktualizacja oprogramowania robota",
      machineName: "Robot R7",
      priority: "high",
      createdAt: "2025-08-02",
      dueDate: "2025-08-06",
    },
  ];

  const [workOrders, setWorkOrders] = useState(initialWorkOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    let list = [...workOrders];
    if (searchTerm.trim()) {
      list = list.filter((wo) =>
        wo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    switch (sortOption) {
      case "high":
        return list.filter((wo) => wo.priority === "high");
      case "medium":
        return list.filter((wo) => wo.priority === "medium");
      case "low":
        return list.filter((wo) => wo.priority === "low");
      case "newest":
        return list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "mostUrgent":
        return list.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
      case "leastUrgent":
        return list.sort(
          (a, b) =>
            new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        );
      default:
        return list;
    }
  }, [workOrders, searchTerm, sortOption]);

  const handleConfirmDelete = () => {
    if (deletePassword !== "admin") {
      setToast({ msg: "Niepoprawne hasło", type: "error" });
      return;
    }
    setWorkOrders((prev) => prev.filter((wo) => wo.id !== confirmDeleteId));
    setConfirmDeleteId(null);
    setDeletePassword("");
    setToast({ msg: "Zlecenie usunięte", type: "info" });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <header className="flex items-center justify-between gap-4 p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-accent">
              <ClipboardList size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-wide text-foreground">
                Zlecenia serwisowe
              </h1>
              <p className="text-sm text-muted">
                Lista zleceń wraz z terminami realizacji
              </p>
            </div>
          </div>
          <Link href="/work-orders/new">
            <Button className="px-4 py-3 text-white bg-accent hover:bg-accentHover">
              Nowe zlecenie
            </Button>
          </Link>
        </header>

        <section className="flex flex-col gap-6 p-6 border shadow-sm rounded-2xl border-border/20 bg-surface/40 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="search" className="relative w-full sm:w-1/2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search size={20} className="text-muted" />
            </span>
            <input
              id="search"
              type="search"
              placeholder="Znajdź zlecenie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="w-full py-3 pl-12 pr-4 text-base font-medium transition-all duration-200 border rounded-xl border-border/20 bg-surface/70 backdrop-blur text-foreground placeholder:text-muted placeholder:font-normal hover:border-border/60 focus:border-border/60 focus:ring-2 focus:ring-border/40"
            />
          </label>

          <label htmlFor="sort" className="w-full sm:w-1/3">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-4 py-3 text-base font-medium transition-all duration-200 border rounded-xl border-border/20 bg-surface/70 backdrop-blur text-foreground hover:border-border/60 focus:border-border/60 focus:ring-2 focus:ring-border/40"
            >
              <option value="default">Sortuj według</option>
              <option value="high">Priorytet wysoki 🔴</option>
              <option value="medium">Priorytet średni 🟠</option>
              <option value="low">Priorytet niski 🟢</option>
              <option value="newest">Najnowsze utworzone 🆕</option>
              <option value="mostUrgent">Najbardziej pilne ⚠️</option>
              <option value="leastUrgent">Najmniej pilne 📅</option>
            </select>
          </label>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((wo) => (
            <motion.div
              key={wo.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="transition-transform"
            >
              <Card className="flex flex-col rounded-2xl border border-border/20 bg-surface/80 backdrop-blur-md hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-shadow duration-300">
                <CardContent className="flex flex-col justify-between h-full p-6">
                  <div>
                    <h2 className="mb-2 text-lg font-semibold text-foreground">
                      {wo.title}
                    </h2>
                    <div className="space-y-1 text-sm text-muted">
                      <p>
                        <span className="font-semibold">Maszyna:</span>{" "}
                        {wo.machineName}
                      </p>
                      <p>
                        <span className="font-semibold">Priorytet:</span>{" "}
                        {wo.priority}
                      </p>
                      <p>
                        <span className="font-semibold">Utworzono:</span>{" "}
                        {wo.createdAt}
                      </p>
                      <p>
                        <span className="font-semibold">Wykonać do:</span>{" "}
                        {wo.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Link href={`/work-orders/${wo.id}`}>
                      <Button className="px-4 text-white bg-accent hover:bg-accentHover">
                        Szczegóły
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setConfirmDeleteId(wo.id)}
                      className="flex items-center px-4 text-white bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Usuń
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center col-span-full text-muted">
              Brak pasujących zleceń.
            </p>
          )}
        </div>
      </motion.div>

      {/* Modal potwierdzenia usunięcia */}
      <AnimatePresence>
        {confirmDeleteId && (
          <Fragment key="confirm-delete">
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
              <div className="w-full max-w-md p-6 shadow-lg bg-surface rounded-2xl">
                <h3 className="mb-4 text-lg font-semibold text-red-600">
                  Usuwanie zlecenia
                </h3>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Hasło"
                  className="w-full p-3 mb-6 text-lg text-gray-800 border rounded-lg border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setConfirmDeleteId(null);
                      setDeletePassword("");
                    }}
                  >
                    Anuluj
                  </Button>
                  <Button
                    className="text-white bg-red-500 hover:bg-red-600"
                    onClick={handleConfirmDelete}
                  >
                    Usuń
                  </Button>
                </div>
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-20 right-6 z-[999] flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-slate-900/80 to-slate-800/70 text-white rounded-2xl shadow-xl backdrop-blur-xl"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                toast.type === "success"
                  ? "bg-green-500/20 text-green-400"
                  : toast.type === "error"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {toast.type === "success" && <span>✔</span>}
              {toast.type === "error" && <span>⚠</span>}
              {toast.type === "info" && <span>ℹ</span>}
            </div>
            <div className="text-sm font-medium">{toast.msg}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
