const howtoBtn = document.getElementById('howto-toggle');
const howtoSection = document.getElementById('howto-section');

howtoBtn.addEventListener('click', () => {
  howtoSection.classList.toggle('expanded');
  howtoBtn.textContent = howtoSection.classList.contains('expanded') 
    ? 'Hide How To Start?' 
    : 'How To Start?';
});
