// fix-links.js — small site fixes (logo size normalizer)
// Sets top fixed logo to the same classes as on the homepage

document.addEventListener('DOMContentLoaded', function () {
  try {
    // Target only the logo inside the fixed top container to avoid changing footer logos
    var logos = document.querySelectorAll('div.fixed.top-0 img[src$="logo.png"]');
    logos.forEach(function (img) {
      // Replace classes so the top logo is consistent across pages
      img.className = 'h-28 sm:h-32 w-auto drop-shadow-lg';
    });
  } catch (err) {
    console.error('fix-links.js error:', err);
  }
});
