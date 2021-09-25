const mobileBreak = 800;
const mq = window.matchMedia(`(max-width: ${mobileBreak}px)`);
let mobileMode;

//! currentMode must be got from checking the switch and prefers custom mode media query! images can be changed if html.lightTheme {background-image: kza;}
const changeImages = () => {};
const changeImagesSize = () => {
  const backgroundImage = document.querySelector('.background');
  const desktopSrc = `/images/bg-desktop${currentMode}.svg`;
  backgroundImage.src = '';
};
const checkWindowSize = () => {
  if (mq.matches) {
    mobileMode = true;
    changeImagesSize();
  } else mobileMode = false;
};

window.addEventListener('resize', checkWindowSize);
window.addEventListener('DOMContentLoaded', checkWindowSize);

//? check mode => images change
//? check mobile => images size
