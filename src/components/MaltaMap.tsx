import { localityProfiles } from "../data/localities";

type Props = {
  selected?: string;
  onSelect?: (name: string) => void;
  compact?: boolean;
};

export function MaltaMap({ selected, onSelect, compact }: Props) {
  const height = compact ? 220 : 320;
  return (
    <div className="relative rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-2)] overflow-hidden">
      <svg viewBox="0 0 100 80" className="w-full" style={{ height }}>
        <defs>
          <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#164e63" />
          </linearGradient>
        </defs>
        <rect width="100" height="80" fill="url(#sea)" />
        <path
          d="M18 42 L28 30 L38 28 L48 32 L58 30 L68 34 L78 40 L82 50 L74 58 L62 62 L50 60 L40 64 L30 58 L22 50 Z"
          fill="#1f2937"
          stroke="#334155"
          strokeWidth="0.6"
        />
        <path
          d="M12 52 L16 48 L18 52 L14 56 Z"
          fill="#1f2937"
          stroke="#334155"
          strokeWidth="0.4"
        />
        {localityProfiles.map((loc) => {
          const active = selected === loc.name;
          return (
            <g
              key={loc.name}
              className="cursor-pointer"
              onClick={() => onSelect?.(loc.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect?.(loc.name);
              }}
            >
              <circle
                cx={loc.map.x}
                cy={loc.map.y}
                r={active ? 4.2 : 3.2}
                fill={active ? "#38bdf8" : "#34d399"}
                stroke="#0f172a"
                strokeWidth="0.8"
                className="transition-all"
              />
              {!compact && (
                <text
                  x={loc.map.x + 4}
                  y={loc.map.y + 1}
                  fontSize="3"
                  fill="#cbd5e1"
                >
                  {loc.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="absolute bottom-2 left-3 text-[10px] text-slate-500 font-mono">
        Tap pins — larger hit area for ops floor
      </p>
    </div>
  );
}
