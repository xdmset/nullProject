import { useRandomExercises } from "../hooks/useRandomExercises";

function Ejercicios() {
  const [randomExercises, regenerate] = useRandomExercises();

  return (
    <div>
      <h2>Ejercicios Aleatorios</h2>
      <ul>
        {randomExercises.map((exercise) => (
          <li key={exercise.id}>
            <img
              src={exercise.image}
              alt={exercise.correctAnswer}
              width={50}
            />
            <p>Opciones: {exercise.options.join(", ")}</p>
          </li>
        ))}
      </ul>
      <button onClick={regenerate}>Volver a mezclar</button>
    </div>
  );
}

export default Ejercicios;
