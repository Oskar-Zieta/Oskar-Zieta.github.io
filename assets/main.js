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
    if (!el) return;
    try {
      const now = new Date();
      const timeString = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Warsaw' });
      el.textContent = `Poznań: ${timeString}`;
      el.setAttribute('data-active', 'true');
    } catch (e) {
      el.textContent = 'Poznań: --:--:--';
    }
  }
  updatePoznanClock();
  setInterval(updatePoznanClock, 1000);
});
});
