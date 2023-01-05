const pupil = document.getElementsByClassName("eye");
document.onmousemove = () => {
	let x = (clientX * 8) / window.innerWidth + "%";
	let y = (clientY * 8) / window.innerHeight + "%";

	for (let i = 0; i < 2; i++) {
	  pupil[i].style.left = x;
		pupil[i].style.top = y;
		pupil[i].style.transform = "translate(" + x + "," + y + ")";
	}
};

let pawsup = document.querySelector(".paws.up");
let pawsdown = document.querySelector(".paws.down");

document.addEventListener("mousedown", down);
document.addEventListener("mouseup", up);

function down(){
  pawsup.classList.add("hide");
  pawsdown.classList.remove("hide");
}

function up(){
  pawsup.classList.remove("hide");
  pawsdown.classList.add("hide");
}

function crazyCat(){
	
	setTimeout(() => {
		down();
	  }, "300")
	
	setTimeout(() => {
		up();
	  }, "700")
	
}

document.querySelector("#cat-activate").addEventListener("mouseover", crazyCat);
let icons = document.querySelectorAll(".social-media-icon");
for (let i = 0; i < icons.length; ++i) {
	icons[i].addEventListener("mouseover", crazyCat);
}

/*
$("#cat-activate").hover(function() {
	$(this).up();
 }, function() {
	$(this).down();
 });*/