const allSlides = Array.from(document.querySelectorAll('.slide'));
const slidesContainer = document.getElementById('slides');
const roleButtons = document.querySelectorAll('.tab-btn');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const dots = document.getElementById('navigation-dots');
const currentSlideSpan = document.getElementById('current-slide');
const totalSlidesSpan = document.getElementById('total-slides');

let currentIndex = 0;
let visibleSlides = [];

const slideRoles = ['both', // welcome
  'both', // login
  'owner', 'owner', // register
  'owner', 'owner', // login
  // 'owner', 'owner', 'owner', 'owner', // setup
  'both', 'both', 'both', // main
  'owner', 'owner', // settings
  'owner', 'owner', // settings
  'owner', 'owner', // settings
  'owner', 'owner' // settings
];

function updateVisibleSlides(role) {
  visibleSlides = allSlides.filter((_, i) =>
    role === 'owner' ? ['owner', 'both'].includes(slideRoles[i]) : ['member', 'both'].includes(slideRoles[i])
  );

  slidesContainer.innerHTML = '';
  visibleSlides.forEach(slide => slidesContainer.appendChild(slide));
  // Don't set inline width - let CSS handle it with flex
  slidesContainer.style.width = '';

  dots.innerHTML = '';
  visibleSlides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = i === 0 ? 'active' : '';
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel(currentIndex);
    });
    dots.appendChild(dot);
  });

  // Update total slides counter
  if (totalSlidesSpan) {
    totalSlidesSpan.textContent = visibleSlides.length;
  }

  currentIndex = 0;
  updateCarousel(currentIndex);
}

function updateCarousel(index) {
  // Use index * 100% for translateX since each slide is 100% of container width
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  
  // Update button states
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === visibleSlides.length - 1;
  
  // Update dots
  [...dots.children].forEach((dot, i) => dot.classList.toggle('active', i === index));
  
  // Update slide counter
  if (currentSlideSpan) {
    currentSlideSpan.textContent = index + 1;
  }
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) currentIndex--;
  updateCarousel(currentIndex);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < visibleSlides.length - 1) currentIndex++;
  updateCarousel(currentIndex);
});

roleButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active tab
    roleButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');

    const selectedRole = button.getAttribute('data-role');
    updateVisibleSlides(selectedRole);
  });
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
updateVisibleSlides('owner'); // Default to 'owner' role
