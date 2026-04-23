import { useState } from 'react';
import { X, Dumbbell, Footprints, Droplets, Flame, Weight, NotebookPen, Zap, Waves, Bike, Leaf } from 'lucide-react';

function fmtDate(date) {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

export default function LogModal({ onClose, onSubmit, todayLog, editMode, editDate }) {
  const [weight, setWeight]     = useState(todayLog?.weight || '');
  const [calories, setCalories] = useState(todayLog?.calories || '');
  const [water, setWater]       = useState(todayLog?.water || '');
  const [workouts, setWorkouts] = useState(todayLog?.workouts || []);
  const [notes, setNotes]       = useState(todayLog?.notes || '');

  function toggleWorkout(type) {
    setWorkouts(prev =>
      prev.includes(type) ? prev.filter(w => w !== type) : [...prev, type]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      weight: weight ? parseFloat(weight) : null,
      calories: calories ? parseInt(calories) : null,
      water: water ? parseInt(water) : null,
      workouts,
      notes: notes.trim(),
    });
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
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
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
      zIndex: 1000,
      padding: '20px',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="slide-up" style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '28px',
        width: '100%',
        maxWidth: '420px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>{editMode ? 'Edit Log' : 'Log Today'}</h2>
            <p style={{ fontSize: '12px', color: editMode ? 'var(--muted)' : 'var(--muted)', marginTop: '2px' }}>
              {editMode
                ? `Editing ${fmtDate(editDate)} — no XP change`
                : 'Everything counts. Every entry earns XP.'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'var(--surface2)', borderRadius: '8px', padding: '6px', color: 'var(--muted)', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Weight */}
          <div>
            <label style={labelStyle}><Weight size={14} /> WEIGHT (lbs) <span style={{ color: 'var(--amber)', marginLeft: 'auto' }}>+50 XP</span></label>
            <input
              type="number"
              step="0.1"
              min="100"
              max="500"
              placeholder="e.g. 289.4"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Calories */}
          <div>
            <label style={labelStyle}><Flame size={14} /> CALORIES <span style={{ color: 'var(--amber)', marginLeft: 'auto' }}>+40 XP (+75 if under goal)</span></label>
            <input
              type="number"
              min="0"
              max="9999"
              placeholder="e.g. 1850"
              value={calories}
              onChange={e => setCalories(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Water */}
          <div>
            <label style={labelStyle}><Droplets size={14} /> WATER (oz) <span style={{ color: 'var(--amber)', marginLeft: 'auto' }}>+30 XP (+50 if goal hit)</span></label>
            <input
              type="number"
              min="0"
              max="300"
              placeholder="e.g. 64"
              value={water}
              onChange={e => setWater(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Workouts */}
          <div>
            <label style={{ ...labelStyle, marginBottom: '10px' }}>WORKOUTS</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { type: 'walk',  label: 'Walk',  xp: '+100', icon: <Footprints size={18} /> },
                { type: 'run',   label: 'Run',   xp: '+200', icon: <Zap size={18} /> },
                { type: 'gym',   label: 'Gym',   xp: '+300', icon: <Dumbbell size={18} /> },
                { type: 'bike',  label: 'Bike',  xp: '+150', icon: <Bike size={18} /> },
                { type: 'swim',  label: 'Swim',  xp: '+250', icon: <Waves size={18} /> },
                { type: 'yoga',  label: 'Yoga',  xp: '+80',  icon: <Leaf size={18} /> },
              ].map(({ type, label, xp, icon }) => {
                const active = workouts.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleWorkout(type)}
                    style={{
                      background: active ? 'var(--amber-glow)' : 'var(--surface2)',
                      border: `2px solid ${active ? 'var(--amber)' : 'var(--border)'}`,
                      borderRadius: '10px',
                      padding: '10px 8px',
                      color: active ? 'var(--amber)' : 'var(--muted2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s',
                    }}
                  >
                    {icon}
                    <span style={{ fontWeight: 700, fontSize: '12px' }}>{label}</span>
                    <span style={{ fontSize: '10px', color: active ? 'var(--amber)' : 'var(--muted)' }}>{xp} XP</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={labelStyle}><NotebookPen size={14} /> NOTES <span style={{ color: 'var(--muted)', marginLeft: 'auto', fontWeight: 400, fontSize: '11px' }}>optional</span></label>
            <textarea
              placeholder="How did today feel? Any wins or struggles..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              maxLength={280}
              rows={2}
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: '64px',
                lineHeight: 1.5,
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: editMode
                ? 'var(--surface2)'
                : 'linear-gradient(135deg, var(--amber-dim), var(--amber))',
              border: editMode ? '1px solid var(--border)' : 'none',
              color: editMode ? 'var(--text)' : '#000',
              fontWeight: 800,
              fontSize: '15px',
              padding: '13px',
              borderRadius: '10px',
              marginTop: '4px',
              letterSpacing: '0.04em',
            }}
          >
            {editMode ? 'SAVE CHANGES' : 'FORGE IT — EARN XP'}
          </button>
        </form>
      </div>
    </div>
  );
}
