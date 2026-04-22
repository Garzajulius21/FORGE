import { useState } from 'react';
import { Droplets, Flame, Plus } from 'lucide-react';

export default function QuickLog({ todayLog, userGoals, onQuickLog }) {
  const [calorieInput, setCalorieInput] = useState('');

  const currentWater    = todayLog?.water    || 0;
  const currentCalories = todayLog?.calories || 0;
  const waterPct    = Math.min((currentWater / userGoals.water) * 100, 100);
  const caloriePct  = Math.min((currentCalories / userGoals.calories) * 100, 100);
  const waterDone   = currentWater >= userGoals.water;
  const calorieDone = currentCalories > 0 && currentCalories <= userGoals.calories;

  function addWater(oz) {
    onQuickLog({ addWater: oz });
  }

  function addCalories(e) {
    e.preventDefault();
    const val = parseInt(calorieInput);
    if (!val || val <= 0) return;
    onQuickLog({ addCalories: val });
    setCalorieInput('');
  }

  const barStyle = (pct, done, over) => ({
    height: '12px',
    background: 'var(--surface2)',
    borderRadius: '99px',
    overflow: 'hidden',
    border: '1px solid var(--border)',
    marginTop: '6px',
    marginBottom: '10px',
  });

  const fillStyle = (pct, done, over) => ({
    height: '100%',
    width: `${pct}%`,
    background: over ? 'var(--red)' : done ? 'var(--green)' : 'var(--amber)',
    borderRadius: '99px',
    transition: 'width 0.4s ease',
  });

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '16px 20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    }}>

      {/* Water */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <Droplets size={14} color="var(--blue)" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em' }}>WATER TODAY</span>
          <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: waterDone ? 'var(--green)' : 'var(--text)' }}>
            {currentWater} / {userGoals.water} oz
          </span>
        </div>
        <div style={barStyle()}>
          <div style={fillStyle(waterPct, waterDone, false)} />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[8, 16, 24, 32].map(oz => (
            <button
              key={oz}
              onClick={() => addWater(oz)}
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '5px 10px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--blue)',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--surface2)'}
            >
              <Plus size={10} />+{oz}oz
            </button>
          ))}
        </div>
      </div>

      {/* Calories */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <Flame size={14} color="var(--red)" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em' }}>CALORIES TODAY</span>
          <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: currentCalories > userGoals.calories ? 'var(--red)' : calorieDone ? 'var(--green)' : 'var(--text)' }}>
            {currentCalories.toLocaleString()} / {userGoals.calories.toLocaleString()} kcal
          </span>
        </div>
        <div style={barStyle()}>
          <div style={fillStyle(caloriePct, calorieDone, currentCalories > userGoals.calories)} />
        </div>
        <form onSubmit={addCalories} style={{ display: 'flex', gap: '6px' }}>
          <input
            type="number"
            min="1"
            max="5000"
            placeholder="Add meal calories..."
            value={calorieInput}
            onChange={e => setCalorieInput(e.target.value)}
            style={{
              flex: 1,
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '5px 10px',
              color: 'var(--text)',
              fontSize: '12px',
              outline: 'none',
              minWidth: 0,
            }}
          />
          <button
            type="submit"
            style={{
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--red)',
              whiteSpace: 'nowrap',
            }}
          >
            + Add
          </button>
        </form>
      </div>
    </div>
  );
}
