export default function ExerciseCard({ exercise, selectedOption, setSelectedOption, lives }) {
  const optionLetters = ['a)', 'b)', 'c)', 'd)'];
  const areImageOptions = exercise.options?.[0]?.startsWith('/src/assets/');

  return (
    <div className="text-center">

      <div className="mb-8"> 
        <h2 className="text-xl font-semibold">
          {exercise.question}
        </h2>
        {/* Texto del animal */}
        {exercise.text && (
          <span className="
            text-purple-700 
            font-bold 
            text-lg 
            block 
            mt-3
            transition-all 
            duration-300
            hover:scale-105 
            hover:text-purple-800
            transform
            cursor-default
            pb-1
          ">
            {exercise.text}
          </span>
        )}
      </div>

      {/* Mostrar imagen de pregunta si existe */}
      {exercise.image && (
        <img
          src={exercise.image}
          alt="Imagen de pregunta"
          className="mx-auto w-72 h-72 object-contain mb-8" // Aumenté el margen inferior
        />
      )}

      {/* Opciones con margen superior */}
      <div className="mt-6 grid grid-cols-2 gap-4"> 
        {exercise.options.map((opt, index) => {
          if (areImageOptions) {
            return (
              <div
                key={`${opt}-${index}`}
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
                  alt={`Opción ${optionLetters[index]}`}
                  className="w-full h-40 object-contain mx-auto"
                />
              </div>
            );
          } else {
            return (
              <button
                key={`${opt}-${index}`}
                onClick={() => lives > 0 && setSelectedOption(opt)}
                disabled={lives <= 0}
                className={`flex items-center justify-center py-3 px-4 font-bold rounded-lg shadow-lg transition-colors ${
                  selectedOption === opt
                    ? "bg-purple-600 text-white"
                    : lives > 0
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span className="mr-2 font-mono">{optionLetters[index]}</span>
                <span>{opt}</span>
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}