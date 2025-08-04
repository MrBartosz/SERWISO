"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Activity, Settings, Cpu } from "lucide-react";
import Link from "next/link";

export default function MachinesPage() {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="relative flex items-center p-6 rounded-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-accent">
            <Cpu size={32} className="text-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-semibold tracking-wide text-foreground">
              Wszystkie maszyny
            </h1>
            <p className="text-sm text-muted">
              Lista maszyn w zakładzie wraz ze statusem i szczegółami
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {machines.map((machine) => (
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
                {/* Góra karty */}
                <div>
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    {machine.name}
                  </h2>

                  <div className="space-y-2 text-sm text-muted">
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

                {/* Dół karty */}
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
      </div>
    </motion.div>
  );
}
