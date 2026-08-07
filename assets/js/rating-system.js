(function checkRepeatVisitor() {
  let visits = parseInt(localStorage.getItem('qp_visit_count') || '0', 10);
  visits += 1;
  localStorage.setItem('qp_visit_count', visits.toString());

  const hasRated = localStorage.getItem('qp_already_rated');

  if (visits >= 3 && !hasRated) {
    setTimeout(() => {
      document.getElementById('ratingModalOverlay').classList.add('active');
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
  document.getElementById('ratingModalOverlay').classList.remove('active');
  alert("Thank you for rating Quantum POP!");
};

window.closeRatingPrompt = function() {
  localStorage.setItem('qp_already_rated', 'true');
  document.getElementById('ratingModalOverlay').classList.remove('active');
};