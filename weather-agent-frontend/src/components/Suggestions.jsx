const SUGGESTIONS = [
  "What's the weather today??",
  "Do I need an umbrella right now?",
  "Good day for a walk?",
];

export default function Suggestions({ onPick }) {
  return (
    <div className="suggestions">
      {SUGGESTIONS.map((text) => (
        <button key={text} type="button" className="chip" onClick={() => onPick(text)}>
          {text}
        </button>
      ))}
    </div>
  );
}