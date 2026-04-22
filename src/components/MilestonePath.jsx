import { useState, useEffect } from 'react';
import { MILESTONES } from '../data/constants';
import { Lock } from 'lucide-react';

function ShieldBadge({ unlocked, isGoal, isCurrent, milestone }) {
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    if (unlocked) {
      setJustUnlocked(true);
      const t = setTimeout(() => setJustUnlocked(false), 1000);
      return () => clearTimeout(t);
    }
  }, [unlocked]);

  const color = isGoal
    ? '#f59e0b'
    : unlocked
    ? '#22c55e'
    : isCurrent
    ? '#f59e0b'
    : '#334155';

  const bgColor = isGoal && unlocked
    ? 'rgba(245,158,11,0.15)'
    : unlocked
    ? 'rgba(34,197,94,0.1)'
    : isCurrent
    ? 'rgba(245,158,11,0.08)'
    : 'rgba(30,41,59,0.5)';

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <svg
        viewBox="0 0 44 52"
        width="44"
        height="52"
        style={{
          filter: unlocked
            ? `drop-shadow(0 0 ${isGoal ? 10 : 6}px ${color})`
            : 'none',
          animation: justUnlocked
            ? 'shieldUnlock 0.6s ease'
            : isCurrent && !unlocked
            ? 'pulse 2s ease-in-out infinite'
            : 'none',
          transition: 'filter 0.4s ease',
        }}
      >
        {/* Shield shape */}
        <path
          d="M22 2 L40 10 L40 30 C40 42 22 50 22 50 C22 50 4 42 4 30 L4 10 Z"
          fill={bgColor}
          stroke={color}
          strokeWidth={isCurrent || unlocked ? 2 : 1}
          opacity={unlocked || isCurrent ? 1 : 0.5}
        />

        {/* Shield inner border */}
        {(unlocked || isCurrent) && (
          <path
            d="M22 7 L36 13 L36 29 C36 39 22 46 22 46 C22 46 8 39 8 29 L8 13 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity={0.3}
          />
        )}

        {/* Icon content */}
        {unlocked && isGoal ? (
          // Trophy crown for FORGED
          <>
            <path d="M15 20 L15 34 L29 34 L29 20 L26 24 L22 19 L18 24 Z" fill={color} opacity={0.9} />
            <rect x="13" y="34" width="18" height="3" rx="1" fill={color} opacity={0.8} />
          </>
        ) : unlocked ? (
          // Checkmark for completed
          <path
            d="M14 26 L20 32 L30 20"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ) : isCurrent ? (
          // Sword for current target
          <>
            <line x1="22" y1="14" x2="22" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="24" x2="28" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="22" cy="38" r="2" fill={color} opacity={0.7} />
          </>
        ) : (
          // Lock for locked
          <g transform="translate(16, 17)">
            <rect x="1" y="6" width="10" height="9" rx="1.5" fill={color} opacity={0.4} />
            <path d="M3 6 L3 4 C3 1.8 9 1.8 9 4 L9 6" stroke={color} strokeWidth="1.5" fill="none" opacity={0.4} strokeLinecap="round" />
          </g>
        )}

        {/* Milestone loss text */}
        {unlocked && !isGoal && (
          <text x="22" y="42" textAnchor="middle" fontSize="6" fill={color} opacity={0.7} fontWeight="bold">
            -{milestone.loss}lb
          </text>
        )}
      </svg>

      {/* Unlock burst ring */}
      {justUnlocked && (
        <div style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          border: `2px solid ${color}`,
          animation: 'levelUpRing 0.6s ease-out forwards',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
}

export default function MilestonePath({ currentWeight, unlockedMilestones, startWeight, goalWeight }) {
  const start = startWeight || 290;
  const goal  = goalWeight  || 200;

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '20px',
    }}>
      <h3 style={{ fontFamily:'var(--font-display)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--amber)', marginBottom: '20px', textShadow:'0 0 10px rgba(245,158,11,0.3)' }}>
        MILESTONE PATH — {start} → {goal} LBS
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {MILESTONES.map((m, i) => {
          const unlocked = unlockedMilestones?.includes(m.id);
          const isGoal   = m.id === 'goal';
          const isCurrent = !unlocked && (i === 0 || unlockedMilestones?.includes(MILESTONES[i - 1]?.id));

          return (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Shield badge + connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <ShieldBadge
                  unlocked={unlocked}
                  isGoal={isGoal}
                  isCurrent={isCurrent}
                  milestone={m}
                />
                {i < MILESTONES.length - 1 && (
                  <div style={{
                    width: '2px',
                    height: '16px',
                    background: unlocked
                      ? 'linear-gradient(180deg, #22c55e, #22c55e50)'
                      : 'var(--border)',
                    opacity: unlocked ? 0.7 : 0.3,
                    margin: '2px 0',
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: i < MILESTONES.length - 1 ? '4px' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: isGoal ? '16px' : '14px',
                    fontWeight: 800,
                    color: unlocked
                      ? (isGoal ? 'var(--amber)' : 'var(--green)')
                      : isCurrent ? 'var(--text)' : 'var(--muted)',
                    animation: isGoal && unlocked ? 'glow 2s ease-in-out infinite' : 'none',
                  }}>
                    {m.title}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {m.weight} lbs {m.loss > 0 ? `(−${m.loss} lbs)` : '(start)'}
                  </span>
                  {unlocked && (
                    <span style={{
                      fontSize: '10px',
                      background: isGoal ? 'var(--amber-glow)' : 'rgba(34,197,94,0.1)',
                      color: isGoal ? 'var(--amber)' : 'var(--green)',
                      border: `1px solid ${isGoal ? 'rgba(245,158,11,0.4)' : 'rgba(34,197,94,0.3)'}`,
                      borderRadius: '4px',
                      padding: '1px 6px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}>
                      UNLOCKED
                    </span>
                  )}
                </div>
                {(unlocked || isCurrent) && (
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                    {m.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
