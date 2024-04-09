
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const songName = document.querySelector('.songName');
const progressBar = document.querySelector('.progress-bar');
const progressDot = document.querySelector('.progress-dot');

// List of songs
const songs = [ 'KUTHANTHRAM', 'LIKE THAT - FUTURE', 'NEVER GONNA GIVE YOU UP - RICK ASTLEY', 'NO ROLE MODELZ - J.COLE', 'SUNFLOWER - POST MALONE', 'TAKING WHATS NOT YOURS - TV GIRL', 'WHERE IS MY MIND - PIXIES'];

let songIndex = 0;

// Function to load a song
function loadSong(songIndex) {
    songName.innerText = songs[songIndex];
    audio.src = `songs/${songs[songIndex]}.mp3`;
}

// Function to play a song
function playSong() {
    audio.play();
    playBtn.innerHTML = '<img src="assets/pause.png" alt="">'; // Change button icon to pause
}

// Function to pause a song
function pauseSong() {
    audio.pause();
    playBtn.innerHTML = '<img src="assets/pause.png" alt="">'; // Change button icon to play
}

// Function to play or pause a song based on its current state
function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

// Event listener for play/pause button
playBtn.addEventListener('click', togglePlay);

// Event listener for next button
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Increment songIndex and loop back to 0 if it exceeds the length of the songs array
    loadSong(songIndex);
});

// Event listener for previous button
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Decrement songIndex and loop back to the end of the array if it becomes negative
    loadSong(songIndex);
});

// Load the first song when the page loads
loadSong(songIndex);

// Event listener for updating progress bar and seeking when the audio is playing
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercentage = (currentTime / duration) * 100;
    progressDot.style.left = `${progressPercentage}%`;
});

// Event listener for clicking on the progress bar to seek to a specific position
progressBar.addEventListener('click', (event) => {
    const progressBarWidth = progressBar.clientWidth;
    const clickX = event.offsetX;
    const seekTime = (clickX / progressBarWidth) * audio.duration;
    audio.currentTime = seekTime;
});

// Load the first song when the page loads
loadSong(songIndex);