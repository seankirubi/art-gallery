const artworks = [
    { name: "Whispers of Time", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
    { name: "Urban Dreams", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=200&fit=crop" },
    { name: "Nature's Symphony", image: "./artworks/exhibit3.jpg" },
    { name: "Digital Frontier", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
    { name: "Color Harmony", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=200&fit=crop" },
    { name: "Abstract Emotions", image: "./artworks/exhibit4.jpg" },
    { name: "Light and Shadow", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
    { name: "Geometric Dreams", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=200&fit=crop" },
    { name: "Sunset Reflections", image: "./artworks/exhibit5.jpg" },
    { name: "Modern Impressions", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
    { name: "Textured Reality", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=200&fit=crop" },
    { name: "Fluid Motion", image: "./artworks/exhibit6.jpg" },
    { name: "Cosmic Journey", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
    { name: "Silent Stories", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=200&fit=crop" },
    { name: "Vibrant Chaos", image: "./artworks/exhibit1.jpg" },
    { name: "Peaceful Moments", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
    { name: "Bold Expressions", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=200&fit=crop" },
    { name: "Timeless Beauty", image: "./artworks/art5.jpg" }
];

let currentArtworkIndex = 0;
let currentExhibitionIndex = 0;
// Modified carousel variables
let currentSlide = 0;
const totalSlides = 5;
let allArtworks = [...artworks];
let filteredArtworks = [...artworks];
const artworksPerLoad = 6;

// Exhibition slideshow
function startExhibitionSlideshow() {
    const slides = document.querySelectorAll('.exhibition-slide');
    setInterval(() => {
        slides[currentExhibitionIndex].classList.remove('active');
        currentExhibitionIndex = (currentExhibitionIndex + 1) % slides.length;
        slides[currentExhibitionIndex].classList.add('active');
    }, 5000);
}

// Modified carousel functionality
function updateCarouselSlides() {
    const slides = document.querySelectorAll('.carousel-slide');
    
    slides.forEach((slide, index) => {
        slide.classList.remove('visible', 'center', 'side');
        
        // Show only 3 slides: previous, current, next
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        const nextIndex = (currentSlide + 1) % totalSlides;
        
        if (index === currentSlide) {
            slide.classList.add('visible', 'center');
        } else if (index === prevIndex || index === nextIndex) {
            slide.classList.add('visible', 'side');
        }
    });
}

function moveCarousel(direction) {
    if (direction === 1) { // Next
        currentSlide = (currentSlide + 1) % totalSlides;
    } else { // Previous
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }
    
    updateCarouselSlides();
}

// Auto-move carousel
function startCarouselAuto() {
    setInterval(() => {
        moveCarousel(1);
    }, 3000);
}

// Load artworks
function loadMoreArtworks() {
    const grid = document.getElementById('artworksGrid');
    const loadBtn = document.getElementById('loadMoreBtn');
    
    const startIndex = currentArtworkIndex;
    const endIndex = Math.min(currentArtworkIndex + artworksPerLoad, filteredArtworks.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const artwork = filteredArtworks[i];
        const card = document.createElement('div');
        card.className = 'artwork-card';
        card.innerHTML = `
            <img src="${artwork.image}" alt="${artwork.name}" class="artwork-image">
            <div class="artwork-name">${artwork.name}</div>
        `;
        grid.appendChild(card);
        
        // Animate card appearance
        setTimeout(() => {
            card.style.animationDelay = `${(i - startIndex) * 0.1}s`;
        }, 50);
    }
    
    currentArtworkIndex = endIndex;
    
    if (currentArtworkIndex >= filteredArtworks.length) {
        loadBtn.style.display = 'none';
        const allLoadedMsg = document.createElement('div');
        allLoadedMsg.className = 'all-loaded';
        allLoadedMsg.textContent = 'All images loaded';
        grid.parentNode.insertBefore(allLoadedMsg, grid.nextSibling);
    }
}

// Filter artworks
function filterArtworks(query) {
    const grid = document.getElementById('artworksGrid');
    const loadBtn = document.getElementById('loadMoreBtn');
    const allLoadedMsg = document.querySelector('.all-loaded');
    
    // Clear current grid
    grid.innerHTML = '';
    if (allLoadedMsg) allLoadedMsg.remove();
    
    // Filter artworks
    filteredArtworks = artworks.filter(artwork => 
        artwork.name.toLowerCase().includes(query.toLowerCase())
    );
    
    // Reset index and load first batch
    currentArtworkIndex = 0;
    loadBtn.style.display = 'block';
    loadMoreArtworks();
}

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.querySelector('.theme-toggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeBtn.textContent = '🌙';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '☀️';
    }
}

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Infinite scroll
function setupInfiniteScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && currentArtworkIndex < filteredArtworks.length) {
                loadMoreArtworks();
            }
        });
    }, {
        rootMargin: '100px'
    });

    const loadBtn = document.getElementById('loadMoreBtn');
    observer.observe(loadBtn);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    startExhibitionSlideshow();
    startCarouselAuto();
    loadMoreArtworks();
    setupInfiniteScroll();
    
    // Initialize carousel
    updateCarouselSlides();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});