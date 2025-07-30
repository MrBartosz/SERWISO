import { InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full p-2 bg-surface border border-border rounded-md text-foreground placeholder-muted focus:outline-none focus:border-accent ${className}`}
      {...props}
    />
  );
}
