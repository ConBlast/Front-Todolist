import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const loginButton = document.querySelector('.button');

const loginForm = document.querySelector('.login-form');

loginButton.addEventListener('click', (e) => {
    e.preventDefault();

  // Obtén los valores de correo electrónico y contraseña
  const email = document.querySelector('#username-input').value;
  const password = document.querySelector('#password-input').value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // El inicio de sesión fue exitoso, redirige a index.html
    window.location.href = "/index.html";
  })
  .catch((error) => {
    console.error("Error al iniciar sesión:", error);
    // Mostrar una alerta de error solo si las credenciales son incorrectas
    if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
      alert("Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña.");
    }
  });

});