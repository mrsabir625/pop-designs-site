let selectedDesignsList = [];
const PHONE_NUMBER = "919158208949";

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

let isSubmitting = false;
function handleSendToOwner(e) {
  e.preventDefault();
  if (isSubmitting || selectedDesignsList.length === 0) return;

  // Report event to Node Security Server if running
  fetch('/api/security/track-click', { method: 'POST' }).catch(()=>{});

  isSubmitting = true;
  const sendBtn = document.getElementById('sendWhatsAppBarBtn');
  sendBtn.innerText = "Sending... ⏳";

  let listFormatted = selectedDesignsList.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
  let msg = encodeURIComponent(`Hello Quantum POP! Maine aapki website se ye ${selectedDesignsList.length} designs select kiye hain:\n\n${listFormatted}\n\nKripya estimate share karein.`);
  
  window.open(`https://wa.me/${PHONE_NUMBER}?text=${msg}`, '_blank');

  setTimeout(() => {
    isSubmitting = false;
    sendBtn.innerText = "Send to Owner 📩";
  }, 5000);
}