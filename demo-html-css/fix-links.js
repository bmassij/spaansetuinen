/**
 * Auto-fix internal navigation links for deployment
 * Adds /demo-html-css/ prefix to all relative .html links
 * Only runs on Vercel deployment, not on localhost
 */
(function() {
  // Skip if running on localhost (local development)
  if (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.port === '8080') {
    console.log('🏠 Running on localhost - links work fine as-is');
    return;
  }
  
  // Detecteer of we in een subdirectory zitten (bijv. /demo-html-css/)
  const currentPath = window.location.pathname;
  const isInSubdir = currentPath.includes('/demo-html-css/');
  
  // Als we niet in de subdirectory zitten, doe niets
  if (!isInSubdir && !currentPath.startsWith('/demo-html-css')) {
    console.log('ℹ️ Not in /demo-html-css/ subdirectory - no fix needed');
    return;
  }
  
  // Prefix die toegevoegd moet worden
  const prefix = '/demo-html-css/';
  
  // Fix all <a> tags with href attributes
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip als het al een absolute URL is, anchor link, of mailto/tel link
    if (!href ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')) {
      return;
    }
    
    // Als het een relatieve .html link is EN nog niet de prefix heeft
    if (href.endsWith('.html') && !href.startsWith('/demo-html-css/')) {
      link.setAttribute('href', prefix + href);
    }
    
    // Ook index.html anchors zoals index.html#over-ons
    if (href.includes('.html#') && !href.startsWith('/demo-html-css/')) {
      link.setAttribute('href', prefix + href);
    }
  });
  
  console.log('✅ Navigation links fixed for deployment');
})();
