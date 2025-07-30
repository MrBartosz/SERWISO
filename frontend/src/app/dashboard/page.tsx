"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Wrench,
  Bell,
  Calendar,
  AlertTriangle,
  PlusCircle,
  Clock,
} from "lucide-react";
import Button from "@/components/ui/Button";

const stats = [
  {
    title: "Maszyny",
    value: 12,
    icon: <Wrench className="text-accent" size={20} />,
    href: "/machines",
  },
  {
    title: "Otwarte zlecenia",
    value: 5,
    icon: <AlertTriangle className="text-warning" size={20} />,
    href: "/work-orders",
  },
  {
    title: "Powiadomienia",
    value: 3,
    icon: <Bell className="text-accent" size={20} />,
    href: "/notifications",
  },
  {
    title: "Przeglądy",
    value: 2,
    icon: <Calendar className="text-accent" size={20} />,
    href: "/calendar",
  },
];

const dataAll = {
  week: [
    { name: "Pon", zlecenia: 2 },
    { name: "Wt", zlecenia: 4 },
    { name: "Śr", zlecenia: 3 },
    { name: "Czw", zlecenia: 5 },
    { name: "Pt", zlecenia: 2 },
  ],
  month: [
    { name: "T1", zlecenia: 12 },
    { name: "T2", zlecenia: 18 },
    { name: "T3", zlecenia: 9 },
    { name: "T4", zlecenia: 14 },
  ],
};

const activities = [
  {
    id: 1,
    message: "Dodano nowe zlecenie dla maszyny #12",
    time: "2 godz. temu",
  },
  {
    id: 2,
    message: "Użytkownik Jan Kowalski zalogował się",
    time: "5 godz. temu",
  },
  { id: 3, message: "Zamknięto zlecenie #1024", time: "1 dzień temu" },
];

export default function DashboardPage() {
  const [filter, setFilter] = useState<"week" | "month">("week");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-wide text-foreground">
              Panel główny
            </h1>
          </div>
          <p className="text-muted">Podsumowanie stanu serwisu i aktywności</p>
        </div>
        <Link href="/work-orders/new" aria-label="Dodaj nowe zlecenie">
          <Button>
            <PlusCircle size={18} /> Nowe zlecenie
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href={item.href} aria-label={`Przejdź do ${item.title}`}>
              <Card className="transition border shadow-md border-border hover:shadow-lg hover:bg-elevated/80">
                <CardContent className="flex items-center gap-4">
                  <div className="p-2 bg-surface rounded-xl">{item.icon}</div>
                  <div>
                    <div className="text-xl font-bold text-foreground">
                      {item.value}
                    </div>
                    <div className="text-sm text-muted">{item.title}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <Card className="border shadow-md border-border">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Zlecenia w wybranym okresie
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("week")}
                className={`text-sm px-3 py-1 rounded-md transition font-medium ${
                  filter === "week"
                    ? "bg-accent text-white"
                    : "bg-surface border border-border text-muted hover:text-foreground"
                }`}
              >
                Tydzień
              </button>
              <button
                onClick={() => setFilter("month")}
                className={`text-sm px-3 py-1 rounded-md transition font-medium ${
                  filter === "month"
                    ? "bg-accent text-white"
                    : "bg-surface border border-border text-muted hover:text-foreground"
                }`}
              >
                Miesiąc
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataAll[filter]}>
              <CartesianGrid stroke="#222" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#A0A0A0" />
              <YAxis stroke="#A0A0A0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  borderColor: "#333",
                  color: "#F0F0F0",
                }}
              />
              <Line
                type="monotone"
                dataKey="zlecenia"
                stroke="#E82127"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border shadow-md border-border">
        <CardContent>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Ostatnie aktywności
          </h2>
          {activities.length === 0 ? (
            <div className="flex items-center justify-center text-muted">
              Brak aktywności
            </div>
          ) : (
            <ul className="space-y-3">
              {activities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-start justify-between pb-2 border-b border-border last:border-0 last:pb-0"
                >
                  <span className="flex items-center gap-2 text-sm text-foreground">
                    <Clock size={14} className="text-muted" />
                    {activity.message}
                  </span>
                  <span className="text-xs text-muted">{activity.time}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
