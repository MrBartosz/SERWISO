"use client";

import Link from "next/link";

// TODO: Podmień tymczasową flagę na realny hook z auth
const isLoggedIn = true;

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-elevated">
      <div>
        {isLoggedIn ? (
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-bold font-ethnocentric">SERWISO</span>
          </Link>
        ) : (
          <div className="text-lg font-bold font-ethnocentric">SERWISO</div>
        )}
      </div>

      {/* Prawa strona */}
      <nav className="space-x-6 text-sm">
        {isLoggedIn ? (
          <>
            <Link href="/profile" className="transition hover:text-accent">
              Profil
            </Link>
            <Link href="/logout" className="transition hover:text-red-500 ">
              Wyloguj
            </Link>
          </>
        ) : (
          <Link href="/login" className="transition hover:text-accent">
            Zaloguj
          </Link>
        )}
      </nav>
    </header>
  );
}
