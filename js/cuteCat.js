const pupil = document.getElementsByClassName("eye");
document.onmousemove = () => {
	let x = (event.clientX * 8) / window.innerWidth + "%";
	let y = (event.clientY * 8) / window.innerHeight + "%";

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

let pawsup2 = document.querySelector(".paws2.up2");
let pawsdown2 = document.querySelector(".paws2.down2");

document.addEventListener("mousedown", down);
document.addEventListener("mouseup", up);


function down(){
  pawsup.classList.add("hide");
  pawsup2.classList.add("hide2");
  pawsdown.classList.remove("hide");
  pawsdown2.classList.remove("hide2");
}

function up(){
  pawsup.classList.remove("hide");
  pawsup2.classList.remove("hide2");
  pawsdown.classList.add("hide");
  pawsdown2.classList.add("hide2");
}

function crazyCat(){
	
	setTimeout(() => {
		down();
	  }, "500")
	
	setTimeout(() => {
		up();
	  }, "700")
	
}

document.querySelector("#cat-activate").addEventListener("mouseover", crazyCat);
let icons = document.querySelectorAll(".social-media-icon");
for (let i = 0; i < icons.length; ++i) {
	icons[i].addEventListener("mouseover", crazyCat);
}

document.querySelector("#catactivate2").addEventListener("mouseover", crazyCat);
let icons2 = document.querySelectorAll(".socialmediaicon2");
for (let i = 0; i < icons2.length; ++i) {
	icons2[i].addEventListener("mouseover", crazyCat);
}

/*
$("#cat-activate").hover(function() {
	$(this).up();
 }, function() {
	$(this).down();
 });*/
 
 