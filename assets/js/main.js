'use strict';

/* ── Smooth scroll for anchor links ──────────────────── */
document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
  }
});

/* ── Active nav link highlight on scroll (optional) ──── */
/* Nothing else needed — Mingger is intentionally minimal. */
