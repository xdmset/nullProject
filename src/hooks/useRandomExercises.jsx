import { useState, useEffect, useRef, useCallback } from "react";

export function useRandomExercises(count = 6, source = []) {
  const [randomExercises, setRandomExercises] = useState([]);

  // Memoriza generateRandom para evitar que cambie en cada render
  const generateRandom = useCallback(() => {
    if (!source || source.length === 0) {
      setRandomExercises([]);
      return;
    }
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    setRandomExercises(shuffled.slice(0, count));
  }, [count, source]);

  // Generar aleatorios automáticamente cuando cambian source o count
  useEffect(() => {
    generateRandom();
  }, [generateRandom]);

  return [randomExercises, generateRandom];
}
