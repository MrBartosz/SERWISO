"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

const isLoggedIn = true;

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 transition-all border-b shadow-md bg-gradient-to-r from-background via-elevated/80 to-background backdrop-blur-md border-border">
      <Link href={isLoggedIn ? "/dashboard" : "#"} className="group">
        <span className="text-xl font-ethnocentric tracking-widest text-accent transition-all group-hover:tracking-[0.2em] duration-300">
          SERWISO
        </span>
      </Link>
      {isLoggedIn && (
        <nav className="flex items-center gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 group text-muted hover:text-accent hover:bg-muted/10 rounded-xl"
          >
            <User className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Profil</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 group text-muted hover:text-error hover:bg-error/10 rounded-xl"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-[-10deg] transition-transform" />
            <span>Wyloguj</span>
          </button>
        </nav>
      )}
    </header>
  );
}
