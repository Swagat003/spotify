let player = document.getElementById('player');
let player_control = document.getElementById('player-control');
let like = document.querySelectorAll('.likes');
let play = document.querySelectorAll('.play');
let prgBar = document.querySelectorAll('.prg-bar');
let song_cards = document.querySelectorAll('.song-card');
let fullScreen = document.querySelector('.fullScreen-player');
let backBtn = document.getElementById('full-player-header-right');
let full_bar_container = document.querySelector("#full-player-bar-container");
let full_bar = document.querySelector("#full-player-bar-progress");
let thumb = window.getComputedStyle(document.getElementById('full-player-bar-fill'), '::before');
let shuffle = document.querySelector('#shuffle');
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');
let repeat = document.querySelector('#repeat');
var audio;
let playing = false;
let full_mode = false;
let currentID = 6;

var metaColor = document.createElement('meta');
metaColor.name = 'theme-color';
metaColor.content = '#121212';
document.head.appendChild(metaColor);

let song = songs[5]; //default

function getHslColor() {
    let hue = Math.random() * 360;
    return `hsl(${hue}, 46%, 28%)`;
}

function changeMetaThemeColor() {
    let bgcolor = player.style.backgroundColor;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bgcolor);
}

function selectSong(id) {
    song = songs[id - 1];
    let full_img = document.getElementById('full-player-img-real');
    let full_name = document.getElementById('full-player-title-left-name');
    let full_artist = document.getElementById('full-player-title-left-artist');
    let player_img = document.getElementById('player-img');
    let track_name = document.getElementById('track-name');
    let track_desc = document.getElementById('track-desc');
    full_img.setAttribute("src", song.img_src);
    full_name.innerText = song.title;
    full_artist.innerText = song.artist;
    player_img.setAttribute("src", song.img_src);
    track_name.innerText = song.title;
    track_desc.innerText = song.artist;
    for (const i of like) {
        if (song.liked) {
            i.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8.667 1.912a6.257 6.257 0 0 0-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 0 0 3.09 0l7.956-9.482a6.188 6.188 0 0 0 1.382-5.234l-.49.097.49-.099a6.303 6.303 0 0 0-5.162-4.98h-.002a6.24 6.24 0 0 0-5.295 1.65.623.623 0 0 1-.848 0 6.257 6.257 0 0 0-2.91-1.568z" fill="#1ed760"></path></svg>`
        } else {
            i.innerHTML = `<svg viewBox="0 0 24 24"><path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z" fill="white"></path></svg>`
        }
    }
    player.style.backgroundColor = getHslColor();
    let bgcolor = player.style.backgroundColor;
    fullScreen.style.backgroundColor = bgcolor;
}


function likeBtn() {
    for (const i of like) {
        if (song.liked) {
            i.innerHTML = `<svg viewBox="0 0 24 24"><path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z" fill="white"></path></svg>`
        } else {
            i.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8.667 1.912a6.257 6.257 0 0 0-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 0 0 3.09 0l7.956-9.482a6.188 6.188 0 0 0 1.382-5.234l-.49.097.49-.099a6.303 6.303 0 0 0-5.162-4.98h-.002a6.24 6.24 0 0 0-5.295 1.65.623.623 0 0 1-.848 0 6.257 6.257 0 0 0-2.91-1.568z" fill="#1ed760"></path></svg>`
        }
    }
    if (song.liked) {
        song.liked = false;
    } else {
        song.liked = true;
    }
}

like.forEach(element => {
    element.addEventListener('click', () => {
        likeBtn();
    })
});


function playBtn() {
    play.forEach(btn => {
        btn.addEventListener('click', () => {
            for (const i of play) {
                if (playing) {
                    i.innerHTML = `<svg viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" ></path></svg>`
                } else {
                    i.innerHTML = `<svg viewBox="0 0 24 24" ><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`
                }
            }
            if (playing) {
                playing = false;
                audio.pause();
            } else {
                playing = true;
                audio.play();
            }
        })
    });
}

function convertToTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

function progress() {
    let { duration, currentTime } = audio;
    isNaN(duration) ? (duration = 0) : duration;
    isNaN(currentTime) ? (currentTime = 0) : currentTime;
    let ratio = (currentTime / duration);
    prgBar.forEach(fill => {
        fill.style.width = `${ratio * 100}%`;
    });
    let time_current = document.getElementById('full-player-bar-time-current');
    let time_total = document.getElementById('full-player-bar-time-total');
    time_current.innerHTML = convertToTime(currentTime);
    time_total.innerHTML = convertToTime(duration);
}

function playSong(id) {
    audio.pause();
    id = Number(id);
    currentID = id;
    selectSong(id);
    audio = new Audio(song.src);
    audio.play();
    for (const i of play) {
        i.innerHTML = `<svg viewBox="0 0 24 24" ><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`
    }
    playing = true;
    audio.addEventListener("timeupdate", progress);
    audio.addEventListener("ended", () => {
        for (const i of play) {
            i.innerHTML = `<svg viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" ></path></svg>`
        }
        playing = false;
    })
}

function setTimeLine(e) {
    let value = full_bar.clientWidth;
    let offsetX = e.offsetX;
    let duration = audio.duration;
    audio.currentTime = ((offsetX / value) * duration);
}

player.style.backgroundColor = getHslColor();
audio = new Audio(song.src);
playBtn();

song_cards.forEach(card => {
    card.addEventListener("click", () => {
        let songId = card.dataset.id;
        if (songId === undefined) {
            audio.pause();
            for (const i of play) {
                i.innerHTML = `<svg viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" ></path></svg>`
            }
            playing = false;
        } else {
            playSong(songId);
        }
    })
});

audio.addEventListener("ended", () => {
    for (const i of play) {
        i.innerHTML = `<svg viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" ></path></svg>`
    }
    playing = false;
})

audio.addEventListener("timeupdate", progress);

player_control.addEventListener("click", (e) => {
    e.stopPropagation();
});

player.addEventListener("click", () => {
    let bgcolor = player.style.backgroundColor;
    fullScreen.style.backgroundColor = bgcolor;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bgcolor);
    fullScreen.style.transform = "translateY(0)";
    fullScreen.style.opacity = "1";
    full_mode = true;
    window.history.pushState({}, null, null);
});

backBtn.addEventListener("click", () => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#121212');
    fullScreen.style.transform = "translateY(100dvh)";
    fullScreen.style.opacity = "0";
    full_mode = false;
    window.history.back();
});

window.addEventListener('popstate', () => {
    if (full_mode) {
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#121212');
        fullScreen.style.transform = "translateY(100dvh)";
        fullScreen.style.opacity = "0";
        full_mode = false;
    }
});

full_bar_container.addEventListener("pointerdown", (e) => {
    full_bar_container.setPointerCapture(e.pointerId);
    setTimeLine(e);
    full_bar_container.addEventListener("pointermove", setTimeLine);
    full_bar_container.addEventListener("pointerup", (e) => {
        full_bar_container.removeEventListener("pointermove", setTimeLine);
    }, { once: true });
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

shuffle.addEventListener("click", (e) => {
    let randNum = Math.floor(Math.random() * songs.length) + 1;
    playSong(randNum);
    changeMetaThemeColor();
});

prev.addEventListener("click", (e) => {
    if (currentID > 1) {
        playSong(currentID - 1);
    } else {
        playSong(songs.length);
    }
    changeMetaThemeColor();
});

next.addEventListener("click", (e) => {
    if (currentID < songs.length) {
        playSong(currentID + 1);
    } else {
        playSong(1);
    }
    changeMetaThemeColor();
});

repeat.addEventListener("click", (e) => {
    playSong(currentID);
    changeMetaThemeColor();
});