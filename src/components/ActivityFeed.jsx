import { Zap } from 'lucide-react';

export default function ActivityFeed({ activities }) {
  if (activities.length === 0) {
    return (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
      }}>
        <h3 style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--amber)', marginBottom: '12px' }}>
          ACTIVITY FEED
        </h3>
        <div style={{ color: 'var(--muted)', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>
          No activity yet. Log your first day to start earning XP.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      maxHeight: '320px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h3 style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--amber)', marginBottom: '12px', flexShrink: 0 }}>
        ACTIVITY FEED
      </h3>
      <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {activities.slice(0, 30).map(a => (
          <div key={a.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 10px',
            background: 'var(--surface2)',
            borderRadius: '6px',
          }}>
            <Zap size={13} color="var(--amber)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '13px', flex: 1 }}>{a.label}</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--amber)', whiteSpace: 'nowrap' }}>+{a.xp} XP</span>
            <span style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{a.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
