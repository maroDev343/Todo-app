// Variables
const modeSwitcher = document.querySelector('.mode__switcher');
const isLightModeByDefault = window.matchMedia(`(prefers-color-scheme: light)`);
const root = document.documentElement;

// Functions
const checkSystemPreference = () =>
  isLightModeByDefault.matches
    ? root.classList.remove('darkTheme')
    : root.classList.add('darkTheme');
const switchTheme = () => {
  root.classList.contains('darkTheme')
    ? root.classList.remove('darkTheme')
    : root.classList.add('darkTheme');
};

// EventListeners
window.addEventListener('DOMContentLoaded', checkSystemPreference);
modeSwitcher.addEventListener('click', switchTheme);
