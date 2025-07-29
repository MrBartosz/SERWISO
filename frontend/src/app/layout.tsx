"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <html lang="pl">
      <body className="bg-background text-foreground">
        {isLoginPage ? (
          <>{children}</>
        ) : (
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Header />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
