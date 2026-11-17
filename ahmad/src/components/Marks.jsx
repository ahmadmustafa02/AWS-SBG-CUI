const LOGO_GRID = [
  "..#.#.#..",
  "..#####..",
  "##.....##",
  ".#.....#.",
  "##.....##",
  ".#.....#.",
  "##.....##",
  "..#####..",
  "..#.#.#..",
];

const LOGO_CELLS = LOGO_GRID.flatMap((row, y) =>
  [...row].flatMap((cell, x) => (cell === "#" ? [[x, y]] : [])),
);

export function LogoOutline({ className }) {
  return (
    <svg className={className} viewBox="0 0 9 9" aria-hidden="true">
      {LOGO_CELLS.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x + 0.12}
          y={y + 0.12}
          width="0.76"
          height="0.76"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.08"
        />
      ))}
    </svg>
  );
}

export function LogoStack() {
  return (
    <div className="logo-stack" aria-hidden="true">
      {Array.from({ length: 6 }, (_, layer) => (
        <div key={layer} className="logo-layer" style={{ "--z": layer }}>
          {LOGO_CELLS.map(([x, y]) => (
            <span key={`${layer}-${x}-${y}`} style={{ gridColumn: x + 1, gridRow: y + 1 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Mark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g fill="currentColor">
        <rect x="14" y="4" width="6" height="10" rx="1" />
        <rect x="29" y="4" width="6" height="10" rx="1" />
        <rect x="44" y="4" width="6" height="10" rx="1" />
        <rect x="14" y="50" width="6" height="10" rx="1" />
        <rect x="29" y="50" width="6" height="10" rx="1" />
        <rect x="44" y="50" width="6" height="10" rx="1" />
        <rect x="4" y="14" width="10" height="6" rx="1" />
        <rect x="4" y="29" width="10" height="6" rx="1" />
        <rect x="4" y="44" width="10" height="6" rx="1" />
        <rect x="50" y="14" width="10" height="6" rx="1" />
        <rect x="50" y="29" width="10" height="6" rx="1" />
        <rect x="50" y="44" width="10" height="6" rx="1" />
        <path fillRule="evenodd" d="M14 14h36v36H14V14zm8 8v20h20V22H22z" />
      </g>
    </svg>
  );
}

export function IslamabadWord() {
  return (
    <span className="isla">
      <span>ISLA</span>
      <svg className="mosque" viewBox="0 0 64 48" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 46V18h3v28H8zm45 0V18h3v28h-3zM14 46V14h2.4v32H14zm33.6 0V14H50v32h-2.4z"
        />
        <path fill="currentColor" d="M20 46 32 12l12 34H20z" />
        <path fill="currentColor" d="M30.2 12h3.6L32 6l-1.8 6z" />
      </svg>
      <span>ABAD</span>
    </span>
  );
}

export function Skyline() {
  return (
    <svg
      className="skyline"
      viewBox="0 0 1440 280"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <path
        fill="#241f3d"
        d="M0 168 90 132l70 28 80-62 90 48 110-70 100 54 90-48 120 40 80-58 110 52 90-36 110 46 100-28 100 34 110-20V280H0Z"
      />
      <path
        fill="#312b52"
        d="M0 198 70 170l90 22 70-40 120 36 90-48 140 42 100-22 90 28 130-46 110 34 80-18 150 26 100-8V280H0Z"
      />
      <g fill="#1a1730">
        <ellipse cx="46" cy="236" rx="22" ry="28" />
        <ellipse cx="78" cy="242" rx="16" ry="22" />
        <ellipse cx="1180" cy="240" rx="18" ry="24" />
        <ellipse cx="1220" cy="246" rx="26" ry="20" />
        <ellipse cx="1360" cy="242" rx="20" ry="24" />
        <ellipse cx="1404" cy="248" rx="16" ry="18" />
      </g>
      <g fill="#3c3668">
        <rect x="150" y="168" width="22" height="78" />
        <rect x="178" y="150" width="34" height="96" />
        <rect x="186" y="138" width="8" height="16" />
        <rect x="430" y="176" width="26" height="70" />
        <rect x="462" y="154" width="16" height="92" />
        <rect x="486" y="188" width="40" height="58" />
        <rect x="980" y="150" width="30" height="96" />
        <rect x="1016" y="118" width="18" height="128" />
        <rect x="1042" y="142" width="26" height="104" />
        <rect x="1080" y="168" width="36" height="78" />
        <rect x="1240" y="160" width="22" height="86" />
        <rect x="1270" y="132" width="16" height="114" />
        <rect x="1294" y="176" width="40" height="70" />
      </g>
      <g fill="#d9d3ff" opacity="0.35">
        <rect x="188" y="166" width="4" height="4" />
        <rect x="198" y="166" width="4" height="4" />
        <rect x="188" y="178" width="4" height="4" />
        <rect x="198" y="178" width="4" height="4" />
        <rect x="1022" y="140" width="3" height="3" />
        <rect x="1028" y="140" width="3" height="3" />
        <rect x="1022" y="150" width="3" height="3" />
        <rect x="988" y="168" width="4" height="4" />
        <rect x="998" y="168" width="4" height="4" />
        <rect x="1274" y="150" width="3" height="3" />
        <rect x="1274" y="160" width="3" height="3" />
      </g>
      <g fill="#6a63a4">
        <rect x="600" y="78" width="5" height="150" />
        <rect x="628" y="96" width="4" height="132" />
        <rect x="792" y="96" width="4" height="132" />
        <rect x="818" y="78" width="5" height="150" />
        <path d="M648 230 706 118l58 112H648z" />
      </g>
      <g fill="#8d86c4" transform="translate(706 214)">
        <ellipse cx="0" cy="-28" rx="7" ry="30" />
        <ellipse cx="0" cy="-28" rx="7" ry="30" transform="rotate(32)" />
        <ellipse cx="0" cy="-28" rx="7" ry="30" transform="rotate(-32)" />
        <ellipse cx="0" cy="-20" rx="6" ry="22" transform="rotate(58)" />
        <ellipse cx="0" cy="-20" rx="6" ry="22" transform="rotate(-58)" />
      </g>
    </svg>
  );
}

function Art({ children, box = "0 0 420 148" }) {
  return (
    <svg className="ridge" viewBox={box} aria-hidden="true">
      {children}
    </svg>
  );
}

function Ridge() {
  return (
    <Art>
      <path fill="#312b52" d="M0 148h24l52-44 36 16 44-52 42 26 52-56 34 30 40-24 40 40 32 64H0Z" />
      <g fill="#3c3668">
        <rect x="168" y="96" width="16" height="52" />
        <rect x="190" y="78" width="12" height="70" />
        <rect x="194" y="66" width="5" height="14" />
        <rect x="210" y="108" width="26" height="40" />
      </g>
      <path fill="#6a63a4" d="M248 124 270 70l22 54h-44z" />
      <rect x="266" y="56" width="8" height="16" fill="#6a63a4" />
    </Art>
  );
}

function Blocks() {
  return (
    <Art>
      <g fill="#312b52">
        <rect x="18" y="92" width="36" height="56" />
        <rect x="62" y="64" width="28" height="84" />
        <rect x="98" y="108" width="48" height="40" />
        <rect x="156" y="46" width="22" height="102" />
        <rect x="186" y="78" width="40" height="70" />
        <rect x="236" y="28" width="18" height="120" />
        <rect x="262" y="58" width="34" height="90" />
        <rect x="306" y="96" width="52" height="52" />
        <rect x="368" y="72" width="24" height="76" />
      </g>
      <g fill="#d9d3ff" opacity="0.45">
        <rect x="70" y="76" width="4" height="4" />
        <rect x="80" y="76" width="4" height="4" />
        <rect x="164" y="58" width="4" height="4" />
        <rect x="242" y="42" width="3" height="3" />
        <rect x="274" y="72" width="4" height="4" />
        <rect x="286" y="72" width="4" height="4" />
      </g>
    </Art>
  );
}

function Hills() {
  return (
    <Art>
      <path fill="#2a2548" d="M0 148 70 96c40 28 70 8 110-6 36-12 60 10 96 8 40-2 70-40 110-28 28 8 34 24 34 24v54H0Z" />
      <path fill="#3c3668" d="M0 148c40-36 78-20 120-28 48-8 70 22 118 16 42-6 64-34 108-26 30 6 48 18 74 10v28H0Z" />
      <circle cx="292" cy="46" r="7" fill="#8d86c4" />
    </Art>
  );
}

function Towers() {
  return (
    <Art box="0 0 360 160">
      <g fill="#3c3668">
        <rect x="48" y="78" width="10" height="82" />
        <rect x="168" y="96" width="14" height="64" />
        <rect x="286" y="70" width="10" height="90" />
      </g>
      <g fill="#6a63a4">
        <path d="M40 78h26L53 28z" />
        <path d="M160 96h30l-15-46z" />
        <path d="M278 70h26l-13-40z" />
      </g>
      <path fill="#312b52" d="M20 148h320v12H20z" />
    </Art>
  );
}

function Frames() {
  return (
    <Art>
      <g fill="none" stroke="#6a63a4" strokeWidth="8">
        <rect x="36" y="48" width="92" height="72" rx="10" transform="rotate(-8 82 84)" />
        <rect x="150" y="28" width="108" height="84" rx="10" />
        <rect x="286" y="52" width="92" height="70" rx="10" transform="rotate(7 332 87)" />
      </g>
      <rect x="168" y="46" width="72" height="48" fill="#312b52" />
    </Art>
  );
}

function Gate() {
  return (
    <Art box="0 0 320 160">
      <path fill="#312b52" d="M36 148V62h18v86H36zm230 0V62h18v86h-18z" />
      <path fill="#3c3668" d="M54 70h212v18H54z" />
      <path fill="#6a63a4" d="M70 70c0-40 40-62 90-62s90 22 90 62H70z" />
      <rect x="146" y="88" width="28" height="60" fill="#241f3d" />
    </Art>
  );
}

function Seal() {
  return (
    <Art box="0 0 320 150">
      <circle cx="160" cy="74" r="54" fill="none" stroke="#6a63a4" strokeWidth="6" />
      <circle cx="160" cy="74" r="34" fill="none" stroke="#3c3668" strokeWidth="4" />
      <path fill="#8d86c4" d="M160 40l8 20h22l-18 13 7 21-19-13-19 13 7-21-18-13h22z" />
    </Art>
  );
}

function Lane() {
  return (
    <Art>
      <g fill="#3c3668">
        <rect x="40" y="70" width="4" height="78" />
        <rect x="80" y="96" width="4" height="52" />
        <rect x="120" y="48" width="5" height="100" />
        <rect x="168" y="86" width="4" height="62" />
        <rect x="214" y="36" width="5" height="112" />
        <rect x="262" y="78" width="4" height="70" />
        <rect x="308" y="58" width="5" height="90" />
        <rect x="356" y="92" width="4" height="56" />
      </g>
      <path fill="#312b52" d="M20 140h380v8H20z" />
      <circle cx="216" cy="24" r="6" fill="#8d86c4" />
    </Art>
  );
}

function Peak() {
  return (
    <Art box="0 0 280 160">
      <path fill="#312b52" d="M20 148 140 28l120 120H20z" />
      <path fill="#3c3668" d="M78 148 140 62l62 86H78z" />
      <rect x="136" y="18" width="8" height="22" fill="#6a63a4" />
    </Art>
  );
}

function Spire() {
  return (
    <Art box="0 0 280 150">
      <rect x="132" y="40" width="16" height="110" fill="#3c3668" />
      <path fill="#6a63a4" d="M118 44h44L140 8z" />
      <g fill="#8d86c4" transform="translate(140 70)">
        <ellipse cx="0" cy="-22" rx="5" ry="22" />
        <ellipse cx="0" cy="-22" rx="5" ry="22" transform="rotate(50)" />
        <ellipse cx="0" cy="-22" rx="5" ry="22" transform="rotate(-50)" />
      </g>
    </Art>
  );
}

function Dome() {
  return (
    <Art box="0 0 360 150">
      <rect x="40" y="78" width="14" height="72" fill="#3c3668" />
      <rect x="306" y="78" width="14" height="72" fill="#3c3668" />
      <path fill="#6a63a4" d="M34 78h26L47 36zM300 78h26l-13-42z" />
      <path fill="#312b52" d="M78 112c0-48 46-78 102-78s102 30 102 78v36H78z" />
      <rect x="168" y="96" width="24" height="28" fill="#241f3d" />
    </Art>
  );
}

function Mosque() {
  return (
    <Art box="0 0 260 108">
      <path fill="#312b52" d="M24 100 130 22l106 78H24z" />
      <rect x="122" y="8" width="10" height="18" fill="#8d86c4" />
      <rect x="14" y="46" width="22" height="54" fill="#3c3668" />
      <path fill="#6a63a4" d="M10 46h30L25 16z" />
      <rect x="224" y="46" width="22" height="54" fill="#3c3668" />
      <path fill="#6a63a4" d="M220 46h30l-15-30z" />
      <path fill="#241f3d" d="M0 96h260v8H0z" />
    </Art>
  );
}

const ARTS = {
  ridge: Ridge,
  blocks: Blocks,
  hills: Hills,
  towers: Towers,
  frames: Frames,
  gate: Gate,
  seal: Seal,
  lane: Lane,
  peak: Peak,
  spire: Spire,
  dome: Dome,
  mosque: Mosque,
};

export function ArtSlot({ place = "edge", kind = "ridge" }) {
  const Draw = ARTS[kind] || Ridge;
  return (
    <div className={`ridge-slot ridge-${place}`} aria-hidden="true">
      <Draw />
    </div>
  );
}

export function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconExternal() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M5 3H3.5A1.5 1.5 0 0 0 2 4.5v6A1.5 1.5 0 0 0 3.5 12h6A1.5 1.5 0 0 0 11 10.5V9M7 2h5v5M12 2 6.5 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
