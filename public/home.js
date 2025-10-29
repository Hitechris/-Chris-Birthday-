// Home Page Slideshow and Music Player

let slideIndex = 0;
let musicPlaying = false;
let currentSongIndex = 0;

const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');
const songTitle = document.getElementById('song-title');
const nextBtn = document.getElementById('next-song');
const prevBtn = document.getElementById('prev-song');

// Birthday music playlist
const playlist = [
    {
        title: 'Happy Rock',
        url: 'https://www.bensound.com/bensound-music/bensound-happyrock.mp3'
    },
    {
        title: 'Ukulele',
        url: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3'
    },
    {
        title: 'Summer',
        url: 'https://www.bensound.com/bensound-music/bensound-summer.mp3'
    },
    {
        title: 'Energy',
        url: 'https://www.bensound.com/bensound-music/bensound-energy.mp3'
    },
    {
        title: 'Funky Suspense',
        url: 'https://www.bensound.com/bensound-music/bensound-funkysuspense.mp3'
    }
];

let audio = new Audio(playlist[0].url);
audio.loop = false;

// Slideshow functionality
function showSlides() {
    const slides = document.getElementsByClassName("slide");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
    
    setTimeout(showSlides, 3500); // Change image every 3.5 seconds
}

// Update song display
function updateSongDisplay() {
    if (songTitle) {
        songTitle.textContent = `🎵 ${playlist[currentSongIndex].title}`;
    }
}

// Load and play song
function loadSong(index) {
    currentSongIndex = index;
    const wasPlaying = musicPlaying;
    
    audio.src = playlist[currentSongIndex].url;
    updateSongDisplay();
    
    if (wasPlaying) {
        audio.play().then(() => {
            musicIcon.textContent = '⏸️';
            musicText.textContent = 'Pause Music';
            musicPlaying = true;
        }).catch(error => {
            console.log('Music playback failed:', error);
        });
    }
}

// Next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
}

// Previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
}

// Music player functionality
function toggleMusic() {
    if (musicPlaying) {
        audio.pause();
        musicIcon.textContent = '🎵';
        musicText.textContent = 'Play Music';
        musicPlaying = false;
    } else {
        audio.play().then(() => {
            musicIcon.textContent = '⏸️';
            musicText.textContent = 'Pause Music';
            musicPlaying = true;
        }).catch(error => {
            console.log('Music playback failed:', error);
        });
    }
}

// Auto-play next song when current song ends
audio.addEventListener('ended', () => {
    nextSong();
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    showSlides();
    updateSongDisplay();
    
    // Music toggle button
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
    
    // Next/Previous buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSong);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSong);
    }
    
    // Auto-play music (browsers may block this, user needs to click)
    // Uncomment the next line if you want music to auto-play on page load
    // toggleMusic();
});
