export default class Todo {
  static create(content) {
    const data = read();
    const item = {
      content,
      completed: false,
    };
    data.push(item);
    renderItem();
  }
}
const save = data => {
  localStorage.setItem('todo-list', JSON.stringify(data));
};
const read = () => {
  const todos = localStorage.getItem('todo-list');
  if (!todos) return [{ content: 'Try me😊', completed: true }];
  return JSON.parse(todos);
};
const renderItem = () => {
  const html = `
      <div class="check-box">
      <img src="/images/icon-check.svg" class="check-icon" />
    </div>
    <h2 class="content">${item.content}</h2>
      <i class="fas fa-trash remove-icon"></i>
      `;
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');
  newTodo.dataset.completed = item.completed;
  newTodo.innerHTML = html;

  document.querySelector('.todo__list').appendChild(newTodo);
  // save the item here
};

// document.addEventListener('DOMContentLoaded', loadData); load data function
