// Home Page Slideshow and Music Player

let slideIndex = 0;
let musicPlaying = false;
const audio = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');

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
    
    setTimeout(showSlides, 4000); // Change image every 4 seconds
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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    showSlides();
    
    // Music toggle button
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
    
    // Auto-play music (browsers may block this, user needs to click)
    // Uncomment the next line if you want music to auto-play on page load
    // toggleMusic();
});
