class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.lifetime = 0;
	}
}

startAnimation = () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const points = [];
	const addPoint = (x, y) => {
		const point = new Point(x, y);
		points.push(point);
	};

	document.addEventListener(
		"mousemove",
		({ clientX, clientY }) => {
			addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
		},
		false
	);

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

	const animatePoints = () => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		const duration = (0.5 * (1 * 1000)) / 144;

		for (let i = 0; i < points.length; ++i) {
			const point = points[i];
			let lastPoint;

			if (points[i - 1] !== undefined) {
				lastPoint = points[i - 1];
			} else lastPoint = point;

			point.lifetime += 0.1;

			if (point.lifetime > duration) {
				points.shift();
			} else {
				const lifePercent = point.lifetime / duration;
				const spreadRate = 2 * (1 - lifePercent);

				ctx.lineJoin = "round";
				ctx.lineWidth = spreadRate;

				const red = rgbRand.r;
				const green = rgbRand.g;
				const blue = rgbRand.b;
				ctx.strokeStyle = `rgb(${red},${green},${blue}`;

				ctx.beginPath();

				ctx.moveTo(lastPoint.x, lastPoint.y);
				ctx.lineTo(point.x, point.y);

				ctx.stroke();
				ctx.closePath();
			}
		}
		requestAnimationFrame(animatePoints);
	};
	animatePoints();
};

function rand() {
	rgbRand = {
		r: Math.random() * 255,
		g: Math.random() * 255,
		b: Math.random() * 255
	};
	
	//console.log(getComputedStyle(document.querySelector(":root")).getPropertyValue('--text-color'));
	document.documentElement.style.setProperty = ('--text-color',`rgb(${rgbRand.r},${rgbRand.g},${rgbRand.b}`);	
//	console.log(getComputedStyle(document.querySelector(":root")).getPropertyValue('--text-color'));
	
	document.querySelector(".username-lg").style.color = `rgb(${rgbRand.r},${rgbRand.g},${rgbRand.b}`;
	document.querySelector(".w-100").style.background = `rgb(${rgbRand.r},${rgbRand.g},${rgbRand.b}`;
	document.querySelector(".hero-action").style.color = `rgb(${rgbRand.r},${rgbRand.g},${rgbRand.b}`;
	document.querySelector(".hero-name").style.color = `rgb(${rgbRand.r},${rgbRand.g},${rgbRand.b}`;
	
	let u =document.querySelectorAll('.myunderline');
	for (let i = 0; i < u.length; i++) {
		u[i].style.borderBottom = `1px solid rgb(${rgbRand.r},${rgbRand.g},${rgbRand.b}`;
	}
	let d = document.querySelectorAll(".social-media-icon");
	for (let i = 0; i < d.length; i++) {
		d[i].style.color = `rgb(${rgbRand.r},${rgbRand.g},${rgbRand.b}`;
	}
	let t = document.querySelectorAll(".fs-35");
	for (let i = 0; i < t.length; i++) {
		t[i].style.color = `rgb(${rgbRand.r},${rgbRand.g},${rgbRand.b}`;
		}
	setTimeout(() => {
		rand();
	}, 5000);
}

function randomInteger(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min));
}

function convert_time(time) {
	let now = new Date();
	let prev = new Date(time);

	let diff = now - prev;

	let sec_passed = diff / 1000;
	let min_passed = sec_passed / 60;
	let hrs_passed = min_passed / 60;
	let days_passed = hrs_passed / 24;

	let chosen;

	if (sec_passed < 60) {
		chosen = [sec_passed.toFixed(0), 'second'];
	}

	else if (min_passed < 60) {
		chosen = [min_passed.toFixed(0), 'minute']
	}

	else if (hrs_passed < 24) {
		chosen = [hrs_passed.toFixed(0), 'hour']
	}

	else {
		chosen = [days_passed.toFixed(0), 'day']
	}

	let addition = '';

	if (chosen[0] > 1) { addition = 's'; }

	return chosen[0].toString() + ' ' + chosen[1] + addition + ' ' + 'ago';
}

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

async function get_latest_repo() {
	
	let response = await axios.get('https://api.github.com/users/iAmAlwaysHome/repos?sort=created&per_page=1');
	response = response.data[0];	
	document.querySelector("#lat-repo-date").innerHTML=convert_time(response['created_at']);
	document.querySelector("#lat-repo-wrapper").innerHTML=`<a  href="${response['html_url']}" class="ff-pop" > ${response['name']}/ </a>`;

}

/*
async function get_latest_commit() {
	let response = await axios.get('https://api.github.com/users/iAmAlwaysHome/events/public');
	response = response.data;	

	for (let i = 0; i < response.length; i++) {
		if (response[i]['type'] === 'PushEvent') {
			let event = response[i];
			let payload = event['payload'];
			let commit = payload['commits'][0];
			let repo = event['repo']['name'];
			let url = 'https://github.com/' + repo + '/commit/' + commit['sha'];
			
			document.querySelector("#lat-com-date").innerHTML=convert_time(event['created_at']);				
			document.querySelector("#lat-com-wrapper").innerHTML=`<a  href="${url}" class="ff-pop" > ${commit['message']} </a>`;		
			return;
		}		
	}
}
*/

async function get_latest_commit() {
	let responseRepo = await axios.get('https://api.github.com/users/iAmAlwaysHome/repos?sort=created&per_page=1');
	responseRepo = responseRepo.data[0];
	
	let responseCom = await axios.get(`https://api.github.com/repos/iAmAlwaysHome/${responseRepo['name']}/branches/main`);
	
	responseCom = responseCom.data.commit; 	
	let url = responseCom.html_url;
	let msg = responseCom.commit.message;
	let date = responseCom.commit.committer.date; 
	
	document.querySelector("#lat-com-date").innerHTML=convert_time(date);				
	document.querySelector("#lat-com-wrapper").innerHTML=`<a  href="${url}" class="ff-pop" > ${msg} </a>`;		
}


async function get_latest_follower() {
	
	let response_fol_count = await axios.get('https://api.github.com/users/iAmAlwaysHome');
	response_fol_count = response_fol_count.data;
	let followers_count = response_fol_count['followers'];
	document.querySelector("#lat-fol-n").innerHTML=`#${followers_count}`; 
	
	let response = await axios.get('https://api.github.com/users/iAmAlwaysHome/followers?per_page=1&page=' + followers_count.toString());
	response = response.data[0];
	
	document.querySelector("#lat-fol-link-wrapper").innerHTML=` <a href="${response['html_url']}" class="ff-pop latest-link"><img width="14" height="14" src="${response['avatar_url']}" class="rounded-circle border"> ${response['login']}</a>`;
} 

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
  

window.onload = () => fadeEffect;
const preloader = document.querySelector(".preloader");

get_latest_repo();
get_latest_commit();
get_latest_follower();

document.querySelector("#discord-contact").addEventListener("click", copyDiscord);
document.querySelector("#email-contact").addEventListener("click", copyEmail);


let m = document.querySelectorAll("li.nav-item a");

for (let i = 0; i < m.length; i++) {
	m[i].addEventListener("hover", clr_menu_underline);
	m[i].addEventListener("mouseleave", unclr_menu_underline);

}
