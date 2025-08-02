import { useState, useEffect } from 'react';

export default function ExerciseCardDualChoice({ 
  exercise, 
  onCheckAnswer,
  lives,
  isChecking,
  resetSelections
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  useEffect(() => {
    setSelectedImage(null);
    setSelectedText(null);
  }, [exercise, resetSelections]);

  const handleCheck = () => {
    if (!selectedImage || !selectedText || lives <= 0 || isChecking) return;
    
    const imageCorrect = selectedImage === exercise.correctAnswers.image;
    const textCorrect = selectedText === exercise.correctAnswers.text;
    const bothCorrect = imageCorrect && textCorrect;
    
    onCheckAnswer(bothCorrect);
  };

  const handleSelectImage = (img) => {
    if (lives <= 0 || isChecking) return;
    setSelectedImage(img);
  };

  const handleSelectText = (text) => {
    if (lives <= 0 || isChecking) return;
    setSelectedText(text);
  };

  return (
    <div className="text-center">
      {/* Contexto */}
      <h2 className="text-xl font-semibold mb-4 bg-blue-100 p-3 rounded-lg">
        {exercise.context}
      </h2>

      {/* Instrucciones */}
      <p className="text-lg font-medium text-purple-700 mb-6">
        Selecciona 1 imagen y 1 texto que coincidan con la pregunta
      </p>

      {/* Selección de imágenes */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {exercise.options.images.map((img, index) => (
          <div
            key={`img-${index}`}
            onClick={() => handleSelectImage(img)}
            className={`cursor-pointer p-2 border-4 rounded-lg transition-all ${
              selectedImage === img ? 'border-purple-700 bg-purple-100' : 'border-gray-200'
            } ${
              lives <= 0 || isChecking ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'
            }`}
          >
            <img
              src={img}
              alt={`Opción ${index + 1}`}
              className="w-full h-40 object-contain mx-auto"
            />
            {selectedImage === img && (
              <div className="mt-2 text-sm font-semibold text-purple-700">Seleccionada</div>
            )}
          </div>
        ))}
      </div>

      {/* Selección de textos */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {exercise.options.texts.map((text, index) => (
          <button
            key={`text-${index}`}
            onClick={() => handleSelectText(text)}
            disabled={lives <= 0 || isChecking}
            className={`py-3 px-4 font-bold rounded-lg shadow-lg transition-colors ${
              selectedText === text 
                ? 'bg-purple-700 text-white' 
                : lives > 0 && !isChecking
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  : 'bg-gray-100 text-gray-400'
            }`}
          >
            {text}
          </button>
        ))}
      </div>

      {/* Botón de comprobación */}
      <button
        onClick={handleCheck}
        disabled={!selectedImage || !selectedText || lives <= 0 || isChecking}
        className={`px-8 py-3 text-lg font-bold rounded-lg shadow-lg transition-colors ${
          selectedImage && selectedText && lives > 0 && !isChecking
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isChecking ? 'Comprobando...' : 'Comprobar Respuestas'}
      </button>
    </div>
  );
}