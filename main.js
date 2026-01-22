/* =========================
   TTC Carousel (dots + prev/next)
========================= */
(() => {
  const track = document.querySelector('[data-ttc-track]');
  const prevBtn = document.querySelector('[data-ttc-prev]');
  const nextBtn = document.querySelector('[data-ttc-next]');
  const dotsWrap = document.querySelector('[data-ttc-dots]');

  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.ttc-slide'));
  if (!slides.length || !dotsWrap) return;

  // --- Dots ---
  dotsWrap.innerHTML = '';
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

  track.addEventListener('scroll', () => window.requestAnimationFrame(updateDots));

  prevBtn?.addEventListener('click', () => scrollToIndex(Math.max(activeIndex() - 1, 0)));
  nextBtn?.addEventListener('click', () => scrollToIndex(Math.min(activeIndex() + 1, slides.length - 1)));

  updateDots();
})();


/* =========================
   ATC Carousel (dots + prev/next)
========================= */
(() => {
  const track = document.querySelector('[data-atc-track]');
  const prevBtn = document.querySelector('[data-atc-prev]');
  const nextBtn = document.querySelector('[data-atc-next]');
  const dotsWrap = document.querySelector('[data-atc-dots]');

  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.ttc-slide'));
  if (!slides.length || !dotsWrap) return;

  // --- Dots ---
  dotsWrap.innerHTML = '';
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

  track.addEventListener('scroll', () => window.requestAnimationFrame(updateDots));

  prevBtn?.addEventListener('click', () => scrollToIndex(Math.max(activeIndex() - 1, 0)));
  nextBtn?.addEventListener('click', () => scrollToIndex(Math.min(activeIndex() + 1, slides.length - 1)));

  updateDots();
})();


/* =========================
   Testimonials: duplicate once + tap to pause
========================= */
(() => {
  const track = document.querySelector('[data-test-track]');
  if (!track) return;

  // prevent duplicate duplication
  if (track.dataset.duplicated === '1') return;
  track.dataset.duplicated = '1';

  track.innerHTML += track.innerHTML;

  const marquee = track.closest('.test-marquee');
  if (marquee) marquee.addEventListener('click', () => marquee.classList.toggle('paused'));
})();


/* =========================
   ONE Lightbox handler for TTC + ATC + Affiliations
========================= */
(() => {
  const lockScroll = () => (document.documentElement.style.overflow = 'hidden');
  const unlockScroll = () => (document.documentElement.style.overflow = '');

  function openBox(boxSel, imgSel, src, alt) {
    const box = document.querySelector(boxSel);
    const img = document.querySelector(imgSel);
    if (!box || !img) return;

    img.src = src;
    img.alt = alt || 'Image';
    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
    lockScroll();
  }

  function closeBox(boxSel, imgSel) {
    const box = document.querySelector(boxSel);
    const img = document.querySelector(imgSel);
    if (!box || !img) return;

    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    img.src = '';
    unlockScroll();
  }

  document.addEventListener('click', (e) => {
    // Posters + Logos
    const ttcImg = e.target.closest('[data-ttc-img]');
    if (ttcImg) {
      e.preventDefault();
      e.stopPropagation();
      openBox('[data-ttc-lightbox]', '[data-ttc-full]', ttcImg.src, ttcImg.alt);
      return;
    }

    const atcImg = e.target.closest('[data-atc-img]');
    if (atcImg) {
      e.preventDefault();
      e.stopPropagation();
      openBox('[data-atc-lightbox]', '[data-atc-full]', atcImg.src, atcImg.alt);
      return;
    }

    const affImg = e.target.closest('[data-aff-img]');
    if (affImg) {
      e.preventDefault();
      e.stopPropagation();
      openBox('[data-aff-lightbox]', '[data-aff-full]', affImg.src, affImg.alt);
      return;
    }

    // Click outside to close
    const ttcBox = e.target.closest('[data-ttc-lightbox]');
    if (ttcBox && e.target === ttcBox) { closeBox('[data-ttc-lightbox]', '[data-ttc-full]'); return; }

    const atcBox = e.target.closest('[data-atc-lightbox]');
    if (atcBox && e.target === atcBox) { closeBox('[data-atc-lightbox]', '[data-atc-full]'); return; }

    const affBox = e.target.closest('[data-aff-lightbox]');
    if (affBox && e.target === affBox) { closeBox('[data-aff-lightbox]', '[data-aff-full]'); return; }

    // Close buttons
    if (e.target.closest('[data-ttc-close]')) { closeBox('[data-ttc-lightbox]', '[data-ttc-full]'); return; }
    if (e.target.closest('[data-atc-close]')) { closeBox('[data-atc-lightbox]', '[data-atc-full]'); return; }
    if (e.target.closest('[data-aff-close]')) { closeBox('[data-aff-lightbox]', '[data-aff-full]'); return; }
  }, true);

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeBox('[data-ttc-lightbox]', '[data-ttc-full]');
    closeBox('[data-atc-lightbox]', '[data-atc-full]');
    closeBox('[data-aff-lightbox]', '[data-aff-full]');
  });
})();

(() => {
  const fabBtn = document.getElementById("fabBtn");
  const fabMenu = document.getElementById("fabMenu");
  const fabBackdrop = document.getElementById("fabBackdrop");
  const fabGeneral = document.getElementById("fabGeneral");

  function openFab(){
    document.body.classList.add("fab-open");
    fabBtn.setAttribute("aria-expanded", "true");
    fabMenu.setAttribute("aria-hidden", "false");
    fabBackdrop.setAttribute("aria-hidden", "false");
  }

  function closeFab(){
    document.body.classList.remove("fab-open");
    fabBtn.setAttribute("aria-expanded", "false");
    fabMenu.setAttribute("aria-hidden", "true");
    fabBackdrop.setAttribute("aria-hidden", "true");
  }

  function toggleFab(){
    if(document.body.classList.contains("fab-open")) closeFab();
    else openFab();
  }

  fabBtn.addEventListener("click", toggleFab);
  fabBackdrop.addEventListener("click", closeFab);

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeFab();
  });

  // General Enquiry click (replace with your form/page link later)
  fabGeneral.addEventListener("click", () => {
    // Example: open a link. Change this to your general enquiry form when ready.
    // window.open("YOUR_GENERAL_ENQUIRY_FORM_URL", "_blank");
    alert("General Enquiry Form (link to be added)");
    closeFab();
  });
})();
