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
  
  console.log('🌐 Production detected - fixing navigation links...');
  console.log('Current URL:', window.location.href);
  console.log('Pathname:', window.location.pathname);
  
  // Prefix die toegevoegd moet worden
  const prefix = '/demo-html-css/';
  let fixedCount = 0;
  
  // Fix all <a> tags with href attributes
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip als het al een absolute URL is, anchor link, of mailto/tel link
    if (!href ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('/demo-html-css/') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')) {
      return;
    }
    
    // Fix relatieve .html links
    if (href.endsWith('.html') || href.includes('.html#')) {
      const newHref = prefix + href;
      link.setAttribute('href', newHref);
      fixedCount++;
      console.log(`Fixed: ${href} → ${newHref}`);
    }
  });
  
  console.log(`✅ Fixed ${fixedCount} navigation links`);
})();
