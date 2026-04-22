# FORGE — RPG Fitness Tracker

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Vite-blue?style=for-the-badge)
![Storage](https://img.shields.io/badge/Storage-Local%20%2F%20No%20Backend-orange?style=for-the-badge)
![Tiers](https://img.shields.io/badge/Warrior%20Tiers-11-darkred?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-macOS-lightgrey?style=for-the-badge)
![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)

---

## Overview

FORGE is a personal fitness tracker with RPG progression built in. Log your weight, calories, water, and workouts every day — and watch your warrior evolve. Every 10 lbs lost advances you through 11 warrior tiers, from **Recruit** to the final form: **FORGED**.

No cloud. No account. No subscriptions. Everything lives in your browser's localStorage and runs off a single double-click.

---

## Warrior Tiers

Your warrior title is determined by how much weight you've lost. Each tier unlocks a new warrior image, a new badge, and a milestone toast notification.

| Tier | Title | lbs Lost |
|------|-------|----------|
| 1 | Recruit | 0 |
| 2 | Initiated | 5 |
| 3 | Iron | 10 |
| 4 | Steel | 20 |
| 5 | Titan | 30 |
| 6 | Apex | 40 |
| 7 | Legend | 50 |
| 8 | Mythic | 60 |
| 9 | Immortal | 70 |
| 10 | Ascended | 80 |
| 11 | **FORGED** | 90 |

---

## Features

### Dashboard
- **4 stat cards** — Current Weight, Lost So Far, To Goal, Total XP
- **Journey Progress Bar** — animated green fill from start weight to goal
- **Hero Panel** — animated forge fire (grows with progress) on the left, warrior image dead-centered, live stats on the right
- **Quick Log** — one-tap water and calorie increments without opening the full modal
- **Today's Log Summary** — shows weight, calories, water, and workouts logged today
- **30-Day Weight Chart** — smooth bezier SVG curve with a goal line

### XP & Leveling
- **30 levels** (Level 1 → Level 30: Eternal) with an XP bar in the persistent header
- **Streak counter** — tracks consecutive daily logging days
- **Level-up overlay** — full-screen animation fires when you level up
- **Floating +XP numbers** — appear on screen whenever XP is earned

### XP Rewards

| Action | XP |
|--------|----|
| Log weight | 50 |
| Log calories | 40 |
| Log water | 30 |
| Hit calorie goal | 75 |
| Hit water goal | 50 |
| Walk logged | 100 |
| Gym session | 300 |
| 7-day streak bonus | 200 |
| 30-day streak bonus | 500 |
| Daily quest complete | 40–120 |
| Weekly quest complete | 200–400 |

### Quest System
- **3 daily quests** refreshed each morning — drawn randomly from the daily pool
- **3 weekly quests** refreshed each Monday — drawn randomly from the weekly pool
- Quests auto-complete when their conditions are met during logging
- XP awarded immediately on completion with activity feed entry

### Tabs

| Tab | Contents |
|-----|----------|
| **Dashboard** | Stat cards, hero panel, quick log, chart, quests |
| **Milestones** | Visual 11-tier path showing unlocked and locked milestones |
| **Activity** | Chronological XP event feed (last 100 events) |
| **History** | Full log table with inline edit for any past entry |

### Profile & Goals
- First-run profile setup collects: name, age, sex, height, current weight, goal weight, and activity level
- **Mifflin-St Jeor BMR** → TDEE → personalized calorie deficit target calculated automatically
- Water goal defaults to 64 oz/day, adjustable in Settings
- Goals can be updated at any time via the Settings modal

### Data
- All data persists in `localStorage` under the key `forge_data`
- **Export** — download your full save as a timestamped `.json` file
- **Import** — restore from a saved `.json` file

---

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | Pure CSS — design token system, no Tailwind |
| Icons | Lucide React |
| Fonts | Cinzel (display), system sans |
| Storage | Browser localStorage — no backend |
| Charts | Hand-written SVG with bezier curves |
| Animations | CSS keyframes + React state |

---

## Setup

### Prerequisites
- **Node.js 18+** → verify: `node --version`
- **macOS** — launcher script is `.command` format

### Install

```bash
git clone https://github.com/Garzajulius21/FORGE.git
cd FORGE
npm install
```

### Run

Double-click **`START FORGE.command`** in the project folder.

Or from Terminal:

```bash
npm run dev
```

Then open **http://localhost:5173** in your browser.

### First-time macOS security prompt

macOS may block the `.command` file on first launch. Run this once to clear quarantine:

```bash
xattr -dr com.apple.quarantine "/path/to/FORGE"
```

---

## Project Structure

```
forge/
├── START FORGE.command             # One-click launcher (macOS)
├── public/
│   └── warriors/                   # Warrior PNG images (8 of 11 complete)
│       ├── recruit.png
│       ├── initiated.png
│       ├── iron.png
│       ├── steel.png
│       ├── titan.png
│       ├── apex.png
│       ├── legend.png
│       └── mythic.png              # immortal / ascended / forged pending
├── src/
│   ├── App.jsx                     # Main shell — layout, tabs, modals, stat cards
│   ├── index.css                   # Design system — CSS tokens
│   ├── hooks/
│   │   └── useForge.js             # All state — XP, quests, logs, streaks, milestones
│   ├── components/
│   │   ├── ForgeFire.jsx           # Animated forge fire, scales with progress
│   │   ├── ForgeWarriorImage.jsx   # Warrior display — PNG + SVG fallback + title badge
│   │   ├── ForgeWarrior.jsx        # SVG fallback warrior with tier-based palettes
│   │   ├── XPBar.jsx               # Persistent header — level, XP fill, streak
│   │   ├── QuestPanel.jsx          # Daily + weekly quest cards with completion burst
│   │   ├── WeightChart.jsx         # 30-day bezier smooth SVG chart + goal line
│   │   ├── MilestonePath.jsx       # Visual 11-tier milestone path
│   │   ├── ActivityFeed.jsx        # Chronological XP event log
│   │   ├── HistoryTab.jsx          # Full log history with inline edit
│   │   ├── LogModal.jsx            # Daily log entry — weight, calories, water, workouts
│   │   ├── QuickLog.jsx            # Fast water/calorie increment buttons
│   │   ├── ProfileSetup.jsx        # First-run profile + Mifflin-St Jeor goal calc
│   │   ├── SettingsModal.jsx       # Adjust calorie/water goals
│   │   ├── LevelUpOverlay.jsx      # Full-screen level-up animation
│   │   ├── MilestoneToast.jsx      # Warrior tier unlock notification
│   │   └── FloatingXP.jsx          # Floating +XP numbers on XP gain
│   └── data/
│       ├── constants.js            # Tiers, XP values, quest pools, 30-level table
│       └── calculations.js         # BMR → TDEE → calorie/water goal recommendations
└── vite.config.js
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0a0a0d` | Page background |
| `--surface` | `#111116` | Card / header surfaces |
| `--amber` | `#f59e0b` | Primary accent — titles, highlights, fire |
| `--green` | `#22c55e` | Positive — weight loss, goals hit |
| `--red` | `#ef4444` | Alerts — calories over goal |
| `--font-display` | Cinzel | Warrior titles, section labels |

---

## License

Private — not for redistribution.

---

*Built for the grind · One day at a time*
