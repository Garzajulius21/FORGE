import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

function QuestCard({ quest, weekly }) {
  const done = quest.completed;
  const prevDone = useRef(done);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!prevDone.current && done) {
      setBurst(true);
      setTimeout(() => setBurst(false), 700);
    }
    prevDone.current = done;
  }, [done]);

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      padding: '11px 12px',
      background: done
        ? 'linear-gradient(135deg, rgba(34,197,94,0.07) 0%, rgba(34,197,94,0.03) 100%)'
        : 'var(--surface2)',
      border: `1px solid ${done ? 'rgba(34,197,94,0.28)' : 'var(--border)'}`,
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
    }}>

      {/* Completion burst flash */}
      {burst && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(34,197,94,0.18)',
          animation: 'fadeIn 0.1s ease, pulse 0.6s ease',
          borderRadius: '8px',
          pointerEvents: 'none',
        }} />
      )}

      {/* Left accent bar */}
      {done && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '3px',
          background: 'linear-gradient(180deg, #22c55e, #16a34a)',
          borderRadius: '8px 0 0 8px',
        }} />
      )}

      {/* Check icon */}
      <div style={{
        color: done ? 'var(--green)' : 'var(--muted)',
        marginTop: '1px',
        flexShrink: 0,
        transition: 'color 0.3s ease',
        filter: burst ? 'drop-shadow(0 0 6px rgba(34,197,94,0.8))' : 'none',
      }}>
        {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: done ? 'var(--muted)' : 'var(--text)',
          textDecoration: done ? 'line-through' : 'none',
          transition: 'color 0.3s ease',
        }}>
          {quest.label}
        </div>

        {/* Weekly progress bar */}
        {weekly && !done && (
          <div style={{ marginTop: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>
              <span>{quest.progress || 0} / {quest.target}</span>
              <span>{Math.round(((quest.progress || 0) / quest.target) * 100)}%</span>
            </div>
            <div style={{ height: '6px', background: 'var(--surface)', borderRadius: '99px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(((quest.progress || 0) / quest.target) * 100, 100)}%`,
                background: 'linear-gradient(90deg, #d97706, #f59e0b)',
                borderRadius: '99px',
                transition: 'width 0.5s ease',
                boxShadow: '0 0 6px rgba(245,158,11,0.4)',
              }} />
            </div>
          </div>
        )}
      </div>

      {/* XP badge */}
      <div style={{
        fontSize: '11px',
        fontWeight: 800,
        color: done ? 'var(--green)' : 'var(--amber)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        background: done ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
        border: `1px solid ${done ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.25)'}`,
        borderRadius: '5px',
        padding: '2px 7px',
        transition: 'all 0.3s ease',
        fontFamily: 'var(--font-display)',
        letterSpacing: '0.04em',
      }}>
        {done ? '✓' : '+'}{quest.xp} XP
      </div>
    </div>
  );
}

export default function QuestPanel({ dailyQuests, weeklyQuests }) {
  const doneDaily  = dailyQuests.quests.filter(q => q.completed).length;
  const doneWeekly = weeklyQuests.quests.filter(q => q.completed).length;
  const totalDaily  = dailyQuests.quests.length;
  const totalWeekly = weeklyQuests.quests.length;

  const PanelHeader = ({ title, done, total, resetsLabel }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--amber)', marginBottom: '2px' }}>
          {title}
        </h3>
        <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{resetsLabel}</div>
      </div>
      {/* Mini progress pills */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: '18px', height: '5px',
            borderRadius: '99px',
            background: i < done ? 'var(--green)' : 'var(--border)',
            transition: 'background 0.3s ease',
            boxShadow: i < done ? '0 0 4px rgba(34,197,94,0.5)' : 'none',
          }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid-quests" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

      {/* Daily */}
      <div className="card" style={{ padding: '16px' }}>
        <PanelHeader title="DAILY QUESTS" done={doneDaily} total={totalDaily} resetsLabel="Resets at midnight" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {dailyQuests.quests.map(q => <QuestCard key={q.id} quest={q} />)}
        </div>
        {doneDaily === totalDaily && totalDaily > 0 && (
          <div style={{
            marginTop: '12px',
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--green)',
            padding: '6px',
            background: 'rgba(34,197,94,0.06)',
            borderRadius: '6px',
            border: '1px solid rgba(34,197,94,0.2)',
          }}>
            ALL DAILY QUESTS COMPLETE ⚔️
          </div>
        )}
      </div>

      {/* Weekly */}
      <div className="card" style={{ padding: '16px' }}>
        <PanelHeader title="WEEKLY QUESTS" done={doneWeekly} total={totalWeekly} resetsLabel="Resets every Monday" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {weeklyQuests.quests.map(q => <QuestCard key={q.id} quest={q} weekly />)}
        </div>
        {doneWeekly === totalWeekly && totalWeekly > 0 && (
          <div style={{
            marginTop: '12px',
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--green)',
            padding: '6px',
            background: 'rgba(34,197,94,0.06)',
            borderRadius: '6px',
            border: '1px solid rgba(34,197,94,0.2)',
          }}>
            ALL WEEKLY QUESTS COMPLETE ⚔️
          </div>
        )}
      </div>
    </div>
  );
}
