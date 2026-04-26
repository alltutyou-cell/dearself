type VinylProps = {
  className?: string;
  size?: number;
  spin?: boolean;
};

export function Vinyl({ className = "", size = 320, spin = false }: VinylProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`${className} ${spin ? "spin-slow" : ""}`}
      aria-hidden
    >
      <defs>
        <radialGradient id="vinyl-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1c1818" />
          <stop offset="60%" stopColor="#2a2622" />
          <stop offset="100%" stopColor="#1c1818" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#vinyl-grad)" />
      {[...Array(24)].map((_, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={20 + i * 3.2}
          fill="none"
          stroke="#3a342f"
          strokeWidth="0.4"
          opacity={0.5 + (i % 3) * 0.15}
        />
      ))}
      <circle cx="100" cy="100" r="22" fill="#b8946f" />
      <circle cx="100" cy="100" r="3" fill="#1c1818" />
    </svg>
  );
}
