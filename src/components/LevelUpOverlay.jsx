import { useEffect, useState } from 'react';

function Particles({ color }) {
  const count = 28;
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', pointerEvents: 'none' }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        const dist = 90 + Math.random() * 70;
        const size = 4 + Math.random() * 7;
        const delay = Math.random() * 0.25;
        const colors = [color, '#fde68a', '#ffffff', '#ef4444'];
        const c = colors[i % colors.length];
        return (
          <div key={i} style={{
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: i % 3 === 0 ? '2px' : '50%',
            background: c,
            boxShadow: `0 0 6px ${c}`,
            animation: `particleOut 0.9s ${delay}s ease-out forwards`,
            '--a': `${angle}deg`,
            '--d': `${dist}px`,
            opacity: 0,
          }} />
        );
      })}
    </div>
  );
}

function Ring() {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      border: '3px solid rgba(245,158,11,0.6)',
      animation: 'levelUpRing 0.7s ease-out forwards',
      pointerEvents: 'none',
    }} />
  );
}

export default function LevelUpOverlay({ data, onDismiss }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (data) {
      setShow(true);
    }
  }, [data]);

  if (!data || !show) return null;

  return (
    <div
      onClick={onDismiss}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000,
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Rings */}
        <Ring />
        <Ring />

        {/* Particles */}
        <Particles color="#f59e0b" />

        {/* Main content */}
        <div style={{
          animation: 'levelUpBoom 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* LEVEL UP text */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: 'var(--amber)',
            marginBottom: '8px',
            textShadow: '0 0 20px rgba(245,158,11,0.8)',
          }}>
            LEVEL UP
          </div>

          {/* Level number */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '104px',
            fontWeight: 900,
            color: 'var(--amber)',
            lineHeight: 1,
            textShadow: '0 0 40px rgba(245,158,11,0.6), 0 0 80px rgba(245,158,11,0.3)',
            marginBottom: '12px',
          }}>
            {data.level}
          </div>

          {/* Title */}
          {data.titleChanged && (
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '10px',
              color: 'var(--muted)',
              letterSpacing: '0.2em',
              marginBottom: '6px',
            }}>
              NEW TITLE UNLOCKED
            </div>
          )}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            color: data.titleChanged ? 'var(--amber)' : 'var(--muted2)',
            letterSpacing: '0.1em',
            textShadow: data.titleChanged ? '0 0 20px rgba(245,158,11,0.5)' : 'none',
            marginBottom: '36px',
          }}>
            {data.title}
          </div>

          {/* Dismiss hint */}
          <div style={{
            fontSize: '12px',
            color: 'var(--muted)',
            letterSpacing: '0.08em',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>
            TAP ANYWHERE TO CONTINUE
          </div>
        </div>
      </div>
    </div>
  );
}
