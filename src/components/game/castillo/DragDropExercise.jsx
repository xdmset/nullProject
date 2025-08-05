import { useState, useRef, useEffect } from "react";

export default function DragDropExercise({ exercise, onComplete, lives }) {
  const { background, elements, question } = exercise;
  const [draggedItems, setDraggedItems] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);
  const containerRef = useRef(null);

  // Resetear estado cuando cambia el ejercicio
  useEffect(() => {
    setDraggedItems({});
    setIsSubmitting(false);
  }, [exercise]);

  const handleDrop = (elementId, position) => {
    if (isSubmitting || lives <= 0) return;
    setDraggedItems(prev => ({ 
      ...prev, 
      [elementId]: position
    }));
    setDraggingItem(null);
  };

  const handleDragStart = (e, elementId) => {
    if (isSubmitting || lives <= 0) return;
    e.dataTransfer.setData("elementId", elementId);
    setDraggingItem(elementId);
    e.currentTarget.style.opacity = "0.4";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('drop-target')) {
      e.target.style.transform = 'scale(1.05)';
    }
  };

  const handleDragLeave = (e) => {
    if (e.target.classList.contains('drop-target')) {
      e.target.style.transform = 'scale(1)';
    }
  };

  const handleDragEnd = (e, elementId) => {
    e.currentTarget.style.opacity = "1";
    setDraggingItem(null);
    if (!e.dataTransfer.dropEffect && !isSubmitting && lives > 0) {
      removeItem(elementId);
    }
  };

  const checkAnswers = () => {
    if (isSubmitting || lives <= 0) return;
    
    setIsSubmitting(true);
    const allCorrect = elements.every(element => {
      return draggedItems[element.id] === element.correctPosition;
    });
    
    onComplete(allCorrect);
    
    if (!allCorrect) {
      setTimeout(() => {
        setDraggedItems({});
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const removeItem = (elementId) => {
    const newItems = { ...draggedItems };
    delete newItems[elementId];
    setDraggedItems(newItems);
  };

  const getPositionStyle = (position) => {
    const positions = {
      //Arbol
      'top-left': { top: '15%', left: '25%' },
      'top-right': { top: '15%', left: '65%' },
      'center': { top: '50%', left: '45%' },

      //Casa
      'habitacionazul': { top: '35%', left: '55%' },
      'habitacionrosa': { top: '70%', left: '35%' },
      'cuna': { top: '35%', left: '35%' },

      //Parque
      'banco': { top: '45%', left: '20%' },
      'pasamanos': { top: '45%', left: '70%' },
      'resbaladilla': { top: '60%', left: '50%' },

      //Familia
      'extremoizq': { top: '75%', left: '19%' },
      'centro': { top: '75%', left: '43%' },
      'extremoder': { top: '75%', left: '66%' },

      //Familiatext
      'izq': { top: '45%', left: '15%' },
      'cent': { top: '45%', left: '44%' },
      'der': { top: '45%', left: '72%' },

      //preguntas
      'celular': { top: '70%', left: '16%' },
      'persona': { top: '70%', left: '40%' },
      'plaza': { top: '70%', left: '68%' }
    };

    return positions[position] || positions.center;
  };

  const allPlaced = elements.every(element => draggedItems[element.id]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">{question}</h2>
      
      {/* Imagen principal (fondo) */}
      <div 
        ref={containerRef}
        className={`relative w-full h-96 bg-contain bg-no-repeat bg-center border-2 rounded-lg overflow-hidden
          ${lives <= 0 ? 'opacity-80' : ''}
        `}
        style={{ backgroundImage: `url(${background})` }}
      >
        {elements.map(element => {
          if (draggedItems[element.id]) {
            const position = getPositionStyle(draggedItems[element.id]);
            return (
              <div
                key={`dragged-${element.id}`}
                className={`absolute w-24 h-24 transition-transform duration-200 ${
                  lives <= 0 ? 'cursor-default' : 'cursor-move'
                } ${draggingItem === element.id ? 'animate-pulse' : ''}`}
                style={position}
                onClick={() => lives > 0 && !isSubmitting && removeItem(element.id)}
              >
                <img 
                  src={element.image} 
                  alt={element.id} 
                  className="w-full h-full object-contain"
                />
              </div>
            );
          }
          return null;
        })}

        {/* Áreas de destino */}
        {elements.map(element => {
          const hasItem = Object.entries(draggedItems).some(([id, pos]) => 
            id !== element.id && pos === element.correctPosition
          );
          
          return (
            <div
              key={`target-${element.id}`}
              className={`absolute w-24 h-24 border-3 rounded-lg transition-all drop-target
                ${draggedItems[element.id] === element.correctPosition 
                  ? 'border-4 border-[#7024ac] bg-[#7024ac] bg-opacity-30' 
                  : 'border-4 border-black bg-white bg-opacity-50'}
                ${lives <= 0 ? 'pointer-events-none' : ''}
              `}
              style={getPositionStyle(element.correctPosition)}
              onDrop={(e) => lives > 0 && !isSubmitting && handleDrop(e.dataTransfer.getData("elementId"), element.correctPosition)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            ></div>
          );
        })}
      </div>

      {/* Elementos para arrastrar */}
      <div className={`flex flex-wrap justify-center gap-4 mt-6 p-4 bg-gray-100 rounded-lg
        ${lives <= 0 ? 'opacity-80' : ''}
      `}>
        {elements.map((element, index) => (
          !draggedItems[element.id] && (
            <div
              key={element.id}
              className={`relative w-24 h-24 transition-all duration-200 ${
                lives <= 0 ? 'cursor-not-allowed' : 
                isSubmitting ? 'cursor-not-allowed' : 
                'cursor-grab active:cursor-grabbing hover:scale-105'
              } ${draggingItem === element.id ? 'opacity-40' : ''}`}
              draggable={lives > 0 && !isSubmitting}
              onDragStart={(e) => lives > 0 && !isSubmitting && handleDragStart(e, element.id)}
              onDragEnd={(e) => lives > 0 && !isSubmitting && handleDragEnd(e, element.id)}
            >
              <span className="absolute -top-3 -left-3 bg-[#7024ac] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold z-10">
                {index + 1}
              </span>
              <img 
                src={element.image} 
                alt={element.id} 
                className="w-full h-full object-contain relative"
              />
            </div>
          )
        ))}
      </div>

      {/* Botón de comprobación */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={checkAnswers}
          disabled={!allPlaced || isSubmitting || lives <= 0}
          className={`px-8 py-3 rounded-lg font-bold shadow-lg transition-all text-lg
            ${allPlaced && !isSubmitting && lives > 0
              ? 'bg-[#7024ac] hover:bg-[#5a1d8a] text-white' 
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'}
          `}
        >
          {isSubmitting ? 'Comprobando...' : lives <= 0 ? 'Sin vidas disponibles' : 'Comprobar respuestas'}
        </button>
      </div>
    </div>
  );
}