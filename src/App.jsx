import { useState, useEffect, useRef } from 'react';
import { useForge } from './hooks/useForge';
import XPBar from './components/XPBar';
import LogModal from './components/LogModal';
import MilestoneToast from './components/MilestoneToast';
import QuestPanel from './components/QuestPanel';
import MilestonePath from './components/MilestonePath';
import ActivityFeed from './components/ActivityFeed';
import WeightChart from './components/WeightChart';
import { Plus, LayoutDashboard, Map, Activity, History, Settings, Download, Upload } from 'lucide-react';
import { START_WEIGHT, GOAL_WEIGHT, DAILY_GOALS } from './data/constants';
import HistoryTab from './components/HistoryTab';
import QuickLog from './components/QuickLog';
import SettingsModal from './components/SettingsModal';
import ProfileSetup from './components/ProfileSetup';
import LevelUpOverlay from './components/LevelUpOverlay';
import ForgeFire from './components/ForgeFire';
import ForgeWarrior from './components/ForgeWarrior';
import ForgeWarriorImage from './components/ForgeWarriorImage';
import FloatingXP from './components/FloatingXP';

const TABS = ['Dashboard', 'Milestones', 'Activity', 'History'];

function StatCard({ label, value, sub, color, accent }) {
  return (
    <div className="card" style={{ padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
      {/* Colored accent bar at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: accent || color || 'var(--border)',
        opacity: 0.85,
      }} />
      <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px', fontFamily:'var(--font-display)' }}>{label}</div>
      <div style={{ fontSize: '30px', fontWeight: 800, color: color || 'var(--text)', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>{sub}</div>}
    </div>
  );
}

function TodaySummary({ todayLog, userGoals }) {
  if (!todayLog) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #13100a 0%, #0e0d10 100%)',
        border: '1px dashed rgba(245,158,11,0.2)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '28px', opacity: 0.5 }}>⚔️</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--amber)', opacity: 0.7 }}>
          NO DEEDS RECORDED
        </div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
          Log today to earn XP and<br />keep your streak alive.
        </div>
      </div>
    );
  }

  const items = [
    todayLog.weight   && { label: 'Weight',   value: `${todayLog.weight} lbs` },
    todayLog.calories && { label: 'Calories',  value: `${todayLog.calories.toLocaleString()} kcal`, alert: todayLog.calories > userGoals.calories },
    todayLog.water    && { label: 'Water',     value: `${todayLog.water} oz`, good: todayLog.water >= userGoals.water },
    ...(todayLog.workouts || []).map(w => ({ label: 'Workout', value: w === 'gym' ? '🏋️ Gym' : '🚶 Walk' })),
  ].filter(Boolean);

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '14px 20px',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '12px' }}>
        TODAY'S LOG
      </div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {items.map((item, i) => (
          <div key={i}>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px' }}>{item.label}</div>
            <div style={{
              fontSize: '14px',
              fontWeight: 700,
              color: item.alert ? 'var(--red)' : item.good ? 'var(--green)' : 'var(--text)',
            }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const { state, levelInfo, currentTitle, lostSoFar, toGoal, userGoals, logDay, quickLog, saveGoals, completeProfile, reopenProfile, editLog, dismissMilestone } = useForge();
  const [showLog, setShowLog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [levelUpData, setLevelUpData] = useState(null);
  const [floatingXPs, setFloatingXPs] = useState([]);
  const prevLevel = useRef(levelInfo.level);
  const prevXP    = useRef(state.totalXP);
  const prevTitle = useRef(currentTitle);

  // Detect level up
  useEffect(() => {
    if (levelInfo.level > prevLevel.current) {
      setLevelUpData({
        level: levelInfo.level,
        title: currentTitle,
        titleChanged: currentTitle !== prevTitle.current,
      });
    }
    prevLevel.current = levelInfo.level;
    prevTitle.current = currentTitle;
  }, [levelInfo.level, currentTitle]);

  // Detect XP gain → floating number
  useEffect(() => {
    const diff = state.totalXP - prevXP.current;
    if (diff > 0) {
      const id = Date.now();
      setFloatingXPs(prev => [...prev, { id, amount: diff }]);
      setTimeout(() => setFloatingXPs(prev => prev.filter(x => x.id !== id)), 1500);
    }
    prevXP.current = state.totalXP;
  }, [state.totalXP]);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = state.logs.find(l => l.date === todayStr);

  const lostPct = Math.min((lostSoFar / (START_WEIGHT - GOAL_WEIGHT)) * 100, 100);

  const tabIcon = { Dashboard: <LayoutDashboard size={15} />, Milestones: <Map size={15} />, Activity: <Activity size={15} />, History: <History size={15} /> };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>⚒️</span>
          <div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize: '22px', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--amber)', lineHeight: 1, textShadow:'0 0 20px rgba(245,158,11,0.4)' }}>FORGE</h1>
            <div style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.04em' }}>Build the best version of you</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Export save */}
          <button
            onClick={() => {
              const data = localStorage.getItem('forge_data');
              if (!data) return;
              const blob = new Blob([data], { type: 'application/json' });
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = `forge-save-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            title="Export save file"
            style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'9px', padding:'9px', color:'var(--muted)', display:'flex', alignItems:'center' }}
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            title="Settings"
            style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: '9px',
              padding: '9px',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Settings size={16} />
          </button>
          <button
            onClick={() => setShowLog(true)}
            style={{
              background: 'linear-gradient(135deg, var(--amber-dim), var(--amber))',
              color: '#000',
              fontWeight: 800,
              fontSize: '13px',
              padding: '9px 18px',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.04em',
            }}
          >
            <Plus size={15} /> LOG TODAY
          </button>
        </div>
      </div>

      {/* XP Bar */}
      <XPBar levelInfo={levelInfo} totalXP={state.totalXP} streak={state.streak} currentTitle={currentTitle} />

      {/* Tabs */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        display: 'flex',
        gap: '0',
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: 700,
              color: activeTab === tab ? 'var(--amber)' : 'var(--muted)',
              borderBottom: `2px solid ${activeTab === tab ? 'var(--amber)' : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.15s',
              letterSpacing: '0.04em',
            }}
          >
            {tabIcon[tab]} <span className="tab-label">{tab}</span>
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="main-pad" style={{ flex: 1, padding: '20px 24px', maxWidth: '1100px', width: '100%', margin: '0 auto' }}>

        {activeTab === 'Dashboard' && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Stat cards */}
            <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <StatCard
                label="CURRENT WEIGHT"
                value={`${state.profile.currentWeight} lbs`}
                sub={`Started at ${START_WEIGHT} lbs`}
                color="var(--text)"
                accent="#94a3b8"
              />
              <StatCard
                label="LOST SO FAR"
                value={lostSoFar > 0 ? `−${lostSoFar} lbs` : '0 lbs'}
                sub={`${lostPct.toFixed(1)}% of goal`}
                color={lostSoFar > 0 ? 'var(--green)' : 'var(--muted)'}
                accent="var(--green)"
              />
              <StatCard
                label="TO GOAL"
                value={toGoal > 0 ? `${toGoal} lbs` : 'ACHIEVED!'}
                sub={`Goal: ${GOAL_WEIGHT} lbs`}
                color={toGoal <= 0 ? 'var(--amber)' : 'var(--text)'}
                accent="var(--amber)"
              />
              <StatCard
                label="TOTAL XP"
                value={state.totalXP.toLocaleString()}
                sub={`Level ${levelInfo.level}`}
                color="#a78bfa"
                accent="#a78bfa"
              />
            </div>

            {/* Progress bar (weight) */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--amber)' }}>JOURNEY PROGRESS</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{lostSoFar} lbs lost · {(START_WEIGHT - GOAL_WEIGHT - lostSoFar)} lbs to go</span>
              </div>
              <div style={{ position: 'relative', height: '22px', background: 'var(--surface2)', borderRadius: '99px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{
                  height: '100%',
                  width: `${lostPct}%`,
                  background: 'linear-gradient(90deg, #15803d, #16a34a, #22c55e)',
                  borderRadius: '99px',
                  transition: 'width 0.6s ease',
                  boxShadow: '0 0 14px rgba(34,197,94,0.5)',
                  minWidth: lostPct > 0 ? '6px' : '0',
                  position: 'relative',
                }}>
                  {lostPct > 8 && (
                    <span style={{
                      position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                      fontSize: '11px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em',
                    }}>{lostPct.toFixed(0)}%</span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>
                <span>{START_WEIGHT} lbs — Start</span>
                <span style={{ color: 'var(--amber)', fontWeight: 600 }}>{GOAL_WEIGHT} lbs — FORGED ⚒️</span>
              </div>
            </div>

            {/* Hero panel — warrior standing in front of forge */}
            <div className="card-amber hero-panel" style={{
              padding: '20px 28px 16px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '260px',
            }}>
              {/* Deep background glow — centered where forge is */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 110%, rgba(245,120,11,0.14) 0%, rgba(180,60,11,0.05) 40%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              {/* Top edge highlight */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.35), transparent)',
                pointerEvents: 'none',
              }} />

              {/* Forge fire — left side */}
              <div style={{ position: 'relative', zIndex: 1, paddingBottom: '28px' }}>
                <ForgeFire progress={lostPct / 100} />
              </div>

              {/* Warrior — absolutely centered in the panel */}
              <div style={{
                position: 'absolute',
                left: '50%',
                bottom: '28px',
                transform: 'translateX(-50%)',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <ForgeWarriorImage title={currentTitle} size={150} />
              </div>

              {/* Stats column */}
              <div className="hero-stats" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                alignItems: 'flex-end',
                paddingBottom: '16px',
                position: 'relative',
                zIndex: 1,
              }}>
                {[
                  { label: 'WARRIOR', value: currentTitle, color: 'var(--amber)' },
                  { label: 'LOST SO FAR', value: lostSoFar > 0 ? `−${lostSoFar} lbs` : '—', color: lostSoFar > 0 ? 'var(--green)' : 'var(--muted)' },
                  { label: 'TO GOAL', value: toGoal > 0 ? `${toGoal} lbs` : '🏆 DONE', color: toGoal <= 0 ? 'var(--amber)' : 'var(--text)' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{
                    borderRight: '2px solid rgba(245,158,11,0.2)',
                    paddingRight: '12px',
                    textAlign: 'right',
                  }}>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '3px' }}>{label}</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick log */}
            <QuickLog todayLog={todayLog} userGoals={userGoals} onQuickLog={quickLog} />

            {/* Today + Chart */}
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <TodaySummary todayLog={todayLog} userGoals={userGoals} />
              </div>
              <div className="card" style={{ padding: '16px 20px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '10px' }}>
                  WEIGHT TREND — LAST 30 DAYS
                </div>
                <WeightChart logs={state.logs} />
              </div>
            </div>

            {/* Quests */}
            <QuestPanel dailyQuests={state.dailyQuests} weeklyQuests={state.weeklyQuests} />

          </div>
        )}

        {activeTab === 'Milestones' && (
          <div className="fade-in">
            <MilestonePath
              currentWeight={state.profile.currentWeight}
              unlockedMilestones={state.unlockedMilestones}
              startWeight={state.profile.startWeight}
              goalWeight={state.profile.goalWeight}
            />
          </div>
        )}

        {activeTab === 'Activity' && (
          <div className="fade-in">
            <ActivityFeed activities={state.activities} />
          </div>
        )}

        {activeTab === 'History' && (
          <div className="fade-in">
            <HistoryTab logs={state.logs} onEdit={editLog} />
          </div>
        )}
      </div>

      {/* Modals */}
      {showLog && (
        <LogModal
          onClose={() => setShowLog(false)}
          onSubmit={logDay}
          todayLog={todayLog}
        />
      )}

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          userGoals={userGoals}
          onSave={saveGoals}
          onEditProfile={() => { setShowSettings(false); reopenProfile(); }}
        />
      )}

      {!state.profileComplete && (
        <ProfileSetup
          onComplete={completeProfile}
          existingProfile={state.userProfile}
        />
      )}

      <MilestoneToast milestone={state.newMilestone} onDismiss={dismissMilestone} />
      <LevelUpOverlay data={levelUpData} onDismiss={() => setLevelUpData(null)} />
      <FloatingXP items={floatingXPs} />
    </div>
  );
}
