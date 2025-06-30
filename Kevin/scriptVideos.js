document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeButton = document.getElementById('close-sidebar');
  const mainContent = document.querySelector('main');
  
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    document.body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
  });
  
  closeButton.addEventListener('click', () => {
    sidebar.classList.remove('show');
    document.body.style.overflow = '';
  });
  
  mainContent.addEventListener('click', (e) => {
    if (sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  const navLinks = document.querySelectorAll('aside nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transition = 'all 0.3s ease';
    });
  });
});