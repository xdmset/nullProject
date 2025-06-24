// Guardar usuario
document.addEventListener('DOMContentLoaded', () => {
  const registroForm = document.getElementById('registroForm');
  const loginForm = document.getElementById('loginForm');
  const recuperarForm = document.getElementById('recuperarForm');

  if (registroForm) {
    registroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const edad = document.getElementById('edad').value;
      const correo = document.getElementById('registroCorreo').value;
      const contrasena = document.getElementById('registroContrasena').value;

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      if (usuarios.find(u => u.correo === correo)) {
        alert('Este correo ya está registrado.');
        return;
      }

      usuarios.push({ nombre, edad, correo, contrasena });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert('Usuario registrado con éxito.');
      window.location.href = 'index.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = document.getElementById('loginCorreo').value;
      const contrasena = document.getElementById('loginContrasena').value;

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

      if (usuario) {
        alert(`Bienvenido, ${usuario.nombre}`);
        // Aquí podrías redirigir a una página principal real
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        window.location.href = 'Bienvenido.html';
      } else {
        alert('Correo o contraseña incorrectos');
      }
    });
  }
  

  if (recuperarForm) {
    recuperarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = document.getElementById('recuperarCorreo').value;
      const nuevaContrasena = document.getElementById('nuevaContrasena').value;

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioIndex = usuarios.findIndex(u => u.correo === correo);

      if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].contrasena = nuevaContrasena;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Contraseña actualizada con éxito.');
        window.location.href = 'index.html';
      } else {
        alert('Correo no encontrado.');
      }
    });
  }
});
