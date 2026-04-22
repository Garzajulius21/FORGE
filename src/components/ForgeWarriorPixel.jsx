// Pixel art warrior — OSRS/Stardew style
// Each character = one pixel. '.' = transparent, 'N' = dark outline
// Sprites scaled up with crisp-edges rendering

// ─── PALETTES ──────────────────────────────────────────────────────────────
// ALL colors must be clearly visible against #0a0a0d background

const PALETTES = {
  recruit: {
    N:'#1a0d2e',                         // dark outline
    H:'#7048a8', h:'#9068c0', I:'#b088d8', // hood (vivid purple)
    k:'#e0b878', e:'#180c30',             // skin, eye
    t:'#7a5228', T:'#a87040', a:'#c89060', // torso (warm brown)
    b:'#3a2010', B:'#c09030',             // belt
    l:'#504070', L:'#706090',            // legs (muted purple)
    O:'#382518', o:'#503820',            // boots (dark brown)
    s:'#c0d8ec', g:'#7898b0', P:'#9a7030', p:'#c09040', // sword/handle
  },
  initiated: {
    N:'#1a0d2e',
    H:'#8058b8', h:'#a078d0', I:'#c098e8',
    k:'#e0b878', e:'#180c30',
    t:'#7a5228', T:'#a87040', a:'#c89060',
    b:'#3a2010', B:'#c09030',
    l:'#504070', L:'#706090',
    O:'#382518', o:'#503820',
    s:'#d0e8f8', g:'#88a8c0', P:'#9a7030', p:'#c09040',
  },
  iron: {
    N:'#181c20',
    H:'#788898', h:'#9aaabb', I:'#c0cdd8', V:'#202830',
    t:'#606870', T:'#848e98', A:'#aab4bc', a:'#ccd4da',
    b:'#484e56', B:'#a09820',
    S:'#6a7e8e', s:'#8ea0ae', c:'#b8ccd8',
    l:'#606870', L:'#848e98',
    O:'#485058', o:'#383e48',
    w:'#d8ecf8', W:'#eef8ff', g:'#8098b0', P:'#6a6e78', p:'#a8b4c0',
  },
  steel: {
    N:'#0e1820',
    H:'#5888b0', h:'#78a8cc', I:'#a8cce0', V:'#182030',
    t:'#4a6890', T:'#6088b0', A:'#88b0cc', a:'#b0d0e8',
    b:'#384860', B:'#6898c0',
    S:'#4a7090', s:'#6890a8', c:'#98c0d8',
    l:'#4a6890', L:'#6088b0',
    O:'#384860', o:'#283040',
    w:'#d8eef8', W:'#eef8ff', g:'#6890a8', P:'#5878a0', p:'#98c0d8',
  },
  titan: {
    N:'#1a0800',
    H:'#b05800', h:'#d87800', I:'#f0a030', V:'#200e00',
    t:'#884000', T:'#b86000', A:'#e08020', a:'#f8a040',
    b:'#582800', B:'#e08020',
    S:'#884000', s:'#b06000', c:'#e08030',
    l:'#884000', L:'#b86000',
    O:'#582800', o:'#381800',
    w:'#f8c848', W:'#ffe870', g:'#a06820', P:'#b05800', p:'#e0a030',
  },
  apex: {
    N:'#180a00',
    H:'#c86800', h:'#f08800', I:'#f8b030', V:'#180a00',
    t:'#a05000', T:'#d07000', A:'#f09020', a:'#f8b040',
    b:'#683800', B:'#f0b820',
    S:'#a05000', s:'#d07000', c:'#f09020',
    l:'#a05000', L:'#d07000',
    O:'#683800', o:'#401800',
    w:'#ffd840', W:'#fff068', g:'#c07828', P:'#c06818', p:'#f0c030',
  },
  legend: {
    N:'#180a00',
    H:'#e09000', h:'#f8b800', I:'#ffd840', V:'#180a00',
    t:'#a86000', T:'#d88000', A:'#f8a000', a:'#ffc020',
    b:'#784000', B:'#f8c820',
    S:'#a86000', s:'#d88000', c:'#f8a000',
    l:'#a86000', L:'#d88000',
    O:'#784000', o:'#503000',
    w:'#ffe868', W:'#fff8b0', g:'#c09030', P:'#d08000', p:'#f8d040',
  },
  mythic: {
    N:'#100428',
    H:'#8030c8', h:'#a850e8', I:'#cc78f8', V:'#180830',
    t:'#5820a8', T:'#8040d0', A:'#aa60f0', a:'#cc88ff',
    b:'#401878', B:'#c070f0',
    S:'#5820a8', s:'#8040d0', c:'#aa60f0',
    l:'#5820a8', L:'#8040d0',
    O:'#401878', o:'#280c50',
    w:'#ee98ff', W:'#f8d8ff', g:'#9050d8', P:'#8030c8', p:'#e090ff',
  },
  immortal: {
    N:'#001828',
    H:'#008ab0', h:'#00b8d8', I:'#40d8f0', V:'#002838',
    t:'#006890', T:'#0090b8', A:'#00c0e0', a:'#50d8f8',
    b:'#004868', B:'#60d0f0',
    S:'#006890', s:'#0090b8', c:'#00c0e0',
    l:'#006890', L:'#0090b8',
    O:'#004868', o:'#003050',
    w:'#a0f0ff', W:'#d0faff', g:'#40a0c0', P:'#008ab0', p:'#60e0ff',
  },
  ascended: {
    N:'#101820',
    H:'#9098a8', h:'#b8c0cc', I:'#d8e0e8', V:'#182028',
    t:'#787888', T:'#989aa8', A:'#c0c8d0', a:'#e0e8f0',
    b:'#606878', B:'#e0e8f0',
    S:'#787888', s:'#989aa8', c:'#c0c8d0',
    l:'#787888', L:'#989aa8',
    O:'#606878', o:'#404858',
    w:'#f0f8ff', W:'#ffffff', g:'#a0b0c0', P:'#9098a8', p:'#e0e8f0',
  },
  forged: {
    N:'#1a0800',
    H:'#d06800', h:'#f08800', I:'#f8c020', V:'#200a00',
    t:'#a06000', T:'#d07800', A:'#f89800', a:'#f8c020',
    b:'#684000', B:'#f8d830',
    S:'#a06000', s:'#d07800', c:'#f89800',
    l:'#a06000', L:'#d07800',
    O:'#684000', o:'#482800',
    w:'#ffe840', W:'#ffffff', g:'#d09820', P:'#c06808', p:'#f8c020',
    cr:'#ffe840', cR:'#ffffff',
  },
};

