export default function XPBar({ levelInfo, totalXP, streak, streakShields, currentTitle }) {
  const pct = Math.round(levelInfo.progress * 100);

  return (
    <div style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    }}>
      {/* Level badge */}
      <div style={{
        background: 'var(--amber-glow)',
        border: '1px solid var(--amber)',
        borderRadius: '8px',
        padding: '6px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '70px',
      }}>
        <span style={{ fontFamily:'var(--font-display)', fontSize: '9px', color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.1em' }}>LEVEL</span>
        <span style={{ fontFamily:'var(--font-display)', fontSize: '24px', fontWeight: 900, color: 'var(--amber)', lineHeight: 1, textShadow:'0 0 12px rgba(245,158,11,0.5)' }}>{levelInfo.level}</span>
      </div>

      {/* XP bar */}
      <div style={{ flex: 1, minWidth: '160px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted2)', fontWeight: 600 }}>
            {totalXP.toLocaleString()} XP total
          </span>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            {levelInfo.next
              ? `${levelInfo.xpIntoLevel.toLocaleString()} / ${levelInfo.xpForNext.toLocaleString()} to next level`
              : 'MAX LEVEL'}
          </span>
        </div>
        <div style={{
          height: '14px',
          background: 'var(--surface2)',
          borderRadius: '99px',
          overflow: 'visible',
          border: '1px solid var(--border)',
          position: 'relative',
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #d97706, #f59e0b, #fde68a)',
            borderRadius: '99px',
            transition: 'width 0.6s ease',
            boxShadow: '0 0 10px rgba(245,158,11,0.6)',
            position: 'relative',
          }}>
            {/* Spark at tip */}
            {pct > 2 && (
              <div style={{
                position: 'absolute',
                right: '-5px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 0 6px #f59e0b, 0 0 12px #f59e0b',
                animation: 'spark 0.8s ease-in-out infinite',
              }} />
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '2px' }}>TITLE</div>
        <div style={{ fontFamily:'var(--font-display)', fontSize: '13px', fontWeight: 700, color: 'var(--amber)', textShadow:'0 0 10px rgba(245,158,11,0.4)' }}>{currentTitle}</div>
      </div>

      {/* Streak */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: streak > 0 ? 'rgba(239,68,68,0.1)' : 'var(--surface2)',
        border: `1px solid ${streak > 0 ? 'rgba(239,68,68,0.4)' : 'var(--border)'}`,
        borderRadius: '8px',
        padding: '6px 12px',
      }}>
        <span style={{ fontSize: '18px' }}>🔥</span>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: streak > 0 ? '#f87171' : 'var(--muted)', lineHeight: 1 }}>{streak}</div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em' }}>DAY STREAK</div>
        </div>
        {streakShields > 0 && (
          <div title="Streak Shield — protects your streak if you miss a day" style={{
            marginLeft: '2px',
            fontSize: '16px',
            lineHeight: 1,
            filter: 'drop-shadow(0 0 4px rgba(96,165,250,0.7))',
          }}>
            🛡️
          </div>
        )}
      </div>
    </div>
  );
}
