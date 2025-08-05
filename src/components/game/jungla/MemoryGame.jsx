import { useState, useEffect } from 'react';

export default function MemoryGame({ exercise, onComplete, lives }) {
  const { pairs, question, mode = 'image-text' } = exercise; // 'image-text' o 'image-image'
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const [memorizeMessage, setMemorizeMessage] = useState("Memoriza bien las cartas para responder");
  
  // Efecto para el tiempo de memorización
  useEffect(() => {
    setDisabled(true);
    setShowAll(true);
    setMemorizeMessage("Memoriza bien las cartas para responder");
    
    const timer = setTimeout(() => {
      setShowAll(false);
      setDisabled(false);
      setMemorizeMessage(question);
    }, 4000);

    return () => clearTimeout(timer);
  }, [exercise, question]);

  // Mezclar las cartas más efectivamente
  const shuffleCards = (cards) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Inicializar el juego
  const initializeGame = () => {
    let allCards = [];
    
    if (mode === 'image-text') {
      // Modo imagen-texto (original)
      const imageCards = pairs.map((pair, index) => ({
        ...pair,
        id: index * 2,
        isImage: true,
        matchId: pair.text.toLowerCase()
      }));
      
      const textCards = pairs.map((pair, index) => ({
        text: pair.text,
        id: index * 2 + 1,
        isImage: false,
        matchId: pair.text.toLowerCase()
      }));

      allCards = [...imageCards, ...textCards];
    } else {
      // Modo imagen-imagen (nuevo)
      const cardPairs = pairs.flatMap((pair, index) => [
        {
          id: index * 2,
          image: pair.image,
          matchId: pair.text.toLowerCase(),
          isImage: true
        },
        {
          id: index * 2 + 1,
          image: pair.image2 || pair.image, // Usa image2 si existe, sino la misma imagen
          matchId: pair.text.toLowerCase(),
          isImage: true
        }
      ]);
      
      allCards = cardPairs;
    }

    setCards(shuffleCards(allCards));
    setFlipped([]);
    setSolved([]);
    setShowAll(true);
    const timer = setTimeout(() => setShowAll(false), 4000);
    return () => clearTimeout(timer);
  };

  // Reiniciar el juego cuando cambia el ejercicio
  useEffect(() => {
    initializeGame();
  }, [exercise]);

  const handleClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id) || lives <= 0) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      checkForMatch(newFlipped);
    }
  };

  const checkForMatch = (flippedIds) => {
    const [first, second] = flippedIds;
    const card1 = cards.find(c => c.id === first);
    const card2 = cards.find(c => c.id === second);

    // Verificar si hacen match según el modo de juego
    let isMatch = false;
    
    if (mode === 'image-text') {
      // Modo imagen-texto: una debe ser imagen y otra texto con mismo matchId
      isMatch = (
        (card1.isImage && !card2.isImage && card1.matchId === card2.matchId) || 
        (!card1.isImage && card2.isImage && card1.matchId === card2.matchId)
      );
    } else {
      // Modo imagen-imagen: ambas deben ser imágenes con mismo matchId pero diferente id
      isMatch = (
        card1.isImage && 
        card2.isImage && 
        card1.matchId === card2.matchId && 
        card1.id !== card2.id
      );
    }

    if (isMatch) {
      setSolved([...solved, ...flippedIds]);
      setFlipped([]);
      setDisabled(false);

      if (solved.length + 2 === cards.length) {
        setTimeout(() => onComplete(true), 500);
      }
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
        onComplete(false);
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6 text-center">
        {memorizeMessage}
      </h2>
      
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || solved.includes(card.id) || showAll;
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`relative h-40 rounded-xl cursor-pointer transition-all duration-500 transform ${
                isFlipped ? 'rotate-y-180 bg-white shadow-md' : 'bg-purple-600'
              }`}
              style={{ perspective: '1000px' }}
            >
              <div className={`absolute inset-0 flex items-center justify-center backface-hidden transition-all duration-500 ${
                isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'
              }`}>
                {card.isImage ? (
                  <img 
                    src={card.image} 
                    alt={card.text || 'Imagen del juego'} 
                    className="h-32 object-contain p-2" 
                  />
                ) : (
                  <span className="text-xl font-bold text-center p-2">{card.text}</span>
                )}
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl flex items-center justify-center ${
                isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100 rotate-y-0'
              }`}>
                <span className="text-white text-4xl">?</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}