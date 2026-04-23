import { useState } from 'react';
import { X, Settings, TriangleAlert } from 'lucide-react';

export default function SettingsModal({ onClose, userGoals, onSave, onEditProfile, onReset }) {
  const [calories, setCalories]     = useState(userGoals.calories);
  const [water, setWater]           = useState(userGoals.water);
  const [confirming, setConfirming] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    onSave({ calories, water });
    onClose();
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: 'var(--text)',
    fontSize: '15px',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--muted2)',
    letterSpacing: '0.06em',
    marginBottom: '6px',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '20px',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="slide-up" style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '28px',
        width: '100%',
        maxWidth: '380px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={18} color="var(--amber)" />
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Daily Goals</h2>
          </div>
          <button onClick={onClose} style={{ background: 'var(--surface2)', borderRadius: '8px', padding: '6px', color: 'var(--muted)', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={labelStyle}>DAILY CALORIE GOAL</label>
            <input
              type="number"
              min="500"
              max="10000"
              value={calories}
              onChange={e => setCalories(e.target.value)}
              style={inputStyle}
            />
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
              Calories at or under this target earn bonus XP
            </div>
          </div>

          <div>
            <label style={labelStyle}>DAILY WATER GOAL (oz)</label>
            <input
              type="number"
              min="16"
              max="512"
              value={water}
              onChange={e => setWater(e.target.value)}
              style={inputStyle}
            />
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
              64 oz = 8 glasses. Adjust to your target.
            </div>
          </div>

          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, var(--amber-dim), var(--amber))',
              color: '#000',
              fontWeight: 800,
              fontSize: '14px',
              padding: '12px',
              borderRadius: '10px',
              letterSpacing: '0.04em',
            }}
          >
            SAVE GOALS
          </button>

          <button
            type="button"
            onClick={onEditProfile}
            style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '11px',
              color: 'var(--muted)',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.04em',
            }}
          >
            Edit Profile & Recalculate Goals
          </button>

          {/* Danger zone */}
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '18px',
            marginTop: '4px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: '10px' }}>
              DANGER ZONE
            </div>

            {!confirming ? (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid rgba(239,68,68,0.35)',
                  borderRadius: '10px',
                  padding: '11px',
                  color: 'var(--red)',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                }}
              >
                Reset All Data
              </button>
            ) : (
              <div style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.4)',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <TriangleAlert size={18} color="var(--red)" style={{ flexShrink: 0, marginTop: '1px' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
                      Are you sure?
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                      This will permanently delete all logs, XP, quests, streaks, and your profile. This cannot be undone.
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    style={{
                      flex: 1,
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: 'var(--muted)',
                      fontWeight: 700,
                      fontSize: '13px',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onReset}
                    style={{
                      flex: 1,
                      background: 'var(--red)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '13px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Yes, Reset Everything
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
