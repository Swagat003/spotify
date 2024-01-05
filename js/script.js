let player = document.getElementById('player');
let like = document.getElementById('like');
let play = document.getElementById('play');
let prgBar = document.getElementById('prg-bar');

function getHslColor() {
    let hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 46%, 28%)`;
}

player.style.backgroundColor = getHslColor();

const audio = new Audio('./songs/AnuvJain-HUSN.mp3');
// let audioLength = audio.duration;
prgBar.style.animationPlayState = 'paused';
prgBar.style.animationDuration = (audio.duration).toString();

like.addEventListener('click', () => {
    if (like.classList.contains('liked')) {
        like.classList.remove('liked');
        like.innerHTML = `<svg viewBox="0 0 24 24">
        <path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"
        fill="white"></path>
        </svg>`
    } else {
        like.classList.add('liked');
        like.innerHTML = `<svg viewBox="0 0 24 24">
        <path d="M8.667 1.912a6.257 6.257 0 0 0-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 0 0 3.09 0l7.956-9.482a6.188 6.188 0 0 0 1.382-5.234l-.49.097.49-.099a6.303 6.303 0 0 0-5.162-4.98h-.002a6.24 6.24 0 0 0-5.295 1.65.623.623 0 0 1-.848 0 6.257 6.257 0 0 0-2.91-1.568z"
        fill="#1ed760"></path>
</svg>`
    }
})

play.addEventListener('click', () => {
    if (play.classList.contains('paused')) {
        play.classList.remove('paused');
        play.innerHTML = `<svg viewBox="0 0 24 24" ><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z" fill="white"></path></svg>`
        prgBar.style.animationPlayState = 'running';
        audio.play();
    } else {
        play.classList.add('paused');
        play.innerHTML = `<svg viewBox="0 0 24 24">
        <path
            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
            fill="white"></path>
    </svg>`
        prgBar.style.animationPlayState = 'paused';
        audio.pause();
    }
})