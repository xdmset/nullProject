import React from "react";

const colorClasses = {
  amarillo: "bg-yellow-400 text-black",
  azul: "bg-blue-500 text-white",
  blanco: "bg-white text-black border border-gray-300",
  bronce: "bg-yellow-800 text-white",
  cafe: "bg-yellow-900 text-white",
  gris: "bg-gray-400 text-black",
  morado: "bg-purple-600 text-white",
  naranja: "bg-orange-400 text-black",
  negro: "bg-black text-white",
  plata: "bg-gray-300 text-black",
  rojo: "bg-red-500 text-white",
  rosa: "bg-pink-400 text-black",
  verde: "bg-green-500 text-white",
};

export default function ExerciseCard({
  exercise,
  selectedOption,
  setSelectedOption,
  isImageOptions,
  lives,
}) {
  const optionLetters = ["a", "b", "c", "d"];

  return (
    <div className="text-center">
      {isImageOptions ? (
        // Pantalla 2: pregunta con texto + imagen a identificar + opciones de imagen
        <>
          <h2 className="text-xl font-semibold mb-4">
            {exercise.question
              ? exercise.question
              : "¿Qué imagen representa al miembro de la familia, "}
            <span className="text-purple-700">{exercise.text}</span>
            {exercise.question && exercise.text ? "" : "?"}
          </h2>
          <img
            src={exercise.image}
            alt="Imagen a identificar"
            className="mx-auto w-48 h-48 object-contain mb-6 rounded-lg shadow-md"
          />
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
                  alt={`Opción ${optionLetters[index]}`}
                  className="w-full h-32 object-contain mx-auto rounded"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        // Pantalla 1: pregunta con imagen + opciones de texto coloreadas
        <>
          <h2 className="text-xl font-semibold mb-4">
            ¿Qué color se representa en la imagen?
          </h2>
          <img
            src={exercise.image}
            alt="signo"
            className="mx-auto w-64 h-64 object-contain mb-6"
          />
          <div className="grid grid-cols-2 gap-4">
            {exercise.options.map((opt, index) => {
              const claseColor =
                colorClasses[opt.toLowerCase()] || "bg-gray-200 text-black";
              const selectedClass =
                selectedOption === opt ? "ring-4 ring-purple-600" : "";
              return (
                <button
                  key={opt}
                  onClick={() => lives > 0 && setSelectedOption(opt)}
                  disabled={lives <= 0}
                  className={`flex items-center py-2 px-4 font-bold rounded shadow-lg transition-colors ${claseColor} ${selectedClass} ${
                    lives <= 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:brightness-90"
                  }`}
                >
                  <span className="mr-3 font-mono text-lg">
                    {optionLetters[index]}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