// ─── SPRITE DATA ───────────────────────────────────────────────────────────
// N = dark outline, visible against bg but dark next to body colors

const HOODED_PIXELS = [
//   012345678901234567  (18 wide)
  '..........NssN....',  // 0  sword tip
  '..........NssN....',  // 1
  '..........NsNP....',  // 2  near guard
  '...NNNNNN.NPN.....',  // 3  hood peak + handle
  '..NHhhhhhN.NN.....',  // 4  hood wide
  '.NHhhIIIhHN.......',  // 5  face area
  '.NHhIkkkIhHN......',  // 6  face skin
  '.NHhIkekIhHN......',  // 7  eye row
  '.NHhIkkkIhHN......',  // 8
  '.NHhIIIIhHN.......',  // 9  chin
  '..NHhhhhhHN.......',  // 10 neck
  '..NtTTTTTtN.......',  // 11 shoulders
  '.NtTTaaaaaTtN.....',  // 12 chest
  '.NtTTaaaaaTtN.....',  // 13
  '.NtTTaaaaaTtN.....',  // 14
  '.NtTTaaaaaTtN.....',  // 15
  '.NtTTBbbbBTtN.....',  // 16 belt
  '..NlLLlllLLlN.....',  // 17 upper legs
  '..NlLLlllLLlN.....',  // 18
  '..NlLLlllLLlN.....',  // 19
  '..NlLLlllLLlN.....',  // 20
  '..NlLLlllLLlN.....',  // 21
  '..NlLLlllLLlN.....',  // 22
  '..NOOOooooOON.....',  // 23 boots
  '..NOOOooooOON.....',  // 24
  '.NOOOOooooOOON....',  // 25 boot flare
];

const KNIGHT_PIXELS = [
//   0123456789012345678901  (22 wide)
  '................NwwwN.',  // 0  sword tip
  '................NwwwN.',  // 1
  '................NwwwN.',  // 2
  '.NSN...NHHHHN...NwgN..',  // 3  shield top, helm peak, sword guard
  'NSSSN.NHHhhHHN..NPpN..',  // 4  shield + helm sides + handle
  'NScSN.NHhVVhHN..NPpN..',  // 5  shield center + visor
  'NSSSN.NHhVVhHN..NPpN..',  // 6  visor
  'NSSSN.NHhVVhHN...NN...',  // 7  visor bottom
  '.NSN..NHHHHHHN........',  // 8  gorget
  '......NHHHHHHN........',  // 9
  '......NHHHHHHN........',  // 10
  '.NsTTATTAAAATTANs.....',  // 11 pauldrons + chest
  '.NsTTAAAAAAAATTsN.....',  // 12
  '.NsTTAAAAAAAATTsN.....',  // 13
  '..NtTTAAAAAAAATtN.....',  // 14
  '..NtTTAAAAAAAATtN.....',  // 15
  '..NtTTBbBBBbBTtN......',  // 16 belt
  '..NtLLLlllLLLtN.......',  // 17 legs
  '...NLLLlllLLLN........',  // 18
  '...NLLLlllLLLN........',  // 19
  '...NLLLlllLLLN........',  // 20
  '...NLLLlllLLLN........',  // 21
  '...NLLLlllLLLN........',  // 22
  '..NOOOOoooOOOON.......',  // 23 boots
  '..NOOOOoooOOOON.......',  // 24
  '.NOOOOOoooOOOOON......',  // 25 boot flare
];

