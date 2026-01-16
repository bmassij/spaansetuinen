document.addEventListener('DOMContentLoaded', ()=>{
  const popup = document.getElementById('jubilee-popup');
  const close = document.getElementById('jubilee-close');
  if(!popup) return;
  const STORAGE_KEY = 'jubileeDismissed';

  const hide = () => {
    popup.style.display = 'none';
    popup.style.pointerEvents = 'none';
    popup.setAttribute('aria-hidden', 'true');
  };

  const show = () => {
    popup.style.display = 'flex';
    popup.style.pointerEvents = 'auto';
    popup.removeAttribute('aria-hidden');
  };

  // Show only if not dismissed previously
  try {
    if(!localStorage.getItem(STORAGE_KEY)) {
      show();
    } else {
      hide();
    }
  } catch (e) {
    // If localStorage is unavailable, fall back to showing once
    show();
  }

  // Close button: hide + persist
  close && close.addEventListener('click', ()=>{
    hide();
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch(e) {}
  });

  // ESC: hide + persist
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') {
      hide();
      try { localStorage.setItem(STORAGE_KEY, 'true'); } catch(e) {}
    }
  });

  // Click outside popup content: hide + persist
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      hide();
      try { localStorage.setItem(STORAGE_KEY, 'true'); } catch(e) {}
    }
  });
});
