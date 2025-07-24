const allSlides = Array.from(document.querySelectorAll('.slide'));
const slidesContainer = document.getElementById('slides');
const roleToggle = document.getElementById('role-toggle');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const dots = document.getElementById('navigation-dots');

let currentIndex = 0;
let visibleSlides = [];

const slideRoles = ['both', 'owner', 'owner', 'owner', 'both'];

function updateVisibleSlides(role) {
  visibleSlides = allSlides.filter((_, i) =>
    role === 'owner' ? ['owner', 'both'].includes(slideRoles[i]) : ['member', 'both'].includes(slideRoles[i])
  );

  slidesContainer.innerHTML = '';
  visibleSlides.forEach(slide => slidesContainer.appendChild(slide));
  slidesContainer.style.width = `${visibleSlides.length * 100}%`;

  dots.innerHTML = '';
  visibleSlides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = i === 0 ? 'active' : '';
    dots.appendChild(dot);
  });

  currentIndex = 0;
  updateCarousel(currentIndex);
}

function updateCarousel(index) {
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  prevBtn.classList.toggle('hidden', index === 0);
  nextBtn.classList.toggle('hidden', index === visibleSlides.length - 1);
  [...dots.children].forEach((dot, i) => dot.classList.toggle('active', i === index));
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) currentIndex--;
  updateCarousel(currentIndex);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < visibleSlides.length - 1) currentIndex++;
  updateCarousel(currentIndex);
});

roleToggle.addEventListener('change', e => {
  updateVisibleSlides(e.target.value);
});

slidesContainer.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slidesContainer.addEventListener('touchend', e => {
  const deltaX = e.changedTouches[0].clientX - startX;
  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0 && currentIndex < visibleSlides.length - 1) currentIndex++;
    else if (deltaX > 0 && currentIndex > 0) currentIndex--;
    updateCarousel(currentIndex);
  }
});

let startX = null;

slidesContainer.addEventListener('mousedown', e => startX = e.clientX);
slidesContainer.addEventListener('mouseup', e => {
  const deltaX = e.clientX - startX;
  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0 && currentIndex < visibleSlides.length - 1) currentIndex++;
    else if (deltaX > 0 && currentIndex > 0) currentIndex--;
    updateCarousel(currentIndex);
  }
});

// Initial render
updateVisibleSlides(roleToggle.value);
