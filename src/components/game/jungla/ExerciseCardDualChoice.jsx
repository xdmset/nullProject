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
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Título */}
      <h2 className="text-lg font-semibold mb-4 bg-blue-100 p-3 rounded-lg text-center">
        {exercise.context}
      </h2>

      <div className="space-y-6">
        {/* Imagen de la pregunta */}
        <div className="flex justify-center">
          <img
            src={exercise.questionImage}
            alt="Pregunta"
            className="w-64 h-48 object-contain border-2 border-gray-300 rounded-lg shadow-md"
          />
        </div>

        {/* Instrucciones */}
        <p className="text-base font-medium text-purple-700 text-center">
          Selecciona una <strong>imagen de habitat</strong> y una <strong>imagen de seña</strong>
        </p>

        {/* Layout en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Selección de habitats */}
          <div className="space-y-3">
            <p className="font-semibold text-base text-gray-700 text-center">Opciones de habitats:</p>
            <div className="grid grid-cols-2 gap-4">
              {exercise.options.colorImages.map((img, index) => (
                <div
                  key={`color-${index}`}
                  onClick={() => handleSelectColor(img)}
                  className={`cursor-pointer p-2 border-2 rounded-lg transition-all duration-200 flex flex-col items-center ${
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
                    className="w-full h-32 object-contain p-2"
                  />
                  <span className="text-sm mt-1 text-gray-600">
                    Opción {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selección de señas */}
          <div className="space-y-3">
            <p className="font-semibold text-base text-gray-700 text-center">Opciones de señas:</p>
            <div className="grid grid-cols-2 gap-4">
              {exercise.options.numberImages.map((img, index) => (
                <div
                  key={`number-${index}`}
                  onClick={() => handleSelectNumber(img)}
                  className={`cursor-pointer p-2 border-2 rounded-lg transition-all duration-200 flex flex-col items-center ${
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
                    className="w-full h-32 object-contain p-2"
                  />
                  <span className="text-sm mt-1 text-gray-600">
                    Opción {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botón de comprobación */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleCheck}
            disabled={!selectedColor || !selectedNumber || lives <= 0 || isChecking}
            className={`px-8 py-3 text-base font-bold rounded-lg shadow-md transition-all duration-200 ${
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
