// Splash screen (10 seconds): particles swarm into the Vero mark, then the app is revealed
(function () {
  const app = document.querySelector('.app');
  const splash = document.getElementById('splash');
  const cv = document.getElementById('fx');
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W, H, parts = [], raf, done = false;

  function build() {
    const sr = splash.getBoundingClientRect();
    W = sr.width; H = sr.height;
    cv.width = W * DPR; cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    splash.querySelectorAll('.cap rect').forEach(rect => {
      const total = rect.getTotalLength(), m = rect.getScreenCTM(), n = 240;
      for (let i = 0; i < n; i++) {
        const p = rect.getPointAtLength(total * i / n);
        const pt = new DOMPoint(p.x, p.y).matrixTransform(m);
        const tx = pt.x - sr.left, ty = pt.y - sr.top;
        const a = Math.random() * Math.PI * 2, d = Math.max(W, H) * (0.55 + Math.random() * 0.5);
        parts.push({
          tx, ty, sx: W / 2 + Math.cos(a) * d, sy: H / 2 + Math.sin(a) * d,
          d: (i / n) * 1.2 + Math.random() * 0.4, u: 1.5 + Math.random() * 0.6,
          sw: (Math.random() - 0.5) * 180, r: 0.8 + Math.random() * 1.3, ph: Math.random() * 6.28
        });
      }
    });
  }

  function frame(now) {
    const t = (now - t0) / 1000;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      const k = Math.min(Math.max((t - p.d) / p.u, 0), 1);
      if (t < p.d) continue;
      const e = 1 - Math.pow(1 - k, 3);
      let x = p.sx + (p.tx - p.sx) * e, y = p.sy + (p.ty - p.sy) * e, al = 0.95;
      const dx = p.tx - p.sx, dy = p.ty - p.sy, len = Math.hypot(dx, dy) || 1, s = Math.sin(Math.PI * e) * p.sw;
      x += (-dy / len) * s; y += (dx / len) * s;
      if (k === 1) {
        const q = t - p.d - p.u, amp = Math.min(1, q / 1.5) * 5;
        x = p.tx + Math.cos(t * 1.6 + p.ph) * amp; y = p.ty + Math.sin(t * 1.3 + p.ph) * amp;
        al = Math.max(0.3, 0.95 - q * 0.35);
      }
      ctx.fillStyle = 'rgba(110,255,110,' + al * 0.14 + ')';
      ctx.beginPath(); ctx.arc(x, y, p.r * 3.2, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(170,255,170,' + al + ')';
      ctx.beginPath(); ctx.arc(x, y, p.r, 0, 6.283); ctx.fill();
    }
    if (!splash.classList.contains('on') && t > 3.4) splash.classList.add('on');
    if (!done) raf = requestAnimationFrame(frame);
  }

  let t0;
  if (reduce) { splash.classList.add('on'); }
  else { build(); t0 = performance.now(); raf = requestAnimationFrame(frame); }

  setTimeout(() => {
    splash.classList.add('out');
    app.classList.add('ready');
    setTimeout(() => { done = true; cancelAnimationFrame(raf); splash.remove(); }, 1200);
  }, 10000);
})();

// Assets / Accounts toggle
const segButtons = document.querySelectorAll('.seg-btn');
segButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    segButtons.forEach(b => b.classList.toggle('active', b === btn));
    document.getElementById('assets').classList.toggle('hidden', btn.dataset.tab !== 'assets');
    document.getElementById('accounts').classList.toggle('hidden', btn.dataset.tab !== 'accounts');
  });
});

// Bottom nav active state
const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.toggle('active', b === btn));
  });
});
