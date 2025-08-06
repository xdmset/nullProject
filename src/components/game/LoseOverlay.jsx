export default function LoseOverlay({ onRetry, onExit }) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center space-y-4 w-[90%] max-w-md text-center">
      <p className="text-lg font-semibold">¡Perdiste todas tus vidas!</p>
      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="bg-white text-red-600 font-bold px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          Reiniciar nivel
        </button>
        <button
          onClick={onExit}
          className="bg-white text-red-600 font-bold px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          Salir al mundo
        </button>
      </div>
    </div>
  );
}