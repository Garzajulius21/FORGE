export default function FloatingXP({ items }) {
  if (!items.length) return null;
  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '24px',
      zIndex: 1500,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '4px',
    }}>
      {items.map(item => (
        <div
          key={item.id}
          style={{
            fontSize: '15px',
            fontWeight: 800,
            color: item.amount >= 200 ? '#fde68a' : 'var(--amber)',
            textShadow: '0 0 12px rgba(245,158,11,0.7)',
            letterSpacing: '0.04em',
            animation: 'floatXP 1.4s ease-out forwards',
            whiteSpace: 'nowrap',
          }}
        >
          +{item.amount} XP
        </div>
      ))}
    </div>
  );
}
