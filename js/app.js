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
      move();
    }, 500);
  }
}, 100);

get_latest_repo();
get_latest_commit();
get_latest_follower();

document.querySelector("#discord-contact").addEventListener("click", copyDiscord);
document.querySelector("#discord-contact2").addEventListener("click", copyDiscord);
document.querySelector("#email-contact").addEventListener("click", copyEmail);
document.querySelector("#email-contact2").addEventListener("click", copyEmail);

start();
window.onload = () => fadeEffect;

function clr_menu_underline(){	
	let m = document.querySelectorAll("li.nav-item a");
	for (let i = 0; i < m.length; i++) {
		m[i].classList.add("myunderline")	;
		
	}
}

function unclr_menu_underline(){	
	let m = document.querySelectorAll("li.nav-item a");
	for (let i = 0; i < m.length; i++) {
		m[i].classList.remove("myunderline")	;
	}
}

function copyDiscord() {

	var copyText = "iamalwayshome#1637";  
	 // Copy the text inside the text field
	navigator.clipboard.writeText(copyText);  
  }
  
  function copyEmail() {
	var copyText = "meiamalwayshome@gmail.com";  
	 // Copy the text inside the text field
	navigator.clipboard.writeText(copyText);  
  }
  
 
  
  
