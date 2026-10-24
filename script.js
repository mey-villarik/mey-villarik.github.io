document.documentElement.classList.add('js');

const topbar = document.getElementById('topbar');
const toTop = document.querySelector('.to-top');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.links');

function onScroll() {
  const y = window.scrollY;
  topbar.classList.toggle('scrolled', y > 40);
  toTop.classList.toggle('show', y > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
}));

// Aparición de secciones y enlace activo del menú
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    links.querySelectorAll('a').forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contadores del banner
document.querySelectorAll('[data-count]').forEach(el => {
  const target = Number(el.dataset.count);
  let n = 0;
  const step = () => {
    n += 1;
    el.textContent = n;
    if (n < target) setTimeout(step, 1200 / target);
  };
  setTimeout(step, 400);
});
