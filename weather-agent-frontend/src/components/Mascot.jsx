import WeatherEffect from "./WeatherEffect";

const SMILE = "M99 114 Q105 122 111 114";
const FROWN = "M99 120 Q105 113 111 120";

// How the cloud itself looks for each kind of weather
const LOOKS = {
  clear: { fill: "#ffffff", mouth: SMILE },
  clouds: { fill: "#f1f3f8", mouth: SMILE },
  rain: { fill: "#e6edf7", mouth: FROWN },
  snow: { fill: "#f4f9ff", mouth: SMILE },
  storm: { fill: "#d9dfea", mouth: FROWN },
};

export default function Mascot({ weather = "clear", thinking }) {
  const kind = weather in LOOKS ? weather : "clear";
  const { fill, mouth } = LOOKS[kind];

  return (
    <svg
      className={`mascot ${thinking ? "mascot--thinking" : ""}`}
      viewBox="0 0 200 180"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Cartoon cloud weather agent (${kind})`}
    >
      <WeatherEffect weather={kind} />

      {/* cloud body */}
      <path
        d="M52 140 C28 140 20 112 42 104 C38 80 66 68 82 82 C90 56 130 56 138 82 C162 74 184 96 168 114 C186 122 178 140 158 140 Z"
        fill={fill}
        stroke="#6b4423"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* face */}
      <ellipse className="mascot__eye" cx="88" cy="106" rx="5" ry="7" fill="#6b4423" />
      <ellipse className="mascot__eye" cx="122" cy="106" rx="5" ry="7" fill="#6b4423" />
      <ellipse cx="74" cy="118" rx="9" ry="6" fill="#ffb3c1" />
      <ellipse cx="136" cy="118" rx="9" ry="6" fill="#ffb3c1" />
      <path d={mouth} fill="none" stroke="#6b4423" strokeWidth="3" strokeLinecap="round" />

      {/* umbrella hat */}
      <path
        d="M85 66 Q105 40 125 66 Z"
        fill="#f9708f"
        stroke="#6b4423"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}