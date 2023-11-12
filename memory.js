
let pozycje = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]
let guesses = [];
let correct_guesses = [];
let timer = 0;
let game_mode = 0;
let i = 0;
let game_start = false;
let game_status = true;
let player_win = false;
let num_of_clicks = 0;
let game_interval;
let time_start = 0;
let cookie_tab = [];
let records_30 = [];
let records_60 = [];
let records_90 = [];
let cookie_iter = 0;

function shuffle() {
    for (let i = pozycje.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = pozycje[i];
        pozycje[i] = pozycje[j];
        pozycje[j] = temp;
    }
}

function init() {
    shuffle();
    if (document.cookie) {
        let cookie_last = document.cookie.split('; ');
        cookie_iter = parseInt(cookie_last[cookie_last.length - 1].split('|')[0].split('=')[0]) + 1;
        console.log(cookie_iter);
    }


    for (let i = 0; i < 16; i++) {
        document.getElementById(i).src = `./images/unknown.jpg`;
        document.getElementById(i).setAttribute('draggable', false);
        document.getElementById(i).style.cursor = 'pointer';
        document.getElementById(i).addEventListener("click", uncover);
    }
}

function cookie_doer() {
    //dodawanie rekordu uzytkownika od plikow coockie
    let nick = document.getElementById('nick').value;

    let now = new Date().getTime();
    let when_expires = new Date(now + 1000 * 60 * 60 * 24 * 365).toUTCString();

    document.cookie = `${cookie_iter} = ${encodeURI(nick)}|${timer}|${game_mode}; expires=${when_expires}`;
    cookie_iter++;
    let cookies = document.cookie.split('; ');
    console.log(cookies);
    cookie_tab = [];
    records_30 = [];
    records_60 = [];
    records_90 = [];

    for (cookie of cookies) {
        cookie_tab.push(cookie.split('|'));
        switch (cookie_tab[cookie_tab.length - 1][2]) {
            case '30':
                records_30.push([decodeURI(cookie_tab[cookie_tab.length - 1][0].split('=')[1]), cookie_tab[cookie_tab.length - 1][1]])
                break;
            case '60':
                records_60.push([decodeURI(cookie_tab[cookie_tab.length - 1][0].split('=')[1]), cookie_tab[cookie_tab.length - 1][1]])
                break;
            case '90':
                records_90.push([decodeURI(cookie_tab[cookie_tab.length - 1][0].split('=')[1]), cookie_tab[cookie_tab.length - 1][1]])
                break;
        }
    }

    records_30.sort(function (a, b) { return parseInt(a[1]) - parseInt(b[1]) });
    records_60.sort(function (a, b) { return parseInt(a[1]) - parseInt(b[1]) });
    records_90.sort(function (a, b) { return parseInt(a[1]) - parseInt(b[1]) });

    if (records_30.length > 10) { records_30 = records_30.slice(0, 10) }
    if (records_60.length > 10) { records_60 = records_60.slice(0, 10) }
    if (records_90.length > 10) { records_90 = records_90.slice(0, 10) }

}

function drawTable() {
    document.querySelector('tbody').innerHTML = '';

    switch (game_mode) {
        case 30:

            for (i in records_30) {

                let time = records_30[i][1]
                let min = Math.floor(time / 1000 / 60);
                let sec = Math.floor(time / 1000 - min * 60);
                let msc = Math.round(time - sec * 1000 - min * 60 * 1000);
                if (time < 30000) {
                    let tr = document.createElement('tr');

                    let td = document.createElement("td");
                    let tdText = document.createTextNode(`${parseInt(i) + 1}`);
                    td.appendChild(tdText);
                    tr.appendChild(td);

                    td = document.createElement("td");
                    tdText = document.createTextNode(`${records_30[i][0]}`);
                    td.appendChild(tdText);
                    tr.appendChild(td);

                    td = document.createElement("td");
                    tdText = document.createTextNode(`${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(msc).padStart(3, '0')} s`);
                    td.appendChild(tdText);

                    tr.appendChild(td);
                    document.querySelector('tbody').appendChild(tr);
                }

            }
            break;
        case 60:
            for (i in records_60) {

                let time = records_60[i][1]
                let min = Math.floor(time / 1000 / 60);
                let sec = Math.floor(time / 1000 - min * 60);
                let msc = Math.round(time - sec * 1000 - min * 60 * 1000);
                if (time < 60000) {
                    let tr = document.createElement('tr');

                    let td = document.createElement("td");
                    let tdText = document.createTextNode(`${parseInt(i) + 1}`);
                    td.appendChild(tdText);
                    tr.appendChild(td);

                    td = document.createElement("td");
                    tdText = document.createTextNode(`${records_60[i][0]}`);
                    td.appendChild(tdText);
                    tr.appendChild(td);



                    td = document.createElement("td");
                    tdText = document.createTextNode(`${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(msc).padStart(3, '0')} s`);
                    td.appendChild(tdText);

                    tr.appendChild(td);
                    document.querySelector('tbody').appendChild(tr);
                }

            }
            break;
        case 90:
            for (i in records_90) {

                let time = records_90[i][1]
                let min = Math.floor(time / 1000 / 60);
                let sec = Math.floor(time / 1000 - min * 60);
                let msc = Math.round(time - sec * 1000 - min * 60 * 1000);
                if (time < 90000) {
                    let tr = document.createElement('tr');

                    let td = document.createElement("td");
                    let tdText = document.createTextNode(`${parseInt(i) + 1}`);
                    td.appendChild(tdText);
                    tr.appendChild(td);

                    td = document.createElement("td");
                    tdText = document.createTextNode(`${records_90[i][0]}`);
                    td.appendChild(tdText);
                    tr.appendChild(td);



                    td = document.createElement("td");
                    tdText = document.createTextNode(`${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(msc).padStart(3, '0')} s`);
                    td.appendChild(tdText);

                    tr.appendChild(td);
                    document.querySelector('tbody').appendChild(tr);
                }
            }
            break;
    }

}

