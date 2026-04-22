export const START_WEIGHT = 290;
export const GOAL_WEIGHT = 200;
export const MAX_WEIGHT = 350;

export const XP_VALUES = {
  LOG_WEIGHT: 50,
  LOG_WATER: 30,
  LOG_CALORIES: 40,
  WALK: 100,
  GYM: 300,
  HIT_CALORIE_GOAL: 75,
  HIT_WATER_GOAL: 50,
  STREAK_7: 200,
  STREAK_30: 500,
};

export const DAILY_GOALS = {
  calories: 2000,
  water: 64, // oz
};

export const MILESTONES = [
  { id: 'start',   weight: 290, loss: 0,  title: 'Recruit',   description: 'Your journey begins.' },
  { id: 'ms5',     weight: 285, loss: 5,  title: 'Initiated', description: 'First 5 lbs. The forge is lit.' },
  { id: 'ms10',    weight: 280, loss: 10, title: 'Iron',      description: '10 lbs gone. You are iron now.' },
  { id: 'ms20',    weight: 270, loss: 20, title: 'Steel',     description: '20 lbs. Harder than before.' },
  { id: 'ms30',    weight: 260, loss: 30, title: 'Titan',     description: '30 lbs. Titan strength.' },
  { id: 'ms40',    weight: 250, loss: 40, title: 'Apex',      description: '40 lbs. You are at the apex.' },
  { id: 'ms50',    weight: 240, loss: 50, title: 'Legend',    description: '50 lbs. Legendary effort.' },
  { id: 'ms60',    weight: 230, loss: 60, title: 'Mythic',    description: '60 lbs. Beyond what most dare.' },
  { id: 'ms70',    weight: 220, loss: 70, title: 'Immortal',  description: '70 lbs. They will remember this.' },
  { id: 'ms80',    weight: 210, loss: 80, title: 'Ascended',  description: '80 lbs. Almost there.' },
  { id: 'goal',    weight: 200, loss: 90, title: 'FORGED',    description: '90 lbs. The goal. You are FORGED.' },
];

export const LEVELS = [
  { level: 1,  xpRequired: 0,     name: 'Level 1' },
  { level: 2,  xpRequired: 500,   name: 'Level 2' },
  { level: 3,  xpRequired: 1200,  name: 'Level 3' },
  { level: 4,  xpRequired: 2200,  name: 'Level 4' },
  { level: 5,  xpRequired: 3500,  name: 'Level 5' },
  { level: 6,  xpRequired: 5200,  name: 'Level 6' },
  { level: 7,  xpRequired: 7200,  name: 'Level 7' },
  { level: 8,  xpRequired: 9800,  name: 'Level 8' },
  { level: 9,  xpRequired: 13000, name: 'Level 9' },
  { level: 10, xpRequired: 17000, name: 'Level 10' },
  { level: 11, xpRequired: 22000, name: 'Level 11' },
  { level: 12, xpRequired: 28000, name: 'Level 12' },
  { level: 13, xpRequired: 35000, name: 'Level 13' },
  { level: 14, xpRequired: 43000, name: 'Level 14' },
  { level: 15, xpRequired: 52000, name: 'Level 15' },
  { level: 16, xpRequired: 62000, name: 'Level 16' },
  { level: 17, xpRequired: 73000, name: 'Level 17' },
  { level: 18, xpRequired: 85000, name: 'Level 18' },
  { level: 19, xpRequired: 98000, name: 'Level 19' },
  { level: 20, xpRequired: 112000, name: 'Level 20' },
  { level: 21, xpRequired: 130000, name: 'Level 21' },
  { level: 22, xpRequired: 150000, name: 'Level 22' },
  { level: 23, xpRequired: 172000, name: 'Level 23' },
  { level: 24, xpRequired: 196000, name: 'Level 24' },
  { level: 25, xpRequired: 222000, name: 'Level 25' },
  { level: 26, xpRequired: 250000, name: 'Level 26' },
  { level: 27, xpRequired: 280000, name: 'Level 27' },
  { level: 28, xpRequired: 312000, name: 'Level 28' },
  { level: 29, xpRequired: 346000, name: 'Level 29' },
  { level: 30, xpRequired: 382000, name: 'Level 30 — Eternal' },
];

export const DAILY_QUEST_POOL = [
  { id: 'dq_log_weight',    label: 'Log your weight today',         xp: 50,  type: 'log_weight' },
  { id: 'dq_log_water',     label: 'Hit your water goal (64 oz)',    xp: 50,  type: 'hit_water' },
  { id: 'dq_log_calories',  label: 'Log your calories today',       xp: 40,  type: 'log_calories' },
  { id: 'dq_hit_cals',      label: 'Stay under your calorie goal',  xp: 75,  type: 'hit_calories' },
  { id: 'dq_walk',          label: 'Go for a walk',                 xp: 100, type: 'walk' },
  { id: 'dq_gym',           label: 'Hit the gym today',             xp: 300, type: 'gym' },
  { id: 'dq_log_all',       label: 'Log weight, water, and calories',xp: 120, type: 'log_all' },
];

export const WEEKLY_QUEST_POOL = [
  { id: 'wq_log5',    label: 'Log your weight 5 days this week',   xp: 300, target: 5, type: 'weight_logs' },
  { id: 'wq_water3',  label: 'Hit water goal 3 days this week',    xp: 200, target: 3, type: 'water_hits' },
  { id: 'wq_gym1',    label: 'Get to the gym at least once',       xp: 350, target: 1, type: 'gym_visits' },
  { id: 'wq_walk5',   label: 'Log 5 walks this week',              xp: 250, target: 5, type: 'walk_logs' },
  { id: 'wq_cals5',   label: 'Hit calorie goal 5 days this week',  xp: 400, target: 5, type: 'calorie_hits' },
  { id: 'wq_streak7', label: 'Maintain a 7-day logging streak',    xp: 200, target: 7, type: 'streak' },
  { id: 'wq_logall3', label: 'Log everything 3 days this week',    xp: 300, target: 3, type: 'full_logs' },
];
