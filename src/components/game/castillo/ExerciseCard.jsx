export default function ExerciseCard({ exercise, selectedOption, setSelectedOption, isImageOptions, lives }) {
  const optionLetters = ['a', 'b', 'c', 'd'];
  
  return (
    <div className="text-center">
      {/* Mostrar siempre la pregunta definida en el ejercicio */}
      <h2 className="text-xl font-semibold mb-4">
        {exercise.question || exercise.text}
      </h2>

      {isImageOptions ? (
        // Modo para ejercicios con imágenes como opciones
        <div className="grid grid-cols-2 gap-4">
          {exercise.options.map((opt, index) => (
            <div
              key={opt}
              onClick={() => lives > 0 && setSelectedOption(opt)}
              className={`relative cursor-pointer p-2 border-4 rounded-lg transition-all ${
                lives > 0 ? "cursor-pointer" : "cursor-not-allowed"
              } ${
                selectedOption === opt
                  ? "border-purple-700 bg-purple-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="absolute -top-3 -left-3 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {optionLetters[index]}
              </span>
              <img
                src={opt}
                alt="Opción"
                className="w-full h-40 object-contain mx-auto"
              />
            </div>
          ))}
        </div>
      ) : (
        // Modo para ejercicios con imagen como pregunta
        <>
          <img
            src={exercise.image}
            alt="signo"
            className="mx-auto w-72 h-72 object-contain mb-6"
          />
          <div className="grid grid-cols-2 gap-4">
            {exercise.options.map((opt, index) => (
              <button
                key={opt}
                onClick={() => lives > 0 && setSelectedOption(opt)}
                disabled={lives <= 0}
                className={`flex items-center py-2 px-4 font-bold rounded shadow-lg transition-colors ${
                  selectedOption === opt
                    ? "bg-purple-700 text-white"
                    : lives > 0
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                <span className="mr-3 font-mono text-lg">{optionLetters[index]})</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}