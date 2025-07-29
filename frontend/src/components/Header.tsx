"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const isLoggedIn = true;

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // logika wylogowania bedzie do zrobienia
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b shadow-sm border-border bg-elevated text-foreground">
      <div>
        {isLoggedIn ? (
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-bold tracking-widest text-medium font-ethnocentric">
              SERWISO
            </span>
          </Link>
        ) : (
          <div className="font-bold tracking-widest text-medium font-ethnocentric">
            SERWISO
          </div>
        )}
      </div>

      <nav className="space-x-6 text-sm font-medium">
        {isLoggedIn ? (
          <>
            <Link
              href="/profile"
              className="transition text-muted hover:text-accent"
            >
              Profil
            </Link>
            <button
              onClick={handleLogout}
              className="transition text-muted hover:text-error"
            >
              Wyloguj
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="transition text-muted hover:text-accent"
          >
            Zaloguj
          </Link>
        )}
      </nav>
    </header>
  );
}
