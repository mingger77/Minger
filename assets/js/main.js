'use strict';

(function () {

  /* ── Dark/Light Theme Toggle ────────────────────────── */
  var STORAGE_KEY = 'theme';
  var DEFAULT_THEME = 'dark';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggleTheme() {
    var current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  setTheme(getTheme());

  /* ── Click Delegation ───────────────────────────────── */
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('#theme-toggle');
    if (toggle) {
      e.preventDefault();
      toggleTheme();
      return;
    }

    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });

})();
