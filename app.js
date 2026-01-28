/* particles */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
resize(); window.addEventListener('resize', resize);

const opts = {
  particleCount: 60,
  speed: 0.4,
  radius: 1.8,
  lineWidth: 0.6,
  lineDistance: 140,
  color: 'rgba(108,71,255,0.65)'
};
const particles = [];
class Particle {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * opts.speed;
    this.vy = (Math.random() - 0.5) * opts.speed;
  }
  update(){
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, opts.radius, 0, Math.PI * 2);
    ctx.fillStyle = opts.color;
    ctx.fill();
  }
}
function drawLines(){
  for (let i = 0; i < particles.length; i++){
    for (let j = i + 1; j < particles.length; j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.hypot(dx, dy);
      if (d < opts.lineDistance){
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108,71,255,${1 - d / opts.lineDistance})`;
        ctx.lineWidth = opts.lineWidth;
        ctx.stroke();
      }
    }
  }
}
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animate);
}
for (let i = 0; i < opts.particleCount; i++) particles.push(new Particle());
animate();

/* matrix rain */
const mCanvas = document.getElementById('matrix');
const ctx2 = mCanvas.getContext('2d');
function resizeM(){ mCanvas.width = innerWidth; mCanvas.height = innerHeight; }
resizeM(); window.addEventListener('resize', resizeM);
const cols  = Math.floor(mCanvas.width / 14);
const drops = Array(cols).fill(0).map(_ => Math.random() * cols);
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
function drawMatrix(){
  ctx2.fillStyle = 'rgba(13,13,13,.05)';
  ctx2.fillRect(0, 0, mCanvas.width, mCanvas.height);
  ctx2.fillStyle = '#00ffaa';
  ctx2.font = '14px Inter, monospace';
  drops.forEach((y, i) => {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx2.fillText(text, i * 14, y * 14);
    if (y * 14 > mCanvas.height || Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 45);

/* scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.remove('hidden');
    else entry.target.classList.add('hidden');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));