import { useMemo } from 'react';

const W = 110;
const HEARTH_H = 56;

// Bezier teardrop path: wide base, tapers to a pointed tip
function flamePath(cx, baseY, h, hw) {
  const ty = baseY - h;
  return [
    `M ${cx - hw},${baseY}`,
    `C ${cx - hw * 1.15},${baseY - h * 0.28}`,
    `  ${cx - hw * 0.55},${baseY - h * 0.62}`,
    `  ${cx},${ty}`,
    `C ${cx + hw * 0.55},${baseY - h * 0.62}`,
    `  ${cx + hw * 1.15},${baseY - h * 0.28}`,
    `  ${cx + hw},${baseY}`,
    `Z`,
  ].join(' ');
}

// cx, base hw at progress=0, hw growth by progress=1, height fraction, animation
const TONGUE_DEFS = [
  { cx: 43, hwBase: 7,  hwGrow: 9,  hFrac: 0.70, anim: 'svgFlame2', dur: 1.35, delay: 0.05 },
  { cx: 67, hwBase: 6,  hwGrow: 8,  hFrac: 0.64, anim: 'svgFlame3', dur: 1.45, delay: 0.20 },
  { cx: 55, hwBase: 10, hwGrow: 14, hFrac: 1.00, anim: 'svgFlame1', dur: 1.55, delay: 0.00 },
  { cx: 34, hwBase: 5,  hwGrow: 6,  hFrac: 0.50, anim: 'svgFlame3', dur: 1.28, delay: 0.30 },
  { cx: 76, hwBase: 5,  hwGrow: 6,  hFrac: 0.46, anim: 'svgFlame2', dur: 1.42, delay: 0.38 },
];

