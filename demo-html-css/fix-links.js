/**
 * Auto-fix internal navigation links for deployment
 * Adds /demo-html-css/ prefix to all relative .html links
 * Only runs when NOT on localhost
 */
(function() {
  'use strict';
  
  // Skip if running on localhost (local development)
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  if (hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      port === '8080' ||
      port === '8000' ||
      port === '3000' ||
      port === '5500') {
    console.log('🏠 Localhost detected - skipping link fixes');
    return;
  }
  
  console.log('🌐 Production detected on Vercel - links should work directly');
  console.log('Current URL:', window.location.href);
  console.log('Pathname:', window.location.pathname);
  
  // Op Vercel staat alles op de root dankzij vercel.json rewrite rules
  // Dus links zoals "bonsai-olijfboom.html" zouden moeten werken
  console.log('✅ No link fixes needed - vercel.json handles routing');
})();
