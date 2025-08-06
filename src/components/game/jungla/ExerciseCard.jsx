import React from 'react';

export default function ExerciseCard({ exercise, selectedOption, setSelectedOption, isChecking }) {
    const optionLetters = ['a)', 'b)', 'c)', 'd)'];
    const areImageOptions = exercise.options?.[0]?.startsWith('/src/assets/');

    return (
        <div className="text-center">
            <div className="mb-8"> 
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                    {exercise.question}
                </h2>
                {exercise.text && (
                    <span className="text-purple-700 font-bold text-lg block mt-3 cursor-default">
                        {exercise.text}
                    </span>
                )}
            </div>

            {exercise.image && (
                <img
                    src={exercise.image}
                    alt="Imagen de pregunta"
                    className="mx-auto w-64 h-64 object-contain mb-8"
                />
            )}

            <div className={`mt-6 grid grid-cols-2 gap-4 ${isChecking ? 'pointer-events-none opacity-70' : ''}`}> 
                {exercise.options.map((opt, index) => {
                    const isSelected = selectedOption === opt;
                    if (areImageOptions) {
                        return (
                            <div
                                key={`${opt}-${index}`}
                                onClick={() => !isChecking && setSelectedOption(opt)}
                                className={`relative p-2 border-4 rounded-lg transition-all duration-200 
                                    ${isChecking ? 'cursor-not-allowed' : 'cursor-pointer'}
                                    ${isSelected ? "border-purple-700 bg-purple-100 scale-105" : "border-gray-200 hover:border-gray-300"}`}
                            >
                                <span className="absolute -top-3 -left-3 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold z-10">
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
                                onClick={() => setSelectedOption(opt)}
                                disabled={isChecking}
                                className={`flex items-center justify-center py-3 px-4 font-bold rounded-lg shadow-lg transition-colors ${
                                    isSelected ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                } ${isChecking ? 'cursor-not-allowed' : ''}`}
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