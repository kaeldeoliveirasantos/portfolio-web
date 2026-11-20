document.querySelectorAll('.monitor-screen').forEach(screen => {
  const frame = screen.querySelector('iframe');
  const resize = () => {
    const scale = screen.clientWidth / 1200;
    frame.style.transform = 'scale(' + scale + ')';
    frame.style.height = Math.ceil(screen.clientHeight / scale) + 'px';
  };
  resize();
  new ResizeObserver(resize).observe(screen);
});
