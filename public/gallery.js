// Gallery Script for Christopher Hite's Birthday Website

// All image files to load
const imageFiles = [];

// Load images from the images directory
for (let i = 3587; i <= 3610; i++) {
    if (i === 3600) {
        imageFiles.push({ src: 'images/IMG_3600.PNG', name: `Photo ${i - 3586}` });
    } else {
        imageFiles.push({ src: `images/IMG_${i}.JPG`, name: `Photo ${i - 3586}` });
    }
}

// Create gallery items
function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    imageFiles.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.name;
        img.loading = 'lazy';
        
        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => openLightbox(image.src, image.name));
    });
    
    console.log(`Gallery loaded with ${imageFiles.length} photos!`);
}

// Lightbox functionality
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightbox.style.display = 'block';
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    
    // Close lightbox when clicking the X button
    const closeBtn = document.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the image
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});
