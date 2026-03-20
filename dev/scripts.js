/* ============================================================
   GujPsych Repository — Shared Scripts
   ============================================================ */

// --- Nav + Hamburger ---
fetch('nav.html')
  .then(r => r.text())
  .then(html => {
    document.getElementById('nav-placeholder').innerHTML = html;

    // Active link highlight
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#main-nav a').forEach(a => {
      if (a.getAttribute('href') === current) a.classList.add('active');
    });

    // Hamburger toggle — must run AFTER nav is injected into DOM
    const btn = document.querySelector('.hamburger');
    const nav = document.getElementById('main-nav');

    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
      btn.classList.toggle('open');
    });

    // Close menu when any nav link is tapped
    document.querySelectorAll('#main-nav a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        btn.classList.remove('open');
      });
    });
  });

// --- Footer ---
fetch('footer.html')
  .then(r => r.text())
  .then(html => document.getElementById('footer-placeholder').innerHTML = html);

// --- Maintainer block (only on pages that have the slot) ---
const maintainerSlot = document.getElementById('maintainer-slot');
if (maintainerSlot) {
  fetch('maintainer.html')
    .then(r => r.text())
    .then(html => maintainerSlot.innerHTML = html);
}

// --- Language toggle (only on pages that use it) ---
function setLang(lang) {
  document.body.className = lang;
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang)
  );
  localStorage.setItem('gujpsych-lang', lang);
}

(function () {
  // Only run if page uses bilingual content
  if (document.querySelector('[lang-en]')) {
    const saved = localStorage.getItem('gujpsych-lang') || 'en';
    setLang(saved);
  }
})();
