const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('main section[id]');

// Hamburger menu (mobile)
function setMenu(open) {
  links.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));

// Smooth scroll to section (also for the home logo), then close mobile menu
document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenu(false);
  });
});

// Highlight the nav link of the section currently in view
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
      );
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => observer.observe(s));