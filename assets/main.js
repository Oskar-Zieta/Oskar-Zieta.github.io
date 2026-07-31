// Theme toggle and copy helper used by all pages
function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light-theme');
  const themeBtn = document.getElementById('themeBtn');
  if (isLight) {
    localStorage.setItem('theme', 'light');
    if (themeBtn) themeBtn.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'dark');
    if (themeBtn) themeBtn.textContent = '🌙';
  }
}

function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const labelEl = element.querySelector('.label');
    if (!labelEl) return;
    const originalText = labelEl.textContent;
    labelEl.textContent = 'Skopiowano!';
    element.style.borderColor = '#22c55e';
    setTimeout(() => {
      labelEl.textContent = originalText;
      element.style.borderColor = '';
    }, 2000);
  });
}

// On load: set theme button symbol
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('assets/main.js: DOMContentLoaded');
  } catch(e) {}
  // Apply persisted theme (default: dark)
  const stored = localStorage.getItem('theme');
  if (stored === 'light') document.documentElement.classList.add('light-theme');
  else document.documentElement.classList.remove('light-theme');
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    if (document.documentElement.classList.contains('light-theme')) themeBtn.textContent = '☀️';
    else themeBtn.textContent = '🌙';
  }
  // Poznań clock - Europe/Warsaw
  function updatePoznanClock() {
    const el = document.getElementById('poznanClock');
    if (!el) { console.warn('Poznan clock element not found'); return; }
    // show placeholder immediately
    try { el.textContent = 'Poznań: --:--:--'; } catch(e){}
    try {
      const now = new Date();
      const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Warsaw' };
      const timeString = new Intl.DateTimeFormat('pl-PL', opts).format(now);
      el.textContent = `Poznań: ${timeString}`;
      try { console.log('Poznan clock updated:', timeString); } catch(e) {}
      el.setAttribute('data-active', 'true');
    } catch (e) {
      // Fallback: basic local time if Intl with timezone unsupported
      try {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2,'0');
        const mm = String(now.getMinutes()).padStart(2,'0');
        const ss = String(now.getSeconds()).padStart(2,'0');
        el.textContent = `Poznań: ${hh}:${mm}:${ss}`;
        try { console.log('Poznan clock fallback updated:', `${hh}:${mm}:${ss}`); } catch(e) {}
        el.setAttribute('data-active', 'true');
      } catch (e2) {
        el.textContent = 'Poznań: --:--:--';
      }
    }
  }
  updatePoznanClock();
  setInterval(updatePoznanClock, 1000);
});
