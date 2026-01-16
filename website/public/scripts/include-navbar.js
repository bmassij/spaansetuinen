// Navbar injection script - idempotent
(function() {
  'use strict';

  // Check if already injected
  if (window.navbarInjected) return;
  window.navbarInjected = true;

  const navbarContainer = document.getElementById('site-navbar');
  if (!navbarContainer) {
    console.warn('Navbar container #site-navbar not found');
    return;
  }

  // Fetch and inject navbar template
  fetch('_navbar-template.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load navbar template');
      return response.text();
    })
    .then(html => {
      navbarContainer.innerHTML = html;
      // Dispatch event when navbar is loaded
      window.dispatchEvent(new CustomEvent('navbarLoaded'));
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      navbarContainer.innerHTML = '<nav><p>Error loading navigation</p></nav>';
    });
})();