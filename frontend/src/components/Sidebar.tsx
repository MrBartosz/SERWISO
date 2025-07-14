"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Maszyny", href: "/machines" },
  { label: "Zlecenia", href: "/work-orders" },
  { label: "Powiadomienia", href: "/notifications" },
  { label: "Raporty", href: "/reports" },
  { label: "Ustawienia", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-100 dark:bg-neutral-900 p-6 border-r border-neutral-300 dark:border-neutral-800">
      <h2 className="text-xl font-bold mb-6">Serwiso</h2>
      <nav className="space-y-3">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "block rounded px-2 py-1 hover:bg-gray-200 dark:hover:bg-neutral-800 transition",
              pathname === href &&
                "bg-gray-200 dark:bg-neutral-800 font-semibold"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
