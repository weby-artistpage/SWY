// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  // Close on click
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Smooth scroll for same-page anchors
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  if (id && id.length > 1) {
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    }
  }
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add('in');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Swap brand logo to provided file if present
(function swapBrandLogo(){
  const targets = document.querySelectorAll('img.brand-logo');
  if (!targets.length) return;
  const base = 'assets/img/147D99B8-7995-420A-B95A-79D767B69AB5';
  // Try both lowercase and uppercase extensions for case-sensitive hosts
  const exts = [
    '.png', '.PNG',
    '.jpg', '.JPG',
    '.jpeg', '.JPEG',
    '.webp', '.WEBP',
    '.svg', '.SVG'
  ];
  const tryNext = (i) => {
    if (i >= exts.length) return;
    const testSrc = `${base}${exts[i]}`;
    const img = new Image();
    img.onload = () => { targets.forEach(t => t.src = testSrc); };
    img.onerror = () => tryNext(i + 1);
    img.src = testSrc;
  };
  tryNext(0);
})();

// Card tilt and shine
const cards = document.querySelectorAll('.products .card');
cards.forEach((card) => {
  const onMove = (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(0)`;
  };
  const onLeave = () => { card.style.transform = ''; };
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);
});

// Lightbox for New Release images
(function enableLightbox(){
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (!lb || !img) return;
  let scrollPos = 0;
  const open = (src, alt) => {
    img.src = src; img.alt = alt || '';
    if (cap) cap.textContent = alt || '';
    lb.classList.add('open');
    // Lock scroll without losing position
    scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.top = `-${scrollPos}px`;
    document.body.classList.add('no-scroll');
  };
  const close = () => {
    lb.classList.remove('open');
    document.body.classList.remove('no-scroll');
    const y = scrollPos;
    document.body.style.top = '';
    // Restore prior scroll position
    window.scrollTo(0, y);
    img.src = '';
  };
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.classList.contains('lightbox-close')) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // bind on cards and images to avoid overlay issues
  const selectors = ['.new .card', '.tshirts .card', '.products .card', '.lookbook-grid img', '.gallery-strip img'];
  document.querySelectorAll(selectors.join(',')).forEach((el) => {
    let targetImg = el;
    if (!(el instanceof HTMLImageElement)) targetImg = el.querySelector('img');
    if (!targetImg) return;
    targetImg.style.cursor = 'zoom-in';
    el.addEventListener('click', (e) => {
      // Avoid hijacking nav clicks
      if ((e.target instanceof HTMLElement) && e.target.closest('a')) return;
      open(targetImg.src, targetImg.alt);
    });
  });
})();
