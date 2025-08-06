import React, { useState } from "react";

export default function ExerciseCardMatch({ exercise, onCheckAnswer, lives }) {
  const [matches, setMatches] = useState({});
  const [draggedImageId, setDraggedImageId] = useState(null);

  const handleDragStart = (id) => {
    setDraggedImageId(id);
  };

  const handleDrop = (letter) => {
    if (draggedImageId) {
      setMatches((prev) => ({
        ...prev,
        [letter]: draggedImageId
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = (letter) => {
    setMatches((prev) => {
      const updated = { ...prev };
      delete updated[letter];
      return updated;
    });
  };

  const handleCheck = () => {
    const correct = exercise.pairs.every(
      (pair) => matches[pair.letter] === pair.id
    );
    onCheckAnswer(correct);
  };

  const usedImageIds = Object.values(matches);
  const images = [...exercise.pairs].sort(() => 0.5 - Math.random());
  const letters = exercise.pairs.map((pair) => pair.letter);

  return (
    <div className="text-center">
      <p className="mb-4 font-semibold">{exercise.prompt}</p>

      {/* IMÁGENES DISPONIBLES */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {images.map((imgObj, idx) => {
          const isUsed = usedImageIds.includes(imgObj.id);
          return (
            <img
              key={imgObj.id}
              src={imgObj.image}
              alt={`img-${idx}`}
              draggable
              onDragStart={() => handleDragStart(imgObj.id)}
              className={`w-20 h-20 object-contain border-2 border-purple-300 rounded-lg cursor-move transition-transform hover:scale-105 ${
                isUsed ? "opacity-30 pointer-events-none" : ""
              }`}
            />
          );
        })}
      </div>

      {/* CAMPOS DE LETRAS */}
      <div className="flex justify-center gap-4 flex-wrap">
        {letters.map((letter) => {
          const matchedId = matches[letter];
          const matchedImgObj = exercise.pairs.find(p => p.id === matchedId);
          return (
            <div
              key={letter}
              onDrop={() => handleDrop(letter)}
              onDragOver={handleDragOver}
              className="w-24 h-24 bg-gray-100 border-2 border-dashed border-purple-400 rounded-lg flex items-center justify-center text-xl font-bold relative"
            >
              {matchedImgObj ? (
                <img
                  src={matchedImgObj.image}
                  alt="matched"
                  className="w-16 h-16 object-contain absolute cursor-pointer"
                  onClick={() => handleRemove(letter)}
                  title="Haz clic para eliminar"
                />
              ) : (
                letter
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleCheck}
        disabled={lives <= 0}
        className={`mt-6 font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300
          ${lives > 0 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}
        `}
      >
        Comprobar pares
      </button>
    </div>
  );
}
