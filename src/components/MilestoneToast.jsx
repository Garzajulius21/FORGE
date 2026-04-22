export default function MilestoneToast({ milestone, onDismiss }) {
  if (!milestone) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 2000,
      animation: 'glow 2s ease infinite, slideUp 0.4s ease',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1200, #2a1f00)',
        border: '2px solid var(--amber)',
        borderRadius: '14px',
        padding: '24px 32px',
        textAlign: 'center',
        minWidth: '320px',
        boxShadow: '0 0 40px rgba(245,158,11,0.4)',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>🏆</div>
        <div style={{ fontSize: '11px', color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '6px' }}>
          MILESTONE UNLOCKED
        </div>
        <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--amber)', marginBottom: '4px' }}>
          {milestone.title}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--muted2)', marginBottom: '20px' }}>
          {milestone.description}
        </div>
        <button
          onClick={onDismiss}
          style={{
            background: 'var(--amber)',
            color: '#000',
            fontWeight: 800,
            padding: '8px 24px',
            borderRadius: '8px',
            fontSize: '13px',
            letterSpacing: '0.06em',
          }}
        >
          CLAIM IT
        </button>
      </div>
    </div>
  );
}
