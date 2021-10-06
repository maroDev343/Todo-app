import { CONSTANT } from './constant.js';

// Animations
function animationInTodo(todo) {
  setTimeout(() => {
    todo.style.transform = `translateX(0px)`;
    todo.style.opacity = 1;
  }, CONSTANT.duration);
}
function animationOutTodo(todo) {
  todo.style.transform = `translateX(-250px)`;
  todo.style.opacity = 0;
}
function animationInOptions(todoOptions) {
  setTimeout(() => {
    todoOptions.style.transform = `translateY(0px) skewX(0deg)`;
    todoOptions.style.opacity = 1;
    todoOptions.style.pointerEvents = 'all';
  }, CONSTANT.duration);
}
function animationOutOptions(todoOptions) {
  todoOptions.style.transform = `translateY(100px) skewX(25deg)`;
  todoOptions.style.opacity = 0;
  todoOptions.style.pointerEvents = 'none';
}
function animationInCancelInput(icon) {
  icon.style.transform = `translateX(0px)`;
  icon.style.opacity = 1;
  icon.style.pointerEvents = 'all';
}
function animationOutCancelInput(icon) {
  icon.style.transform = `translateX(-150px)`;
  icon.style.opacity = 0;
  icon.style.pointerEvents = 'none';
}
export {
  animationInTodo,
  animationOutTodo,
  animationInOptions,
  animationOutOptions,
  animationInCancelInput,
  animationOutCancelInput,
};
