import { db } from './firebase';
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
});