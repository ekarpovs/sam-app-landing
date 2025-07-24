const toggleBtn = document.getElementById('intro-toggle');
const introSection = document.querySelector('.intro-section');

toggleBtn.addEventListener('click', () => {
  introSection.classList.toggle('expanded');
  toggleBtn.textContent = introSection.classList.contains('expanded') 
    ? 'Hide SamApp Intro' 
    : 'What is SamApp?';
});
