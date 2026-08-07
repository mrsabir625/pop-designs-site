const canvas = document.getElementById('bgCanvas');
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