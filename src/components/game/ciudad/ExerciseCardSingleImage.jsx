export default function ExerciseCardSingleImage({ exercise, answer, setAnswer, checkAnswer, lives }) {
  const numberMap = {
    cero: "0", uno: "1", dos: "2", tres: "3", cuatro: "4",
    cinco: "5", seis: "6", siete: "7", ocho: "8", nueve: "9",
    diez: "10", once: "11", doce: "12", trece: "13", catorce: "14", quince: "15"
  };

  const reverseMap = Object.fromEntries(
    Object.entries(numberMap).map(([key, value]) => [value, key])
  );

  const handleCheckAnswer = () => {
    const userInput = answer?.trim().toLowerCase();
    if (!userInput) return;

    const userOptions = new Set();
    userOptions.add(userInput);

    if (numberMap[userInput]) {
      userOptions.add(numberMap[userInput]);
    }

    if (reverseMap[userInput]) {
      userOptions.add(reverseMap[userInput]);
    }

    const correctAnswer = exercise.correctAnswer.trim().toLowerCase();
    const correctOptions = new Set([correctAnswer]);

    if (numberMap[correctAnswer]) {
      correctOptions.add(numberMap[correctAnswer]);
    }

    if (reverseMap[correctAnswer]) {
      correctOptions.add(reverseMap[correctAnswer]);
    }

    console.log("📝 Usuario escribió:", userInput);
    console.log("✅ Opciones del usuario:", [...userOptions]);
    console.log("✔️ Opciones correctas:", [...correctOptions]);

    const isCorrect = [...userOptions].some(val => correctOptions.has(val));

    if (isCorrect) {
      checkAnswer(correctAnswer);
    } else {
      checkAnswer("wrong");
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">{exercise.question}</h2>

      <div className="flex justify-center mb-6">
        <img
          src={exercise.image}
          alt="Seña LSM"
          className="w-48 h-48 object-contain border-2 border-gray-200 rounded-lg"
        />
      </div>

      <div className="flex flex-col items-center">
        <input
          type="text"
          value={answer ?? ""}
          onChange={(e) => lives > 0 && setAnswer(e.target.value)}
          placeholder={lives > 0 ? "Escribe tu respuesta (palabra o número)..." : "Juego terminado"}
          className={`w-full max-w-md px-4 py-2 border-2 rounded-lg mb-4 focus:outline-none ${
            lives > 0 ? "border-purple-300 focus:border-purple-500" : "border-gray-300"
          }`}
          onKeyPress={(e) => lives > 0 && e.key === 'Enter' && handleCheckAnswer()}
          disabled={lives <= 0}
        />
        <button
          onClick={handleCheckAnswer}
          disabled={!answer || lives <= 0}
          className={`px-6 py-2 font-bold rounded-lg shadow-lg transition-colors
            ${answer && lives > 0
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          Comprobar
        </button>
      </div>
    </div>
  );
}