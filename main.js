import { auth, db } from './firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const todosRef = collection(db, 'todos');

//Form
const form = document.querySelector('#todo-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const todoInput = document.querySelector('#todo-input');
  const todoText = todoInput.value.trim();


  if (todoText !== '') {
    // Agrega la nueva tarea a Firestore
    addDoc(todosRef, {
      title: todoText,
      completed: false
    })
      .then(() => {
        // Limpiar el campo de entrada de texto
        todoInput.value = '';
      })
      .catch((error) => {
        console.error('No mi rey, no sirvio', error);
      });
  }
});

//Impresión de datos
const todoList = document.querySelector('#todo-list');
const colorSelect = document.querySelector('#color-select');

// Snap de la conección de los datos
onSnapshot(todosRef, (querySnapshot) => {
  todoList.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const { title, completed } = doc.data();
    const todoItem = document.createElement('li');
    todoItem.textContent = title;
    if (completed) {
      todoItem.classList.add('completed');
    }
    todoList.appendChild(todoItem);
  });

  // Verificar si el usuario está autenticado
  const user = auth.currentUser;
  if (user) {
    // Habilitar la selección de color y agregar evento de cambio
    colorSelect.disabled = false;
    colorSelect.addEventListener('change', (e) => {
      const color = e.target.value;
      document.body.style.backgroundColor = color;
    });
  } else {
    // Si no hay usuario autenticado, deshabilitar la selección de color
    colorSelect.disabled = true;
  }
});

//Redirección
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
  window.location.href = './sign-up/sign.html';
});