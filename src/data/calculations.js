export const ACTIVITY_LEVELS = [
  { id: 'sedentary',         label: 'Sedentary',          sub: 'Desk job, little or no exercise',           multiplier: 1.2   },
  { id: 'lightly_active',    label: 'Lightly Active',     sub: 'Walks, light exercise 1–3 days/week',       multiplier: 1.375 },
  { id: 'moderately_active', label: 'Moderately Active',  sub: 'Moderate exercise 3–5 days/week',           multiplier: 1.55  },
  { id: 'very_active',       label: 'Very Active',        sub: 'Hard exercise 6–7 days/week',               multiplier: 1.725 },
];

export const WEEKLY_GOALS = [
  { value: 0.5, label: '0.5 lbs/week', sub: 'Gentle — sustainable long term',  deficit: 250  },
  { value: 1.0, label: '1 lb/week',    sub: 'Steady — the most recommended',   deficit: 500  },
  { value: 1.5, label: '1.5 lbs/week', sub: 'Aggressive — requires discipline', deficit: 750  },
  { value: 2.0, label: '2 lbs/week',   sub: 'Maximum — hard cut',              deficit: 1000 },
];

export function calculateBMR({ weightLbs, heightFt, heightIn, age, sex }) {
  const weightKg = weightLbs * 0.453592;
  const heightCm = (heightFt * 12 + (heightIn || 0)) * 2.54;
  if (sex === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

export function calculateTDEE(bmr, activityLevel) {
  const level = ACTIVITY_LEVELS.find(l => l.id === activityLevel);
  return bmr * (level ? level.multiplier : 1.375);
}

export function calculateTargetCalories(tdee, weeklyGoal) {
  const goal = WEEKLY_GOALS.find(g => g.value === weeklyGoal);
  const deficit = goal ? goal.deficit : 500;
  return Math.max(Math.round(tdee - deficit), 1200);
}

export function calculateWaterOz(weightLbs) {
  return Math.round(weightLbs * 0.5);
}

export function getRecommendations(profile) {
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  const calories = calculateTargetCalories(tdee, profile.weeklyGoal);
  const water = calculateWaterOz(profile.weightLbs);
  return { bmr: Math.round(bmr), tdee: Math.round(tdee), calories, water };
}
