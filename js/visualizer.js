/**
 * AURA — Ultra-Lightweight 60fps Atmosphere & Reactivity Engine
 * Built specifically for butter-smooth mobile performance, zero CPU lag,
 * hardware-accelerated 2D transforms, and adaptive particle density.
 */

class Visualizer {
  constructor(audioEngine) {
    this.audio = audioEngine;
    this.partCanvas = document.getElementById('canvasParticles');
    this.partCtx = this.partCanvas ? this.partCanvas.getContext('2d', { alpha: true, desynchronized: true }) : null;
    this.bgStage = document.getElementById('backgroundStage');

    this.particles = [];
    this.currentTheme = null;
    this.worldId = 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 768);

    // Mouse & Camera Drift (Desktop only)
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;
    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;
    this.tiltX = 0;
    this.tiltY = 0;
    this.isTonightMode = false;
    this.isPageVisible = true;
    this.isModalOpen = false;

    // Reactivity variables
    this.bassPulse = 0;
    this.midsTurbulence = 0;
    this.trebleSparkle = 0;
    this.lastFrameTime = 0;

    this.initResize();
    this.initMouseTracker();
    this.initVisibilityTracker();
    this.initWorldParticles(1);
    this.startLoop();
  }

  initResize() {
    let resizeTimer = null;
    const handleResize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (this.width < 768);
      if (this.partCanvas) {
        this.partCanvas.width = this.width;
        this.partCanvas.height = this.height;
      }
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.initWorldParticles(this.worldId);
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
  }

  initMouseTracker() {
    if (this.isMobile) return; // Skip mouse/touch listeners on mobile to save CPU cycles

    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = e.clientX;
      this.targetMouseY = e.clientY;
    }, { passive: true });
  }

  initVisibilityTracker() {
    document.addEventListener('visibilitychange', () => {
      this.isPageVisible = !document.hidden;
    });
  }

  setTheme(theme, worldId) {
    this.currentTheme = theme;
    this.worldId = worldId;
    this.initWorldParticles(worldId);
  }

  setTonightMode(isTonight) {
    this.isTonightMode = !!isTonight;
  }

  setModalOpen(isOpen) {
    this.isModalOpen = !!isOpen;
  }

  initWorldParticles(worldId) {
    this.particles = [];
    // Super-optimized lightweight counts: 10 on mobile, 32 on desktop
    const count = this.isMobile ? 10 : 32;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticleForWorld(worldId));
    }
  }

  createParticleForWorld(worldId) {
    const p = {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2.2 + 1.0,
      speedX: (Math.random() - 0.5) * (this.isMobile ? 0.25 : 0.4),
      speedY: (Math.random() - 0.5) * (this.isMobile ? 0.25 : 0.35),
      alpha: Math.random() * 0.45 + 0.25,
      baseAlpha: Math.random() * 0.4 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
      type: 'dot',
      color: null
    };

    switch (worldId) {
      case 3: // Aarzu (blossoms)
      case 24: // Kaise Hua
      case 26: // Sweetheart
      case 30: // Mere Samne Wali Khidki
        p.type = 'petal';
        p.radius = this.isMobile ? 2.5 : 3.5;
        p.speedX = Math.random() * 0.35 + 0.1;
        p.speedY = Math.random() * 0.45 + 0.2;
        p.color = '#f472b6';
        break;
      case 12: // Tose Naina (rain)
      case 18: // Bairan
      case 29: // Lag Ja Gale
      case 31: // No Love
        p.type = 'rain';
        p.speedX = 0.1;
        p.speedY = this.isMobile ? 3.5 : 5.0;
        p.color = '#38bdf8';
        break;
      case 7: // Wavy (bubbles)
        p.type = 'bubble';
        p.speedY = -Math.random() * 0.5 - 0.2;
        p.color = '#06b6d4';
        break;
      case 15: // Tere Bina (firefly)
      case 21: // Kajra Re
      case 22: // Tutor
      case 25: // Dilliwali Girlfriend
      case 27: // Mummy Nu Pasand
      case 32: // Lahore
        p.type = 'spark';
        p.color = '#f59e0b';
        break;
      default:
        p.type = 'dot';
        p.color = null;
        break;
    }
    return p;
  }

  startLoop() {
    const render = (timestamp) => {
      if (this.isPageVisible) {
        // Desktop mouse smoothing
        if (!this.isMobile) {
          this.mouseX += (this.targetMouseX - this.mouseX) * 0.08;
          this.mouseY += (this.targetMouseY - this.mouseY) * 0.08;
        }

        const bands = this.audio ? this.audio.getFrequencyBands() : { bass: 0, mids: 0, treble: 0, overall: 0 };
        this.bassPulse += (bands.bass - this.bassPulse) * 0.15;
        this.midsTurbulence += (bands.mids - this.midsTurbulence) * 0.12;
        this.trebleSparkle += (bands.treble - this.trebleSparkle) * 0.18;

        if (!this.isMobile) {
          this.update3DCameraDrift(this.bassPulse);
        }

        this.drawParticles(bands);
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  update3DCameraDrift(bass) {
    if (!this.bgStage || this.isMobile) return;
    const speedFactor = this.isTonightMode ? 3 : 5;
    const targetTiltX = ((this.mouseX / this.width) - 0.5) * speedFactor;
    const targetTiltY = ((this.mouseY / this.height) - 0.5) * -speedFactor;

    this.tiltX += (targetTiltX - this.tiltX) * 0.04;
    this.tiltY += (targetTiltY - this.tiltY) * 0.04;

    this.bgStage.style.transform = `perspective(1200px) rotateY(${this.tiltX.toFixed(2)}deg) rotateX(${this.tiltY.toFixed(2)}deg)`;
  }

  drawParticles(bands) {
    if (!this.partCtx || !this.partCanvas) return;
    const ctx = this.partCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    const speedScale = this.isTonightMode ? 0.6 : 1.0;
    const turbulence = (1 + bands.mids * 0.8) * speedScale;
    const fallbackColor = this.currentTheme ? this.currentTheme.primary : '#f472b6';

    const pLen = this.particles.length;
    for (let i = 0; i < pLen; i++) {
      const p = this.particles[i];
      p.x += p.speedX * turbulence;
      p.y += p.speedY * turbulence;
      p.phase += p.pulseSpeed * speedScale;

      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;

      const dynamicAlpha = Math.max(0.15, Math.min(0.85, p.baseAlpha + Math.sin(p.phase) * 0.2));
      const particleColor = p.color || fallbackColor;

      ctx.globalAlpha = dynamicAlpha;
      ctx.fillStyle = particleColor;

      if (p.type === 'rain') {
        ctx.fillRect(p.x, p.y, 1.2, p.radius * 2.8 + bands.bass * 2);
      } else if (p.type === 'petal') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'spark') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + bands.mids * 1.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + bands.treble * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

window.Visualizer = Visualizer;
