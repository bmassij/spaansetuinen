// Desktop navigation enhancements: hover open with small delay, keyboard support, and click-outside handling
(function(){
  // Wait for navbar to be loaded
  function initNavbar() {
    const nav = document.querySelector('nav[role="navigation"]') || document.querySelector('#site-navbar nav');
    if (!nav) {
      console.warn('Navigation element not found, retrying...');
      setTimeout(initNavbar, 100);
      return;
    }

    console.log('Initializing navigation for:', nav);

    // Mobile toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileToggle.setAttribute('aria-expanded', !isHidden);
        const hamburger = document.getElementById('hamburger');
        const closeIcon = document.getElementById('close-icon');
        if (hamburger && closeIcon) {
          hamburger.classList.toggle('hidden');
          closeIcon.classList.toggle('hidden');
        }
      });
    }

    // Accordion functionality for mobile menu
    document.querySelectorAll('[data-accordion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-accordion');
        const panel = document.querySelector(`[data-panel="${key}"]`);
        const chevron = btn.querySelector('.chev');

        if (panel) {
          const isHidden = panel.classList.toggle('hidden');
          if (chevron) {
            chevron.textContent = isHidden ? '+' : '−';
          }
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileToggle && mobileMenu && !mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileToggle.setAttribute('aria-expanded', 'false');
          const hamburger = document.getElementById('hamburger');
          const closeIcon = document.getElementById('close-icon');
          if (hamburger && closeIcon) {
            hamburger.classList.remove('hidden');
            closeIcon.classList.add('hidden');
          }
        }
      }
    });

    // Dropdown behaviour for desktop
    const dropdownParents = Array.from(nav.querySelectorAll('.group'));
    const HOVER_OPEN_DELAY = 80; // ms
    const HOVER_CLOSE_DELAY = 200; // ms
    let openTimers = new Map();
    let closeTimers = new Map();

    // Detect touch device and disable hover interactions
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    dropdownParents.forEach(parent => {
      const trigger = parent.querySelector(':scope > a, :scope > button');
      const menu = parent.querySelector('.absolute');

      if (!trigger || !menu) return;

      // Open / close helpers
      function open() {
        parent.classList.add('open');
        if (trigger.tagName === 'BUTTON') {
          trigger.setAttribute('aria-expanded', 'true');
        }
      }
      function close() {
        parent.classList.remove('open');
        if (trigger.tagName === 'BUTTON') {
          trigger.setAttribute('aria-expanded', 'false');
        }
      }

      // Hover for non-touch devices
      if (!isTouch) {
        parent.addEventListener('mouseenter', () => {
          clearTimeout(closeTimers.get(parent));
          const t = setTimeout(open, HOVER_OPEN_DELAY);
          openTimers.set(parent, t);
        });
        parent.addEventListener('mouseleave', () => {
          clearTimeout(openTimers.get(parent));
          const t = setTimeout(close, HOVER_CLOSE_DELAY);
          closeTimers.set(parent, t);
        });
      }

      // Click/tap toggles dropdown (useful for accessibility & touch)
      trigger.addEventListener('click', (e) => {
        // If desktop and not touch, allow default link behaviour when modifier pressed
        if (!isTouch && trigger.tagName === 'A' && (e.metaKey || e.ctrlKey || e.shiftKey)) return;
        e.preventDefault();
        const isOpen = parent.classList.contains('open');
        if (isOpen) close(); else open();
      });

      // Keyboard support inside menu
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          parent.classList.toggle('open');
          if (trigger.tagName === 'BUTTON') {
            trigger.setAttribute('aria-expanded', parent.classList.contains('open') ? 'true' : 'false');
          }
          // focus first item
          const first = menu.querySelector('a');
          if (first) first.focus();
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          parent.classList.add('open');
          if (trigger.tagName === 'BUTTON') {
            trigger.setAttribute('aria-expanded', 'true');
          }
          const first = menu.querySelector('a');
          if (first) first.focus();
        }
        if (e.key === 'Escape') {
          parent.classList.remove('open');
          if (trigger.tagName === 'BUTTON') {
            trigger.setAttribute('aria-expanded', 'false');
          }
          trigger.focus();
        }
      });

      // Make dropdown links keyboard navigable
      const items = Array.from(menu.querySelectorAll('a'));
      items.forEach((it, idx) => {
        it.setAttribute('tabindex', '0');
        it.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = items[idx+1] || items[0];
            next.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = items[idx-1] || items[items.length-1];
            prev.focus();
          } else if (e.key === 'Escape') {
            parent.classList.remove('open');
            if (trigger.tagName === 'BUTTON') {
              trigger.setAttribute('aria-expanded', 'false');
            }
            trigger.focus();
          }
        });
      });
    });

    // Close any open dropdown when clicking outside
    document.addEventListener('click', (e) => {
      // ignore clicks on nav
      if (nav.contains(e.target)) return;
      dropdownParents.forEach(parent => parent.classList.remove('open'));
      dropdownParents.forEach(parent => {
        const trigger = parent.querySelector(':scope > button');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape globally
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownParents.forEach(parent => parent.classList.remove('open'));
        dropdownParents.forEach(parent => {
          const trigger = parent.querySelector(':scope > button');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });

    console.log('Navigation initialized successfully');
  }

  // Initialize when navbar is loaded or immediately if already present
  if (document.querySelector('nav[role="navigation"]') || document.querySelector('#site-navbar nav')) {
    initNavbar();
  } else {
    document.addEventListener('navbarLoaded', initNavbar);
    window.addEventListener('navbarLoaded', initNavbar);
  }

  // expose for debugging or manual re-init
  try { window.initNavbar = initNavbar; } catch(e) {}
})();
