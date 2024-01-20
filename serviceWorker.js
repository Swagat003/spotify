const spotifyClone = "spotify-clone";
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/css/utility.css",
    "/js/script.js",
    "/js/songsList.js",
    "/songs/song11.mp3",
    "/images/song-img11.jpg",
    "/images/song-img1.jpg",
    "/images/song-img2.jpg",
    "/images/song-img3.jpg",
    "/images/song-img4.jpg",
    "/images/song-img5.jpg",
    "/images/song-img6.jpg",
    "/images/song-img7.jpg",
    "/images/song-img8.jpg",
    "/images/song-img9.jpg",
    "/images/song-img10.jpg",
    "/songs/song1.mp3",
    "/songs/song2.mp3",
    "/songs/song3.mp3",
    "/songs/song4.mp3",
    "/songs/song5.mp3",
    "/songs/song6.mp3",
    "/songs/song7.mp3",
    "/songs/song8.mp3",
    "/songs/song9.mp3",
    "/songs/song10.mp3"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(spotifyClone).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})