// Variables
const todoList = document.querySelector('.todo__list');
const options = document.querySelector('.todo__options');
const removeBtn = document.querySelectorAll('.remove-icon');
const database = [];
const duration = 450;

// Functions
const createItem = content => {
  const item = {
    content,
    isCompleted: false,
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
  if (!todos || todos === '[]') return [{ content: 'Try me😊', isCompleted: true }];
  return JSON.parse(todos);
};
const animationIn = item => {
  setTimeout(() => {
    item.style.transform = 'translateX(0px)';
    item.style.opacity = 1;
  }, duration);
};
const animationOut = item => {
  item.style.transform = 'translateX(-250px)';
  item.style.opacity = 0;
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

  const completedClass = item.isCompleted ? 'completed' : undefined;
  if (completedClass !== undefined) newTodo.classList.add(completedClass);
  newTodo.innerHTML = todoHTML;

  todoList.appendChild(newTodo);
  animationIn(newTodo);

  // RemoveIcon
  newTodo.querySelector('.remove-icon').addEventListener('click', () => removeItem(item, newTodo));
  // Checkbox
  newTodo.querySelector('.check-box').addEventListener('click', () => {
    console.log('ay');
    // Todo
  });
};
const removeItem = (item, todo) => {
  const index = database.findIndex(databaseItem => item.content == databaseItem.content);
  database.splice(index, 1);
  localStorage.setItem('todo-list', JSON.stringify(database));

  animationOut(todo);
  setTimeout(() => {
    todo.parentNode.removeChild(todo);
  }, duration);
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
