const introBtn = document.getElementById('intro-toggle');
const introSection = document.getElementById('intro-section');

introBtn.addEventListener('click', () => {
  introSection.classList.toggle('expanded');
  introBtn.textContent = introSection.classList.contains('expanded') 
    ? 'Hide SamApp Intro' 
    : 'What is SamApp?';
});
