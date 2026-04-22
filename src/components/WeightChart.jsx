import { useState } from 'react';
import { START_WEIGHT, GOAL_WEIGHT } from '../data/constants';

function fmtDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Smooth bezier curve through points
function smoothPath(pts) {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 2] || pts[i - 1];
    const p1 = pts[i - 1];
    const p2 = pts[i];
    const p3 = pts[i + 1] || pts[i];
    const cp1x = p1.x + (p2.x - p0.x) / 5;
    const cp1y = p1.y + (p2.y - p0.y) / 5;
    const cp2x = p2.x - (p3.x - p1.x) / 5;
    const cp2y = p2.y - (p3.y - p1.y) / 5;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

export default function WeightChart({ logs }) {
  const [hovered, setHovered] = useState(null);
  const recent = [...logs].reverse().slice(-30);

  if (recent.length === 0) {
    return (
      <div style={{
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        border: '1px dashed var(--border)',
        borderRadius: '8px',
        marginTop: '8px',
      }}>
        <div style={{ fontSize: '28px', opacity: 0.3 }}>⚖️</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--muted)' }}>
          NO WEIGHT DATA YET
        </div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', opacity: 0.7 }}>
          Log your first weight to see your trend
        </div>
      </div>
    );
  }

  const weightLogs = recent.filter(l => l.weight);
  if (weightLogs.length < 1) return null;

  const weights   = weightLogs.map(l => l.weight);
  const latest    = weights[weights.length - 1];
  const first     = weights[0];
  const change    = weights.length > 1 ? (latest - first) : null;

  const minW  = Math.min(...weights, GOAL_WEIGHT) - 3;
  const maxW  = Math.max(...weights) + 5;
  const range = maxW - minW || 1;

  const W   = 100;
  const H   = 110;
  const PAD = { top: 12, bottom: 6, left: 1, right: 1 };

  const toY = w => PAD.top + (1 - (w - minW) / range) * (H - PAD.top - PAD.bottom);

  const pts = weightLogs.map((l, i, arr) => ({
    x: arr.length === 1 ? W / 2 : PAD.left + (i / (arr.length - 1)) * (W - PAD.left - PAD.right),
    y: toY(l.weight),
    log: l,
  }));

  const linePath = smoothPath(pts);
  const fillPath = pts.length > 1
    ? `${linePath} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`
    : '';

  const goalY   = toY(GOAL_WEIGHT);
  const showGoal = goalY > PAD.top && goalY < H - PAD.bottom;

  return (
    <div>
      {/* Mini stats row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
          Current: <span style={{ color: 'var(--text)', fontWeight: 700 }}>{latest} lbs</span>
        </div>
        {change !== null && (
          <div style={{
            fontSize: '12px',
            fontWeight: 700,
            color: change < 0 ? 'var(--green)' : change > 0 ? 'var(--red)' : 'var(--muted)',
          }}>
            {change < 0 ? '▼' : change > 0 ? '▲' : '—'} {Math.abs(change).toFixed(1)} lbs (30d)
          </div>
        )}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '140px', overflow: 'visible' }}>
        <defs>
          <linearGradient id="wfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f59e0b" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"    />
          </linearGradient>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Subtle horizontal grid */}
        {[0.25, 0.5, 0.75].map(t => {
          const y = PAD.top + t * (H - PAD.top - PAD.bottom);
          return (
            <line key={t} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
              stroke="#272733" strokeWidth="0.6" />
          );
        })}

        {/* Goal line */}
        {showGoal && (
          <>
            <line x1={PAD.left} y1={goalY} x2={W - PAD.right} y2={goalY}
              stroke="#22c55e" strokeWidth="0.8" strokeDasharray="2.5,2" opacity="0.65" />
            <text x={PAD.left + 0.5} y={goalY - 2.5}
              fill="#22c55e" fontSize="4.5" fontWeight="bold" opacity="0.85">
              GOAL {GOAL_WEIGHT}
            </text>
          </>
        )}

        {/* Gradient fill */}
        {fillPath && <path d={fillPath} fill="url(#wfill)" />}

        {/* Main line — glowing */}
        <path d={linePath} fill="none" stroke="#f59e0b" strokeWidth="2"
          strokeLinejoin="round" strokeLinecap="round" filter="url(#lineGlow)" />

        {/* Data points */}
        {pts.map((pt, i) => (
          <g key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'crosshair' }}
          >
            <circle cx={pt.x} cy={pt.y} r="6" fill="transparent" />
            <circle cx={pt.x} cy={pt.y} r={hovered === i ? 3.5 : 2.2} fill="#f59e0b" style={{ transition: 'r 0.1s' }} />
            <circle cx={pt.x} cy={pt.y} r="0.9" fill="#fff" opacity="0.85" />
          </g>
        ))}

        {/* Tooltip */}
        {hovered !== null && (() => {
          const pt = pts[hovered];
          const log = weightLogs[hovered];
          const tipW = 46, tipH = 20;
          const tx = Math.max(tipW / 2 + 2, Math.min(W - tipW / 2 - 2, pt.x));
          const ty = Math.max(tipH + 6, pt.y - 8);
          return (
            <g pointerEvents="none">
              <rect x={tx - tipW / 2} y={ty - tipH} width={tipW} height={tipH} rx="3"
                fill="#1a1a21" stroke="#f59e0b" strokeWidth="0.6" opacity="0.97" />
              <text x={tx} y={ty - tipH / 2 + 2} textAnchor="middle" fontSize="5.5" fill="#f59e0b" fontWeight="bold">
                {log.weight} lbs
              </text>
              <text x={tx} y={ty - tipH / 2 + 8.5} textAnchor="middle" fontSize="4.2" fill="#94a3b8">
                {fmtDate(log.date)}
              </text>
            </g>
          );
        })()}

        {/* First weight label */}
        {pts.length > 0 && (
          <text x={pts[0].x} y={pts[0].y - 5} textAnchor="middle"
            fill="#64748b" fontSize="4.5">{first}</text>
        )}

        {/* Latest weight label — amber + bigger */}
        {pts.length > 1 && (
          <text x={pts[pts.length - 1].x} y={pts[pts.length - 1].y - 5} textAnchor="middle"
            fill="#f59e0b" fontSize="5.5" fontWeight="bold">{latest}</text>
        )}
      </svg>

      {/* Date range */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>
        <span>{weightLogs[0] ? fmtDate(weightLogs[0].date) : ''}</span>
        <span>{weightLogs[weightLogs.length - 1] ? fmtDate(weightLogs[weightLogs.length - 1].date) : ''}</span>
      </div>
    </div>
  );
}
