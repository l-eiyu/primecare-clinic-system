/* ================================================
   PRIMECARE — toast.js
   Shared toast notification system
   Usage: showToast('success', 'Title', 'Message', 3000)
   Types: success | error | warning | info
   ================================================ */

function showToast(type, title, message, duration) {
  duration = duration || 3500;

  // Create container if not exists
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Icons per type
  const icons = {
    success: '✅',
    error:   '❌',
    warning: '⚠️',
    info:    '💬',
  };

  // Build toast
  const toast = document.createElement('div');
  toast.className = 'toast ' + (type || 'info');
  toast.innerHTML =
    '<span class="toast-icon">' + (icons[type] || 'ℹ️') + '</span>' +
    '<div class="toast-body">' +
      '<p class="toast-title">' + title + '</p>' +
      (message ? '<p class="toast-msg">' + message + '</p>' : '') +
    '</div>' +
    '<button class="toast-close" onclick="dismissToast(this.parentElement)">✕</button>' +
    '<div class="toast-progress" style="animation-duration:' + duration + 'ms;"></div>';

  container.appendChild(toast);

  // Auto dismiss
  const timer = setTimeout(function() {
    dismissToast(toast);
  }, duration);

  toast._timer = timer;
  return toast;
}

function dismissToast(toast) {
  if (!toast || toast.classList.contains('toast-exit')) return;
  clearTimeout(toast._timer);
  toast.classList.add('toast-exit');
  setTimeout(function() {
    if (toast.parentElement) toast.parentElement.removeChild(toast);
  }, 300);
}
