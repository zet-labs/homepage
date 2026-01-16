import { getTranslations } from "next-intl/server";

// Input sources (left side)
const inputSources = [
  { id: "email", color: "#F97316", icon: "mail" },
  { id: "chat", color: "#A855F7", icon: "chat" },
  { id: "calendar", color: "#3B82F6", icon: "calendar" },
  { id: "docs", color: "#10B981", icon: "docs" },
  { id: "forms", color: "#EC4899", icon: "forms" },
];

// Output systems (right side) with their colors for lines
const outputSystems = [
  { id: "crm", color: "#3B82F6", icon: "users" },
  { id: "warehouse", color: "#F97316", icon: "warehouse" },
  { id: "ledger", color: "#10B981", icon: "ledger" },
  { id: "database", color: "#06B6D4", icon: "database" },
];

function InputIcon({ type, color }: { type: string; color: string }) {
  const iconStyle = { stroke: color };

  switch (type) {
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" style={iconStyle} strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 6L12 13L2 6" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" style={iconStyle} strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" style={iconStyle} strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "docs":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" style={iconStyle} strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "forms":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" style={iconStyle} strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="12" y2="17" />
        </svg>
      );
    default:
      return null;
  }
}

function OutputIcon({ type, color }: { type: string; color: string }) {
  const iconStyle = { stroke: color };

  switch (type) {
    case "users":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-7 h-7"
          style={iconStyle}
          strokeWidth="1.5"
        >
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "warehouse":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-7 h-7"
          style={iconStyle}
          strokeWidth="1.5"
        >
          <path d="M22 8.35V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.35A2 2 0 013.26 6.5l8-3.2a2 2 0 011.48 0l8 3.2A2 2 0 0122 8.35z" />
          <line x1="6" y1="14" x2="6" y2="22" />
          <line x1="18" y1="14" x2="18" y2="22" />
          <rect x="6" y="14" width="12" height="4" />
        </svg>
      );
    case "ledger":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-7 h-7"
          style={iconStyle}
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      );
    case "database":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-7 h-7"
          style={iconStyle}
          strokeWidth="1.5"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function AIAgentDiagram() {
  const t = await getTranslations();

  // Y positions for the 4 output systems (centered around 200 in a 400-height viewBox)
  const outputYPositions = [80, 147, 253, 320];

  return (
    <section className="w-full max-w-[1100px] mx-auto reveal-on-scroll py-16 max-md:py-12">
      <div className="text-center mb-16 max-md:mb-12">
        <span className="inline-block mb-4 text-xs font-medium tracking-[0.2em] uppercase text-[rgb(var(--color-accent-indigo))]">
          {t("diagram.subtitle")}
        </span>
        <h2 className="text-[rgb(var(--color-foreground))] text-5xl font-medium tracking-tight mb-4 max-md:text-4xl font-[family-name:var(--font-geist-sans)]">
          {t("diagram.title")}
        </h2>
        <p className="text-[rgb(var(--color-foreground-muted)/0.7)] text-lg max-w-[600px] mx-auto max-md:text-base">
          {t("diagram.description")}
        </p>
        <div className="w-24 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-[rgb(var(--color-accent-indigo))] to-transparent" />
      </div>

      {/* Desktop Diagram - Pure SVG approach */}
      <div className="hidden md:block">
        <svg viewBox="0 0 1000 400" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Glow filters for elements */}
            <filter id="glow-agent" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left side - Input sources container */}
          <rect
            x="70"
            y="55"
            width="80"
            height="305"
            rx="40"
            fill="rgb(var(--color-surface) / 0.6)"
            stroke="rgb(var(--color-accent-indigo) / 0.25)"
            strokeWidth="1"
          />

          {/* Input source icons (positioned in the pill) */}
          {inputSources.map((source, index) => {
            const yPos = 92.5 + index * 55;
            return (
              <g key={source.id}>
                <rect
                  x="85"
                  y={yPos - 20}
                  width="50"
                  height="50"
                  rx="12"
                  fill="rgb(var(--color-surface) / 0.45)"
                  stroke="rgb(var(--color-foreground) / 0.1)"
                  strokeWidth="1"
                />
                <g transform={`translate(98, ${yPos - 8})`}>
                  {source.icon === "mail" && (
                    <g stroke={source.color} strokeWidth="1.5" fill="none">
                      <rect x="0" y="2" width="24" height="19" rx="2" />
                      <path d="M24 4L12 13L0 4" />
                    </g>
                  )}
                  {source.icon === "chat" && (
                    <g stroke={source.color} strokeWidth="1.5" fill="none">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </g>
                  )}
                  {source.icon === "calendar" && (
                    <g stroke={source.color} strokeWidth="1.5" fill="none">
                      <rect x="1" y="3" width="22" height="20" rx="2" />
                      <line x1="17" y1="0" x2="17" y2="5" />
                      <line x1="7" y1="0" x2="7" y2="5" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </g>
                  )}
                  {source.icon === "docs" && (
                    <g stroke={source.color} strokeWidth="1.5" fill="none">
                      <path d="M14 0H4a2 2 0 00-2 2v20a2 2 0 002 2h16a2 2 0 002-2V8z" />
                      <polyline points="14,0 14,8 22,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </g>
                  )}
                  {source.icon === "forms" && (
                    <g stroke={source.color} strokeWidth="1.5" fill="none">
                      <rect x="1" y="1" width="22" height="22" rx="2" />
                      <line x1="7" y1="8" x2="17" y2="8" />
                      <line x1="7" y1="12" x2="17" y2="12" />
                      <line x1="7" y1="16" x2="12" y2="16" />
                    </g>
                  )}
                </g>
              </g>
            );
          })}

          {/* Left connector line (inputs to agent) */}
          <line
            x1="150"
            y1="200"
            x2="440"
            y2="200"
            stroke="rgb(var(--color-foreground) / 0.18)"
            strokeWidth="2"
          />

          {/* Center - AI Agent Hub */}
          <g filter="url(#glow-agent)">
            {/* Glow background */}
            <rect
              x="432"
              y="140"
              width="120"
              height="120"
              rx="28"
              fill="rgba(99,102,241,0.18)"
              className="diagram-hub-pulse"
            />
            <rect x="440" y="148" width="104" height="104" rx="24" fill="rgba(99,102,241,0.2)" />
          </g>
          {/* Main agent box */}
          <rect x="448" y="156" width="88" height="88" rx="20" fill="url(#agent-gradient)" />
          <defs>
            <linearGradient id="agent-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(227,232,255,1)" />
              <stop offset="100%" stopColor="rgba(227,232,255,0.9)" />
            </linearGradient>
          </defs>
          {/* Company logo icon */}
          <g transform="translate(472 180) scale(1.6667)">
            <polygon
              points="12 2.5 20.5 7.5 20.5 16.5 12 21.5 3.5 16.5 3.5 7.5"
              fill="none"
              stroke="rgba(1,2,8,1)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <polygon
              points="12 5.5 18 9 18 15 12 18.5 6 15 6 9"
              fill="none"
              stroke="rgba(1,2,8,1)"
              strokeWidth="1"
              strokeLinejoin="round"
              opacity="0.5"
            />
            <rect x="19.4" y="9.4" width="2" height="5.2" rx="1" fill="rgba(227,232,255,0.95)" />
          </g>
          {/* Agent label */}
          <text
            x="492"
            y="275"
            textAnchor="middle"
            fill="rgba(172,182,235,0.8)"
            fontSize="11"
            fontWeight="600"
            letterSpacing="0.1em"
          >
            {t("diagram.agentLabel")}
          </text>

          {/* Right connector lines (agent to outputs) - Bezier curves */}
          <path
            d={`M 544 200 C 620 200, 700 ${outputYPositions[0]}, 800 ${outputYPositions[0]}`}
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeOpacity="0.7"
            fill="none"
            className="diagram-line"
          />
          <path
            d={`M 544 200 C 600 200, 680 ${outputYPositions[1]}, 800 ${outputYPositions[1]}`}
            stroke="#F97316"
            strokeWidth="2.5"
            strokeOpacity="0.7"
            fill="none"
            className="diagram-line"
          />
          <path
            d={`M 544 200 C 600 200, 680 ${outputYPositions[2]}, 800 ${outputYPositions[2]}`}
            stroke="#10B981"
            strokeWidth="2.5"
            strokeOpacity="0.7"
            fill="none"
            className="diagram-line"
          />
          <path
            d={`M 544 200 C 620 200, 700 ${outputYPositions[3]}, 800 ${outputYPositions[3]}`}
            stroke="#06B6D4"
            strokeWidth="2.5"
            strokeOpacity="0.7"
            fill="none"
            className="diagram-line"
          />

          {/* Right side - Output systems */}
          {outputSystems.map((system, index) => {
            const yPos = outputYPositions[index];
            return (
              <g key={system.id}>
                {/* Output box */}
                <rect
                  x="800"
                  y={yPos - 28}
                  width="56"
                  height="56"
                  rx="16"
                  fill="rgb(var(--color-surface) / 0.6)"
                  stroke="rgb(var(--color-accent-purple) / 0.22)"
                  strokeWidth="1"
                />
                {/* Icon */}
                <g transform={`translate(812, ${yPos - 14})`}>
                  {system.icon === "users" && (
                    <g stroke={system.color} strokeWidth="1.3" fill="none">
                      <path d="M17 28v-2a5 5 0 00-5-5H6a5 5 0 00-5 5v2" />
                      <circle cx="9" cy="9" r="5" />
                      <path d="M27 28v-2a5 5 0 00-4-4.9" />
                      <path d="M19 3a5 5 0 010 10" />
                    </g>
                  )}
                  {system.icon === "warehouse" && (
                    <g stroke={system.color} strokeWidth="1.3" fill="none">
                      <path d="M30 11V28a3 3 0 01-3 3H5a3 3 0 01-3-3V11a3 3 0 011.9-2.8l11-4.4a3 3 0 012.2 0l11 4.4A3 3 0 0130 11z" />
                      <line x1="8" y1="18" x2="8" y2="31" />
                      <line x1="24" y1="18" x2="24" y2="31" />
                      <rect x="8" y="18" width="16" height="6" />
                    </g>
                  )}
                  {system.icon === "ledger" && (
                    <g stroke={system.color} strokeWidth="1.3" fill="none">
                      <rect x="2" y="2" width="28" height="28" rx="3" />
                      <line x1="2" y1="12" x2="30" y2="12" />
                      <line x1="2" y1="22" x2="30" y2="22" />
                      <line x1="12" y1="2" x2="12" y2="30" />
                    </g>
                  )}
                  {system.icon === "database" && (
                    <g stroke={system.color} strokeWidth="1.3" fill="none">
                      <ellipse cx="16" cy="6" rx="13" ry="4" />
                      <path d="M29 16c0 2.2-5.8 4-13 4s-13-1.8-13-4" />
                      <path d="M3 6v20c0 2.2 5.8 4 13 4s13-1.8 13-4V6" />
                    </g>
                  )}
                </g>
                {/* Label */}
                <text
                  x="880"
                  y={yPos + 5}
                  fill="rgb(var(--color-foreground-muted) / 0.7)"
                  fontSize="14"
                  fontWeight="500"
                >
                  {t(`diagram.outputs.${system.id}`)}
                </text>
              </g>
            );
          })}

          {/* Bottom labels */}
          <text
            x="110"
            y="380"
            textAnchor="middle"
            fill="rgb(var(--color-foreground-muted) / 0.6)"
            fontSize="11"
            fontWeight="500"
            letterSpacing="0.15em"
          >
            {t("diagram.inputsLabel")}
          </text>
          <text
            x="880"
            y="380"
            textAnchor="middle"
            fill="rgb(var(--color-foreground-muted) / 0.6)"
            fontSize="11"
            fontWeight="500"
            letterSpacing="0.15em"
          >
            {t("diagram.outputsLabel")}
          </text>
        </svg>
      </div>

      {/* Mobile Diagram - Simplified vertical layout */}
      <div className="md:hidden flex flex-col items-center gap-8">
        {/* Input sources - horizontal */}
        <div>
          <div className="text-xs font-medium text-[rgb(var(--color-foreground-muted)/0.6)] uppercase tracking-wider text-center mb-3">
            {t("diagram.inputsLabel")}
          </div>
          <div className="flex items-center gap-3 p-3 rounded-full bg-gradient-to-b from-[rgb(var(--color-surface)/0.6)] to-[rgb(var(--color-surface)/0.2)] border border-[rgb(var(--color-foreground)/0.1)] backdrop-blur-xl">
            {inputSources.map((source) => (
              <div
                key={source.id}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgb(var(--color-surface)/0.4)] border border-[rgb(var(--color-foreground)/0.08)]"
              >
                <InputIcon type={source.icon} color={source.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Vertical line down */}
        <div className="w-px h-8 bg-gradient-to-b from-[rgb(var(--color-foreground)/0.2)] to-transparent" />

        {/* Center - AI Agent Hub */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[rgb(var(--color-accent-indigo))] to-[rgb(var(--color-accent-purple))] opacity-20 blur-2xl" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-[rgb(var(--color-foreground))] to-[rgb(var(--color-foreground)/0.9)] flex items-center justify-center shadow-2xl shadow-[rgb(var(--color-accent-indigo)/0.3)]">
            <svg viewBox="0 0 24 24" className="w-8 h-8">
              <polygon
                points="12 2.5 20.5 7.5 20.5 16.5 12 21.5 3.5 16.5 3.5 7.5"
                fill="none"
                stroke="rgb(var(--color-surface))"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <polygon
                points="12 5.5 18 9 18 15 12 18.5 6 15 6 9"
                fill="none"
                stroke="rgb(var(--color-surface))"
                strokeWidth="1"
                strokeLinejoin="round"
                opacity="0.5"
              />
              <rect
                x="19.4"
                y="9.4"
                width="2"
                height="5.2"
                rx="1"
                fill="rgb(var(--color-foreground))"
              />
            </svg>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs font-semibold text-[rgb(var(--color-foreground-muted)/0.8)] uppercase tracking-wider">
              {t("diagram.agentLabel")}
            </span>
          </div>
        </div>

        {/* Vertical line down */}
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[rgb(var(--color-foreground)/0.2)]" />

        {/* Output systems - grid */}
        <div>
          <div className="text-xs font-medium text-[rgb(var(--color-foreground-muted)/0.6)] uppercase tracking-wider text-center mb-3">
            {t("diagram.outputsLabel")}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {outputSystems.map((system) => (
              <div key={system.id} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-b from-[rgb(var(--color-surface)/0.6)] to-[rgb(var(--color-surface)/0.2)] border border-[rgb(var(--color-foreground)/0.1)] backdrop-blur-xl">
                  <OutputIcon type={system.icon} color={system.color} />
                </div>
                <span className="text-xs font-medium text-[rgb(var(--color-foreground-muted)/0.7)]">
                  {t(`diagram.outputs.${system.id}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
