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

async function get_latest_repo() {
	
	let response = await axios.get('https://api.github.com/users/iAmAlwaysHome/repos?sort=created&per_page=1');
	response = response.data[0];	
	document.querySelector("#lat-repo-date").innerHTML=convert_time(response['created_at']);
	document.querySelector("#lat-repo-wrapper").innerHTML=`<a  href="${response['html_url']}" target="_blank"  class="ff-pop latest-link" > ${response['name']}/ </a>`;

}

async function get_latest_commit() {
	let responseRepo = await axios.get('https://api.github.com/users/iAmAlwaysHome/repos?sort=created&per_page=1');
	responseRepo = responseRepo.data[0];
	
	let responseCom = await axios.get(`https://api.github.com/repos/iAmAlwaysHome/${responseRepo['name']}/branches/main`);
	
	responseCom = responseCom.data.commit; 	
	let url = responseCom.html_url;
	let msg = responseCom.commit.message;
	let date = responseCom.commit.committer.date; 
	
	document.querySelector("#lat-com-date").innerHTML=convert_time(date);				
	document.querySelector("#lat-com-wrapper").innerHTML=`<a  href="${url}" target="_blank"  class="ff-pop latest-link hide-mob" > ${msg} </a>`;		
}


async function get_latest_follower() {
	
	let response_fol_count = await axios.get('https://api.github.com/users/iAmAlwaysHome');
	response_fol_count = response_fol_count.data;
	let followers_count = response_fol_count['followers'];
	document.querySelector("#lat-fol-n").innerHTML=`#${followers_count}`; 
	
	let response = await axios.get('https://api.github.com/users/iAmAlwaysHome/followers?per_page=1&page=' + followers_count.toString());
	response = response.data[0];
	
	document.querySelector("#lat-fol-link-wrapper").innerHTML=` <a id="lat-fol-link" href="${response['html_url']}" target="_blank" class="ff-pop latest-link"><img width="25" height="25" src="${response['avatar_url']}" class="rounded-circle border"> ${response['login']}</a>`;
} 

