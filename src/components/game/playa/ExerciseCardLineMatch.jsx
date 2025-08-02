import React, { useState, useEffect } from "react";
import Xarrow from "react-xarrows";

export default function ExerciseCardLineMatch({ exercise, onCheckAnswer, lives }) {
  const [connections, setConnections] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [shuffledLetters, setShuffledLetters] = useState([]);

  // Baraja imágenes y letras al cargar el ejercicio
  useEffect(() => {
    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffle([...exercise.pairs]));
    setShuffledLetters(shuffle([...exercise.pairs.map((p) => p.letter)]));
  }, [exercise]);

  const handleImageClick = (imgId) => {
    setSelectedImageId(imgId);
  };

  const handleLetterClick = (letter) => {
    if (!selectedImageId) return;

    const toId = `letter-${letter}`;

    const alreadyConnected = connections.find(
      (conn) => conn.from === selectedImageId || conn.to === toId
    );
    if (alreadyConnected) return;

    setConnections([...connections, { from: selectedImageId, to: toId }]);
    setSelectedImageId(null);
  };

  // ✅ VALIDACIÓN CORREGIDA
  const handleCheck = () => {
    const correct = exercise.pairs.every((pair) =>
      connections.some(
        (conn) => conn.from === pair.id && conn.to === `letter-${pair.letter}`
      )
    );

    const isExact = correct && connections.length === exercise.pairs.length;
    onCheckAnswer(isExact);
  };

  const handleReset = () => {
    setConnections([]);
    setSelectedImageId(null);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">{exercise.prompt}</h2>
      <div className="flex justify-center gap-64 relative max-w-5xl mx-auto">
        {/* COLUMNA DE IMÁGENES */}
        <div className="flex flex-col gap-6">
          {shuffledImages.map((pair) => (
            <div
              key={pair.id}
              id={pair.id}
              className={`cursor-pointer w-24 h-24 border-4 rounded-lg flex items-center justify-center bg-white transition-all ${
                selectedImageId === pair.id ? "border-blue-700" : "border-gray-200"
              } hover:border-blue-400`}
              onClick={() => handleImageClick(pair.id)}
            >
              <img
                src={pair.image}
                alt={`Seña ${pair.letter}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* COLUMNA DE LETRAS */}
        <div className="flex flex-col gap-6">
          {shuffledLetters.map((letter) => (
            <div
              key={`letter-${letter}`}
              id={`letter-${letter}`}
              className="cursor-pointer w-24 h-24 flex items-center justify-center p-4 border-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 font-bold text-xl"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </div>
          ))}
        </div>

        {/* FLECHAS DE CONEXIÓN */}
        {connections.map((conn, idx) => (
          <Xarrow
            key={idx}
            start={conn.from}
            end={conn.to}
            color="blue"
            strokeWidth={2}
            showHead={true}
          />
        ))}
      </div>

      {/* BOTONES */}
      <div className="mt-6 flex justify-center gap-10">
        <button
          onClick={handleCheck}
          disabled={lives <= 0 || connections.length < exercise.pairs.length}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow"
        >
          Comprobar
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg shadow"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
