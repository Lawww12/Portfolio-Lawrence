import React from 'react'

export function SecurityBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Soft “secure perimeter” glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.12),transparent_50%),radial-gradient(circle_at_50%_85%,rgba(34,197,94,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.09),transparent_50%),radial-gradient(circle_at_50%_85%,rgba(34,197,94,0.06),transparent_60%)]" />

      {/* Faint grid to imply monitoring / surveillance */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 [mask-image:radial-gradient(circle_at_center,black_0%,transparent_70%)] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

      {/* Angled scan line (subtle, non-distracting) */}
      <div className="absolute inset-0 opacity-30 dark:opacity-25 [transform:rotate(12deg)] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* Minimal lock/shield mark */}
      <svg
        className="absolute top-10 left-10 h-28 w-28 text-accent opacity-15 dark:opacity-10"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M32 6l18 9v13c0 15-8.4 26.5-18 30-9.6-3.5-18-15-18-30V15l18-9z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M26 30c0-3.3 2.7-6 6-6s6 2.7 6 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M26 30v11h12V30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

