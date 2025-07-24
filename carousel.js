const slides = document.querySelector('#slides');
const slideItems = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const dots = document.getElementById('navigation-dots');

let currentIndex = 0;
const totalSlides = slideItems.length;

// Create dots dynamically
dots.innerHTML = Array.from({ length: totalSlides }, (_, i) =>
  `<span class="${i === 0 ? 'active' : ''}"></span>`
).join('');
const dotElems = dots.querySelectorAll('span');

function updateCarousel(index) {
  slides.style.transform = `translateX(-${index * 100}%)`;

  prevBtn.classList.toggle('hidden', index === 0);
  nextBtn.classList.toggle('hidden', index === totalSlides - 1);

  dotElems.forEach((dot, i) =>
    dot.classList.toggle('active', i === index)
  );
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) currentIndex--;
  updateCarousel(currentIndex);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < totalSlides - 1) currentIndex++;
  updateCarousel(currentIndex);
});

// Touch support
let startX = null;
slides.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

slides.addEventListener('touchend', e => {
  if (startX === null) return;
  const delta = e.changedTouches[0].clientX - startX;
  if (Math.abs(delta) < 50) return;

  if (delta < 0 && currentIndex < totalSlides - 1) currentIndex++;
  else if (delta > 0 && currentIndex > 0) currentIndex--;

  updateCarousel(currentIndex);
  startX = null;
});

// Mouse support
let mouseStart = null;
slides.addEventListener('mousedown', e => {
  mouseStart = e.clientX;
});

slides.addEventListener('mouseup', e => {
  if (mouseStart === null) return;
  const delta = e.clientX - mouseStart;
  if (Math.abs(delta) < 50) return;

  if (delta < 0 && currentIndex < totalSlides - 1) currentIndex++;
  else if (delta > 0 && currentIndex > 0) currentIndex--;

  updateCarousel(currentIndex);
  mouseStart = null;
});

// Initial render
updateCarousel(currentIndex);
