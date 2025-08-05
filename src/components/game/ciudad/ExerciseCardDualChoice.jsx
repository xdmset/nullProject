import { useState, useEffect } from "react";

export default function ExerciseCardDualChoice({
  exercise,
  onCheckAnswer,
  lives,
  isChecking,
  resetSelections,
}) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    setSelectedColor(null);
    setSelectedNumber(null);
  }, [exercise, resetSelections]);

  const handleCheck = () => {
    if (!selectedColor || !selectedNumber || lives <= 0 || isChecking) return;

    const colorCorrect = selectedColor === exercise.correctAnswers.colorImage;
    const numberCorrect = selectedNumber === exercise.correctAnswers.numberImage;

    const bothCorrect = colorCorrect && numberCorrect;

    onCheckAnswer(bothCorrect);
  };

  const handleSelectColor = (img) => {
    if (lives <= 0 || isChecking) return;
    setSelectedColor(img);
  };

  const handleSelectNumber = (img) => {
    if (lives <= 0 || isChecking) return;
    setSelectedNumber(img);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 min-h-0">
      {/* Título más compacto */}
      <h2 className="text-base font-semibold mb-3 bg-blue-100 p-2 rounded text-center">
        {exercise.context}
      </h2>

      <div className="space-y-4">
        {/* Imagen de la pregunta - más pequeña y centrada */}
        <div className="flex justify-center">
          <img
            src={exercise.questionImage}
            alt="Pregunta"
            className="w-32 h-24 object-contain border rounded"
          />
        </div>

        {/* Instrucciones más compactas */}
        <p className="text-sm font-medium text-purple-700 text-center">
          Selecciona una <strong>imagen de color</strong> y una <strong>imagen de número</strong>
        </p>

        {/* Layout en dos columnas para pantallas grandes, stack en móviles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Selección de colores */}
          <div className="space-y-2">
            <p className="font-semibold text-sm text-gray-700 text-center">Opciones de color:</p>
            <div className="grid grid-cols-2 gap-2">
              {exercise.options.colorImages.map((img, index) => (
                <div
                  key={`color-${index}`}
                  onClick={() => handleSelectColor(img)}
                  className={`cursor-pointer p-1 border-2 rounded-lg transition-all duration-200 ${
                    selectedColor === img
                      ? "border-purple-600 bg-purple-100 scale-105"
                      : "border-gray-300"
                  } ${
                    lives <= 0 || isChecking
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:border-purple-400 hover:scale-102"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Color opción ${index + 1}`}
                    className="w-full h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Selección de números */}
          <div className="space-y-2">
            <p className="font-semibold text-sm text-gray-700 text-center">Opciones de número:</p>
            <div className="grid grid-cols-2 gap-2">
              {exercise.options.numberImages.map((img, index) => (
                <div
                  key={`number-${index}`}
                  onClick={() => handleSelectNumber(img)}
                  className={`cursor-pointer p-1 border-2 rounded-lg transition-all duration-200 ${
                    selectedNumber === img
                      ? "border-purple-600 bg-purple-100 scale-105"
                      : "border-gray-300"
                  } ${
                    lives <= 0 || isChecking
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:border-purple-400 hover:scale-102"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Número opción ${index + 1}`}
                    className="w-full h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botón de comprobación - más compacto */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleCheck}
            disabled={!selectedColor || !selectedNumber || lives <= 0 || isChecking}
            className={`px-6 py-2 text-sm font-bold rounded-lg shadow-md transition-all duration-200 ${
              selectedColor && selectedNumber && lives > 0 && !isChecking
                ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isChecking ? "Comprobando..." : "Comprobar Respuestas"}
          </button>
        </div>
      </div>
    </div>
  );
}