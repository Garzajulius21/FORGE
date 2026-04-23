import { useMemo } from 'react';

const HEARTH_H = 56;
// Arch top sits at SVG y=8, which is (56-8)=48px from container bottom
const FLAME_BOTTOM = HEARTH_H - 8;

export default function ForgeFire({ progress = 0 }) {
  const intensity = 0.3 + progress * 0.7;
  const flameH    = 55 + progress * 100;

  const embers = useMemo(() => (
    Array.from({ length: Math.floor(7 + progress * 10) }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      left: 22 + Math.random() * 56,
      delay: Math.random() * 2.5,
      dur: 1.0 + Math.random() * 1.4,
      ex: (Math.random() - 0.5) * 40 + 'px',
    }))
  ), [progress]);

  const flame = (color, w, h, blur, anim, delay, opacity) => ({
    position: 'absolute',
    bottom: `${FLAME_BOTTOM}px`,
    left: '50%',
    transform: 'translateX(-50%)',
    width: w,
    height: h,
    background: color,
    borderRadius: '50% 50% 20% 20% / 60% 60% 40% 40%',
    filter: `blur(${blur}px)`,
    animation: `${anim} ${1.4 + delay * 0.3}s ${delay}s ease-in-out infinite`,
    opacity,
    transformOrigin: 'bottom center',
    zIndex: 2,
  });

  return (
    <div style={{ position: 'relative', width: '110px', height: `${flameH + HEARTH_H + 10}px`, flexShrink: 0 }}>

      {/* 1. HEARTH — renders first so flames paint on top of it */}
      <svg
        viewBox="0 0 110 56"
        width="110"
        height={HEARTH_H}
        style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 0 }}
      >
        <defs>
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

        {/* Stone body */}
        <rect x="2" y="3" width="106" height="43" rx="2"
          fill="url(#fgStoneFace)" stroke="#3a3028" strokeWidth="1" />

        {/* Brick texture — horizontal mortar rows */}
        <line x1="2"   y1="17" x2="108" y2="17" stroke="#14100c" strokeWidth="0.8" opacity="0.65" />
        <line x1="2"   y1="31" x2="108" y2="31" stroke="#14100c" strokeWidth="0.8" opacity="0.65" />
        {/* Vertical joints row 1 */}
        <line x1="22"  y1="3"  x2="22"  y2="17" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
        <line x1="52"  y1="3"  x2="52"  y2="17" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
        <line x1="82"  y1="3"  x2="82"  y2="17" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
        {/* Vertical joints row 2 — offset */}
        <line x1="10"  y1="17" x2="10"  y2="31" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
        <line x1="40"  y1="17" x2="40"  y2="31" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
        <line x1="70"  y1="17" x2="70"  y2="31" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
        <line x1="100" y1="17" x2="100" y2="31" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
        {/* Vertical joints row 3 */}
        <line x1="22"  y1="31" x2="22"  y2="46" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />
        <line x1="90"  y1="31" x2="90"  y2="46" stroke="#14100c" strokeWidth="0.7" opacity="0.45" />

        {/* Roman arch opening — spring line y=28, apex y=8 */}
        <path d="M 26 43 L 26 28 A 29 20 0 0 1 84 28 L 84 43 Z"
          fill="url(#fgArchGlow)" />
        {/* Arch stone surround */}
        <path d="M 26 43 L 26 28 A 29 20 0 0 1 84 28 L 84 43"
          fill="none" stroke="#3d3028" strokeWidth="1.8" strokeLinejoin="round" />
        {/* Voussoir wedge lines */}
        <line x1="26" y1="31" x2="19" y2="23" stroke="#1e1a14" strokeWidth="0.7" opacity="0.5" />
        <line x1="84" y1="31" x2="91" y2="23" stroke="#1e1a14" strokeWidth="0.7" opacity="0.5" />
        <line x1="36" y1="14" x2="31" y2="6"  stroke="#1e1a14" strokeWidth="0.7" opacity="0.4" />
        <line x1="74" y1="14" x2="79" y2="6"  stroke="#1e1a14" strokeWidth="0.7" opacity="0.4" />
        {/* Keystone */}
        <path d="M 50 9 L 55 3 L 60 9" fill="#26201a" stroke="#3d3028" strokeWidth="0.8" />

        {/* Coal bed at arch floor */}
        <ellipse cx="55" cy="42" rx="23" ry="4"
          fill={`rgba(251,146,60,${0.45 + intensity * 0.45})`} />
        <ellipse cx="55" cy="42" rx="14" ry="2.5"
          fill={`rgba(253,230,138,${0.3 + intensity * 0.5})`} />

        {/* Iron band */}
        <rect x="2" y="43" width="106" height="5" rx="1"
          fill="url(#fgIronBand)" stroke="#111" strokeWidth="0.5" />
        {/* Rivets */}
        <circle cx="13"  cy="45.5" r="2.2" fill="#141414" stroke="#2e2e2e" strokeWidth="0.8" />
        <circle cx="97"  cy="45.5" r="2.2" fill="#141414" stroke="#2e2e2e" strokeWidth="0.8" />
        <circle cx="55"  cy="45.5" r="1.8" fill="#141414" stroke="#2e2e2e" strokeWidth="0.8" />

        {/* Base footer */}
        <rect x="4" y="48" width="102" height="7" rx="2"
          fill="url(#fgBase)" stroke="#221e18" strokeWidth="1" />

        {/* Label */}
        <text x="55" y="53.5" textAnchor="middle"
          fill={`rgba(245,158,11,${0.32 + intensity * 0.48})`}
          fontSize="5.5" fontWeight="700" letterSpacing="1.8"
          fontFamily="Cinzel, Georgia, serif">
          {progress >= 1 ? '⚒ FORGED' : `${Math.round(progress * 100)}% FORGED`}
        </text>
      </svg>

      {/* 2. ARCH GLOW — soft orange bloom sitting in the arch mouth, above hearth */}
      <div style={{
        position: 'absolute',
        bottom: `${HEARTH_H - 30}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '68px',
        height: '28px',
        background: `radial-gradient(ellipse, rgba(251,146,60,${0.35 + intensity * 0.5}) 0%, transparent 70%)`,
        filter: 'blur(10px)',
        zIndex: 1,
      }} />

      {/* 3. FLAMES — on top of everything */}
      <div style={flame(
        `radial-gradient(ellipse at bottom, #7f1d1d 0%, #dc2626 40%, #ea580c ${Math.round(intensity * 75)}%, transparent 100%)`,
        `${Math.round(62 * intensity)}px`, `${Math.round(flameH * 0.95)}px`,
        7, 'flame1', 0, 0.75 * intensity
      )} />
      <div style={flame(
        `radial-gradient(ellipse at bottom, #c2410c 0%, #f97316 50%, #fbbf24 ${Math.round(intensity * 68)}%, transparent 100%)`,
        `${Math.round(44 * intensity)}px`, `${Math.round(flameH * 0.82)}px`,
        3, 'flame2', 0.15, 0.92 * intensity
      )} />
      <div style={flame(
        `radial-gradient(ellipse at bottom, #fbbf24 0%, #fde68a 55%, #ffffff ${Math.round(intensity * 45)}%, transparent 100%)`,
        `${Math.round(26 * intensity)}px`, `${Math.round(flameH * 0.62)}px`,
        1.5, 'flame3', 0.08, intensity
      )} />

      {/* 4. EMBERS — on top */}
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
        }} />
      ))}
    </div>
  );
}
