// Birthday Celebration Script for Christopher Hite

// CUSTOMIZATION SECTION - Edit these values to personalize the website
const BIRTHDAY_PERSON_NAME = "Christopher Hite"; // Change the name here
const BIRTHDAY_MESSAGES = [
    `🎉 Happy Birthday ${BIRTHDAY_PERSON_NAME}! 🎂`,
    `Wishing you endless joy and blessings, ${BIRTHDAY_PERSON_NAME}! 🎈`,
    `May all your dreams come true, ${BIRTHDAY_PERSON_NAME}! ✨`,
    `Cheers to another amazing year, ${BIRTHDAY_PERSON_NAME}! 🥳`,
    `Have the best birthday ever, ${BIRTHDAY_PERSON_NAME}! 🎁`
];

// Animation settings - Change these to adjust speed and behavior
const ANIMATION_DURATION = 10000; // Duration in milliseconds (10 seconds)
const BUBBLE_COUNT = 25; // Number of bubbles to create
const BALLOON_COUNT = 15; // Number of balloons to create
const BUBBLE_MIN_SIZE = 80; // Minimum bubble size in pixels
const BUBBLE_MAX_SIZE = 150; // Maximum bubble size in pixels

// Bubble and balloon colors - Add or modify colors here
const BUBBLE_COLORS = [
    'rgba(255, 107, 107, 0.6)',
    'rgba(255, 195, 113, 0.6)',
    'rgba(255, 234, 167, 0.6)',
    'rgba(132, 250, 176, 0.6)',
    'rgba(142, 236, 245, 0.6)',
    'rgba(162, 155, 254, 0.6)',
    'rgba(255, 159, 243, 0.6)'
];

const BALLOON_COLORS = [
    '#FF6B6B',
    '#FFC371',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DFE6E9',
    '#A29BFE',
    '#FD79A8',
    '#FDCB6E'
];

// Global variables
let imageFiles = [];
let isAnimating = false;

// Load all images from the /public/images folder
async function loadImages() {
    try {
        // Get all image files from the images directory
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG', '.PNG', '.GIF'];
        
        // We'll manually create an array of image paths based on what we know exists
        // In a real server environment, this would be done differently
        imageFiles = [];
        
        // Try to load images by checking if they exist
        for (let i = 3587; i <= 3610; i++) {
            const imgPath = `images/IMG_${i}.JPG`;
            imageFiles.push(imgPath);
        }
        
        // Also check for PNG
        imageFiles.push('images/IMG_3600.PNG');
        
        console.log(`Loaded ${imageFiles.length} images for the celebration!`);
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

// Get a random item from an array
function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Get a random number between min and max
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a bubble element
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = randomNumber(BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE);
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random starting position
    bubble.style.left = `${randomNumber(0, window.innerWidth - size)}px`;
    bubble.style.bottom = '-150px';
    
    // Random drift for floating effect
    const drift = randomNumber(-200, 200);
    bubble.style.setProperty('--drift', `${drift}px`);
    
    // Randomly decide if this bubble gets an image or just a color
    const useImage = imageFiles.length > 0 && Math.random() > 0.4;
    
    if (useImage) {
        const img = document.createElement('img');
        img.className = 'bubble-image';
        img.src = randomItem(imageFiles);
        img.alt = BIRTHDAY_PERSON_NAME;
        bubble.appendChild(img);
    } else {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'bubble-color';
        colorDiv.style.background = randomItem(BUBBLE_COLORS);
        bubble.appendChild(colorDiv);
    }
    
    // Add click event to pop the bubble
    bubble.addEventListener('click', () => popBubble(bubble));
    
    // Auto-pop after a random time
    setTimeout(() => {
        if (bubble.parentElement) {
            popBubble(bubble);
        }
    }, randomNumber(3000, 7000));
    
    return bubble;
}

// Create a balloon element
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    balloon.style.background = randomItem(BALLOON_COLORS);
    balloon.style.left = `${randomNumber(0, window.innerWidth - 60)}px`;
    
    // Random drift for floating effect
    const drift = randomNumber(-100, 100);
    balloon.style.setProperty('--drift', `${drift}px`);
    
    return balloon;
}

// Pop a bubble and show a message
function popBubble(bubble) {
    // Remove the bubble
    bubble.style.animation = 'none';
    bubble.style.opacity = '0';
    
    setTimeout(() => {
        if (bubble.parentElement) {
            bubble.remove();
        }
    }, 300);
    
    // Show pop message
    showPopMessage();
}

// Show a celebration message when a bubble pops
function showPopMessage() {
    const message = document.createElement('div');
    message.className = 'pop-message';
    message.textContent = randomItem(BIRTHDAY_MESSAGES);
    
    document.body.appendChild(message);
    
    // Remove message after animation
    setTimeout(() => {
        message.remove();
    }, 1500);
}

// Start the celebration animation
function startCelebration() {
    if (isAnimating) return;
    
    isAnimating = true;
    const celebrationContainer = document.getElementById('celebration-container');
    const balloonContainer = document.getElementById('balloon-container');
    
    // Create bubbles with staggered timing
    for (let i = 0; i < BUBBLE_COUNT; i++) {
        setTimeout(() => {
            const bubble = createBubble();
            celebrationContainer.appendChild(bubble);
        }, i * 200); // Stagger bubble creation
    }
    
    // Create balloons with staggered timing
    for (let i = 0; i < BALLOON_COUNT; i++) {
        setTimeout(() => {
            const balloon = createBalloon();
            balloonContainer.appendChild(balloon);
        }, i * 300); // Stagger balloon creation
    }
    
    // Clean up after animation completes
    setTimeout(() => {
        celebrationContainer.innerHTML = '';
        balloonContainer.innerHTML = '';
        isAnimating = false;
    }, ANIMATION_DURATION);
}

// Initialize the celebration button
function initializeCelebration() {
    const celebrateBtn = document.getElementById('celebrate-btn');
    
    celebrateBtn.addEventListener('click', () => {
        startCelebration();
        
        // Add a fun button animation
        celebrateBtn.style.transform = 'translateX(-50%) scale(0.9)';
        setTimeout(() => {
            celebrateBtn.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
    });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', async () => {
    await loadImages();
    initializeCelebration();
    console.log('Birthday celebration ready! 🎉');
});
