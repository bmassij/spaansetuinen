// Desktop navigation enhancements: hover open with small delay, keyboard support, and click-outside handling
(function(){
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');

  // Mobile toggle
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Dropdown behaviour for desktop
  const dropdownParents = Array.from(document.querySelectorAll('.has-dropdown'));
  const HOVER_OPEN_DELAY = 80; // ms
  const HOVER_CLOSE_DELAY = 200; // ms
  let openTimers = new Map();
  let closeTimers = new Map();

  // Detect touch device and disable hover interactions
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  dropdownParents.forEach(parent => {
    const trigger = parent.querySelector(':scope > a');
    const menu = parent.querySelector('.dropdown');

    if (!trigger || !menu) return;

    // Open / close helpers
    function open() {
      parent.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
    function close() {
      parent.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
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
      if (!isTouch && (e.metaKey || e.ctrlKey || e.shiftKey)) return;
      e.preventDefault();
      const isOpen = parent.classList.contains('open');
      if (isOpen) close(); else open();
    });

    // Keyboard support inside menu
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        parent.classList.toggle('open');
        trigger.setAttribute('aria-expanded', parent.classList.contains('open') ? 'true' : 'false');
        // focus first item
        const first = menu.querySelector('[role="menuitem"]');
        if (first) first.focus();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        parent.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        const first = menu.querySelector('[role="menuitem"]');
        if (first) first.focus();
      }
      if (e.key === 'Escape') {
        parent.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });

    // Make dropdown links keyboard navigable
    const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
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
          trigger.setAttribute('aria-expanded', 'false');
          trigger.focus();
        }
      });
    });
  });

  // Close any open dropdown when clicking outside
  document.addEventListener('click', (e) => {
    // ignore clicks on nav
    if (nav && nav.contains(e.target)) return;
    dropdownParents.forEach(parent => parent.classList.remove('open'));
    dropdownParents.forEach(parent => {
      const trigger = parent.querySelector(':scope > a');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape globally
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownParents.forEach(parent => parent.classList.remove('open'));
      dropdownParents.forEach(parent => {
        const trigger = parent.querySelector(':scope > a');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });
})();
