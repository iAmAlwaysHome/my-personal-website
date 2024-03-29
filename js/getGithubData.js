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
    } else if (min_passed < 60) {
        chosen = [min_passed.toFixed(0), 'minute']
    } else if (hrs_passed < 24) {
        chosen = [hrs_passed.toFixed(0), 'hour']
    } else {
        chosen = [days_passed.toFixed(0), 'day']
    }

    let addition = '';

    if (chosen[0] > 1) {
        addition = 's';
    }

    return chosen[0].toString() + ' ' + chosen[1] + addition + ' ' + 'ago';
}

async function get_latest_repo() {

    let response = await axios.get('https://api.github.com/users/iAmAlwaysHome/repos?sort=created&per_page=1');
    response = response.data[0];
    document.querySelector("#lat-repo-date").innerHTML = convert_time(response['created_at']);
    document.querySelector("#lat-repo-wrapper").innerHTML = `<a  href="${response['html_url']}" target="_blank"  class="ff-pop latest-link" > ${response['name']}/ </a>`;
    document.querySelector("#latrepodate2").innerHTML = convert_time(response['created_at']);
    document.querySelector("#latrepowrapper2").innerHTML = `<a  href="${response['html_url']}" target="_blank"  class="ff-pop latest-link" > ${response['name']}/ </a>`;
}

async function get_latest_commit() {


    let response = await axios.get(`https://api.github.com/users/iAmAlwaysHome/events/public`);
    response = response.data;

    for (let i = 0; i < 100; i++) {

        if (response[i]['type'] === 'PushEvent') {
            let event = response[i];
            let payload = event['payload'];
            let commit = payload['commits'][0];
            let repo = event['repo']['name'];
            let url = 'https://github.com/' + repo + '/commit/' + commit['sha'];
            let msg = commit['message'];

            document.querySelector("#lat-com-date").innerHTML = convert_time(event['created_at']);
            document.querySelector("#latcomdate2").innerHTML = convert_time(event['created_at']);
            document.querySelector("#lat-com-wrapper").innerHTML = `<a  href="${url}" target="_blank"  class="ff-pop latest-link " > ${msg} </a>`;
            document.querySelector("#latcomwrapper2").innerHTML = `<a  href="${url}" target="_blank"  class="ff-pop latest-link " > ${msg} </a>`;
            return;

        }
    }
}

function randomInteger(min, max) {
    return min + Math.random() * (max - min);
}

async function get_random_follower() {

    let response_fol_count = await axios.get('https://api.github.com/users/iAmAlwaysHome');
    response_fol_count = response_fol_count.data;
    let followers_count = response_fol_count['followers'];

    let response = await axios.get('https://api.github.com/users/iAmAlwaysHome/followers?per_page=1&page=' + (randomInteger(1, followers_count)));
    console.log('https://api.github.com/users/iAmAlwaysHome/followers?per_page=1&page=' + (randomInteger(1, followers_count)));
    response = response.data[0];

    document.querySelector("#lat-fol-link-wrapper").innerHTML = ` <a id="lat-fol-link" href="${response['html_url']}" target="_blank" class="ff-pop latest-link"><img width="25" height="25" src="${response['avatar_url']}" class="rounded-circle border"> ${response['login']}</a>`;

}