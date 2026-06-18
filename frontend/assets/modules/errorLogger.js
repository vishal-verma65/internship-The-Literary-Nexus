let toastVisible = false;

function showToast(message) {
  if (toastVisible) return;
  toastVisible = true;

  const toast = document.createElement('div');
  toast.className = 'global-error-toast';
  toast.setAttribute('role', 'alert');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
    toastVisible = false;
  }, 6000);
}

export function initErrorLogger() {
  window.addEventListener('error', (event) => {
    console.error('[errorLogger] Uncaught error:', event.error || event.message);
    showToast('Something went wrong loading part of this page. Please refresh.');
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[errorLogger] Unhandled promise rejection:', event.reason);
    showToast('Something went wrong loading part of this page. Please refresh.');
  });
}