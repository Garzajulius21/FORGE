import { useState } from 'react';
import { ChevronRight, ChevronLeft, Flame, Droplets, TrendingDown } from 'lucide-react';
import { ACTIVITY_LEVELS, WEEKLY_GOALS, getRecommendations } from '../data/calculations';

const STEPS = ['About You', 'Your Goal', 'Your Plan'];

export default function ProfileSetup({ onComplete, existingProfile }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(existingProfile || {
    name: '',
    age: 29,
    heightFt: 6,
    heightIn: 0,
    sex: 'male',
    weightLbs: 290,
    goalWeight: 200,
    activityLevel: 'lightly_active',
    weeklyGoal: 1.0,
  });

  function set(key, val) {
    setProfile(prev => ({ ...prev, [key]: val }));
  }

  const recs = getRecommendations(profile);

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
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--muted2)',
    letterSpacing: '0.06em',
    marginBottom: '6px',
  };

  function OptionButton({ active, onClick, children, sub }) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          width: '100%',
          background: active ? 'var(--amber-glow)' : 'var(--surface2)',
          border: `2px solid ${active ? 'var(--amber)' : 'var(--border)'}`,
          borderRadius: '10px',
          padding: '12px 16px',
          color: active ? 'var(--amber)' : 'var(--text)',
          textAlign: 'left',
          transition: 'all 0.15s',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: '14px' }}>{children}</div>
        {sub && <div style={{ fontSize: '12px', color: active ? 'var(--amber-dim)' : 'var(--muted)', marginTop: '2px' }}>{sub}</div>}
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000, padding: '20px',
    }}>
      <div className="slide-up" style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '480px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚒️</div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--amber)', letterSpacing: '0.06em' }}>FORGE</h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Let's set up your profile</p>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{
                height: '4px',
                borderRadius: '2px',
                background: i <= step ? 'var(--amber)' : 'var(--border)',
                transition: 'background 0.3s',
              }} />
              <div style={{ fontSize: '10px', color: i === step ? 'var(--amber)' : 'var(--muted)', marginTop: '4px', fontWeight: 700, letterSpacing: '0.04em' }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Step 1 — About You */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>NAME (optional)</label>
              <input type="text" placeholder="e.g. Julius" value={profile.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>AGE</label>
                <input type="number" min="13" max="100" value={profile.age} onChange={e => set('age', parseInt(e.target.value))} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>SEX</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {['male','female'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set('sex', s)}
                      style={{
                        padding: '10px',
                        background: profile.sex === s ? 'var(--amber-glow)' : 'var(--surface2)',
                        border: `2px solid ${profile.sex === s ? 'var(--amber)' : 'var(--border)'}`,
                        borderRadius: '8px',
                        color: profile.sex === s ? 'var(--amber)' : 'var(--text)',
                        fontWeight: 700,
                        fontSize: '13px',
                        textTransform: 'capitalize',
                      }}
                    >{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label style={labelStyle}>HEIGHT</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <input type="number" min="4" max="8" value={profile.heightFt} onChange={e => set('heightFt', parseInt(e.target.value))} style={inputStyle} />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: '13px' }}>ft</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <input type="number" min="0" max="11" value={profile.heightIn} onChange={e => set('heightIn', parseInt(e.target.value))} style={inputStyle} />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: '13px' }}>in</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Your Goal */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>CURRENT WEIGHT (lbs)</label>
                <input type="number" min="80" max="700" value={profile.weightLbs} onChange={e => set('weightLbs', parseFloat(e.target.value))} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>GOAL WEIGHT (lbs)</label>
                <input type="number" min="80" max="700" value={profile.goalWeight} onChange={e => set('goalWeight', parseFloat(e.target.value))} style={inputStyle} />
              </div>
            </div>
            <div style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '14px 16px',
            }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>JOURNEY OVERVIEW</div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>To lose</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--amber)' }}>{Math.max(0, profile.weightLbs - profile.goalWeight)} lbs</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>At 1 lb/week</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>~{Math.round(Math.max(0, profile.weightLbs - profile.goalWeight))} weeks</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>At 2 lbs/week</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>~{Math.round(Math.max(0, profile.weightLbs - profile.goalWeight) / 2)} weeks</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Your Plan */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ ...labelStyle, marginBottom: '10px' }}>ACTIVITY LEVEL</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ACTIVITY_LEVELS.map(l => (
                  <OptionButton key={l.id} active={profile.activityLevel === l.id} onClick={() => set('activityLevel', l.id)} sub={l.sub}>
                    {l.label}
                  </OptionButton>
                ))}
              </div>
            </div>

            <div>
              <label style={{ ...labelStyle, marginBottom: '10px' }}>WEEKLY LOSS GOAL</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {WEEKLY_GOALS.map(g => (
                  <OptionButton key={g.value} active={profile.weeklyGoal === g.value} onClick={() => set('weeklyGoal', g.value)} sub={g.sub}>
                    {g.label}
                  </OptionButton>
                ))}
              </div>
            </div>

            {/* Calculated results */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1200, #1c1c22)',
              border: '1px solid var(--amber)',
              borderRadius: '12px',
              padding: '18px',
            }}>
              <div style={{ fontSize: '11px', color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '14px' }}>
                YOUR CALCULATED TARGETS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Flame size={20} color="var(--red)" />
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)' }}>{recs.calories.toLocaleString()}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>cal/day target</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Droplets size={20} color="var(--blue)" />
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)' }}>{recs.water}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>oz water/day</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TrendingDown size={20} color="var(--green)" />
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text)' }}>{recs.tdee.toLocaleString()}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>TDEE (maintenance)</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--amber)' }}>{profile.weeklyGoal} lb</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>loss per week</div>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                You can override these in Settings at any time.
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '28px' }}>
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '12px 20px',
                color: 'var(--text)',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}
          <button
            onClick={() => {
              if (step < STEPS.length - 1) {
                setStep(s => s + 1);
              } else {
                onComplete(profile, recs);
              }
            }}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, var(--amber-dim), var(--amber))',
              color: '#000',
              fontWeight: 800,
              fontSize: '14px',
              padding: '13px',
              borderRadius: '10px',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            {step < STEPS.length - 1 ? (
              <><span>Next</span><ChevronRight size={16} /></>
            ) : (
              '⚒️ START FORGING'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
