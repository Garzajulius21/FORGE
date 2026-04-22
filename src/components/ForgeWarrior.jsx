// ─── Detailed palettes for hooded warriors ─────────────────────────────────

const HOODED_PALETTES = {
  Recruit: {
    // Dark cloaked rogue — silver sword is the star
    hood:       '#1c1830',   // deep indigo-black cloak
    hoodMid:    '#262044',   // inner hood shadow
    hoodEdge:   '#302858',   // subtle hood rim
    skin:       '#c8916a',   // warm tan face
    skinShadow: '#a07050',   // face shadow under hood
    eye:        '#7890d8',   // pale violet-blue glow
    eyeGlint:   '#c0d0ff',   // bright eye glint
    body:       '#26201c',   // dark weathered leather
    bodyLight:  '#342c26',   // leather highlight
    belt:       '#2a1c0c',   // near-black brown belt
    buckle:     '#8a6820',   // tarnished brass buckle
    legs:       '#1a1820',   // near-black legs
    legsLight:  '#242038',   // subtle leg highlight
    boots:      '#131010',   // almost black boots
    blade:      '#ccdaea',   // cool silver blade
    bladeEdge:  '#eef6ff',   // bright edge reflection
    guard:      '#9a7c2c',   // worn bronze crossguard
    handle:     '#4a3018',   // dark wood grip
    pommel:     '#8a6824',   // worn brass pommel
    badge:      '#7890d8',   // title badge color
  },
  Initiated: {
    // Midnight apprentice — cooler and sharper
    hood:       '#141e38',   // deep navy
    hoodMid:    '#1c2c50',   // midnight blue interior
    hoodEdge:   '#243460',   // blue rim
    skin:       '#c8916a',
    skinShadow: '#a07050',
    eye:        '#38c0e8',   // bright cyan
    eyeGlint:   '#a0f0ff',
    body:       '#1e2430',   // dark slate leather
    bodyLight:  '#2a3040',
    belt:       '#1a2430',   // dark teal belt
    buckle:     '#5898b8',   // steel-teal buckle
    legs:       '#161c28',
    legsLight:  '#202838',
    boots:      '#0e1018',
    blade:      '#d8e8f8',   // brighter silver
    bladeEdge:  '#f0f8ff',
    guard:      '#5888a8',   // steel guard
    handle:     '#3a5068',   // dark blue-gray grip
    pommel:     '#5888a8',
    badge:      '#38c0e8',
  },
};

// ─── Knight / epic title config ─────────────────────────────────────────────

const TITLE_STATES = {
  Recruit:   { state: 'basic',   p: 'Recruit',  glow: false, label: 'Recruit'   },
  Initiated: { state: 'basic',   p: 'Initiated',glow: false, label: 'Initiated' },
  Iron:      { state: 'armored', color: '#9ca3af', glow: false, label: 'Iron'   },
  Steel:     { state: 'armored', color: '#7dd3fc', glow: false, label: 'Steel'  },
  Titan:     { state: 'armored', color: '#fb923c', glow: true,  label: 'Titan'  },
  Apex:      { state: 'epic',    color: '#f59e0b', glow: true,  label: 'Apex'   },
  Legend:    { state: 'epic',    color: '#fde68a', glow: true,  label: 'Legend' },
  Mythic:    { state: 'epic',    color: '#c084fc', glow: true,  label: 'Mythic' },
  Immortal:  { state: 'epic',    color: '#67e8f9', glow: true,  label: 'Immortal' },
  Ascended:  { state: 'forged',  color: '#e2e8f0', glow: true,  label: 'Ascended' },
  FORGED:    { state: 'forged',  color: '#f59e0b', glow: true,  label: 'FORGED' },
};

