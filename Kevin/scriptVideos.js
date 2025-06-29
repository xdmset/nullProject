document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeButton = document.getElementById('close-sidebar');
  const mainContent = document.querySelector('main');
  
  // Abrir/cerrar sidebar
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    document.body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
  });
  
  closeButton.addEventListener('click', () => {
    sidebar.classList.remove('show');
    document.body.style.overflow = '';
  });
  
  // Cerrar sidebar al hacer clic fuera de él
  mainContent.addEventListener('click', (e) => {
    if (sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  // Prevenir que el clic dentro del sidebar cierre el menú
  sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Efecto hover suave para los enlaces
  const navLinks = document.querySelectorAll('aside nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transition = 'all 0.3s ease';
    });
  });
});