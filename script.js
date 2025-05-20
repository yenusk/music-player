// DOM Elements
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeBar = document.getElementById("volume-bar");
const coverImg = document.getElementById("cover-img");
const songTitle = document.getElementById("song-title");
const artistEl = document.getElementById("artist");
const playlistSongs = document.getElementById("playlist-songs");

// Music playlist
const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "assets/songs/song1.mp3",
        cover: "assets/images/cover1.jpg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "assets/songs/song2.mp3",
        cover: "assets/images/cover1.jpg"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        src: "assets/songs/song3.mp3",
        cover: "assets/images/cover1.jpg"
    },
     {
        title: "Song 4",
        artist: "Artist 4",
        src: "assets/songs/song4.mp3",
        cover: "assets/images/cover1.jpg"
    },
     {
        title: "Song 5",
        artist: "Artist 5",
        src: "assets/songs/song3.mp3",
        cover: "assets/images/cover1.jpg"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

// Initialize
function loadSong(song) {
    songTitle.textContent = song.title;
    artistEl.textContent = song.artist;
    coverImg.src = song.cover;
    audio.src = song.src;
}

// Play/Pause
function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    document.querySelector(".music-player").classList.add("playing");
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    document.querySelector(".music-player").classList.remove("playing");
}

// Next/Previous Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
    updatePlaylist();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
    updatePlaylist();
}

// Progress Bar
function updateProgressBar() {
    const { currentTime, duration } = audio;
    progressBar.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    if (duration) durationEl.textContent = formatTime(duration);
}

function setProgressBar() {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
}

// Volume Control
function setVolume() {
    audio.volume = volumeBar.value / 100;
}

// Time Format (MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Playlist
function updatePlaylist() {
    playlistSongs.innerHTML = songs.map((song, index) => `
        <li class="${index === currentSongIndex ? 'active' : ''}" 
            onclick="selectSong(${index})">
            ${song.title} - ${song.artist}
        </li>
    `).join("");
}

function selectSong(index) {
    currentSongIndex = index;
    loadSong(songs[currentSongIndex]);
    playSong();
    updatePlaylist();
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
progressBar.addEventListener("input", setProgressBar);
volumeBar.addEventListener("input", setVolume);
audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("ended", nextSong);

// Initialize
loadSong(songs[currentSongIndex]);
updatePlaylist();