let uncover = function () {
    game_status = true;
    game_start = true;
    num_of_clicks++;
    if (num_of_clicks == 1) time_start = Date.now();
    if (guesses.length < 2) {
        this.src = `./images/${pozycje[this.id]}.jpg`;
        guesses.push([pozycje[this.id], this.id]);
        document.getElementById(this.id).removeEventListener('click', uncover)
    }

    if (guesses.length == 2) {
        for (let i = 0; i < 16; i++) document.getElementById(i).removeEventListener("click", uncover);

        if (guesses[0][0] == guesses[1][0]) {
            correct_guesses.push(guesses[0]);
            correct_guesses.push(guesses[1]);
            for (let i = 0; i < 16; i++) document.getElementById(i).addEventListener("click", uncover);
            for (guess of correct_guesses) document.getElementById(guess[1]).removeEventListener("click", uncover);
            guesses = []

            if (correct_guesses.length == 16) {
                player_win = true;
                game_status = false;
            }
        } else if (guesses[0][0] != guesses[1][0]) {
            setTimeout(function () {
                document.querySelectorAll('#plansza img')[guesses[0][1]].src = `./images/unknown.jpg`;
                document.querySelectorAll('#plansza img')[guesses[1][1]].src = `./images/unknown.jpg`;
                for (let i = 0; i < 16; i++) document.getElementById(i).addEventListener("click", uncover);
                for (guess of correct_guesses) document.getElementById(guess[1]).removeEventListener("click", uncover);
                guesses = []
            }, 500)
        }


    }

}

function game_reset() {
    //tabela wyników
    document.getElementById('tab_wynik').style.display = 'block';
    cookie_doer();
    drawTable();
    //reset wszstkich elementów gry
    shuffle();
    guesses = [];
    correct_guesses = [];
    timer = 0;
    i = 0;
    game_start = false;
    game_status = true;
    player_win = false;
    num_of_clicks = 0;
    init();

    document.getElementById('menu').style.display = 'block';
    document.querySelector('h1').innerText = `Touhou - Memory`;
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('progress-bar').style.display = 'none';
    document.getElementById('bars-div').style.display = 'none';
    document.getElementById('progress-bar').style.width = '540px';
    document.getElementById('nick').value = 'anon';
}

function setTimer(time) {
    game_mode = time;
    document.getElementById('menu').style.display = 'none';
    document.querySelector('h1').innerText = `Czas: ${time}s`;
    document.getElementById('progress-bar').style.display = 'block';
    document.getElementById('bars-div').style.display = 'flex';
    document.getElementById('tab_wynik').style.display = 'none';
    game_interval = setInterval(function () {

        if (game_start == false)
            document.getElementById('progress-bar').style.width = `${540 - timer / 1000 * (540 / time)}px`;
        else {
            game(game_status, time_start, time)
        }

    }, 1)
}

function game(game_status, time_start, time) {
    let time_now = Date.now();
    timer = time_now - time_start;
    if (game_status && timer / 1000 < time) {
        //timer display
        let timer_out = time * 1000 - timer
        let min = Math.floor(timer_out / 1000 / 60);
        let sec = Math.floor(timer_out / 1000 - min * 60);
        let msc = Math.round(timer_out - sec * 1000 - min * 60 * 1000);
        document.getElementById('progress-bar').style.width = `${540 - timer / 1000 * (540 / time)}px`;
        document.querySelector('h1').innerText = `Czas: ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(msc).padStart(3, '0')}s`;
    } else {
        for (let i = 0; i < 16; i++) {
            document.getElementById(i).removeEventListener("click", uncover);
        }

        document.querySelector('h1').innerText = `Czas: ${String(0).padStart(2, '0')}:${String(0).padStart(2, '0')}:${String(0).padStart(3, '0')}s`;
        document.getElementById('end-screen').style.display = 'flex';
        if (player_win) {
            document.querySelector('#end-screen h2').innerText = 'Gratulacje! Wygrałeś!'
        } else {
            document.querySelector('#end-screen h2').innerText = 'Przegrałeś! Czas minął!'
        }

        i = 0;
        game_status = false;
        clearInterval(game_interval);
    }
}