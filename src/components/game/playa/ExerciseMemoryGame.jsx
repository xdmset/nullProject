import { useState, useEffect } from 'react';

export default function MemoryGame({ exercise, onComplete, lives }) {
  const { pairs, question, mode = 'image-text' } = exercise;
  const [cards, setCards] = useState([]);
  const [renderCards, setRenderCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const [memorizeMessage, setMemorizeMessage] = useState("Memoriza bien las cartas para responder");
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleAnimations, setShuffleAnimations] = useState([]);
  const [shufflePhase, setShufflePhase] = useState('idle'); // 'idle', 'moving', 'settling'

  const shuffleCards = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateShuffleAnimations = (cardCount) => {
    return Array.from({ length: cardCount }, (_, idx) => ({
      delay: Math.random() * 400,
      // Fase 1: movimiento inicial más dramático
      phase1: {
        translateX: (Math.random() - 0.5) * 180,
        translateY: (Math.random() - 0.5) * 140,
        rotate: (Math.random() - 0.5) * 45,
        scale: 0.85 + Math.random() * 0.25,
      },
      // Fase 2: movimiento intermedio
      phase2: {
        translateX: (Math.random() - 0.5) * 120,
        translateY: (Math.random() - 0.5) * 100,
        rotate: (Math.random() - 0.5) * 30,
        scale: 0.9 + Math.random() * 0.15,
      }
    }));
  };

  const initializeGame = () => {
    let allCards = [];

    if (mode === 'image-text') {
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
      const cardPairs = pairs.flatMap((pair, index) => [
        {
          id: index * 2,
          image: pair.image,
          matchId: pair.text.toLowerCase(),
          isImage: true
        },
        {
          id: index * 2 + 1,
          image: pair.image2 || pair.image,
          matchId: pair.text.toLowerCase(),
          isImage: true
        }
      ]);
      allCards = cardPairs;
    }

    // Paso 1: mostrar orden original para memorizar
    setRenderCards(allCards);
    setCards(allCards);
    setShowAll(true);
    setDisabled(true);
    setIsShuffling(false);
    setShufflePhase('idle');
    setMemorizeMessage("Memoriza bien las cartas para responder");

    // Paso 2: generar animaciones y comenzar primera fase del shuffle
    setTimeout(() => {
      const animations = generateShuffleAnimations(allCards.length);
      setShuffleAnimations(animations);
      setIsShuffling(true);
      setShufflePhase('moving');
      setMemorizeMessage("¡Barajando cartas! Sigue su movimiento...");
    }, 2500);

    // Paso 3: fase intermedia - más movimiento
    setTimeout(() => {
      setShufflePhase('settling');
    }, 4200);

    // Paso 4: aplicar nuevo orden gradualmente durante la transición
    setTimeout(() => {
      const shuffled = shuffleCards(allCards);
      setRenderCards(shuffled);
      setCards(shuffled);
    }, 4800);

    // Paso 5: fase final - establecer posiciones finales
    setTimeout(() => {
      setShufflePhase('finalizing');
    }, 5800);

    // Paso 6: terminar animación y comenzar juego
    setTimeout(() => {
      setFlipped([]);
      setSolved([]);
      setShowAll(false);
      setIsShuffling(false);
      setShufflePhase('idle');
      setDisabled(false);
      setMemorizeMessage(question);
      setShuffleAnimations([]);
    }, 7500);
  };

  useEffect(() => {
    setMemorizeMessage("Memoriza bien las cartas para responder");
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

  const checkForMatch = (ids) => {
    const [first, second] = ids;
    const card1 = cards.find(c => c.id === first);
    const card2 = cards.find(c => c.id === second);
    let isMatch = false;

    if (mode === 'image-text') {
      isMatch = (
        (card1.isImage && !card2.isImage && card1.matchId === card2.matchId) ||
        (!card1.isImage && card2.isImage && card1.matchId === card2.matchId)
      );
    } else {
      isMatch = (
        card1.isImage && card2.isImage &&
        card1.matchId === card2.matchId && card1.id !== card2.id
      );
    }

    if (isMatch) {
      setSolved([...solved, ...ids]);
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
    <div className="p-4 transition-all duration-500 ease-in-out" style={{ height: '60vh', overflow: 'hidden' }}>
      <h2 className="text-xl font-bold mb-6 text-center transition-all duration-300" style={{ zIndex: 100, position: 'relative' }}>
        {memorizeMessage}
      </h2>

      <div 
        className="grid gap-4 mx-auto justify-center px-4 transition-all duration-1000 ease-in-out"
        style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            maxWidth: '900px',
            minHeight: '420px',
            position: 'relative',
            overflow: 'visible',
            paddingBottom: '2rem'
        }}
        >

        {renderCards.map((card, idx) => {
          const isFlipped = flipped.includes(card.id) || solved.includes(card.id) || showAll;
          const shuffleAnim = shuffleAnimations[idx] || {};
          
          // Determinar transformación según la fase
          let currentTransform = '';
          let currentTransition = '';
          let currentZIndex = 1;

          if (isShuffling) {
            currentZIndex = 20 + idx;
            
            if (shufflePhase === 'moving') {
              // Fase 1: Movimiento inicial dramático (movimientos contenidos)
              const phase1 = shuffleAnim.phase1 || {};
              currentTransform = `translateX(${(phase1.translateX || 0) * 0.4}px) 
                                 translateY(${(phase1.translateY || 0) * 0.4}px) 
                                 rotate(${(phase1.rotate || 0) * 0.8}deg) 
                                 scale(${phase1.scale || 1})`;
              currentTransition = `all 1700ms cubic-bezier(0.2, 0, 0.2, 1) ${shuffleAnim.delay || 0}ms`;
              
            } else if (shufflePhase === 'settling') {
              // Fase 2: Movimiento intermedio (movimientos contenidos)
              const phase2 = shuffleAnim.phase2 || {};
              currentTransform = `translateX(${(phase2.translateX || 0) * 0.3}px) 
                                 translateY(${(phase2.translateY || 0) * 0.3}px) 
                                 rotate(${(phase2.rotate || 0) * 0.6}deg) 
                                 scale(${phase2.scale || 1})`;
              currentTransition = `all 1600ms cubic-bezier(0.25, 0.1, 0.25, 1) ${Math.random() * 300}ms`;
              
            } else if (shufflePhase === 'finalizing') {
              // Fase 3: Retorno suave a posición final
              currentTransform = `translateX(0px) translateY(0px) rotate(0deg) scale(1)`;
              currentTransition = `all 1700ms cubic-bezier(0.25, 0.1, 0.25, 1) ${Math.random() * 400}ms`;
            }
          } else {
            currentTransition = 'all 500ms ease';
            currentTransform = 'none';
          }
          
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`relative h-40 rounded-xl cursor-pointer ${
                isFlipped ? 'rotate-y-180 bg-white shadow-md' : 'bg-purple-600'
              }`}
              style={{
                transition: currentTransition,
                transform: currentTransform,
                zIndex: currentZIndex,
                willChange: isShuffling ? 'transform' : 'auto',
                position: 'relative'
              }}
            >
              <div className={`absolute inset-0 flex items-center justify-center backface-hidden transition-all duration-500 ${
                isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'
              }`}>
                {card.isImage ? (
                  <img src={card.image} alt={card.text || 'Imagen'} className="h-32 object-contain p-2" />
                ) : (
                  <span className="text-xl font-bold text-center p-2">{card.text}</span>
                )}
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100 rotate-y-0'
              }`}>
                <span className="text-white text-4xl">?</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicador de progreso durante el shuffle */}
      {isShuffling && (
        <div className="text-center mt-6" style={{ zIndex: 1000, position: 'relative' }}>
          <div className="inline-flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              shufflePhase === 'moving' ? 'bg-purple-600 scale-125' : 'bg-gray-300'
            }`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              shufflePhase === 'settling' ? 'bg-purple-600 scale-125' : 'bg-gray-300'
            }`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              shufflePhase === 'finalizing' ? 'bg-purple-600 scale-125' : 'bg-gray-300'
            }`}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {shufflePhase === 'moving' && "Mezclando cartas..."}
            {shufflePhase === 'settling' && "Reposicionando..."}
            {shufflePhase === 'finalizing' && "Finalizando..."}
          </p>
        </div>
      )}
    </div>
  );
}