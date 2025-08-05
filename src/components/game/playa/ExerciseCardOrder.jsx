import React, { useState } from "react";

export default function ExerciseCardOrder({ exercise, onCheckAnswer, lives }) {
  const [order, setOrder] = useState([...exercise.images]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    const newOrder = [...order];
    const [movedItem] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, movedItem);
    setOrder(newOrder);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCheck = () => {
    // Obtenemos la letra correspondiente a cada imagen en el orden actual
    const currentLetters = order.map((img) => {
      const indexInOriginal = exercise.images.indexOf(img);
      return exercise.letters[indexInOriginal]; // usamos el nuevo arreglo
    });

    const isCorrect = JSON.stringify(currentLetters) === JSON.stringify(exercise.correctOrder);
    onCheckAnswer(isCorrect);
  };

  return (
    <div className="text-center">
      <p className="mb-4 font-semibold">{exercise.prompt}</p>
      <div className="flex gap-4 justify-center flex-wrap">
        {order.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Letra ${index}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="w-20 h-20 object-contain border-2 border-blue-300 rounded-lg cursor-move transition-transform transform hover:scale-105"
          />
        ))}
      </div>
      <button
        onClick={handleCheck}
        disabled={lives <= 0}
        className={`mt-6 font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300
          ${lives > 0 ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}
        `}
      >
        Comprobar orden
      </button>
    </div>
  );
}
