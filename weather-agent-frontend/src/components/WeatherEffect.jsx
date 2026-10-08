const SUN = { x: 150, y: 40 };
const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const DROP_XS = [64, 84, 104, 124, 144];
const FLAKE_XS = [62, 82, 102, 122, 142];

const delay = (index, step) => ({ animationDelay: `${index * step}s` });

function Sun() {
  return (
    <>
      <g className="fx-rays" stroke="#f7b84b" strokeWidth="5" strokeLinecap="round">
        {RAY_ANGLES.map((angle) => (
          <line
            key={angle}
            x1={SUN.x}
            y1={SUN.y - 28}
            x2={SUN.x}
            y2={SUN.y - 22}
            transform={`rotate(${angle} ${SUN.x} ${SUN.y})`}
          />
        ))}
      </g>
      <circle cx={SUN.x} cy={SUN.y} r="18" fill="#ffd25e" stroke="#6b4423" strokeWidth="3" />
    </>
  );
}

function Rain() {
  return (
    <g stroke="#6bb8f0" strokeWidth="4" strokeLinecap="round">
      {DROP_XS.map((x, i) => (
        <line key={x} className="fx-drop" x1={x} y1="146" x2={x - 3} y2="156" style={delay(i, 0.18)} />
      ))}
    </g>
  );
}

function Snow() {
  return (
    <g fill="#fff" stroke="#9ac7ee" strokeWidth="1.5">
      {FLAKE_XS.map((x, i) => (
        <circle key={x} className="fx-flake" cx={x} cy="148" r="3.5" style={delay(i, 0.3)} />
      ))}
    </g>
  );
}

function Storm() {
  return (
    <polygon
      className="fx-bolt"
      points="108,126 94,152 105,152 98,176 122,144 110,144 118,126"
      fill="#ffd25e"
      stroke="#6b4423"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  );
}

const EFFECTS = {
  clear: Sun,
  clouds: () => null,
  rain: Rain,
  snow: Snow,
  storm: Storm,
};

export default function WeatherEffect({ weather }) {
  const Effect = EFFECTS[weather];
  return <Effect />;
}