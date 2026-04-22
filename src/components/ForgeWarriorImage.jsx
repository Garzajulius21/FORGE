import { useState } from 'react';
import ForgeWarrior from './ForgeWarrior';

const TITLE_CONFIG = {
  Recruit:   { file: 'recruit',   glow: false, color: '#9068c0' },
  Initiated: { file: 'initiated', glow: false, color: '#a078d0' },
  Iron:      { file: 'iron',      glow: false, color: '#c0cdd8' },
  Steel:     { file: 'steel',     glow: false, color: '#a8cce0' },
  Titan:     { file: 'titan',     glow: true,  color: '#f0a030' },
  Apex:      { file: 'apex',      glow: true,  color: '#f8b030' },
  Legend:    { file: 'legend',    glow: true,  color: '#ffd840' },
  Mythic:    { file: 'mythic',    glow: true,  color: '#cc78f8' },
  Immortal:  { file: 'immortal',  glow: true,  color: '#40d8f0' },
  Ascended:  { file: 'ascended',  glow: true,  color: '#d8e0e8' },
  FORGED:    { file: 'forged',    glow: true,  color: '#f8c020', crown: true },
};

export default function ForgeWarriorImage({ title = 'Recruit', size = 140 }) {
  const cfg = TITLE_CONFIG[title] || TITLE_CONFIG.Recruit;
  const [imgError, setImgError] = useState(false);
  const c = cfg.color;

  const filterStyle = cfg.glow
    ? `drop-shadow(0 0 12px ${c}cc) drop-shadow(0 0 5px ${c}88)`
    : 'drop-shadow(0 4px 12px rgba(0,0,0,0.9))';

  // Fallback to SVG warrior if image not found
  if (imgError) {
    return <ForgeWarrior title={title} size={size} />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0,
      position: 'relative',
    }}>

      {/* Aura glow */}
      {cfg.glow && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: size * 1.8,
          height: size * 1.8,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c}28 0%, transparent 65%)`,
          animation: 'aura 2.5s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      )}

      {/* Warrior image */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <img
          src={`/warriors/${cfg.file}.png`}
          alt={title}
          width={size}
          height={size}
          onError={() => setImgError(true)}
          style={{
            objectFit: 'contain',
            filter: filterStyle,
            animation: 'warriorIdle 3.5s ease-in-out infinite',
            display: 'block',
            borderRadius: '8px',
          }}
        />

        {/* FORGED crown sparkle overlay */}
        {cfg.crown && (
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '20px',
            animation: 'spark 1s ease-in-out infinite',
            filter: `drop-shadow(0 0 8px ${c})`,
          }}>
            👑
          </div>
        )}
      </div>

      {/* Title badge */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {/* Left wing */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          opacity: 0.7,
        }}>
          <div style={{ width: '16px', height: '1px', background: `linear-gradient(90deg, transparent, ${c})` }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: c, opacity: 0.6 }} />
        </div>

        {/* Core badge */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '12px',
          fontWeight: 700,
          color: c,
          letterSpacing: '0.18em',
          padding: '5px 16px',
          borderRadius: '4px',
          background: `linear-gradient(135deg, ${c}22 0%, ${c}10 100%)`,
          border: `1px solid ${c}55`,
          boxShadow: cfg.glow ? `0 0 12px ${c}44, inset 0 1px 0 ${c}30` : `inset 0 1px 0 ${c}20`,
          animation: cfg.glow ? 'glow 2.5s ease-in-out infinite' : 'none',
          whiteSpace: 'nowrap',
          textShadow: cfg.glow ? `0 0 10px ${c}cc` : 'none',
        }}>
          {title.toUpperCase()}
        </div>

        {/* Right wing */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          opacity: 0.7,
        }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: c, opacity: 0.6 }} />
          <div style={{ width: '16px', height: '1px', background: `linear-gradient(90deg, ${c}, transparent)` }} />
        </div>
      </div>
    </div>
  );
}