// Crown for FORGED (drawn above sprite)
const CROWN_PIXELS = [
//   0123456789012345678901
  '......crNcRNcr........',  // crown peaks
  '.....NcrcRcRRcrcN.....',  // crown base
  '.....NcrcrcrcrcrN.....',  // crown band
];

// ─── RENDERER ──────────────────────────────────────────────────────────────

function PixelGrid({ rows, palette }) {
  const rects = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === '.' || ch === ' ') continue;
      const color = palette[ch];
      if (!color) continue;
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x} y={y} width={1} height={1}
          fill={color}
          shapeRendering="crispEdges"
        />
      );
    }
  });
  return rects;
}

// ─── TITLE CONFIG ──────────────────────────────────────────────────────────

const TITLE_CONFIG = {
  Recruit:   { palette:'recruit',   sprite:'hooded', glow:false },
  Initiated: { palette:'initiated', sprite:'hooded', glow:false },
  Iron:      { palette:'iron',      sprite:'knight', glow:false },
  Steel:     { palette:'steel',     sprite:'knight', glow:false },
  Titan:     { palette:'titan',     sprite:'knight', glow:true  },
  Apex:      { palette:'apex',      sprite:'knight', glow:true  },
  Legend:    { palette:'legend',    sprite:'knight', glow:true  },
  Mythic:    { palette:'mythic',    sprite:'knight', glow:true  },
  Immortal:  { palette:'immortal',  sprite:'knight', glow:true  },
  Ascended:  { palette:'ascended',  sprite:'knight', glow:true  },
  FORGED:    { palette:'forged',    sprite:'knight', glow:true, crown:true },
};

const SCALE = 7;

const glowColors = {
  recruit:'#9068c0', initiated:'#a078d0',
  iron:'#c0cdd8', steel:'#a8cce0',
  titan:'#f0a030', apex:'#f8b030',
  legend:'#ffd840', mythic:'#cc78f8',
  immortal:'#40d8f0', ascended:'#d8e0e8',
  forged:'#f8c020',
};

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function ForgeWarriorPixel({ title = 'Recruit' }) {
  const cfg      = TITLE_CONFIG[title] || TITLE_CONFIG.Recruit;
  const palette  = PALETTES[cfg.palette] || PALETTES.recruit;
  const pixels   = cfg.sprite === 'knight' ? KNIGHT_PIXELS : HOODED_PIXELS;
  const W        = pixels[0].length;
  const H        = pixels.length;
  const dispW    = W * SCALE;
  const dispH    = H * SCALE;

  const glowColor = glowColors[cfg.palette] || '#f8c020';

  const filterStyle = cfg.glow
    ? `drop-shadow(0 0 ${cfg.crown ? 14 : 8}px ${glowColor}) drop-shadow(0 0 4px ${glowColor}99)`
    : 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0,
      position: 'relative',
    }}>

      {/* Radial aura glow behind sprite */}
      {cfg.glow && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: dispW * 1.6,
          height: dispH * 1.4,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor}30 0%, transparent 65%)`,
          animation: 'aura 2.5s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      )}

      {/* Sprite wrapper */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Crown overlay for FORGED */}
        {cfg.crown && (
          <svg
            viewBox={`0 0 ${W} 3`}
            width={dispW}
            height={3 * SCALE}
            style={{
              imageRendering: 'pixelated',
              display: 'block',
              filter: `drop-shadow(0 0 10px ${glowColor})`,
              animation: 'spark 1s ease-in-out infinite',
            }}
          >
            <PixelGrid rows={CROWN_PIXELS} palette={palette} />
          </svg>
        )}

        {/* Main sprite SVG */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={dispW}
          height={dispH}
          style={{
            imageRendering: 'pixelated',
            filter: filterStyle,
            animation: 'warriorIdle 3.5s ease-in-out infinite',
            display: 'block',
          }}
        >
          <PixelGrid rows={pixels} palette={palette} />
        </svg>
      </div>

      {/* Title badge */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '11px',
        fontWeight: 700,
        color: glowColor,
        letterSpacing: '0.14em',
        padding: '3px 12px',
        borderRadius: '3px',
        background: `${glowColor}18`,
        border: `1px solid ${glowColor}50`,
        animation: cfg.glow ? 'glow 2.5s ease-in-out infinite' : 'none',
        position: 'relative',
        zIndex: 1,
      }}>
        {title.toUpperCase()}
      </div>
    </div>
  );
}
