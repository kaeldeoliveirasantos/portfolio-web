(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const sections = [...document.querySelectorAll('main > section')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });
  sections.forEach((section, index) => {
    section.classList.add('slide-reveal');
    if (index % 2) section.classList.add('from-right');
    observer.observe(section);
  });
})();
