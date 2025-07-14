import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between p-4 border-b">
      <div>Serwiso</div>
      <nav className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/machines">Maszyny</Link>
        <Link href="/login">Wyloguj</Link>
      </nav>
    </header>
  );
}
