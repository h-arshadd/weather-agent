const SHAPES = {
  cloud: {
    viewBox: "0 0 120 70",
    d: "M30 62 C10 62 6 38 26 34 C26 14 56 8 66 28 C82 18 108 34 96 50 C110 56 104 62 92 62 Z",
  },
  star: {
    viewBox: "0 0 24 24",
    d: "M12 2 L15 9 L22 9.5 L16.5 14 L18.5 21.5 L12 17.5 L5.5 21.5 L7.5 14 L2 9.5 L9 9 Z",
  },
  sparkle: {
    viewBox: "0 0 24 24",
    d: "M12 0 Q13 11 24 12 Q13 13 12 24 Q11 13 0 12 Q11 11 12 0 Z",
  },
};

const ITEMS = [
  { shape: "cloud", top: "8%", left: "5%", size: 170, delay: 0 },
  { shape: "cloud", top: "68%", left: "9%", size: 120, delay: 2 },
  { shape: "cloud", top: "18%", left: "78%", size: 140, delay: 1 },
  { shape: "cloud", top: "74%", left: "80%", size: 180, delay: 3 },
  { shape: "star", top: "42%", left: "10%", size: 34, delay: 0.5 },
  { shape: "star", top: "12%", left: "30%", size: 24, delay: 1.5 },
  { shape: "star", top: "50%", left: "88%", size: 30, delay: 2.5 },
  { shape: "sparkle", top: "28%", left: "18%", size: 26, delay: 1 },
  { shape: "sparkle", top: "86%", left: "28%", size: 22, delay: 2 },
  { shape: "sparkle", top: "8%", left: "66%", size: 28, delay: 0 },
  { shape: "sparkle", top: "88%", left: "66%", size: 24, delay: 1.2 },
];

export default function Background() {
  return (
    <div className="decor" aria-hidden="true">
      {ITEMS.map(({ shape, top, left, size, delay }, i) => (
        <svg
          key={i}
          className={`decor__item decor__item--${shape}`}
          viewBox={SHAPES[shape].viewBox}
          style={{ top, left, width: size, animationDelay: `${delay}s` }}
        >
          <path d={SHAPES[shape].d} />
        </svg>
      ))}
    </div>
  );
}