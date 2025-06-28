const exercises = [
  {
    image: 'img/C.png',
    answer: 'C',
    options: ['E', 'C', 'P']
  },
  {
    image: 'img/A.png',
    answer: 'A',
    options: ['A', 'B', 'M']
  }
];

let currentIndex = 0;
let selected = null;

const signImage = document.getElementById('sign-image');
const optionsContainer = document.querySelector('.options');
const checkBtn = document.getElementById('checkBtn');
const livesDisplay = document.getElementById('lives');

// Función para reproducir sonidos
function playSound(type) {
  try {
    let audio;
    switch(type) {
      case 'success':
        // Sonido de éxito - frecuencia alta y alegre
        audio = new Audio();
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBDGA0fPTgjMGH27A7+OZURE';
        break;
      case 'error':
        // Sonido de error - frecuencia baja y descendente
        audio = new Audio();
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBDGA0fPTgjMGH27A7+OZURE';
        break;
      case 'warning':
        // Sonido de advertencia - tono medio
        audio = new Audio();
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBDGA0fPTgjMGH27A7+OZURE';
        break;
    }
    if (audio) {
      audio.volume = 0.3; // Volumen moderado
      audio.play().catch(e => console.log('Error reproduciendo sonido:', e));
    }
  } catch (error) {
    console.log('Error con audio:', error);
  }
}

// Función mejorada para crear sonidos más realistas
function createTone(frequency, duration, type = 'sine') {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.log('Web Audio API no disponible:', error);
  }
}

function playNotificationSound(type) {
  switch(type) {
    case 'success':
      // Sonido alegre ascendente (Do-Mi-Sol)
      createTone(523.25, 0.15); // Do
      setTimeout(() => createTone(659.25, 0.15), 100); // Mi
      setTimeout(() => createTone(783.99, 0.2), 200); // Sol
      break;
    case 'danger':
      // Sonido descendente triste
      createTone(400, 0.2);
      setTimeout(() => createTone(300, 0.3), 150);
      break;
    case 'warning':
      // Sonido de advertencia - dos tonos iguales
      createTone(800, 0.1);
      setTimeout(() => createTone(800, 0.1), 200);
      break;
    case 'celebration':
      // Sonido épico de celebración - fanfarria completa
      playCelebrationFanfare();
      break;
  }
}

// Función para el sonido épico de celebración
function playCelebrationFanfare() {
  // Secuencia de fanfarria inspirada en juegos de éxito
  const notes = [
    { freq: 523.25, duration: 0.2, delay: 0 },    // Do
    { freq: 659.25, duration: 0.2, delay: 150 },  // Mi
    { freq: 783.99, duration: 0.2, delay: 300 },  // Sol
    { freq: 1046.5, duration: 0.3, delay: 450 },  // Do agudo
    { freq: 783.99, duration: 0.15, delay: 600 }, // Sol
    { freq: 1046.5, duration: 0.15, delay: 700 }, // Do agudo
    { freq: 1318.5, duration: 0.4, delay: 800 },  // Mi agudo - nota final épica
  ];

  notes.forEach(note => {
    setTimeout(() => {
      createTone(note.freq, note.duration, 'triangle'); // Usar triangle para sonido más suave
    }, note.delay);
  });

  // Agregar algunos acordes de fondo para más épica
  setTimeout(() => {
    // Acorde de Do mayor (Do-Mi-Sol) como base
    createTone(523.25, 0.6, 'sine'); // Do
    createTone(659.25, 0.6, 'sine'); // Mi
    createTone(783.99, 0.6, 'sine'); // Sol
  }, 900);
}

