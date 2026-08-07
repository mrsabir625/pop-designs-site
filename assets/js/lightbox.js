window.openLightbox = function(imgSrc) {
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  img.src = imgSrc;
  overlay.classList.add('active');
};

window.closeLightbox = function() {
  document.getElementById('lightboxOverlay').classList.remove('active');
};