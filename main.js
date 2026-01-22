(() => {
  const track = document.querySelector('[data-ttc-track]');
  const prevBtn = document.querySelector('[data-ttc-prev]');
  const nextBtn = document.querySelector('[data-ttc-next]');
  const dotsWrap = document.querySelector('[data-ttc-dots]');

  const lightbox = document.querySelector('[data-ttc-lightbox]');
  const fullImg = document.querySelector('[data-ttc-full]');
  const closeBtn = document.querySelector('[data-ttc-close]');

  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.ttc-slide'));
  const imgs = Array.from(track.querySelectorAll('[data-ttc-img]'));

  // --- Dots ---
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ttc-dot';
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.addEventListener('click', () => scrollToIndex(i));
    dotsWrap.appendChild(b);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('.ttc-dot'));

  function getSlideWidth() {
    const first = slides[0];
    if (!first) return 0;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  }

  function scrollToIndex(i) {
    const w = getSlideWidth();
    track.scrollTo({ left: i * w, behavior: 'smooth' });
  }

  function activeIndex() {
    const w = getSlideWidth();
    if (!w) return 0;
    return Math.round(track.scrollLeft / w);
  }

  function updateDots() {
    const idx = Math.min(Math.max(activeIndex(), 0), slides.length - 1);
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateDots);
  });

  prevBtn?.addEventListener('click', () => scrollToIndex(Math.max(activeIndex() - 1, 0)));
  nextBtn?.addEventListener('click', () => scrollToIndex(Math.min(activeIndex() + 1, slides.length - 1)));

  updateDots();

  // --- Lightbox ---
  function openLightbox(src, alt) {
    fullImg.src = src;
    fullImg.alt = alt || 'Poster';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    fullImg.src = '';
    document.documentElement.style.overflow = '';
  }

  imgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();





(() => {
  const track = document.querySelector('[data-atc-track]');
  const prevBtn = document.querySelector('[data-atc-prev]');
  const nextBtn = document.querySelector('[data-atc-next]');
  const dotsWrap = document.querySelector('[data-atc-dots]');

  const lightbox = document.querySelector('[data-atc-lightbox]');
  const fullImg = document.querySelector('[data-atc-full]');
  const closeBtn = document.querySelector('[data-atc-close]');

  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.ttc-slide'));
  const imgs = Array.from(track.querySelectorAll('[data-atc-img]'));

  // Dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ttc-dot';
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.addEventListener('click', () => scrollToIndex(i));
    dotsWrap.appendChild(b);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('.ttc-dot'));

  function getSlideWidth() {
    const first = slides[0];
    if (!first) return 0;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  }

  function scrollToIndex(i) {
    const w = getSlideWidth();
    track.scrollTo({ left: i * w, behavior: 'smooth' });
  }

  function activeIndex() {
    const w = getSlideWidth();
    if (!w) return 0;
    return Math.round(track.scrollLeft / w);
  }

  function updateDots() {
    const idx = Math.min(Math.max(activeIndex(), 0), slides.length - 1);
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateDots);
  });

  prevBtn?.addEventListener('click', () => scrollToIndex(Math.max(activeIndex() - 1, 0)));
  nextBtn?.addEventListener('click', () => scrollToIndex(Math.min(activeIndex() + 1, slides.length - 1)));

  updateDots();

  // Lightbox
  function openLightbox(src, alt) {
    fullImg.src = src;
    fullImg.alt = alt || 'Poster';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    fullImg.src = '';
    document.documentElement.style.overflow = '';
  }

  imgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();



<script>
(() => {
  const track = document.querySelector('[data-test-track]');
  if (!track) return;

  // Duplicate content to create seamless infinite scrolling
  track.innerHTML += track.innerHTML;

  // Allow tap-to-pause on mobile
  const marquee = track.closest('.test-marquee');
  marquee.addEventListener('click', () => marquee.classList.toggle('paused'));
})();
</script>

(() => {
  const track = document.querySelector('[data-test-track]');
  if (!track) return;
  track.innerHTML += track.innerHTML; // duplicate for infinite
})();

(() => {
  const lightbox = document.querySelector('[data-aff-lightbox]');
  const full = document.querySelector('[data-aff-full]');
  const closeBtn = document.querySelector('[data-aff-close]');
  const imgs = document.querySelectorAll('[data-aff-img]');

  if (!lightbox || !full || !imgs.length) return;

  function open(src, alt) {
    full.src = src;
    full.alt = alt || 'Logo';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    full.src = '';
    document.documentElement.style.overflow = '';
  }

  imgs.forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

