import { ReactNode } from "react";

export default function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`flex items-center gap-2 bg-accent hover:bg-accentHover text-white text-sm font-semibold py-2 px-4 rounded-xl shadow-md transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