export default function ForgeFire({ progress = 0 }) {
  const intensity = 0.3 + progress * 0.7;
  const flameH    = 55 + progress * 100;

  const totalH  = Math.round(flameH + HEARTH_H + 10);
  const hearthY = Math.round(flameH + 4);
  const fy      = hearthY + 8;  // arch apex — flame bases sit here

  // Reveal more tongues as progress grows
  const tongueCount = progress < 0.2 ? 2 : progress < 0.45 ? 3 : progress < 0.75 ? 4 : 5;
  const tongues = TONGUE_DEFS.slice(0, tongueCount).map(t => ({
    ...t,
    hw: Math.round(t.hwBase + t.hwGrow * progress),
    h:  Math.round(flameH * t.hFrac),
  }));

  const embers = useMemo(() => (
    Array.from({ length: Math.floor(6 + progress * 10) }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      left: 24 + Math.random() * 52,
      delay: Math.random() * 2.5,
      dur: 1.0 + Math.random() * 1.4,
      ex: (Math.random() - 0.5) * 38 + 'px',
    }))
  ), [progress]);

  return (
    <div style={{ position: 'relative', width: `${W}px`, height: `${totalH}px`, flexShrink: 0 }}>

      <svg
        viewBox={`0 0 ${W} ${totalH}`}
        width={W}
        height={totalH}
        style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
      >
        <defs>
          {/* Shared gradients — userSpaceOnUse so shorter tongues naturally stay orange/red,
              taller center tongue reaches yellow-white at tip */}
          <linearGradient id="fgCore" x1="0" y1={fy} x2="0" y2={fy - flameH} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#dc2626" stopOpacity="1" />
            <stop offset="18%"  stopColor="#f97316" stopOpacity="1" />
            <stop offset="48%"  stopColor="#fbbf24" stopOpacity="0.95" />
            <stop offset="72%"  stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff"  stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fgHaze" x1="0" y1={fy} x2="0" y2={fy - flameH} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#7f1d1d" stopOpacity="0.9" />
            <stop offset="40%"  stopColor="#dc2626" stopOpacity="0.55" />
            <stop offset="75%"  stopColor="#ea580c" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>

          <filter id="ffHaze" x="-100%" y="-20%" width="300%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="ffSoft" x="-55%" y="-10%" width="210%" height="120%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="ffBed" x="-80%" y="-30%" width="260%" height="160%">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          {/* Hearth */}
          <radialGradient id="fgArchGlow" cx="50%" cy="92%" r="68%">
            <stop offset="0%"   stopColor="#fffbeb" stopOpacity={intensity} />
            <stop offset="22%"  stopColor="#fcd34d" stopOpacity={0.95 * intensity} />
            <stop offset="52%"  stopColor="#f97316" stopOpacity={0.8 * intensity} />
            <stop offset="78%"  stopColor="#b91c1c" stopOpacity={0.55 * intensity} />
            <stop offset="100%" stopColor="#0d0805" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="fgStoneFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2e2820" />
            <stop offset="100%" stopColor="#1a1410" />
          </linearGradient>
          <linearGradient id="fgIronBand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#282828" />
            <stop offset="50%"  stopColor="#181818" />
            <stop offset="100%" stopColor="#222222" />
          </linearGradient>
          <linearGradient id="fgBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1c1610" />
            <stop offset="100%" stopColor="#120e0a" />
          </linearGradient>
        </defs>

        {/* ── HEARTH — drawn first ── */}
        <g transform={`translate(0, ${hearthY})`}>
          <rect x="2" y="3" width="106" height="43" rx="2"
            fill="url(#fgStoneFace)" stroke="#3a3028" strokeWidth="1" />
          <line x1="2"   y1="17" x2="108" y2="17" stroke="#14100c" strokeWidth="0.8" opacity="0.65" />
          <line x1="2"   y1="31" x2="108" y2="31" stroke="#14100c" strokeWidth="0.8" opacity="0.65" />
          <line x1="22"  y1="3"  x2="22"  y2="17" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
          <line x1="52"  y1="3"  x2="52"  y2="17" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
          <line x1="82"  y1="3"  x2="82"  y2="17" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
          <line x1="10"  y1="17" x2="10"  y2="31" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
          <line x1="40"  y1="17" x2="40"  y2="31" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
          <line x1="70"  y1="17" x2="70"  y2="31" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
          <line x1="100" y1="17" x2="100" y2="31" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
          <line x1="22"  y1="31" x2="22"  y2="46" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
          <line x1="90"  y1="31" x2="90"  y2="46" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
          <path d="M 26 43 L 26 28 A 29 20 0 0 1 84 28 L 84 43 Z" fill="url(#fgArchGlow)" />
          <path d="M 26 43 L 26 28 A 29 20 0 0 1 84 28 L 84 43"
            fill="none" stroke="#3d3028" strokeWidth="1.8" strokeLinejoin="round" />
          <line x1="26" y1="31" x2="19" y2="23" stroke="#1e1a14" strokeWidth="0.7" opacity="0.5" />
          <line x1="84" y1="31" x2="91" y2="23" stroke="#1e1a14" strokeWidth="0.7" opacity="0.5" />
          <line x1="36" y1="14" x2="31" y2="6"  stroke="#1e1a14" strokeWidth="0.7" opacity="0.4" />
          <line x1="74" y1="14" x2="79" y2="6"  stroke="#1e1a14" strokeWidth="0.7" opacity="0.4" />
          <path d="M 50 9 L 55 3 L 60 9" fill="#26201a" stroke="#3d3028" strokeWidth="0.8" />
          <ellipse cx="55" cy="42" rx="23" ry="4"
            fill={`rgba(251,146,60,${0.45 + intensity * 0.45})`} />
          <ellipse cx="55" cy="42" rx="14" ry="2.5"
            fill={`rgba(253,230,138,${0.3 + intensity * 0.5})`} />
          <rect x="2" y="43" width="106" height="5" rx="1"
            fill="url(#fgIronBand)" stroke="#111" strokeWidth="0.5" />
          <circle cx="13"  cy="45.5" r="2.2" fill="#141414" stroke="#2e2e2e" strokeWidth="0.8" />
          <circle cx="97"  cy="45.5" r="2.2" fill="#141414" stroke="#2e2e2e" strokeWidth="0.8" />
          <circle cx="55"  cy="45.5" r="1.8" fill="#141414" stroke="#2e2e2e" strokeWidth="0.8" />
          <rect x="4" y="48" width="102" height="7" rx="2"
            fill="url(#fgBase)" stroke="#221e18" strokeWidth="1" />
          <text x="55" y="53.5" textAnchor="middle"
            fill={`rgba(245,158,11,${0.32 + intensity * 0.48})`}
            fontSize="5.5" fontWeight="700" letterSpacing="1.8"
            fontFamily="Cinzel, Georgia, serif">
            {progress >= 1 ? '⚒ FORGED' : `${Math.round(progress * 100)}% FORGED`}
          </text>
        </g>

        {/* ── FIRE BED — single wide bloom above the coal, unifies all tongues at base ── */}
        <ellipse
          cx="55" cy={fy + 2}
          rx={Math.round(22 + progress * 14)} ry="10"
          fill={`rgba(251,146,60,${0.18 + intensity * 0.32})`}
          filter="url(#ffBed)"
        />
        {/* Hot-spot center glow */}
        <ellipse
          cx="55" cy={fy + 2}
          rx={Math.round(10 + progress * 8)} ry="5"
          fill={`rgba(254,240,138,${0.25 + intensity * 0.35})`}
          filter="url(#ffSoft)"
        />

        {/* ── FLAME TONGUES — each tongue = haze (blurry outer) + core (shaped body) ── */}

        {/* Pass 1: haze — wide, very blurry, gives each tongue its glow radius */}
        {tongues.map((t, i) => (
          <path
            key={`h${i}`}
            d={flamePath(t.cx, fy, Math.round(t.h * 1.1), Math.round(t.hw * 1.6))}
            fill="url(#fgHaze)"
            filter="url(#ffHaze)"
            opacity={0.5 * intensity}
            style={{ animation: `${t.anim} ${t.dur * 1.1}s ${t.delay}s ease-in-out infinite` }}
          />
        ))}

        {/* Pass 2: core — teardrop shape, soft blur, main visible flame */}
        {tongues.map((t, i) => (
          <path
            key={`c${i}`}
            d={flamePath(t.cx, fy, t.h, t.hw)}
            fill="url(#fgCore)"
            filter="url(#ffSoft)"
            opacity={0.9 * intensity}
            style={{ animation: `${t.anim} ${t.dur}s ${t.delay}s ease-in-out infinite` }}
          />
        ))}
      </svg>

      {/* Embers */}
      {embers.map(e => (
        <div key={e.id} style={{
          position: 'absolute',
          bottom: `${HEARTH_H + 2}px`,
          left: `${e.left}%`,
          width: `${e.size}px`,
          height: `${e.size}px`,
          borderRadius: '50%',
          background: e.size > 4 ? '#fde68a' : '#fb923c',
          boxShadow: `0 0 ${Math.round(e.size + 2)}px #f59e0b`,
          animation: `ember ${e.dur}s ${e.delay}s ease-out infinite`,
          '--ex': e.ex,
          zIndex: 2,
          pointerEvents: 'none',
        }} />
      ))}
    </div>
  );
}
