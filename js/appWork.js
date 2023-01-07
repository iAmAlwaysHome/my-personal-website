const preloader = document.querySelector(".preloader");

const fadeEffect = setInterval(() => {
  if (!preloader.style.opacity) {
    preloader.style.opacity = 1;
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.1;
  } else {
    startAnimation();
    clearInterval(fadeEffect);
    preloader.style.display = "none";
    setTimeout(() => {
      document.querySelector(`#app`).style.opacity = 1;
      rand();
    }, 500);
  }
}, 100);

window.onload = () => fadeEffect; 