export default function ForgeWarrior({ title = 'Recruit', size = 110 }) {
  const cfg     = TITLE_STATES[title] || TITLE_STATES.Recruit;
  const isHooded = cfg.state === 'basic';
  const hp       = isHooded ? HOODED_PALETTES[cfg.p] : null;

  // Knight color vars
  const c       = cfg.color || '#9ca3af';
  const dim     = c + 'aa';
  const armored = !isHooded;
  const epic    = cfg.state === 'epic' || cfg.state === 'forged';
  const forged  = cfg.state === 'forged';

  const badgeColor = isHooded ? hp.badge : c;

  const shadow = cfg.glow
    ? `drop-shadow(0 0 10px ${c}aa) drop-shadow(0 0 4px ${c}66)`
    : isHooded
      ? 'drop-shadow(0 0 8px rgba(120,144,216,0.2)) drop-shadow(0 3px 8px rgba(0,0,0,0.9))'
      : 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))';

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', flexShrink:0, position:'relative' }}>

      {/* Aura */}
      {cfg.glow && (
        <div style={{
          position:'absolute',
          top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          width: size * 1.5,
          height: size * 1.5,
          borderRadius:'50%',
          background:`radial-gradient(circle, ${c}28 0%, transparent 70%)`,
          animation:'aura 2.5s ease-in-out infinite',
          pointerEvents:'none',
        }} />
      )}

      <svg
        viewBox="0 0 70 110"
        width={size}
        height={size * (110/70)}
        style={{
          filter: shadow,
          animation:'warriorIdle 3.5s ease-in-out infinite',
          position:'relative', zIndex:1, overflow:'visible',
        }}
      >

        {/* ══════════════════════════════════════════
            HOODED WARRIOR — Recruit / Initiated
        ══════════════════════════════════════════ */}
        {isHooded && hp && (<>

          {/* ── Cloak body (drawn first, behind everything) ── */}
          <path
            d="M14 42 L16 36 C18 32 25 30 35 31 C45 30 52 32 54 36 L56 42 L54 68 L35 72 L16 68 Z"
            fill={hp.body}
          />
          {/* Cloak highlight */}
          <path
            d="M20 42 C22 38 30 36 35 37 C40 36 48 38 50 42"
            stroke={hp.bodyLight} strokeWidth="1" fill="none" opacity={0.5}
          />

          {/* ── Hood — layered for depth ── */}
          {/* Outer hood silhouette */}
          <path
            d="M18 28 C18 8 35 2 35 2 C35 2 52 8 52 28 L50 34 C46 31 24 31 20 34 Z"
            fill={hp.hood}
          />
          {/* Hood inner shadow (darker in center) */}
          <path
            d="M22 28 C22 14 35 8 35 8 C35 8 48 14 48 28 L46 32 C42 30 28 30 24 32 Z"
            fill={hp.hoodMid} opacity={0.9}
          />
          {/* Hood rim accent */}
          <path
            d="M20 32 C24 30 46 30 50 32"
            stroke={hp.hoodEdge} strokeWidth="1.5" fill="none" opacity={0.7}
          />
          {/* Deep shadow inside hood over face */}
          <ellipse cx="35" cy="26" rx="10" ry="8" fill="#00000060" />

          {/* ── Face — skin peeking under hood ── */}
          <ellipse cx="35" cy="25" rx="9" ry="8" fill={hp.skin} />
          {/* Face shadow from hood above */}
          <path
            d="M26 22 C26 16 35 14 35 14 C35 14 44 16 44 22"
            fill={hp.skinShadow} opacity={0.7}
          />
          {/* Cheek shadow */}
          <ellipse cx="29" cy="27" rx="3" ry="2" fill={hp.skinShadow} opacity={0.4} />
          <ellipse cx="41" cy="27" rx="3" ry="2" fill={hp.skinShadow} opacity={0.4} />

          {/* ── Eyes — the signature glow feature ── */}
          {/* Eye whites/base */}
          <ellipse cx="30" cy="24" rx="2.5" ry="2" fill="#0a0814" />
          <ellipse cx="40" cy="24" rx="2.5" ry="2" fill="#0a0814" />
          {/* Iris glow */}
          <ellipse cx="30" cy="24" rx="1.8" ry="1.5" fill={hp.eye} opacity={0.9} />
          <ellipse cx="40" cy="24" rx="1.8" ry="1.5" fill={hp.eye} opacity={0.9} />
          {/* Pupil */}
          <circle cx="30" cy="24" r="0.8" fill="#080614" />
          <circle cx="40" cy="24" r="0.8" fill="#080614" />
          {/* Eye glint — top-left of each eye */}
          <circle cx="29" cy="23" r="0.7" fill={hp.eyeGlint} opacity={0.9} />
          <circle cx="39" cy="23" r="0.7" fill={hp.eyeGlint} opacity={0.9} />
          {/* Subtle eye ambient glow */}
          <ellipse cx="30" cy="24" rx="3" ry="2.5" fill={hp.eye} opacity={0.15} />
          <ellipse cx="40" cy="24" rx="3" ry="2.5" fill={hp.eye} opacity={0.15} />

          {/* ── Nose & mouth — subtle ── */}
          <path d="M34 27 L35 29 L36 27" stroke={hp.skinShadow} strokeWidth="0.8" fill="none" opacity={0.6} />
          <path d="M32 31 Q35 33 38 31" stroke={hp.skinShadow} strokeWidth="0.7" fill="none" opacity={0.5} />

          {/* ── Neck ── */}
          <rect x="31" y="31" width="8" height="5" rx="1" fill={hp.skin} opacity={0.7} />

          {/* ── Belt ── */}
          <rect x="16" y="64" width="38" height="6" rx="2" fill={hp.belt} opacity={0.95} />
          {/* Buckle */}
          <rect x="31" y="64" width="8" height="6" rx="1" fill={hp.buckle} opacity={0.9} />
          <rect x="33" y="65.5" width="4" height="3" rx="0.5" fill="#00000040" />

          {/* ── Left arm ── */}
          <path d="M16 42 L16 64 C16 66 18 68 20 68 L22 68 L22 42 Z" fill={hp.body} />
          {/* Arm highlight */}
          <line x1="17" y1="44" x2="17" y2="62" stroke={hp.bodyLight} strokeWidth="0.8" opacity={0.5} />

          {/* ── Right arm (sword arm) ── */}
          <path d="M54 42 L54 64 C54 66 52 68 50 68 L48 68 L48 42 Z" fill={hp.body} />

          {/* ── Legs ── */}
          <path d="M19 71 L19 95 C19 98 22 100 25 100 L28 100 L30 71 Z" fill={hp.legs} />
          <path d="M40 71 L40 95 C40 98 43 100 46 100 L49 100 L51 71 Z" fill={hp.legs} />
          {/* Leg highlight */}
          <line x1="20" y1="73" x2="20" y2="88" stroke={hp.legsLight} strokeWidth="1" opacity={0.5} />
          <line x1="41" y1="73" x2="41" y2="88" stroke={hp.legsLight} strokeWidth="1" opacity={0.5} />

          {/* ── Boots ── */}
          <path d="M17 94 L17 103 C17 106 20 107 28 107 L30 107 L30 94 Z" fill={hp.boots} />
          <path d="M40 94 L40 103 C40 106 43 107 51 107 L53 107 L53 94 Z" fill={hp.boots} />
          {/* Boot toe edge */}
          <path d="M18 103 C21 101 27 101 29 103" stroke={hp.legsLight} strokeWidth="0.7" fill="none" opacity={0.4} />
          <path d="M41 103 C44 101 50 101 52 103" stroke={hp.legsLight} strokeWidth="0.7" fill="none" opacity={0.4} />

          {/* ── SWORD — silver blade, the visual hero ── */}
          {/* Blade — bright silver, high contrast against dark body */}
          <path d="M58 10 L61 13 L56 58 L53 55 Z" fill={hp.blade} />
          {/* Bright leading edge */}
          <line x1="58" y1="10" x2="53" y2="55" stroke={hp.bladeEdge} strokeWidth="0.7" opacity={0.8} />
          {/* Fuller groove */}
          <line x1="59.5" y1="16" x2="55.5" y2="50" stroke="#00000030" strokeWidth="1.2" />
          {/* Tip glow — very subtle */}
          <circle cx="59" cy="11" r="1.5" fill={hp.blade} opacity={0.5} />
          {/* Crossguard */}
          <path d="M50 34 L66 30 L65 35 L49 39 Z" fill={hp.guard} />
          {/* Guard highlight */}
          <line x1="51" y1="34" x2="64" y2="31" stroke="#ffffff30" strokeWidth="0.6" />
          {/* Handle / grip */}
          <rect x="54.5" y="35" width="4" height="14" rx="1.5" fill={hp.handle} />
          {/* Grip wrap */}
          <line x1="54.5" y1="38" x2="58.5" y2="38" stroke="#ffffff18" strokeWidth="0.9" />
          <line x1="54.5" y1="41" x2="58.5" y2="41" stroke="#ffffff18" strokeWidth="0.9" />
          <line x1="54.5" y1="44" x2="58.5" y2="44" stroke="#ffffff18" strokeWidth="0.9" />
          <line x1="54.5" y1="47" x2="58.5" y2="47" stroke="#ffffff18" strokeWidth="0.9" />
          {/* Pommel */}
          <circle cx="56.5" cy="50" r="3.5" fill={hp.pommel} />
          <circle cx="55.5" cy="49" r="1" fill="#ffffff22" />

        </>)}

        {/* ══════════════════════════════════════════
            ARMORED KNIGHT — Iron through FORGED
        ══════════════════════════════════════════ */}
        {!isHooded && (<>

          {/* ── Helmet ── */}
          <path d="M25 20 C25 8 45 8 45 20" fill={c} />
          <path d="M20 20 L20 32 C20 35 24 37 35 37 C46 37 50 35 50 32 L50 20 Z" fill={c} opacity={0.9} />
          <path d="M20 22 L16 28 L16 35 L22 37 L20 30 Z" fill={dim} />
          <path d="M50 22 L54 28 L54 35 L48 37 L50 30 Z" fill={dim} />
          <rect x="22" y="24" width="26" height="3" rx="1" fill="#0a0a0d" opacity={0.8} />
          <rect x="31" y="24" width="8" height="11" rx="1" fill="#0a0a0d" opacity={0.7} />
          <rect x="33.5" y="20" width="3" height="5" rx="0.5" fill={dim} />
          <path d="M35 8 C33 8 32 10 32 12 L38 12 C38 10 37 8 35 8 Z" fill={c} opacity={0.7} />
          <path d="M26 20 C26 14 33 11 35 11" stroke="#ffffff33" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* ── Neck / Gorget ── */}
          <rect x="30" y="37" width="10" height="6" rx="1" fill={dim} opacity={0.8} />

          {/* ── Chest plate ── */}
          <path d="M16 43 L20 38 L35 40 L50 38 L54 43 L52 66 L35 70 L18 66 Z" fill={c} opacity={0.9} />
          <path d="M28 43 C30 41 40 41 42 43" stroke="#ffffff22" strokeWidth="1" fill="none" strokeLinecap="round" />
          <line x1="35" y1="42" x2="35" y2="65" stroke="#0a0a0d" strokeWidth="1" opacity={0.2} />
          {epic && <path d="M35 48 L33 52 L35 50 L37 52 Z" fill="#ffffff" opacity={0.5} />}

          {/* ── Pauldrons ── */}
          <path d="M11 38 C8 36 8 48 14 50 L20 48 L20 38 Z" fill={c} opacity={0.85} />
          <path d="M59 38 C62 36 62 48 56 50 L50 48 L50 38 Z" fill={c} opacity={0.85} />
          <path d="M12 40 C10 42 10 46 13 48" stroke="#ffffff22" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M58 40 C60 42 60 46 57 48" stroke="#ffffff22" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* ── Belt ── */}
          <rect x="17" y="64" width="36" height="7" rx="2" fill={dim} opacity={0.9} />
          <rect x="32" y="64" width="6" height="7" rx="1" fill={c} opacity={0.7} />

          {/* ── Left arm ── */}
          <path d="M14 43 L14 62 C14 64 16 66 18 66 L20 66 L20 43 Z" fill={c} opacity={0.8} />
          <path d="M12 60 L12 68 C12 70 16 72 18 70 L20 68 L20 60 Z" fill={dim} opacity={0.9} />

          {/* ── Shield ── */}
          <path
            d="M2 40 L14 38 L14 60 L8 68 L2 60 Z"
            fill={epic ? `${c}33` : '#1a1a2688'}
            stroke={c} strokeWidth={epic ? 2 : 1.5} opacity={0.95}
          />
          <circle cx="8" cy="52" r="3" fill={c} opacity={0.7} />
          <line x1="8" y1="43" x2="8" y2="61" stroke={c} strokeWidth="1" opacity={0.4} />
          <line x1="4" y1="52" x2="12" y2="52" stroke={c} strokeWidth="1" opacity={0.4} />
          <path d="M4 42 L13 40 L13 48" stroke="#ffffff22" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* ── Right arm ── */}
          <path d="M56 43 L56 62 C56 64 54 66 52 66 L50 66 L50 43 Z" fill={c} opacity={0.8} />
          <path d="M58 60 L58 68 C58 70 54 72 52 70 L50 68 L50 60 Z" fill={dim} opacity={0.9} />

          {/* ── Sword (armored) ── */}
          <path d="M62 10 L65 12 L60 58 L57 56 Z" fill={epic ? '#fde68a' : '#e2e8f0'} opacity={epic ? 1 : 0.85} />
          <line x1="62" y1="10" x2="57" y2="56" stroke="#ffffff44" strokeWidth="0.5" />
          <line x1="63" y1="14" x2="59" y2="50" stroke="#00000033" strokeWidth="1" />
          <path d="M54 38 L70 34 L69 38 L53 42 Z" fill={c} opacity={0.95} />
          <rect x="59" y="38" width="4" height="14" rx="1.5" fill={dim} opacity={0.9} />
          <line x1="59" y1="41" x2="63" y2="41" stroke="#ffffff22" strokeWidth="0.8" />
          <line x1="59" y1="44" x2="63" y2="44" stroke="#ffffff22" strokeWidth="0.8" />
          <line x1="59" y1="47" x2="63" y2="47" stroke="#ffffff22" strokeWidth="0.8" />
          <ellipse cx="61" cy="52" rx="4" ry="3" fill={c} opacity={0.9} />
          {epic && (
            <path d="M62 10 L65 12 L60 58 L57 56 Z" fill={c} opacity={0.25}
              style={{ animation:'spark 1.2s ease-in-out infinite' }} />
          )}

          {/* ── Legs ── */}
          <path d="M19 71 L19 95 C19 98 22 100 25 100 L28 100 L30 71 Z" fill={c} opacity={0.85} />
          <path d="M40 71 L40 95 C40 98 43 100 46 100 L49 100 L51 71 Z" fill={c} opacity={0.85} />
          <ellipse cx="24" cy="83" rx="5" ry="4" fill={c} opacity={0.6} />
          <ellipse cx="46" cy="83" rx="5" ry="4" fill={c} opacity={0.6} />
          <path d="M20 73 L20 82" stroke="#ffffff18" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M41 73 L41 82" stroke="#ffffff18" strokeWidth="1.5" strokeLinecap="round" />

          {/* ── Boots ── */}
          <path d="M17 94 L17 102 C17 104 19 106 28 106 L30 106 L30 94 Z" fill={c} opacity={0.95} />
          <path d="M40 94 L40 102 C40 104 42 106 51 106 L53 106 L53 94 Z" fill={c} opacity={0.95} />
          <path d="M18 102 C20 100 26 100 29 102" stroke="#ffffff22" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <path d="M41 102 C43 100 49 100 52 102" stroke="#ffffff22" strokeWidth="0.8" fill="none" strokeLinecap="round" />

          {/* ── FORGED Crown ── */}
          {forged && (<>
            <path d="M24 16 L26 10 L29 15 L35 9 L41 15 L44 10 L46 16"
              stroke="#fde68a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
              style={{ animation:'spark 0.9s ease-in-out infinite' }} />
            <circle cx="35" cy="9" r="2" fill="#fde68a" style={{ animation:'spark 1.1s ease-in-out infinite' }} />
            <circle cx="26" cy="10" r="1.5" fill="#f59e0b" style={{ animation:'spark 0.8s 0.2s ease-in-out infinite' }} />
            <circle cx="44" cy="10" r="1.5" fill="#f59e0b" style={{ animation:'spark 0.8s 0.4s ease-in-out infinite' }} />
          </>)}

        </>)}

      </svg>

      {/* Title badge */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '11px',
        fontWeight: 700,
        color: badgeColor,
        letterSpacing: '0.12em',
        padding: '3px 12px',
        borderRadius: '4px',
        background: `${badgeColor}15`,
        border: `1px solid ${badgeColor}45`,
        animation: cfg.glow ? 'glow 2.5s ease-in-out infinite' : 'none',
        textTransform: 'uppercase',
      }}>
        {cfg.label}
      </div>
    </div>
  );
}
