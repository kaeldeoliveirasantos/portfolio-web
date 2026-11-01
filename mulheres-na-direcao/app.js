const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const header = document.querySelector('.site-header');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menu');
  if (returnFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
const heroVideo = document.querySelector('#hero-video');
const motionToggle = document.querySelector('#motion-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function updateMotionButton() {
  if (!heroVideo || !motionToggle) return;
  motionToggle.setAttribute('aria-label', heroVideo.paused ? 'Reproduzir vídeo de abertura' : 'Pausar vídeo de abertura');
  motionToggle.firstElementChild.textContent = heroVideo.paused ? '▶' : 'Ⅱ';
}
if (heroVideo && motionToggle) {
  if (reducedMotion.matches || navigator.connection?.saveData) {heroVideo.removeAttribute('autoplay');heroVideo.pause();}
  reducedMotion.addEventListener('change', event => { if (event.matches) heroVideo.pause(); });
  motionToggle.addEventListener('click', () => {if (heroVideo.paused) heroVideo.play().catch(updateMotionButton); else heroVideo.pause();});
  heroVideo.addEventListener('play', updateMotionButton);
  heroVideo.addEventListener('pause', updateMotionButton);
  heroVideo.addEventListener('error', () => { motionToggle.hidden = true; });
}
updateMotionButton();
document.querySelectorAll('[data-play]').forEach(button => {
  const video = document.getElementById(button.dataset.play);
  button.addEventListener('click', () => {
    video.play().then(() => {button.hidden = true;video.parentElement.classList.add('is-playing');video.focus();}).catch(() => {button.hidden = true;video.controls = true;});
  });
  video.addEventListener('play', () => {heroVideo?.pause();document.querySelectorAll('.story-player video').forEach(other => { if (other !== video) other.pause(); });});
  video.addEventListener('ended', () => {button.hidden = false;video.parentElement.classList.remove('is-playing');});
});
