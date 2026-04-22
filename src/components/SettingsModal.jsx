import { useState } from 'react';
import { X, Settings } from 'lucide-react';

export default function SettingsModal({ onClose, userGoals, onSave, onEditProfile }) {
  const [calories, setCalories] = useState(userGoals.calories);
  const [water, setWater]       = useState(userGoals.water);

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
        </form>
      </div>
    </div>
  );
}
