// Dynamic Image Path Engine matching new structure
function generateDynamicPhotoList(folderName, prefix, maxLimit = 60) {
  const list = [];
  for (let i = 1; i <= maxLimit; i++) {
    // Relative path: assets/photos/Bed/bed-1.jpg
    list.push(`assets/photos/${folderName}/${prefix}-${i}.jpg`);
  }
  return list;
}

const categoryGallery = {
  bed: generateDynamicPhotoList('Bed', 'bed', 40),
  tv: generateDynamicPhotoList('TV', 'tv', 60),
  hall: generateDynamicPhotoList('Hall', 'hall', 50),
  porch: []
};

let selectedDesignsList = [];
const PHONE_NUMBER = "919158208949";

window.showCategoryPage = function(catKey) {
  const hero = document.getElementById('heroSection');
  const reviews = document.getElementById('reviewsSection');
  const whatWeDo = document.getElementById('whatWeDoSection');
  const sectionTitle = document.getElementById('gallerySectionTitle');
  const backBtn = document.getElementById('backToHomeBtn');
  const grid = document.getElementById('galleryGrid');

  if (catKey === 'all') {
    hero.style.display = 'block';
    reviews.style.display = 'block';
    whatWeDo.style.display = 'block';
    sectionTitle.innerText = "Showroom Catalog";
    backBtn.style.display = 'none';
    grid.innerHTML = '';
    return;
  }

  if (catKey === 'porch') {
    alert("Porch section coming soon!");
    return;
  }

  hero.style.display = 'none';
  reviews.style.display = 'none';
  whatWeDo.style.display = 'none';
  backBtn.style.display = 'inline-block';

  const catNames = {
    bed: 'Bedroom Designs',
    tv: 'TV Unit Accent Panel Designs',
    hall: 'Hall Ceiling Designs',
    explore: 'All Showroom Designs'
  };

  sectionTitle.innerText = catNames[catKey] || 'Catalog';
  grid.innerHTML = '';

  let imageList = [];
  if (catKey === 'explore') {
    imageList = [
      ...categoryGallery.bed.slice(0, 10),
      ...categoryGallery.tv.slice(0, 10),
      ...categoryGallery.hall.slice(0, 10)
    ];
  } else {
    imageList = categoryGallery[catKey] || [];
  }

 imageList.forEach((imgSrc, idx) => {
   const titleText = `${catNames[catKey] || 'Design'} #${idx + 1}`;
    const card = document.createElement('div');
    card.className = 'glass-card';
    
    if (selectedDesignsList.includes(titleText)) {
      card.classList.add('selected-card');
    }

    const safeTitle = titleText.replace(/'/g, "\\'");

    // ⚡ HOLD-TO-SELECT LOGIC (0.6 Second Hold)
    let holdTimer = null;

    const startHold = () => {
      holdTimer = setTimeout(() => {
        toggleDesignSelection(titleText, card);
        if (navigator.vibrate) navigator.vibrate(50); // Mobile haptic feedback
      }, 600); // 600ms (0.6 sec). Agar 1.5 sec chahiye toh 1500 kar dena.
    };

    const cancelHold = () => {
      clearTimeout(holdTimer);
    };

    // Card Par Long-Press / Hold Listeners
    card.addEventListener('touchstart', startHold);
    card.addEventListener('touchend', cancelHold);
    card.addEventListener('touchmove', cancelHold);
    card.addEventListener('mousedown', startHold);
    card.addEventListener('mouseup', cancelHold);
    card.addEventListener('mouseleave', cancelHold);

    // Card Layout: Selection Button + Glowing Eye Icon for HD Full View
    card.innerHTML = `
      <img src="${imgSrc}" class="card-img" alt="${titleText}" onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';" />
      <div class="card-title">${titleText}</div>
      <div class="card-btn-container" style="display: flex; gap: 8px; justify-content: center; align-items: center; margin-top: 12px;">
        <button class="btn-solid-gradient card-select-btn" onclick="event.stopPropagation(); toggleDesignSelection('${safeTitle}', this.closest('.glass-card'))">
          ${selectedDesignsList.includes(titleText) ? 'Selected ✓' : '➕ Add to Selection'}
        </button>
        <button class="eye-preview-btn" onclick="event.stopPropagation(); openLightbox('${imgSrc}')" title="View Full HD Image">
          👁️
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
};

// RESTORED FLUID CANVAS BACKGROUND ANIMATION
const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let step = 0;

  function drawFluid() {
    step += 0.006;
    ctx.fillStyle = '#0A0A0F';
    ctx.fillRect(0, 0, width, height);

    const gradX = width / 2 + Math.sin(step) * 250;
    const gradY = height / 2 + Math.cos(step * 0.8) * 180;

    const gradient = ctx.createRadialGradient(gradX, gradY, 40, width / 2, height / 2, 700);
    gradient.addColorStop(0, 'rgba(168, 85, 247, 0.35)');
    gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.15)');
    gradient.addColorStop(1, 'rgba(10, 10, 15, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    requestAnimationFrame(drawFluid);
  }
  drawFluid();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

function toggleDesignSelection(designTitle, cardElem) {
  const idx = selectedDesignsList.indexOf(designTitle);
  const btn = cardElem.querySelector('.card-select-btn');

  if (idx > -1) {
    selectedDesignsList.splice(idx, 1);
    cardElem.classList.remove('selected-card');
    if (btn) btn.innerText = '➕ Add to Selection';
  } else {
    selectedDesignsList.push(designTitle);
    cardElem.classList.add('selected-card');
    if (btn) btn.innerText = 'Selected ✓';
  }

  updateFloatingBar();
}

function updateFloatingBar() {
  const floatingBar = document.getElementById('selectionFloatingBar');
  const countText = document.getElementById('selectedCountText');

  if (selectedDesignsList.length > 0) {
    floatingBar.classList.add('active');
    countText.innerText = `${selectedDesignsList.length} Designs Selected`;
  } else {
    floatingBar.classList.remove('active');
  }
}

function handleSendToOwner(e) {
  e.preventDefault();
  if (selectedDesignsList.length === 0) return;

  const listFormatted = selectedDesignsList
    .map((item, idx) => `${idx + 1}. ${item}`)
    .join('\n');
  const message = `Hello Quantum POP! Maine aapki website se ye ${selectedDesignsList.length} designs select kiye hain:\n\n${listFormatted}\n\nKripya estimate share karein.`;
  const msg = encodeURIComponent(message);

  window.open(`https://wa.me/${PHONE_NUMBER}?text=${msg}`, '_blank');
}


// REPEAT VISITOR PROMPT
(function checkRepeatVisitor() {
  let visits = parseInt(localStorage.getItem('qp_visit_count') || '0', 10);
  visits += 1;
  localStorage.setItem('qp_visit_count', visits.toString());

  const hasRated = localStorage.getItem('qp_already_rated');

  if (visits >= 3 && !hasRated) {
    setTimeout(() => {
      const overlay = document.getElementById('ratingModalOverlay');
      if (overlay) overlay.classList.add('active');
    }, 3000);
  }
})();

let currentRating = 0;
window.setRating = function(starNum) {
  currentRating = starNum;
  const stars = document.querySelectorAll('#promptStars span');
  stars.forEach((s, idx) => {
    if (idx < starNum) s.classList.add('active');
    else s.classList.remove('active');
  });
};

window.submitRating = function() {
  if (currentRating === 0) {
    alert("Please select a star rating!");
    return;
  }
  localStorage.setItem('qp_already_rated', 'true');
  const overlay = document.getElementById('ratingModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.style.display = 'none';
  }
  alert("Thank you for rating Quantum POP!");
};

window.closeRatingPrompt = function() {
  localStorage.setItem('qp_already_rated', 'true');
  const overlay = document.getElementById('ratingModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.style.display = 'none';
  }
};

window.addEventListener('offline', () => {
  const banner = document.getElementById('networkBanner');
  if (banner) banner.style.display = 'block';
});
window.addEventListener('online', () => {
  const banner = document.getElementById('networkBanner');
  if (banner) banner.style.display = 'none';
});
// LIGHTBOX POPUP FUNCTIONS
window.openLightbox = function(imgSrc) {
  if (!imgSrc) return;
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  if (overlay && img) {
    img.src = imgSrc;
    overlay.style.display = 'flex';
    overlay.classList.add('active');
  }
};

window.closeLightbox = function() {
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) {
    overlay.style.display = 'none';
    overlay.classList.remove('active');
  }
};
//  SECURITY & PROTECTION LAYER
// Disable Right Click Context Menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable Keyboard Shortcuts (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+S)
document.addEventListener('keydown', (e) => {
  if (
    e.keyCode === 123 || // F12 (Inspect Element)
    (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
    (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
    (e.ctrlKey && e.keyCode === 85) || // Ctrl+U (View Source)
    (e.ctrlKey && e.keyCode === 83)    // Ctrl+S (Save Page)
  ) {
    e.preventDefault();
    return false;
  }
});