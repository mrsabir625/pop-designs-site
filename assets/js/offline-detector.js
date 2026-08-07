window.addEventListener('offline', () => {
  document.getElementById('networkBanner').style.display = 'block';
});
window.addEventListener('online', () => {
  document.getElementById('networkBanner').style.display = 'none';
});