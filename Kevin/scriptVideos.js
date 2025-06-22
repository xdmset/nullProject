const toggleButton = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeButton = document.getElementById('close-sidebar');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});

closeButton.addEventListener('click', () => {
  sidebar.classList.remove('show');
});