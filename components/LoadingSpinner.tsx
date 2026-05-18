"use client";

import { useId } from "react";

type LoadingSpinnerProps = {
  className?: string;
  label?: string;
};

export default function LoadingSpinner({
  className = "h-5 w-5",
  label = "Loading",
}: LoadingSpinnerProps) {
  const gradientId = useId();

  return (
    <svg
      className={`loading-spinner-glow animate-spin text-zinc-500 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={label}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.2"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="14 42"
      />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="50%" stopColor="#8b5a5a" />
          <stop offset="100%" stopColor="#a1a1aa" />
        </linearGradient>
      </defs>
    </svg>
  );
}
