// Variables
const todoList = document.querySelector('.todo__list');
const options = document.querySelector('.todo__options');
const database = [];

// Functions
const createItem = content => {
  const item = {
    content,
    completed: false,
  };
  save(item);
  renderItem(item);
};
const save = data => {
  database.push(data);
  localStorage.setItem('todo-list', JSON.stringify(database));
};
const read = () => {
  const todos = localStorage.getItem('todo-list');
  if (!todos) return { content: 'Try me😊', completed: true }; // { content: 'Try me😊', completed: true }
  return JSON.parse(todos);
};
const animationIn = item => {
  setTimeout(() => {
    item.style.transform = 'translateX(0px)';
    item.style.opacity = 1;
  }, 650);
};
const animationOut = item => {
  setTimeout(() => {
    item.style.transform = 'translateX(-250px)';
    item.style.opacity = 0;
  }, 650);
};
const renderItem = item => {
  const todoHTML = `
      <div class="check-box">
        <img src="/images/icon-check.svg" class="check-icon" />
      </div>
      <h2 class="content">${item.content}</h2>
      <i class="fas fa-trash remove-icon"></i>
    `;

  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');
  newTodo.dataset.completed = item.completed;
  newTodo.innerHTML = todoHTML;

  todoList.appendChild(newTodo);
  animationIn(newTodo);
};
const loadData = () => {
  database.forEach(item => renderItem(item));
};
const databaseReset = () => {
  database.push(...read());
};

// EventListeners
document.addEventListener('DOMContentLoaded', databaseReset);
document.addEventListener('DOMContentLoaded', loadData);

document.addEventListener('keypress', e => {
  const inputValue = document.querySelector('.todo__input-area').value;
  if (e.key === 'Enter') createItem(inputValue);
});
