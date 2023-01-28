const preloader = document.querySelector(".preloader");

startAnimation = () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	window.addEventListener(
		"resize",
		({ target: { innerWidth, innerHeight } }) => {
			canvas.width = innerWidth;
			canvas.height = innerHeight;
		},
		false
	);
};

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
    document.querySelector(`#app`).style.opacity = 1;
    setTimeout(() => {     
      rand();
    }, 2200);
  }
}, 50);

get_latest_repo();
get_latest_commit();
get_random_follower();

window.onload = () => fadeEffect; 