let rgbRand = {
    r: 255,
    g: 255,
    b: 255
};

startAnimation = () => {
    rand();
};

function rand() {

    let luma = 151;

    while (luma > 150) {
        rgbRand = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255
        };
        luma = ((rgbRand.r * 299) + (rgbRand.g * 587) + (rgbRand.b * 114)) / 1000; // per ITU-R BT.709
    }

    document.documentElement.style.setProperty(`--generated-color`, `rgb(${rgbRand.r},${rgbRand.g},${rgbRand.b}`);

    setTimeout(() => {
        rand();
    }, 2200);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
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

function down() {
    pawsup.classList.add("hide");
    pawsup2.classList.add("hide2");
    pawsdown.classList.remove("hide");
    pawsdown2.classList.remove("hide2");
}

function up() {
    pawsup.classList.remove("hide");
    pawsup2.classList.remove("hide2");
    pawsdown.classList.add("hide");
    pawsdown2.classList.add("hide2");
}

function crazyCat() {

    setTimeout(() => {
        down();
    }, "500")

    setTimeout(() => {
        up();
    }, "700")

}

document.querySelector("#discord-contact").addEventListener("click", copyDiscord);
document.querySelector("#discord-contact2").addEventListener("click", copyDiscord);
document.querySelector("#email-contact").addEventListener("click", copyEmail);
document.querySelector("#email-contact2").addEventListener("click", copyEmail);

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