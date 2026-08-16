/**
 * AURA — World Atmosphere & Subtle Music Reactivity Engine
 * Features organic world particles, 3D perspective camera drift,
 * and subtle audio responsiveness (bass glow, mids turbulence, treble sparkles).
 */

class Visualizer {
  constructor(audioEngine) {
    this.audio = audioEngine;
    this.partCanvas = document.getElementById('canvasParticles');
    this.partCtx = this.partCanvas ? this.partCanvas.getContext('2d') : null;

    this.particles = [];
    this.currentTheme = null;
    this.worldId = 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Mouse & 3D Camera Tilt
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;
    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;
    this.tiltX = 0;
    this.tiltY = 0;
    this.isCameraDriftEnabled = true;
    this.isTonightMode = false;

    // Music reactive scale
    this.bassPulse = 0;
    this.midsTurbulence = 0;
    this.trebleSparkle = 0;

    this.initResize();
    this.initMouseTracker();
    this.initWorldParticles(1);
    this.startLoop();
  }

  initResize() {
    const handleResize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      if (this.partCanvas) {
        this.partCanvas.width = this.width;
        this.partCanvas.height = this.height;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
  }

  initMouseTracker() {
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = e.clientX;
      this.targetMouseY = e.clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.targetMouseX = e.touches[0].clientX;
        this.targetMouseY = e.touches[0].clientY;
      }
    }, { passive: true });
  }

  setTheme(theme, worldId) {
    this.currentTheme = theme;
    this.worldId = worldId;
    this.initWorldParticles(worldId);
  }

  setTonightMode(isTonight) {
    this.isTonightMode = !!isTonight;
  }

  initWorldParticles(worldId) {
    this.particles = [];
    const count = (worldId === 4 || worldId === 12 || worldId === 19) ? 55 : 40;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticleForWorld(worldId));
    }
  }

  createParticleForWorld(worldId) {
    const p = {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      z: Math.random() * 0.8 + 0.2,
      radius: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      color: null
    };

    switch (worldId) {
      case 1: p.speedY = -Math.random() * 0.4 - 0.1; p.radius = Math.random() * 2.8 + 1; p.color = '#f59e0b'; break;
      case 2: p.speedX = Math.random() * 0.8 + 0.3; p.speedY = (Math.random() - 0.5) * 0.3; p.radius = Math.random() * 2.2 + 0.8; p.color = '#fde047'; break;
      case 3: p.speedX = Math.random() * 0.6 + 0.2; p.speedY = Math.random() * 0.7 + 0.3; p.radius = Math.random() * 3.5 + 2; p.color = '#fbcfe8'; break;
      case 4: p.speedX = Math.random() * 0.8 + 0.2; p.speedY = -Math.random() * 0.5 - 0.15; p.radius = Math.random() * 3 + 1.2; p.color = ['#facc15', '#f59e0b', '#f43f5e', '#fdba74'][Math.floor(Math.random() * 4)]; break;
      case 5: p.speedY = -Math.random() * 0.5 - 0.1; p.radius = Math.random() * 3 + 1.2; p.color = '#fdba74'; break;
      case 6: p.speedX = (Math.random() - 0.5) * 0.5; p.speedY = -Math.random() * 0.6 - 0.2; p.radius = Math.random() * 2.5 + 1; p.color = '#fb923c'; break;
      case 7: p.speedY = -Math.random() * 0.9 - 0.3; p.speedX = Math.sin(p.phase) * 0.4; p.radius = Math.random() * 4 + 1.5; p.color = '#38bdf8'; break;
      case 8: p.speedX = Math.random() * 0.4 + 0.1; p.speedY = -Math.random() * 0.5 - 0.1; p.radius = Math.random() * 3 + 1.2; p.color = '#facc15'; break;
      case 9: p.speedX = (Math.random() - 0.5) * 0.3; p.speedY = (Math.random() - 0.5) * 0.3; p.radius = Math.random() * 2.5 + 1; p.color = Math.random() > 0.5 ? '#fbbf24' : '#f8fafc'; break;
      case 10: p.speedY = -Math.random() * 0.5 - 0.15; p.radius = Math.random() * 2.6 + 1; p.color = '#f59e0b'; break;
      case 11: p.speedX = Math.cos(p.phase) * 0.8; p.speedY = -Math.random() * 0.8 - 0.3; p.radius = Math.random() * 3.2 + 1.2; p.color = '#ea580c'; break;
      case 12: p.speedX = 0.2; p.speedY = Math.random() * 6 + 5; p.radius = Math.random() * 2 + 1; p.color = '#6ee7b7'; break;
      case 13: p.speedX = Math.random() * 0.7 + 0.2; p.speedY = Math.random() * 0.5 - 0.2; p.radius = Math.random() * 3.5 + 1.5; p.color = ['#f97316', '#6366f1', '#ec4899', '#eab308'][Math.floor(Math.random() * 4)]; break;
      case 14: p.speedX = (Math.random() - 0.5) * 0.4; p.speedY = -Math.random() * 0.4 - 0.1; p.radius = Math.random() * 2.5 + 1; p.color = Math.random() > 0.4 ? '#34d399' : '#38bdf8'; break;
      case 15: p.speedX = (Math.random() - 0.5) * 0.7; p.speedY = (Math.random() - 0.5) * 0.7; p.radius = Math.random() * 3.2 + 1.8; p.pulseSpeed = 0.04; p.color = '#4ade80'; break;
      case 16: p.speedX = Math.random() * 1.2 + 0.5; p.speedY = -Math.random() * 0.7 - 0.3; p.radius = Math.random() * 2.8 + 1.5; p.color = '#fef08a'; break;
      case 17: p.speedX = (Math.random() - 0.5) * 0.5; p.speedY = -Math.random() * 0.4 - 0.1; p.radius = Math.random() * 2.5 + 1; p.color = '#facc15'; break;
      case 18: p.speedX = Math.random() * 1.5 + 0.8; p.speedY = (Math.random() - 0.5) * 0.8; p.radius = Math.random() * 2.2 + 0.8; p.color = '#e0f2fe'; break;
      case 19: p.speedX = (Math.random() - 0.5) * 0.4; p.speedY = (Math.random() - 0.5) * 0.4; p.radius = Math.random() * 2.5 + 0.8; p.color = Math.random() > 0.4 ? '#c084fc' : '#38bdf8'; break;
      case 20: p.speedX = (Math.random() - 0.5) * 0.3; p.speedY = -Math.random() * 0.3 - 0.1; p.radius = Math.random() * 5.5 + 2.5; p.color = Math.random() > 0.5 ? '#f59e0b' : '#ec4899'; break;
      default: p.color = this.currentTheme ? this.currentTheme.primary : '#f472b6';
    }
    return p;
  }

  startLoop() {
    const render = () => {
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.08;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.08;

      const bands = this.audio ? this.audio.getFrequencyBands() : { bass: 0, mids: 0, treble: 0, overall: 0 };
      this.bassPulse += (bands.bass - this.bassPulse) * 0.18;
      this.midsTurbulence += (bands.mids - this.midsTurbulence) * 0.15;
      this.trebleSparkle += (bands.treble - this.trebleSparkle) * 0.2;

      this.update3DCameraDrift(this.bassPulse);
      this.drawParticles(bands);

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  update3DCameraDrift(bass) {
    if (!this.isCameraDriftEnabled) return;
    const speedFactor = this.isTonightMode ? 6 : 10;
    const targetTiltX = ((this.mouseX / this.width) - 0.5) * speedFactor;
    const targetTiltY = ((this.mouseY / this.height) - 0.5) * -speedFactor;

    this.tiltX += (targetTiltX - this.tiltX) * 0.05;
    this.tiltY += (targetTiltY - this.tiltY) * 0.05;

    const activeLayer = document.querySelector('.bg-layer.active');
    if (activeLayer) {
      const scale = 1.03 + bass * 0.025;
      activeLayer.style.transform = `perspective(1200px) rotateY(${this.tiltX}deg) rotateX(${this.tiltY}deg) scale(${scale})`;
    }
  }

  drawParticles(bands) {
    if (!this.partCtx || !this.partCanvas) return;
    const ctx = this.partCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    const speedScale = this.isTonightMode ? 0.55 : 1.0;
    const mouseOffsetX = ((this.mouseX / this.width) - 0.5) * 35;
    const mouseOffsetY = ((this.mouseY / this.height) - 0.5) * 35;
    const turbulence = (1 + bands.mids * 1.2) * speedScale;

    this.particles.forEach(p => {
      p.x += p.speedX * turbulence;
      p.y += p.speedY * turbulence;
      p.phase += p.pulseSpeed * speedScale;

      const renderX = p.x + mouseOffsetX * p.z;
      const renderY = p.y + mouseOffsetY * p.z;

      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;

      const dynamicAlpha = Math.max(0.1, Math.min(0.9, p.baseAlpha + Math.sin(p.phase) * 0.2 + bands.treble * 0.3));

      ctx.save();
      ctx.translate(renderX, renderY);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = dynamicAlpha;

      const particleColor = p.color || (this.currentTheme ? this.currentTheme.primary : '#f472b6');

      if (this.worldId === 3) {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 2, p.radius, p.phase, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.worldId === 4) {
        ctx.fillStyle = particleColor;
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = 8 + bands.bass * 6;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 1.8 + bands.bass * 2, p.radius * 1.1, p.phase, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.worldId === 12) {
        ctx.fillStyle = particleColor;
        ctx.fillRect(0, 0, 1.5, p.radius * 3 + bands.bass * 3);
      } else if (this.worldId === 7) {
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + bands.bass * 2, 0, Math.PI * 2);
        ctx.stroke();
      } else if (this.worldId === 15) {
        ctx.fillStyle = '#4ade80';
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 10 + bands.mids * 8;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = particleColor;
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = 6 + bands.treble * 8;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }
}

window.Visualizer = Visualizer;
