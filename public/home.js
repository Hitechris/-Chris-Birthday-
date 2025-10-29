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


// Video player functionality
const videoToggleBtn = document.getElementById('toggle-video-player');
const videoPlayerContainer = document.getElementById('video-player-container');
const celebrationVideo = document.getElementById('celebration-video');
const videoList = document.getElementById('video-list');
const videoTitle = document.getElementById('video-title');

let currentVideoIndex = 0;

// Sample celebration video playlist (you can replace with actual video URLs)
const videoPlaylist = [
    {
        title: "🎉 Birthday Celebration",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        title: "🎂 Happy Moments",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
        title: "🎈 Special Memories",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
        title: "✨ Christopher's Highlights",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    }
];

// Toggle video player visibility
videoToggleBtn.addEventListener('click', () => {
    if (videoPlayerContainer.style.display === 'none') {
        videoPlayerContainer.style.display = 'block';
        videoToggleBtn.textContent = '📹 Hide Videos';
    } else {
        videoPlayerContainer.style.display = 'none';
        videoToggleBtn.textContent = '📹 Show Videos';
        celebrationVideo.pause();
    }
});

// Load video
function loadVideo(index) {
    currentVideoIndex = index;
    celebrationVideo.src = videoPlaylist[index].url;
    videoTitle.textContent = videoPlaylist[index].title;
    celebrationVideo.load();

    // Update active state in playlist
    document.querySelectorAll('.video-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize video playlist
function initializeVideoPlaylist() {
    videoPlaylist.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.textContent = video.title;
        videoItem.addEventListener('click', () => {
            loadVideo(index);
            celebrationVideo.play();
        });
        videoList.appendChild(videoItem);
    });

    // Set first video as active
    if (videoList.firstChild) {
        videoList.firstChild.classList.add('active');
    }
}

// Auto-play next video when current one ends
celebrationVideo.addEventListener('ended', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length;
    loadVideo(currentVideoIndex);
    celebrationVideo.play();
});

// Initialize video player
initializeVideoPlaylist();
loadVideo(0);