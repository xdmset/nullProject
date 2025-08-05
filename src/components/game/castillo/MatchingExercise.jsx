import { useState, useEffect } from "react";

export default function MatchingExercise({ exercise, onComplete, lives }) {
  const { leftItems, rightItems, question } = exercise;
  const [matches, setMatches] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMatches({});
    setSelectedItem(null);
    setIsSubmitting(false);
  }, [exercise]);

  const handleItemClick = (id, isLeft) => {
    if (isSubmitting || lives <= 0 || isMatched(id, isLeft)) return;

    if (!isLeft && !selectedItem) return;

    if (isLeft) {
      if (selectedItem?.id === id && selectedItem?.isLeft) {
        setSelectedItem(null);
        return;
      }
      setSelectedItem({ id, isLeft: true });
      return;
    }

    if (selectedItem?.isLeft) {
      const leftItem = leftItems.find(item => item.id === selectedItem.id);
      const rightItem = rightItems.find(item => item.id === id);
      const isCorrect = rightItem.text.toLowerCase() === 
                       leftItem.image.split('/').pop().split('.')[0].toLowerCase();

      if (isCorrect) {
        const newMatches = { ...matches, [selectedItem.id]: id };
        setMatches(newMatches);
        setSelectedItem(null);
        
        if (Object.keys(newMatches).length === leftItems.length) {
          setIsSubmitting(true);
          setTimeout(() => onComplete(true), 500);
        }
      } else {
        setIsSubmitting(true);
        setTimeout(() => {
          setSelectedItem(null);
          setIsSubmitting(false);
          onComplete(false);
        }, 1000);
      }
    }
  };

  const isMatched = (id, isLeft) => {
    return isLeft ? matches[id] !== undefined : Object.values(matches).includes(id);
  };

  const isSelected = (id, isLeft) => {
    return selectedItem?.id === id && selectedItem?.isLeft === isLeft;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">{question}</h2>
      
      <div className="mb-4 text-center text-sm text-gray-600 italic">
        Selecciona primero una imagen (izquierda) y luego su texto correspondiente (derecha)
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna izquierda (imágenes) */}
        <div className="w-full md:w-1/2 space-y-6">
          {leftItems.map(item => (
            <div
              key={item.id}
              className={`flex items-center h-36 p-4 rounded-lg transition-all bg-white
                ${isSelected(item.id, true) 
                  ? 'border-4 border-[#7024ac] shadow-md' 
                  : 'border-2 border-gray-300 hover:border-gray-400'
                }
                ${isMatched(item.id, true) ? 'border-green-500' : ''}
                ${isSubmitting || lives <= 0 ? 'pointer-events-none' : 'cursor-pointer'}
              `}
              onClick={() => handleItemClick(item.id, true)}
            >
              <div className="flex items-center justify-center w-full h-full">
                <img 
                  src={item.image} 
                  alt={item.id} 
                  className="w-36 h-36 object-contain p-2"
                />
              </div>
              {isMatched(item.id, true) && (
                <span className="ml-auto text-green-600 font-bold text-xl">✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Columna derecha (textos) */}
        <div className="w-full md:w-1/2 space-y-6">
          {rightItems.map(item => (
            <div
              key={item.id}
              className={`flex items-center justify-center h-36 p-4 rounded-lg transition-all bg-white border-2
                ${isMatched(item.id, false) 
                  ? 'border-green-500' 
                  : 'border-gray-300 hover:border-gray-400'
                }
                ${isSubmitting || lives <= 0 ? 'pointer-events-none' : 'cursor-pointer'}
              `}
              onClick={() => handleItemClick(item.id, false)}
            >
              <span className="text-xl font-medium flex-grow text-center">
                {item.text}
              </span>
              {isMatched(item.id, false) && (
                <span className="ml-auto text-green-600 font-bold text-xl">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {Object.keys(matches).length === leftItems.length && (
        <div className="mt-4 text-center text-green-600 font-bold">
          ¡Todos los elementos están emparejados correctamente!
        </div>
      )}

      {lives <= 0 && (
        <div className="mt-4 text-center text-red-600 font-bold">
          No tienes más vidas. Continúa practicando pero no podrás avanzar.
        </div>
      )}
    </div>
  );
}