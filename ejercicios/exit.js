// Función para verificar si mostrar el modal basado en el progreso
function shouldShowExitModal() {
  // Obtener el progreso actual (ejemplo: del ancho de la barra de progreso)
  const progressBar = document.querySelector('.progress');
  const progressWidth = parseInt(progressBar.style.width) || 80; // Default 80%
  
  // Mostrar modal solo si hay progreso (más del 10%)
  return progressWidth > 10;
}

// Función para manejar el clic en la X
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.querySelector('.close-btn');
  
  closeBtn.addEventListener('click', function(e) {
    // Verificar si debe mostrar el modal
    if (!shouldShowExitModal()) {
      // Si no hay progreso suficiente, salir directamente
      exitLesson();
      return;
    }
    
    // Si hay progreso, el modal se muestra automáticamente por Bootstrap
    // (ya está configurado con data-bs-toggle="modal" data-bs-target="#exitModal")
  });
});

// Función para salir de la lección
function exitLesson() {
  // Aquí puedes agregar tu lógica para salir
  // Por ejemplo: redirigir a la página principal
  
  // Mostrar confirmación
  console.log('Saliendo de la lección...');
  
  // Ejemplo: redirigir después de un breve delay
  setTimeout(() => {
    // window.location.href = 'index.html'; // Descomenta para redirigir
    alert('Saliendo de la lección...'); // Temporal para demostración
  }, 500);
}

// Función opcional para actualizar el progreso
function updateProgress(percentage) {
  const progressBar = document.querySelector('.progress');
  progressBar.style.width = percentage + '%';
}

// Función para agregar efectos adicionales al modal
document.addEventListener('DOMContentLoaded', function() {
  const exitModal = document.getElementById('exitModal');
  
  // Agregar sonido o efectos adicionales cuando se abre el modal
  exitModal.addEventListener('show.bs.modal', function () {
    // Agregar clase para animaciones adicionales
    this.querySelector('.warning-image').style.animationPlayState = 'running';
  });
  
  // Limpiar efectos cuando se cierra el modal
  exitModal.addEventListener('hide.bs.modal', function () {
    this.querySelector('.warning-image').style.animationPlayState = 'paused';
  });
});

// Ejemplo de uso para testing - puedes llamar esta función para cambiar el progreso
function setProgress(percentage) {
  updateProgress(percentage);
  console.log(`Progreso actualizado a: ${percentage}%`);
}