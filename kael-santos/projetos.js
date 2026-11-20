document.querySelectorAll('.project-preview[data-url]').forEach(box => {
  const name = box.closest('article').querySelector('h2').textContent;
  box.classList.add('is-loading');
  const skeleton = document.createElement('div');
  skeleton.className = 'preview-skeleton';
  skeleton.setAttribute('aria-hidden', 'true');
  skeleton.innerHTML = '<div class="sk-nav"><i></i><i></i><i></i></div><div class="sk-content"><div class="sk-copy"><i></i><i></i><i></i><i></i></div><div class="sk-image"></div></div><div class="sk-cards"><i></i><i></i><i></i></div>';
  box.append(skeleton);
  const viewport = document.createElement('div');
  viewport.className = 'preview-viewport';
  viewport.setAttribute('aria-busy', 'true');
  const frame = document.createElement('iframe');
  frame.title = 'Prévia de ' + name;
  frame.tabIndex = -1;
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  frame.loading = 'eager';
  frame.addEventListener('load', () => {
    box.classList.remove('is-loading');
    viewport.setAttribute('aria-busy', 'false');
    skeleton.remove();
  }, { once: true });
  frame.src = box.dataset.url;
  viewport.append(frame);
  box.append(viewport);
  const scale = () => {
    const ratio = box.clientWidth / 1200;
    frame.style.transform = 'scale(' + ratio + ')';
    frame.style.height = Math.ceil(box.clientHeight / ratio) + 'px';
  };
  scale();
  new ResizeObserver(scale).observe(box);
});
