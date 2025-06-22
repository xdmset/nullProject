// Elementos del DOM para la barra de progreso
const progressBar = document.querySelector('.progress');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');

// Asegurar que la barra tenga la transición CSS
function ensureProgressBarAnimation() {
  if (progressBar) {
    progressBar.style.transition = 'width 0.5s ease-in-out';
  }
}

// Función principal para actualizar la barra de progreso
function updateProgress(currentIndex, totalExercises) {
  if (!progressBar) {
    console.warn('Elemento .progress no encontrado');
    return;
  }
  
  // Asegurar animación
  ensureProgressBarAnimation();
  
  // Calcular porcentaje de progreso (currentIndex + 1 porque el índice empieza en 0)
  const progressPercentage = ((currentIndex + 1) / totalExercises) * 100;
  
  console.log(`Actualizando progreso: ${currentIndex + 1}/${totalExercises} = ${progressPercentage}%`);
  
  // Actualizar la barra visual con un pequeño delay para asegurar la animación
  setTimeout(() => {
    progressBar.style.width = progressPercentage + '%';
  }, 50);
  
  // Actualizar los números de progreso (si existen los elementos)
  if (currentQuestionSpan) {
    currentQuestionSpan.textContent = currentIndex + 1;
  }
  if (totalQuestionsSpan) {
    totalQuestionsSpan.textContent = totalExercises;
  }
}

// Función para actualizar el progreso basado en tu array de exercises
function updateProgressFromExercises(currentIndex, exercisesArray) {
  updateProgress(currentIndex, exercisesArray.length);
}

// Inicializar la barra de progreso al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  // Asegurarse de que los elementos existan antes de inicializar
  if (progressBar) {
    // Si tienes acceso a tu array exercises aquí, úsalo
    // updateProgress(0, exercises.length);
    
    // O inicializar con valores por defecto
    updateProgress(0, 2); // Cambia el 2 por exercises.length cuando integres
  }
});

// Función de integración para usar en tu código existente
function initializeProgress(exercisesArray) {
  updateProgress(0, exercisesArray.length);
}

// Funciones auxiliares para integración fácil
function onCorrectAnswer(currentIndex, exercisesArray) {
  // Actualizar progreso cuando avanzan al siguiente ejercicio
  updateProgressFromExercises(currentIndex + 1, exercisesArray);
}

function onGameComplete() {
  // La barra ya estará al 100% cuando lleguen al final
  console.log('¡Lección completada!');
}

/*
INSTRUCCIONES DE INTEGRACIÓN:

1. En tu loadExercise(), después de cargar el ejercicio:
   updateProgressFromExercises(currentIndex, exercises);

2. En tu checkBtn event listener, cuando sea correcto y avances:
   if (correct) {
     currentIndex++;
     if (currentIndex < exercises.length) {
       loadExercise(currentIndex);
       // La barra se actualiza automáticamente en loadExercise
     } else {
       onGameComplete();
     }
   }

3. Al inicializar tu juego (después de definir exercises):
   initializeProgress(exercises);

EJEMPLO DE INTEGRACIÓN EN TU CÓDIGO:
- Agrega updateProgressFromExercises(currentIndex, exercises); en tu función loadExercise()
- Agrega initializeProgress(exercises); después de definir tu array exercises
*/