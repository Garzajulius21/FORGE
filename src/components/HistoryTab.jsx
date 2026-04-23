import { useState } from 'react';
import { Pencil } from 'lucide-react';
import LogModal from './LogModal';
function fmt(date) {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function HistoryTab({ logs, onEdit, userGoals }) {
  const [editingLog, setEditingLog] = useState(null);

  const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    return (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '40px',
        textAlign: 'center',
        color: 'var(--muted)',
        fontSize: '14px',
      }}>
        No logs yet. Hit LOG TODAY to start your journey.
      </div>
    );
  }

  const thStyle = {
    padding: '10px 14px',
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--muted)',
    letterSpacing: '0.06em',
    textAlign: 'left',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    padding: '11px 14px',
    fontSize: '13px',
    borderBottom: '1px solid var(--border)',
    verticalAlign: 'middle',
  };

  return (
    <>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--amber)' }}>
            LOG HISTORY
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{sorted.length} {sorted.length === 1 ? 'entry' : 'entries'}</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                <th style={thStyle}>DATE</th>
                <th style={thStyle}>WEIGHT</th>
                <th style={thStyle}>CALORIES</th>
                <th style={thStyle}>WATER</th>
                <th style={thStyle}>WORKOUTS</th>
                <th style={{ ...thStyle, textAlign: 'right' }}></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((log, i) => {
                const calOver = log.calories && log.calories > (userGoals?.calories ?? 2000);
                const waterGood = log.water && log.water >= (userGoals?.water ?? 64);
                const isToday = log.date === new Date().toISOString().split('T')[0];

                return (
                  <tr key={log.date} style={{ background: isToday ? 'rgba(245,158,11,0.04)' : 'transparent' }}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--amber)' : 'var(--text)' }}>
                        {fmt(log.date)}
                        {isToday && <span style={{ fontSize: '10px', marginLeft: '6px', background: 'var(--amber-glow)', color: 'var(--amber)', border: '1px solid var(--amber)', borderRadius: '4px', padding: '1px 5px', fontWeight: 700 }}>TODAY</span>}
                      </div>
                      {log.notes && (
                        <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '3px', fontStyle: 'italic', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={log.notes}>
                          "{log.notes}"
                        </div>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {log.weight ? (
                        <span style={{ fontWeight: 600 }}>{log.weight} lbs</span>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>—</span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {log.calories ? (
                        <span style={{ fontWeight: 600, color: calOver ? 'var(--red)' : 'var(--green)' }}>
                          {log.calories.toLocaleString()} kcal
                        </span>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>—</span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {log.water ? (
                        <span style={{ fontWeight: 600, color: waterGood ? 'var(--green)' : 'var(--muted2)' }}>
                          {log.water} oz
                        </span>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>—</span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {log.workouts?.length > 0 ? (
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {log.workouts.map(w => (
                            <span key={w} style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background: w === 'gym' ? 'rgba(245,158,11,0.12)' : 'rgba(59,130,246,0.12)',
                              color: w === 'gym' ? 'var(--amber)' : 'var(--blue)',
                              border: `1px solid ${w === 'gym' ? 'rgba(245,158,11,0.3)' : 'rgba(59,130,246,0.3)'}`,
                            }}>
                              {w === 'gym' ? '🏋️ Gym' : '🚶 Walk'}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>—</span>
                      )}
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <button
                        onClick={() => setEditingLog(log)}
                        style={{
                          background: 'var(--surface2)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          padding: '5px 8px',
                          color: 'var(--muted)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          transition: 'color 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--amber)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                      >
                        <Pencil size={11} /> Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editingLog && (
        <LogModal
          onClose={() => setEditingLog(null)}
          onSubmit={(data) => {
            onEdit(editingLog.date, data);
            setEditingLog(null);
          }}
          todayLog={editingLog}
          editMode
          editDate={editingLog.date}
        />
      )}
    </>
  );
}
