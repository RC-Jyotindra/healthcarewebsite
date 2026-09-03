export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Medexa Research"
    >
      <path
        d="M20 4c-3 5-5 8-10 10 5 2 7 5 10 10 3-5 5-8 10-10-5-2-7-5-10-10z"
        fill="currentColor"
      />
      <path
        d="M20 14c-1.5 2.5-2.5 4-5 5 2.5 1 3.5 2.5 5 5 1.5-2.5 2.5-4 5-5-2.5-1-3.5-2.5-5-5z"
        fill="var(--cream)"
      />
    </svg>
  );
}
