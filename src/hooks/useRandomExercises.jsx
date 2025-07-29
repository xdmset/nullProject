import { useState, useEffect, useRef, useCallback } from "react";

export function useRandomExercises(count = 6, source = []) {
  const [randomExercises, setRandomExercises] = useState([]);

  const generateRandom = useCallback(() => {
    const safeSource = Array.isArray(source) ? source : [];

    if (safeSource.length === 0) {
      setRandomExercises([]);
      return;
    }

    const shuffled = [...safeSource].sort(() => Math.random() - 0.5);
    setRandomExercises(shuffled.slice(0, count));
  }, [count, source]);

  useEffect(() => {
    generateRandom();
  }, [generateRandom]);

  return [randomExercises, generateRandom];
}
