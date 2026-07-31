// Theme toggle and copy helper used by all pages
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;
  if (document.body.classList.contains('light-theme')) {
    themeBtn.textContent = '☀️';
  } else {
    themeBtn.textContent = '🌙';
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
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;
  if (document.body.classList.contains('light-theme')) themeBtn.textContent = '☀️';
  else themeBtn.textContent = '🌙';
});
