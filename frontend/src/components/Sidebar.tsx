"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

const mainNavItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Maszyny", href: "/machines" },
  { label: "Zlecenia", href: "/work-orders" },
  { label: "Powiadomienia", href: "/notifications" },
  { label: "Raporty", href: "/reports" },
  { label: "Wyszukiwanie", href: "/search" },
  { label: "Nowe zlecenie", href: "/work-orders/new" },
  { label: "Użytkownicy", href: "/users" },
  { label: "Profil", href: "/profile" },
  { label: "Aktywność", href: "/activity" },
  { label: "Kalendarz", href: "/calendar" },
  { label: "Statystyki", href: "/statistics" },
  { label: "Pomoc", href: "/help" },
];

const settingsNavItem = { label: "Ustawienia", href: "/settings" };

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 p-6 border-r bg-surface text-foreground border-border">
      <div className="flex justify-center mb-6">
        <Image
          src="/assets/images/samelogo.png"
          alt="Logo Serwiso"
          width={72}
          height={72}
        />
      </div>

      <nav className="flex-1 space-y-2">
        {mainNavItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "block px-3 py-2 rounded-md text-sm transition",
              pathname === href
                ? "bg-accent text-white font-semibold"
                : "hover:bg-elevated hover:text-accent"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="pt-4 mt-4 border-t border-border">
        <Link
          href={settingsNavItem.href}
          className={clsx(
            "block px-3 py-2 rounded-md text-sm transition",
            pathname === settingsNavItem.href
              ? "bg-accent text-white font-semibold"
              : "hover:bg-elevated hover:text-accent"
          )}
        >
          {settingsNavItem.label}
        </Link>
      </div>
    </aside>
  );
}
