import { useState, useEffect } from 'react';

export default function ExerciseCardSingleImage({
  exercise,
  answer,
  setAnswer,
  checkAnswer,
  lives,
  isChecking
}) {
  useEffect(() => {
    setAnswer('');
  }, [exercise, isChecking]);

  // ✨ Nueva función local para validar mayúsculas/minúsculas
  const handleCheckAnswer = () => {
    const userInput = answer.trim().toLowerCase();
    const correct = exercise.correctAnswer.trim().toLowerCase();

    if (userInput === correct) {
      checkAnswer(exercise.correctAnswer); // respuesta correcta
    } else {
      checkAnswer("wrong"); // respuesta incorrecta
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">{exercise.question}</h2>

      <div className="flex justify-center mb-6">
        <img
          src={exercise.image}
          alt="Seña LSM"
          className="w-64 h-64 object-contain border-2 border-gray-200 rounded-lg"
        />
      </div>

      <div className="flex flex-col items-center">
        <input
          type="text"
          value={answer ?? ""}
          onChange={(e) => lives > 0 && setAnswer(e.target.value)}
          placeholder={lives > 0 ? "Escribe tu respuesta..." : "Juego terminado"}
          className={`w-full max-w-md px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none ${
            lives > 0 ? "border-purple-300 focus:border-purple-500" : "border-gray-300"
          }`}
          onKeyDown={(e) => lives > 0 && e.key === 'Enter' && handleCheckAnswer()}
          disabled={lives <= 0}
        />
        <button
          onClick={handleCheckAnswer}
          disabled={!answer || lives <= 0 || isChecking}
          className={`px-6 py-2 font-bold rounded-lg shadow-lg transition-colors
            ${answer && lives > 0 && !isChecking
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          {isChecking ? 'Comprobando...' : 'Comprobar'}
        </button>
      </div>
    </div>
  );
}
