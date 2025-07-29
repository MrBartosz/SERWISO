"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Settings,
  Users,
  Calendar,
  Bell,
  FileText,
  Wrench,
  Search,
  PlusCircle,
  BarChart2,
  HelpCircle,
  Activity,
} from "lucide-react";

const USER = {
  name: "Jan Kowalski",
  role: "Administrator",
  initials: "JK",
  // image: "/path/to/avatar.jpg" // może później dodam
};

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Maszyny", href: "/machines", icon: Wrench },
  { label: "Zlecenia", href: "/work-orders", icon: FileText },
  { label: "Nowe zlecenie", href: "/work-orders/new", icon: PlusCircle },
  { label: "Powiadomienia", href: "/notifications", icon: Bell },
  { label: "Raporty", href: "/reports", icon: FileText },
  { label: "Statystyki", href: "/statistics", icon: BarChart2 },
  { label: "Wyszukiwanie", href: "/search", icon: Search },
  { label: "Użytkownicy", href: "/users", icon: Users },
  { label: "Aktywność", href: "/activity", icon: Activity },
  { label: "Kalendarz", href: "/calendar", icon: Calendar },
  { label: "Pomoc", href: "/help", icon: HelpCircle },
];

const settingsItem = { label: "Ustawienia", href: "/settings", icon: Settings };

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 h-screen px-6 py-8 border-r shadow-md bg-gradient-to-b from-background/90 to-surface/80 backdrop-blur-xl border-border text-foreground">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 text-sm font-bold uppercase rounded-full shadow-inner bg-muted text-accent">
          {USER.initials}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">
            {USER.name}
          </span>
          <span className="text-xs text-muted">{USER.role}</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 text-sm font-medium">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 group",
                isActive
                  ? "bg-accent/10 text-accent font-semibold shadow-sm border-l-4 border-accent"
                  : "text-muted hover:text-accent hover:bg-muted/10"
              )}
            >
              <Icon
                className={clsx("w-4 h-4 shrink-0", {
                  "text-accent": isActive,
                  "text-muted group-hover:text-accent": !isActive,
                })}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-border">
        <Link
          href={settingsItem.href}
          className={clsx(
            "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 text-sm font-medium",
            pathname === settingsItem.href
              ? "bg-accent/10 text-accent font-semibold border-l-4 border-accent"
              : "text-muted hover:text-accent hover:bg-muted/10"
          )}
        >
          <settingsItem.icon
            className={clsx("w-4 h-4 shrink-0", {
              "text-accent": pathname === settingsItem.href,
              "text-muted hover:text-accent": pathname !== settingsItem.href,
            })}
          />
          {settingsItem.label}
        </Link>
      </div>
    </aside>
  );
}
