export default function ProgressBar({ progress }) {
  const percent = Math.min(Math.max(progress * 100, 0), 100);

  return (
    <div className="relative w-full h-8 rounded-full overflow-hidden border-2 border-purple-300 bg-purple-100 shadow-lg">
      {/* Barra animada con wave + degradado */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        <div
          className="h-full w-[200%] animate-waveFlow"
          style={{
            backgroundImage:
              'linear-gradient(270deg, #7df9ff, #38bdf8, #22c55e, #a3e635, #facc15, #f472b6)',
            backgroundSize: '400% 100%',
            backgroundPosition: '0% 50%',
            opacity: 0.9,
          }}
        ></div>
      </div>
    </div>
  );
}
