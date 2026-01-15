document.addEventListener('DOMContentLoaded', ()=>{
  const popup = document.getElementById('jubilee-popup');
  const close = document.getElementById('jubilee-close');
  if(!popup) return;
  // Altijd tonen bij laden
  popup.style.display = 'flex';
  // Sluit alleen voor deze pagina (niet persistent)
  close && close.addEventListener('click', ()=>{ popup.style.display = 'none'; });
  // Optioneel sluitbaar met ESC
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') popup.style.display='none'; });
});