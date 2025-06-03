// Featured Art Slideshow
const artImages = [
  {
    src: './artworks/art1.jpg',
    title: 'Art Title 1',
    description: 'Description of the first artwork.'
  },
  {
    src: './artworks/art2.jpg',
    title: 'Art Title 2',
    description: 'Description of the second artwork.'
  },
  {
    src: './artworks/art3.jpg',
    title: 'Art Title 3',
    description: 'Description of the third artwork.'
  }
];

let currentIndex = 0;

function showNextArt() {
  currentIndex = (currentIndex + 1) % artImages.length;
  const artImg = document.getElementById('art-img');
  const artTitle = document.getElementById('art-title');
  const artDescription = document.getElementById('art-description');

  // Fade out, then change content, then fade in
  artImg.style.opacity = 0;
  setTimeout(() => {
    artImg.src = artImages[currentIndex].src;
    artTitle.textContent = artImages[currentIndex].title;
    artDescription.textContent = artImages[currentIndex].description;
    artImg.style.opacity = 1;
  }, 1000);
}

setInterval(showNextArt, 5000);

// Load More Exhibitions
function loadMoreExhibitions() {
  const grid = document.getElementById('exhibition-grid');
  for (let i = 4; i <= 6; i++) {
    const card = document.createElement('div');
    card.classList.add('exhibition-card');
    card.innerHTML = `
      <img src="./artworks/exhibit${i}.jpg" alt="Exhibit ${i}">
      <p>Exhibition Name ${i}</p>
    `;
    grid.appendChild(card);
  }
}
