// fix-links.js — small site fixes (logo size normalizer)
// Sets top fixed logo to the same classes as on the homepage and swaps footer logos to the SVG asset

document.addEventListener('DOMContentLoaded', function () {
  try {
    // Target only the logo inside the fixed top container to avoid changing footer logos
    var logos = document.querySelectorAll('div.fixed.top-0 img[src$="logo.png"]');
    logos.forEach(function (img) {
      // Replace classes so the top logo is consistent across pages
      img.className = 'h-28 sm:h-32 w-auto drop-shadow-lg';
    });

    // Swap footer logo <img src="logo.png"> to point to the SVG asset so they render the brand color
    var footerImgs = document.querySelectorAll('footer img[src$="logo.png"], footer#footer img[src$="logo.png"]');
    footerImgs.forEach(function(img){
      try {
        img.src = 'assets/logo.svg';
        // Remove any classes that force white appearance
        img.classList.remove('brightness-0','invert');
        // Ensure standard footer sizing classes
        img.classList.add('h-16','w-auto','mb-4');
        // Mark as swapped
        img.setAttribute('data-logo-swapped','true');
      } catch(e) { console.error('swap footer logo error', e); }
    });

  } catch (err) {
    console.error('fix-links.js error:', err);
  }
});
