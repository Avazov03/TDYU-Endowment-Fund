'use client'
import type { ReactNode } from "react";

export default function DemoBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none select-none opacity-45 saturate-[0.55] contrast-[0.95] ${className}`}
    >
      {children}
    </div>
  );
}