// Función mejorada para mostrar barra de notificación
function showNotificationBar(message, type = 'success', duration = 3000) {
  // Reproducir sonido
  playNotificationSound(type);
  
  // OCULTAR el botón comprobar cuando aparece la notificación
  if (checkBtn) {
    checkBtn.style.display = 'none';
  }
  
  // Remover barra existente si hay una
  const existingAlert = document.getElementById('notificationBar');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Crear la barra de notificación
  const alertHTML = `
    <div id="notificationBar" class="alert alert-${type} alert-dismissible fade show position-fixed w-100 m-0 rounded-0" 
         style="bottom: 0; left: 0; z-index: 1050; border: none; font-size: 1.1rem; padding: 15px 20px;">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <span class="me-2" style="font-size: 1.3rem;">${getIcon(type)}</span>
          <strong>${message}</strong>
        </div>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  `;

  // Agregar al DOM
  document.body.insertAdjacentHTML('beforeend', alertHTML);
  
  // Auto-remover después del tiempo especificado
  setTimeout(() => {
    const alert = document.getElementById('notificationBar');
    if (alert) {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
      
      // MOSTRAR nuevamente el botón comprobar cuando se quita la notificación
      if (checkBtn) {
        checkBtn.style.display = 'block';
      }
    }
  }, duration);
  
  // También mostrar el botón si el usuario cierra manualmente la notificación
  const alertElement = document.getElementById('notificationBar');
  if (alertElement) {
    alertElement.addEventListener('closed.bs.alert', () => {
      if (checkBtn) {
        checkBtn.style.display = 'block';
      }
    });
  }
}

function getIcon(type) {
  switch(type) {
    case 'success': return '✅';
    case 'danger': return '❌';
    case 'warning': return '⚠️';
    default: return 'ℹ️';
  }
}

// Función para mostrar modal de selección (solo para este caso)
function showSelectOptionModal() {
  showNotificationBar('Por favor selecciona una opción antes de continuar', 'warning', 2000);
}

// Función para mostrar modal de game over y completado
function showModal(title, message, type = 'info', showReloadBtn = false) {
  const existingModal = document.getElementById('gameModal');
  if (existingModal) {
    existingModal.remove();
  }

  // Modal especial para completado
  if (type === 'complete') {
    const modalHTML = `
      <div class="modal fade" id="gameModal" tabindex="-1" aria-labelledby="gameModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content" style="border: none; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <!-- Header colorido con gradiente -->
            <div class="modal-header" style="background: linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcf7f, #4dabf7); padding: 30px 20px; border: none;">
              <div class="w-100 text-center">
                <div style="font-size: 4rem; margin-bottom: 10px;">🎉</div>
                <h3 class="modal-title text-white mb-0" style="font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                  ¡SÚPER BIEN!
                </h3>
              </div>
            </div>
            
            <!-- Cuerpo del modal -->
            <div class="modal-body text-center" style="padding: 40px 30px; background: linear-gradient(to bottom, #f8f9ff, #e8f4fd);">
              <!-- Estrellas animadas -->
              <div style="font-size: 2.5rem; margin-bottom: 20px; animation: bounce 1s infinite alternate;">
                ⭐ ⭐ ⭐
              </div>
              
              <!-- Mensaje principal -->
              <h4 style="color: #2d3436; font-weight: bold; margin-bottom: 15px;">
                ¡Completaste la lección!
              </h4>
              
              <!-- Mensaje secundario más infantil -->
              <p style="color: #636e72; font-size: 1.1rem; margin-bottom: 25px; line-height: 1.5;">
                ¡Eres increíble aprendiendo lenguaje de señas! 🤟<br>
                <span style="color: #00b894; font-weight: bold;">¡Sigue así, campeón!</span>
              </p>
              
              <!-- Personaje celebrando -->
              <div style="font-size: 3rem; margin: 20px 0;">
                🙌
              </div>
            </div>
            
            <!-- Footer con botón colorido -->
            <div class="modal-footer justify-content-center" style="background: white; padding: 25px; border: none;">
              <button type="button" class="btn" data-bs-dismiss="modal" 
                      style="background: linear-gradient(45deg, #ff6b6b, #ffd93d); 
                             border: none; 
                             padding: 12px 30px; 
                             border-radius: 25px; 
                             color: white; 
                             font-weight: bold; 
                             font-size: 1.1rem;
                             box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
                             transition: transform 0.2s ease;">
                ¡Genial! 🎈
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Estilos para animaciones -->
      <style>
        @keyframes bounce {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        
        .btn:hover {
          transform: translateY(-2px) !important;
        }
      </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  } else {
    // Modal normal para otros casos
    const modalHTML = `
      <div class="modal fade" id="gameModal" tabindex="-1" aria-labelledby="gameModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header ${getHeaderClass(type)}">
              <h5 class="modal-title text-white" id="gameModalLabel">
                ${getIcon(type)} ${title}
              </h5>
            </div>
            <div class="modal-body text-center">
              <p class="mb-0">${message}</p>
            </div>
            <div class="modal-footer justify-content-center">
              ${showReloadBtn ? 
                `<button type="button" class="btn btn-primary" id="reloadBtn">Intentar de nuevo</button>` :
                `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>`
              }
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  const modal = new bootstrap.Modal(document.getElementById('gameModal'));
  modal.show();

  if (showReloadBtn) {
    document.getElementById('reloadBtn').addEventListener('click', () => {
      location.reload();
    });
  }

  document.getElementById('gameModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('gameModal').remove();
  });
}

