import { useState, useCallback } from 'react';
import { MILESTONES, LEVELS, START_WEIGHT, GOAL_WEIGHT, DAILY_GOALS, XP_VALUES, DAILY_QUEST_POOL, WEEKLY_QUEST_POOL } from '../data/constants';
import { getRecommendations } from '../data/calculations';

const STORAGE_KEY = 'forge_data';

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function weekStart() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split('T')[0];
}

function getLevel(totalXP) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].xpRequired) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
      break;
    }
  }
  const xpIntoLevel = totalXP - current.xpRequired;
  const xpForNext = next ? next.xpRequired - current.xpRequired : 1;
  const progress = next ? Math.min(xpIntoLevel / xpForNext, 1) : 1;
  return { level: current.level, name: current.name, progress, xpIntoLevel, xpForNext, next };
}

function getCurrentTitle(currentWeight) {
  const passed = MILESTONES.filter(m => currentWeight <= m.weight);
  if (passed.length === 0) return MILESTONES[0].title;
  return passed[passed.length - 1].title;
}

function getUnlockedMilestones(currentWeight) {
  return MILESTONES.filter(m => currentWeight <= m.weight).map(m => m.id);
}

function pickDailyQuests() {
  const shuffled = [...DAILY_QUEST_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(q => ({ ...q, completed: false }));
}

function pickWeeklyQuests() {
  const shuffled = [...WEEKLY_QUEST_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(q => ({ ...q, progress: 0, completed: false }));
}

function defaultState() {
  return {
    profile: {
      startWeight: START_WEIGHT,
      goalWeight: GOAL_WEIGHT,
      currentWeight: START_WEIGHT,
      startDate: todayStr(),
    },
    userProfile: null,
    profileComplete: false,
    goals: {
      calories: DAILY_GOALS.calories,
      water: DAILY_GOALS.water,
    },
    totalXP: 0,
    streak: 0,
    streakShields: 1,
    lastShieldWeek: weekStart(),
    lastLogDate: null,
    logs: [],
    activities: [],
    dailyQuests: { date: todayStr(), quests: pickDailyQuests() },
    weeklyQuests: { week: weekStart(), quests: pickWeeklyQuests() },
    unlockedMilestones: ['start'],
    newMilestone: null,
    recalcDismissedAtWeight: null,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return JSON.parse(raw);
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useForge() {
  const [state, setStateRaw] = useState(loadState);

  const setState = useCallback((updater) => {
    setStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  }, []);

  // Refresh quests + streak shield if day/week has changed
  const refreshedState = (() => {
    const today = todayStr();
    const week = weekStart();
    let s = state;
    let changed = false;

    if (s.dailyQuests.date !== today) {
      s = { ...s, dailyQuests: { date: today, quests: pickDailyQuests() } };
      changed = true;
    }
    if (s.weeklyQuests.week !== week) {
      s = { ...s, weeklyQuests: { week, quests: pickWeeklyQuests() } };
      changed = true;
    }
    // Replenish 1 streak shield at the start of each new week
    if ((s.lastShieldWeek || '') !== week && s.streakShields < 1) {
      s = { ...s, streakShields: 1, lastShieldWeek: week };
      changed = true;
    }
    if (changed) {
      saveState(s);
      setTimeout(() => setStateRaw(s), 0);
    }
    return s;
  })();

  function addXP(amount, label) {
    setState(prev => {
      const totalXP = prev.totalXP + amount;
      const activity = { id: Date.now(), label, xp: amount, date: todayStr(), ts: Date.now() };
      return {
        ...prev,
        totalXP,
        activities: [activity, ...prev.activities].slice(0, 100),
      };
    });
  }

  function logDay({ weight, calories, water, workouts = [], notes = '' }) {
    setState(prev => {
      const today = todayStr();
      let xpEarned = 0;
      const xpEvents = [];

      // Streak + shield logic
      let streak = prev.streak;
      let streakShields = prev.streakShields ?? 1;
      if (prev.lastLogDate === today) {
        // already logged today, just update — no streak change
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split('T')[0];
        const dayBefore = new Date();
        dayBefore.setDate(dayBefore.getDate() - 2);
        const dbStr = dayBefore.toISOString().split('T')[0];

        if (prev.lastLogDate === yStr) {
          // Logged yesterday — normal streak increment
          streak = streak + 1;
        } else if (prev.lastLogDate === dbStr && streakShields > 0) {
          // Missed exactly 1 day — consume a shield, keep streak alive
          streak = streak + 1;
          streakShields = streakShields - 1;
          xpEvents.push({ label: 'Streak shield used — streak saved!', xp: 0 });
        } else if (prev.lastLogDate !== today) {
          streak = 1;
        }
      }

      // Only award XP for things not already logged today
      const existing = prev.logs.find(l => l.date === today);
      const alreadyLogged = prev.lastLogDate === today;

      if (weight && !existing?.weight) { xpEarned += XP_VALUES.LOG_WEIGHT; xpEvents.push({ label: 'Logged weight', xp: XP_VALUES.LOG_WEIGHT }); }
      if (water && !existing?.water)   { xpEarned += XP_VALUES.LOG_WATER;  xpEvents.push({ label: 'Logged water',  xp: XP_VALUES.LOG_WATER }); }
      if (calories && !existing?.calories) { xpEarned += XP_VALUES.LOG_CALORIES; xpEvents.push({ label: 'Logged calories', xp: XP_VALUES.LOG_CALORIES }); }

      const prevHitCalGoal = existing?.calories && existing.calories <= DAILY_GOALS.calories;
      if (calories && calories <= DAILY_GOALS.calories && !prevHitCalGoal) {
        xpEarned += XP_VALUES.HIT_CALORIE_GOAL;
        xpEvents.push({ label: 'Hit calorie goal', xp: XP_VALUES.HIT_CALORIE_GOAL });
      }

      const prevHitWaterGoal = existing?.water && existing.water >= DAILY_GOALS.water;
      if (water && water >= DAILY_GOALS.water && !prevHitWaterGoal) {
        xpEarned += XP_VALUES.HIT_WATER_GOAL;
        xpEvents.push({ label: 'Hit water goal', xp: XP_VALUES.HIT_WATER_GOAL });
      }

      const WORKOUT_XP = {
        gym: XP_VALUES.GYM, walk: XP_VALUES.WALK, run: XP_VALUES.RUN,
        swim: XP_VALUES.SWIM, bike: XP_VALUES.BIKE, yoga: XP_VALUES.YOGA,
      };
      const WORKOUT_LABEL = {
        gym: 'Gym session', walk: 'Walk logged', run: 'Run logged',
        swim: 'Swim logged', bike: 'Bike ride logged', yoga: 'Yoga session',
      };
      workouts.forEach(w => {
        const alreadyDone = existing?.workouts?.includes(w);
        if (alreadyDone) return;
        const val = WORKOUT_XP[w] ?? XP_VALUES.WALK;
        xpEarned += val;
        xpEvents.push({ label: WORKOUT_LABEL[w] ?? `${w} logged`, xp: val });
      });

      // Streak bonuses
      if (streak === 7)  { xpEarned += XP_VALUES.STREAK_7;  xpEvents.push({ label: '7-day streak bonus!', xp: XP_VALUES.STREAK_7 }); }
      if (streak === 30) { xpEarned += XP_VALUES.STREAK_30; xpEvents.push({ label: '30-day streak bonus!', xp: XP_VALUES.STREAK_30 }); }

      const totalXP = prev.totalXP + xpEarned;

      // Update log entry for today
      const existingIdx = prev.logs.findIndex(l => l.date === today);
      const logEntry = { date: today, weight, calories, water, workouts, notes };
      const logs = existingIdx >= 0
        ? prev.logs.map((l, i) => i === existingIdx ? logEntry : l)
        : [logEntry, ...prev.logs];

      // Milestones
      const currentWeight = weight || prev.profile.currentWeight;
      const newUnlocked = getUnlockedMilestones(currentWeight);
      const prevUnlocked = prev.unlockedMilestones || ['start'];
      const justUnlocked = newUnlocked.filter(id => !prevUnlocked.includes(id));
      const newMilestone = justUnlocked.length > 0
        ? MILESTONES.find(m => m.id === justUnlocked[justUnlocked.length - 1])
        : null;

      // Activities
      const newActivities = xpEvents.map((e, i) => ({
        id: Date.now() + i,
        label: e.label,
        xp: e.xp,
        date: today,
        ts: Date.now() + i,
      }));

      // Update quest progress and collect any XP rewards
      const { updatedDQ, xpAwarded: dqXP, xpEvents: dqEvents } = updateDailyQuestProgress(prev.dailyQuests, { weight, calories, water, workouts });
      const { updatedWQ, xpAwarded: wqXP, xpEvents: wqEvents } = updateWeeklyQuestProgress(prev.weeklyQuests, logs, { weight, calories, water, workouts }, streak);

      const questXP = dqXP + wqXP;
      const finalXP = totalXP + questXP;

      const questActivities = [...dqEvents, ...wqEvents].map((e, i) => ({
        id: Date.now() + 1000 + i,
        label: e.label,
        xp: e.xp,
        date: today,
        ts: Date.now() + 1000 + i,
      }));

      return {
        ...prev,
        totalXP: finalXP,
        streak,
        streakShields,
        lastLogDate: today,
        logs,
        activities: [...questActivities, ...newActivities, ...prev.activities].slice(0, 100),
        profile: { ...prev.profile, currentWeight: weight || prev.profile.currentWeight },
        unlockedMilestones: newUnlocked,
        newMilestone,
        dailyQuests: updatedDQ,
        weeklyQuests: updatedWQ,
      };
    });
  }

  function updateDailyQuestProgress(dq, { weight, calories, water, workouts }) {
    let xpAwarded = 0;
    const xpEvents = [];
    const quests = dq.quests.map(q => {
      if (q.completed) return q;
      let completed = false;
      switch (q.type) {
        case 'log_weight':    completed = !!weight; break;
        case 'log_calories':  completed = !!calories; break;
        case 'hit_calories':  completed = !!(calories && calories <= DAILY_GOALS.calories); break;
        case 'hit_water':     completed = !!(water && water >= DAILY_GOALS.water); break;
        case 'big_water':     completed = !!(water && water >= 80); break;
        case 'walk':          completed = workouts.includes('walk'); break;
        case 'gym':           completed = workouts.includes('gym'); break;
        case 'run':           completed = workouts.includes('run'); break;
        case 'swim':          completed = workouts.includes('swim'); break;
        case 'bike':          completed = workouts.includes('bike'); break;
        case 'yoga':          completed = workouts.includes('yoga'); break;
        case 'any_workout':   completed = workouts.length > 0; break;
        case 'two_workouts':  completed = workouts.length >= 2; break;
        case 'weight_and_cals': completed = !!weight && !!calories; break;
        case 'log_all':       completed = !!weight && !!calories && !!water; break;
        default: break;
      }
      if (completed) {
        xpAwarded += q.xp;
        xpEvents.push({ label: `Quest complete: ${q.label}`, xp: q.xp });
      }
      return { ...q, completed };
    });
    return { updatedDQ: { ...dq, quests }, xpAwarded, xpEvents };
  }

  function updateWeeklyQuestProgress(wq, logs, today, streak) {
    let xpAwarded = 0;
    const xpEvents = [];
    const weekLogs = logs.filter(l => l.date >= weekStart());
    const quests = wq.quests.map(q => {
      if (q.completed) return q;
      let progress = 0;
      switch (q.type) {
        case 'weight_logs':      progress = weekLogs.filter(l => l.weight).length; break;
        case 'water_hits':       progress = weekLogs.filter(l => l.water >= DAILY_GOALS.water).length; break;
        case 'gym_visits':       progress = weekLogs.filter(l => l.workouts?.includes('gym')).length; break;
        case 'walk_logs':        progress = weekLogs.filter(l => l.workouts?.includes('walk')).length; break;
        case 'run_logs':         progress = weekLogs.filter(l => l.workouts?.includes('run')).length; break;
        case 'swim_logs':        progress = weekLogs.filter(l => l.workouts?.includes('swim')).length; break;
        case 'yoga_logs':        progress = weekLogs.filter(l => l.workouts?.includes('yoga')).length; break;
        case 'any_workout_logs': progress = weekLogs.filter(l => l.workouts?.length > 0).length; break;
        case 'workout_variety': {
          const types = new Set(weekLogs.flatMap(l => l.workouts || []));
          progress = types.size;
          break;
        }
        case 'calorie_hits':     progress = weekLogs.filter(l => l.calories && l.calories <= DAILY_GOALS.calories).length; break;
        case 'streak':           progress = Math.min(streak, q.target); break;
        case 'full_logs':        progress = weekLogs.filter(l => l.weight && l.calories && l.water).length; break;
        default: break;
      }
      const completed = progress >= q.target;
      if (completed) {
        xpAwarded += q.xp;
        xpEvents.push({ label: `Weekly quest complete: ${q.label}`, xp: q.xp });
      }
      return { ...q, progress, completed };
    });
    return { updatedWQ: { ...wq, quests }, xpAwarded, xpEvents };
  }

  function quickLog({ addWater, addCalories }) {
    setState(prev => {
      const today = todayStr();
      const goals = prev.goals || DAILY_GOALS;
      const existing = prev.logs.find(l => l.date === today) || { date: today, weight: null, calories: null, water: null, workouts: [] };

      const newWater    = addWater    ? (existing.water    || 0) + addWater    : existing.water;
      const newCalories = addCalories ? (existing.calories || 0) + addCalories : existing.calories;

      const logEntry = { ...existing, water: newWater, calories: newCalories };
      const existingIdx = prev.logs.findIndex(l => l.date === today);
      const logs = existingIdx >= 0
        ? prev.logs.map((l, i) => i === existingIdx ? logEntry : l)
        : [logEntry, ...prev.logs];

      // XP for hitting goals (only awarded once)
      let xpEarned = 0;
      const xpEvents = [];
      const prevHitWater = existing.water >= goals.water;
      const prevHitCals  = existing.calories && existing.calories <= goals.calories;

      if (addWater && newWater >= goals.water && !prevHitWater) {
        xpEarned += XP_VALUES.HIT_WATER_GOAL;
        xpEvents.push({ label: 'Hit water goal', xp: XP_VALUES.HIT_WATER_GOAL });
      }
      if (addCalories && newCalories <= goals.calories && !prevHitCals) {
        xpEarned += XP_VALUES.HIT_CALORIE_GOAL;
        xpEvents.push({ label: 'Hit calorie goal', xp: XP_VALUES.HIT_CALORIE_GOAL });
      }

      const newActivities = xpEvents.map((e, i) => ({
        id: Date.now() + i, label: e.label, xp: e.xp, date: today, ts: Date.now() + i,
      }));

      // Update quest progress
      const { updatedDQ, xpAwarded: dqXP, xpEvents: dqEvents } = updateDailyQuestProgress(prev.dailyQuests, { weight: existing.weight, calories: newCalories, water: newWater, workouts: existing.workouts });
      const { updatedWQ, xpAwarded: wqXP, xpEvents: wqEvents } = updateWeeklyQuestProgress(prev.weeklyQuests, logs, {}, prev.streak);

      const questXP = dqXP + wqXP;
      const questActivities = [...dqEvents, ...wqEvents].map((e, i) => ({
        id: Date.now() + 500 + i, label: e.label, xp: e.xp, date: today, ts: Date.now() + 500 + i,
      }));

      return {
        ...prev,
        totalXP: prev.totalXP + xpEarned + questXP,
        logs,
        activities: [...questActivities, ...newActivities, ...prev.activities].slice(0, 100),
        dailyQuests: updatedDQ,
        weeklyQuests: updatedWQ,
      };
    });
  }

  function saveGoals({ calories, water }) {
    setState(prev => ({
      ...prev,
      goals: { calories: parseInt(calories), water: parseInt(water) },
    }));
  }

  function completeProfile(userProfile, recs) {
    setState(prev => ({
      ...prev,
      userProfile,
      profileComplete: true,
      profile: {
        ...prev.profile,
        startWeight: userProfile.weightLbs,
        goalWeight: userProfile.goalWeight,
        currentWeight: userProfile.weightLbs,
        startDate: prev.profile.startDate || todayStr(),
      },
      goals: {
        calories: recs.calories,
        water: recs.water,
      },
      unlockedMilestones: getUnlockedMilestones(userProfile.weightLbs),
    }));
  }

  function reopenProfile() {
    setState(prev => ({ ...prev, profileComplete: false }));
  }

  function editLog(date, { weight, calories, water, workouts, notes }) {
    setState(prev => {
      const logs = prev.logs.map(l =>
        l.date === date ? { ...l, weight, calories, water, workouts, notes } : l
      );
      // Recalculate current weight from most recent log that has a weight
      const latestWithWeight = [...logs].sort((a, b) => b.date.localeCompare(a.date)).find(l => l.weight);
      const currentWeight = latestWithWeight ? latestWithWeight.weight : prev.profile.currentWeight;
      const newUnlocked = getUnlockedMilestones(currentWeight);
      return {
        ...prev,
        logs,
        profile: { ...prev.profile, currentWeight },
        unlockedMilestones: newUnlocked,
      };
    });
  }

  function dismissMilestone() {
    setState(prev => ({ ...prev, newMilestone: null }));
  }

  function loadSave(data) {
    saveState(data);
    setStateRaw(data);
  }

  function resetData() {
    const fresh = defaultState();
    saveState(fresh);
    setStateRaw(fresh);
  }

  function dismissRecalc() {
    setState(prev => ({ ...prev, recalcDismissedAtWeight: prev.profile.currentWeight }));
  }

  const levelInfo = getLevel(refreshedState.totalXP);
  const currentTitle = getCurrentTitle(refreshedState.profile.currentWeight);
  const lostSoFar = START_WEIGHT - refreshedState.profile.currentWeight;
  const toGoal = refreshedState.profile.currentWeight - GOAL_WEIGHT;

  const userGoals = refreshedState.goals || DAILY_GOALS;

  return {
    state: refreshedState,
    levelInfo,
    currentTitle,
    lostSoFar,
    toGoal,
    userGoals,
    logDay,
    quickLog,
    saveGoals,
    completeProfile,
    reopenProfile,
    editLog,
    dismissMilestone,
    loadSave,
    resetData,
    dismissRecalc,
  };
}
