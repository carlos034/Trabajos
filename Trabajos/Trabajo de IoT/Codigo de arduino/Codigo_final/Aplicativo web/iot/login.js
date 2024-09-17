// login.js

// Función para iniciar sesión
function loginUser(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto
  
    // Obtener los valores del formulario de inicio de sesión
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Enviar los datos al servidor para la verificación
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Simplificación: ES6 permite { username: username, password: password }
    })
      .then(response => {
        if (response.ok) {
          console.log('Inicio de sesión exitoso');
          window.location.href = '/dashboard.html';
        } else {
          console.log('Error al iniciar sesión');
        }
      })
      .catch(error => console.error('Error:', error));
  
    // Limpia los campos después del envío
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }
  
  // Agregar el listener al formulario de inicio de sesión
  document.getElementById('loginForm').addEventListener('submit', loginUser);
  