function getHeaderClass(type) {
  switch(type) {
    case 'success': return 'bg-success';
    case 'danger': return 'bg-danger';
    case 'warning': return 'bg-warning';
    case 'game-over': return 'bg-dark';
    case 'complete': return 'bg-primary';
    default: return 'bg-info';
  }
}

function loadExercise(index) {
  const exercise = exercises[index];
  signImage.src = exercise.image;
  selected = null;
  optionsContainer.innerHTML = '';
     
  // Actualizar barra de progreso (solo si la función existe)
  if (typeof updateProgressFromExercises === 'function') {
    updateProgressFromExercises(index, exercises);
  }
   
  exercise.options.forEach(letter => {
    const btn = document.createElement('button');
    btn.classList.add('option');
    btn.textContent = letter;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      btn.classList.add('selected');
      selected = letter;
    });
    optionsContainer.appendChild(btn);
  });
}

checkBtn.addEventListener('click', () => {
  if (!selected) {
    showSelectOptionModal();
    return;
  }
   
  const correct = exercises[currentIndex].answer === selected;
  
  if (correct) {
    // Mostrar barra verde de éxito
    showNotificationBar('¡Correcto! Muy bien hecho', 'success', 2000);
    
    // Avanzar al siguiente ejercicio después de un delay
    setTimeout(() => {
      currentIndex++;
      if (currentIndex < exercises.length) {
        loadExercise(currentIndex);
      } else {
        // Reproducir sonido de celebración ANTES del modal
        playNotificationSound('celebration');
        
        // Mostrar modal después de un pequeño delay para que se escuche el sonido
        setTimeout(() => {
          showModal(
            '¡Felicitaciones!', 
            '¡Has completado todos los ejercicios correctamente! 🎊', 
            'complete'
          );
        }, 500);
        
        // Llamar función de completado si existe
        if (typeof onGameComplete === 'function') {
          onGameComplete();
        }
      }
    }, 2000);
    
  } else {
    let lives = parseInt(livesDisplay.textContent);
    lives--;
    livesDisplay.textContent = lives;
    
    if (lives <= 0) {
      // Mostrar barra roja y luego modal de game over
      showNotificationBar('Respuesta incorrecta - Se acabaron las vidas', 'danger', 2000);
      setTimeout(() => {
        showModal(
          'Juego terminado', 
          'Se acabaron tus vidas. ¡Inténtalo de nuevo!', 
          'game-over', 
          true
        );
      }, 2000);
    } else {
      // Solo mostrar barra roja con vidas restantes
      showNotificationBar(`Respuesta incorrecta - Te quedan ${lives} vida${lives !== 1 ? 's' : ''}`, 'danger', 3000);
    }
  }
});

// Inicializar cuando todo esté cargado
document.addEventListener('DOMContentLoaded', function() {
  loadExercise(currentIndex);
     
  // Inicializar progreso solo si la función existe
  if (typeof initializeProgress === 'function') {
    initializeProgress(exercises);
  }
});