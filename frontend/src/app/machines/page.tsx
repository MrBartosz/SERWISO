"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Activity, Settings, Cpu, Search } from "lucide-react";
import Link from "next/link";

export default function MachinesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const machines = [
    {
      id: 1,
      name: "Prasa hydrauliczna H-220",
      status: "online",
      location: "Hala A1",
      lastService: "2025-06-12",
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
            <option value="nearestService">Najbliższy serwis 🕒</option>
            <option value="farthestService">Najdalszy serwis 📅</option>
            <option value="location">Według lokalizacji 📍</option>
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
              className={`relative h-[260px] flex flex-col rounded-2xl border 
                ${
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
                <div className="flex justify-end pt-4">
                  <Link href={`/machines/${machine.id}`}>
                    <Button className="px-4 text-white bg-accent hover:bg-accentHover">
                      Szczegóły
                    </Button>
                  </Link>
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
  );
}
