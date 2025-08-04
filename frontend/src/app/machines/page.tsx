"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Activity, Settings, Cpu, Search } from "lucide-react";
import Link from "next/link";

export default function MachinesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const initialMachines = [
    {
      id: 1,
      name: "Prasa hydrauliczna H-220",
      status: "online",
      location: "Hala A1",
      lastService: "2025-04-05",
    },
    {
      id: 2,
      name: "Frezarka CNC X500",
      status: "offline",
      location: "Hala B3",
      lastService: "2025-05-03",
    },
    {
      id: 3,
      name: "Tokarka T-250",
      status: "online",
      location: "Hala A2",
      lastService: "2025-07-20",
    },
  ];

  const [machines, setMachines] = useState(initialMachines);
  const [confirmDeleteMachineId, setConfirmDeleteMachineId] = useState<
    number | null
  >(null);
  const [deletePassword, setDeletePassword] = useState("");

  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const tid = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(tid);
  }, [toast]);

  const handleConfirmDeleteMachine = () => {
    if (deletePassword !== "admin") {
      setToast({ msg: "Niepoprawne hasło", type: "error" });
      return;
    }
    setMachines((prev) => prev.filter((m) => m.id !== confirmDeleteMachineId));
    setConfirmDeleteMachineId(null);
    setDeletePassword("");
    setToast({ msg: "Maszyna usunięta", type: "success" });
  };

  const filteredMachines = useMemo(() => {
    let filtered = [...machines];
    if (searchTerm.trim()) {
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    switch (sortOption) {
      case "online":
        filtered = filtered.filter((m) => m.status === "online");
        break;
      case "offline":
        filtered = filtered.filter((m) => m.status === "offline");
        break;
      case "nearestService":
        filtered.sort(
          (a, b) =>
            new Date(a.lastService).getTime() -
            new Date(b.lastService).getTime()
        );
        break;
      case "farthestService":
        filtered.sort(
          (a, b) =>
            new Date(b.lastService).getTime() -
            new Date(a.lastService).getTime()
        );
        break;
      case "location":
        filtered.sort((a, b) => a.location.localeCompare(b.location));
        break;
    }
    return filtered;
  }, [machines, searchTerm, sortOption]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <header className="flex items-center gap-4 p-6 rounded-2xl">
          <div className="p-3 rounded-full bg-accent">
            <Cpu size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-wide text-foreground">
              Wszystkie maszyny
            </h1>
            <p className="text-sm text-muted">
              Lista maszyn w zakładzie wraz ze statusem i szczegółami
            </p>
          </div>
        </header>

        <section className="flex flex-col gap-6 p-6 border shadow-sm rounded-2xl border-border/20 bg-surface/40 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="search" className="relative w-full sm:w-1/2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search size={20} className="text-muted" />
            </span>
            <input
              id="search"
              type="search"
              placeholder="Znajdź maszynę"
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
              <option value="online">Tylko online 🟢</option>
              <option value="offline">Tylko offline 🔴</option>
              <option value="nearestService">Najstarszy serwis</option>
              <option value="farthestService">Niedawno serwisane</option>
              <option value="location">Według lokalizacji</option>
            </select>
          </label>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMachines.map((machine) => (
            <motion.div
              key={machine.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="transition-transform"
            >
              <Card
                className={`relative h-[260px] flex flex-col rounded-2xl border ${
                  machine.status === "online"
                    ? "border-green-700/40 hover:shadow-[0_0_15px_rgba(0,128,0,0.35)]"
                    : "border-accent/20 hover:shadow-[0_0_15px_rgba(220,38,38,0.35)]"
                } bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-md transition-shadow duration-300`}
              >
                <CardContent className="flex flex-col justify-between h-full p-6">
                  <div>
                    <div className="flex items-baseline gap-2">
                      {machine.status === "online" ? (
                        <span className="text-green-600">🟢</span>
                      ) : (
                        <span className="text-red-600">🔴</span>
                      )}
                      <h2 className="text-lg font-semibold text-foreground">
                        {machine.name}
                      </h2>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-muted">
                      <p className="flex items-center gap-2">
                        <Activity size={16} />
                        <span>Lokalizacja: {machine.location}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Settings size={16} />
                        <span>Ostatni serwis: {machine.lastService}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Link href={`/machines/${machine.id}`}>
                      <Button className="px-4 text-white bg-accent hover:bg-accentHover">
                        Szczegóły
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => setConfirmDeleteMachineId(machine.id)}
                    >
                      Usuń
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredMachines.length === 0 && (
            <p className="text-center col-span-full text-muted">
              Brak pasujących maszyn.
            </p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {confirmDeleteMachineId !== null && (
          <>
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
              <div className="w-full max-w-sm p-6 shadow-lg bg-surface rounded-2xl text-tray-800">
                <h3 className="mb-2 text-lg font-semibold text-red-600">
                  Usuwanie maszyny
                </h3>
                <p className="mb-4">
                  Czy na pewno chcesz usunąć maszynę{" "}
                  <span className="font-semibold">
                    {
                      machines.find((m) => m.id === confirmDeleteMachineId)
                        ?.name
                    }
                  </span>
                  ?
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
                      setConfirmDeleteMachineId(null);
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
          </>
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
