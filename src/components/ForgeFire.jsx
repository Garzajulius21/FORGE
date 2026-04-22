import { useMemo } from 'react';

export default function ForgeFire({ progress = 0 }) {
  const intensity = 0.3 + progress * 0.7;
  const flameH    = 55 + progress * 100;

  const embers = useMemo(() => (
    Array.from({ length: Math.floor(7 + progress * 10) }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      left: 18 + Math.random() * 64,
      delay: Math.random() * 2.5,
      dur: 1.0 + Math.random() * 1.4,
      ex: (Math.random() - 0.5) * 52 + 'px',
    }))
  ), [progress]);

  const flame = (color, w, h, blur, anim, delay, opacity) => ({
    position: 'absolute',
    bottom: '34px',
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
  });

  return (
    <div style={{
      position: 'relative',
      width: '110px',
      height: `${flameH + 56}px`,
      flexShrink: 0,
    }}>

      {/* Floor glow pool */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '22px',
        background: `radial-gradient(ellipse, rgba(245,120,11,${0.25 + intensity * 0.45}) 0%, transparent 70%)`,
        filter: 'blur(10px)',
      }} />

      {/* Outer flame — deep red */}
      <div style={flame(
        `radial-gradient(ellipse at bottom, #7f1d1d 0%, #dc2626 40%, #ea580c ${Math.round(intensity*75)}%, transparent 100%)`,
        `${Math.round(62 * intensity)}px`, `${Math.round(flameH * 0.95)}px`,
        7, 'flame1', 0, 0.75 * intensity
      )} />

      {/* Mid flame — orange */}
      <div style={flame(
        `radial-gradient(ellipse at bottom, #c2410c 0%, #f97316 50%, #fbbf24 ${Math.round(intensity*68)}%, transparent 100%)`,
        `${Math.round(44 * intensity)}px`, `${Math.round(flameH * 0.82)}px`,
        3, 'flame2', 0.15, 0.92 * intensity
      )} />

      {/* Inner flame — yellow/white core */}
      <div style={flame(
        `radial-gradient(ellipse at bottom, #fbbf24 0%, #fde68a 55%, #ffffff ${Math.round(intensity*45)}%, transparent 100%)`,
        `${Math.round(26 * intensity)}px`, `${Math.round(flameH * 0.62)}px`,
        1.5, 'flame3', 0.08, intensity
      )} />

      {/* Embers */}
      {embers.map(e => (
        <div key={e.id} style={{
          position: 'absolute',
          bottom: '34px',
          left: `${e.left}%`,
          width: `${e.size}px`,
          height: `${e.size}px`,
          borderRadius: '50%',
          background: e.size > 4 ? '#fde68a' : '#fb923c',
          boxShadow: `0 0 ${Math.round(e.size + 2)}px #f59e0b`,
          animation: `ember ${e.dur}s ${e.delay}s ease-out infinite`,
          '--ex': e.ex,
        }} />
      ))}

      {/* Forge base */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92px',
        height: '34px',
        background: 'linear-gradient(180deg, #2c1a08 0%, #1a0e04 100%)',
        borderRadius: '3px 3px 5px 5px',
        border: '1px solid #3e2210',
        overflow: 'hidden',
      }}>
        {/* Hot opening at top of base */}
        <div style={{
          position: 'absolute',
          top: 0, left: '12%', right: '12%',
          height: '7px',
          background: `radial-gradient(ellipse, rgba(251,146,60,${intensity * 0.95}) 0%, rgba(220,38,38,${intensity * 0.6}) 60%, transparent 100%)`,
          filter: 'blur(2px)',
        }} />
        {/* Rivets */}
        {[12, 80].map(l => (
          <div key={l} style={{
            position: 'absolute', bottom: '8px', left: `${l}px`,
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#261408', border: '1px solid #4a2a12',
          }} />
        ))}
        {/* Base label */}
        <div style={{
          position: 'absolute', bottom: '4px', left: 0, right: 0,
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '7px', letterSpacing: '0.16em',
          color: `rgba(245,158,11,${0.3 + intensity * 0.4})`,
          fontWeight: 700,
        }}>
          {progress >= 1 ? '⚒ FORGED' : `${Math.round(progress * 100)}% FORGED`}
        </div>
      </div>

    </div>
  );
}
