import * as anims from './animations.js';
import { CONSTANT } from './constant.js';

// Variables
const todoList = document.querySelector('.todo__list');
const todoOptions = document.querySelector('.todo__options');
const todoInput = document.querySelector('.todo__input-area');
const inputIcon = document.querySelector('.todo__input-icon');
const itemsLeft = todoOptions.querySelector('.items-left');
const clearItemsBtn = todoOptions.querySelector('.clear-box');
const filterItems = todoOptions.querySelectorAll('.filter-option');

// On page load
updateCount();
resetInput();
getTodos().forEach(todo => {
  const todoElement = createTodoElement(todo.id, todo.content, todo.completed);
  todoList.appendChild(todoElement);
  anims.animationInTodo(todoElement);
  anims.animationInOptions(todoOptions);
});

// Functions
function getTodos() {
  return JSON.parse(localStorage.getItem('todo-list') || '[]');
}
function saveTodos(todos) {
  localStorage.setItem('todo-list', JSON.stringify(todos));
  updateCount();
}
function addTodo(content) {
  resetInput();
  const todos = getTodos();
  const todoObject = {
    id: Math.floor(Math.random() * CONSTANT.maxIdNum),
    content,
    completed: false,
  };

  anims.animationOutOptions(todoOptions);
  const todoElement = createTodoElement(todoObject.id, todoObject.content, todoObject.completed);
  todoList.appendChild(todoElement);
  anims.animationInTodo(todoElement);
  anims.animationInOptions(todoOptions);

  todos.push(todoObject);
  resetFilter();
  saveTodos(todos);
}
function createTodoElement(id, content, completed) {
  const todoHtml = `  
      <div class="check-box">
        <i class="fas fa-check check-icon"></i>
      </div>
      <h2 class="content">${capitalize(content)}</h2>
      <i class="fas fa-trash remove-icon"></i>
  `;

  const element = document.createElement('li');
  element.classList.add('todo-item');
  element.innerHTML = todoHtml;

  completed ? element.classList.add('completed') : element.classList.remove('completed');

  // EventListeners
  // -Checkbox
  element.querySelector('.check-box').addEventListener('click', () => {
    const todos = getTodos();
    const targetTodo = todos.find(todo => todo.id == id);

    element.classList.toggle('completed');
    targetTodo.completed = !targetTodo.completed;

    resetFilter();
    saveTodos(todos);
  });

  // -Remove icon
  element.querySelector('.remove-icon').addEventListener('click', () => deleteTodo(id, element));

  return element;
}
function deleteTodo(id, element) {
  const todos = getTodos();

  if (todos.length == 1) {
    anims.animationOutOptions(todoOptions);
  }

  const filteredTodos = todos.filter(todo => todo.id != id);

  saveTodos(filteredTodos);

  anims.animationOutTodo(element);
  setTimeout(() => todoList.removeChild(element), CONSTANT.duration * 1.5);
}
function updateCount() {
  const unCompletedTodos = getTodos().filter(todo => !todo.completed);
  itemsLeft.textContent = unCompletedTodos.length;
}
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function resetInput() {
  todoInput.value = '';
  anims.animationOutCancelInput(inputIcon);
  todoInput.focus();
}

// EventListeners
document.addEventListener('keypress', e => {
  if (e.key === 'Enter' && todoInput.value.length >= CONSTANT.minChars) addTodo(todoInput.value);
});
inputIcon.addEventListener('click', resetInput);
todoInput.addEventListener('input', () =>
  todoInput.value.length >= CONSTANT.minChars
    ? anims.animationInCancelInput(inputIcon)
    : anims.animationOutCancelInput(inputIcon)
);
clearItemsBtn.addEventListener('click', () => {
  const todoItems = todoList.querySelectorAll('.todo-item');
  localStorage.clear();

  todoItems.forEach(todo => anims.animationOutTodo(todo));
  setTimeout(() => todoItems.forEach(todo => todoList.removeChild(todo)), CONSTANT.duration * 1.5);

  updateCount();
  anims.animationOutOptions(todoOptions);
});
function resetFilter() {
  filterItems.forEach(item => {
    if (item.classList.contains('filtered')) {
      item.click();
    }
  });
}
function colorFilterItem(clickedItem) {
  filterItems.forEach(item => item.classList.remove('filtered'));
  clickedItem.classList.add('filtered');
}
filterItems.forEach(item => {
  item.addEventListener('click', () => {
    colorFilterItem(item);
    filterTodos(item);
  });
});
function filterTodos(item) {
  // All filter
  if (item.textContent == 'All') {
    const todoItems = todoList.querySelectorAll('.todo-item');
    todoItems.forEach(todo => {
      todo.style.display = 'flex';
    });
  }
  // Active filter
  if (item.textContent == 'Active') {
    const todoItems = todoList.querySelectorAll('.todo-item');
    todoItems.forEach(todo => {
      todo.style.display = 'flex';
    });
    todoItems.forEach(todo => {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'none';
      }
    });
  }
  // Completed filter
  if (item.textContent == 'Completed') {
    const todoItems = todoList.querySelectorAll('.todo-item');
    todoItems.forEach(todo => {
      todo.style.display = 'flex';
    });
    todoItems.forEach(todo => {
      if (!todo.classList.contains('completed')) {
        todo.style.display = 'none';
      }
    });
  }
}
