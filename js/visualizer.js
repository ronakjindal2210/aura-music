/**
 * AURA — World Atmosphere & Reactivity Engine (Ultra Smooth 60fps Edition)
 * Optimized multi-band particle physics for all 36 worlds (100% Exact Aligned),
 * silky GPU-friendly 3D perspective drift, and mobile battery optimization.
 */

class Visualizer {
  constructor(audioEngine) {
    this.audio = audioEngine;
    this.partCanvas = document.getElementById('canvasParticles');
    this.partCtx = this.partCanvas ? this.partCanvas.getContext('2d') : null;
    this.bgStage = document.getElementById('backgroundStage');

    this.particles = [];
    this.currentTheme = null;
    this.worldId = 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width < 768;

    // Mouse & 3D Camera Tilt
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;
    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;
    this.tiltX = 0;
    this.tiltY = 0;
    this.isCameraDriftEnabled = true;
    this.isTonightMode = false;
    this.isPageVisible = true;

    // Smooth audio reactivity variables
    this.bassPulse = 0;
    this.midsTurbulence = 0;
    this.trebleSparkle = 0;

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
      this.isMobile = this.width < 768;
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
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = e.clientX;
      this.targetMouseY = e.clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        this.targetMouseX = e.touches[0].clientX;
        this.targetMouseY = e.touches[0].clientY;
      }
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

  initWorldParticles(worldId) {
    this.particles = [];
    const count = this.isMobile ? 28 : 48;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticleForWorld(worldId));
    }
  }

  createParticleForWorld(worldId) {
    const p = {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      z: Math.random() * 0.8 + 0.2,
      radius: Math.random() * 2.5 + 1.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.25,
      baseAlpha: Math.random() * 0.45 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      type: 'dot',
      color: null
    };

    switch (worldId) {
      // 1. Samjhawan (Himalayan Twilight Valley)
      case 1:
        p.speedY = -Math.random() * 0.45 - 0.1;
        p.radius = Math.random() * 2.8 + 1;
        p.color = '#f59e0b';
        p.type = 'dot';
        break;
      // 2. O Meri Laila (Oasis of Thousand Lanterns)
      case 2:
        p.speedX = Math.random() * 0.7 + 0.2;
        p.speedY = (Math.random() - 0.5) * 0.25;
        p.radius = Math.random() * 2.6 + 1;
        p.color = Math.random() > 0.5 ? '#c084fc' : '#fbbf24';
        p.type = 'dot';
        break;
      // 3. Aarzu (Cherry Blossom Dusk Garden)
      case 3:
        p.speedX = Math.random() * 0.6 + 0.2;
        p.speedY = Math.random() * 0.7 + 0.3;
        p.radius = Math.random() * 3.8 + 2;
        p.color = '#f472b6';
        p.type = 'petal';
        break;
      // 4. Maskara (Punjab Golden Hour Horizon)
      case 4:
        p.speedX = Math.random() * 0.8 + 0.2;
        p.speedY = -Math.random() * 0.5 - 0.15;
        p.radius = Math.random() * 3 + 1.2;
        p.color = ['#ea580c', '#facc15', '#f43f5e', '#fdba74'][Math.floor(Math.random() * 4)];
        p.type = 'dot';
        break;
      // 5. Thinking of You (Neon Coastal Shoreline)
      case 5:
        p.speedY = -Math.random() * 0.5 - 0.1;
        p.radius = Math.random() * 3 + 1.2;
        p.color = Math.random() > 0.5 ? '#38bdf8' : '#ec4899';
        p.type = 'dot';
        break;
      // 6. Boyfriend (Miami Art-Deco Sunset Boulevard)
      case 6:
        p.speedX = (Math.random() - 0.5) * 0.5;
        p.speedY = -Math.random() * 0.6 - 0.2;
        p.radius = Math.random() * 2.8 + 1;
        p.color = '#f43f5e';
        p.type = 'dot';
        break;
      // 7. Wavy (Bioluminescent Crystal Abyss)
      case 7:
        p.speedY = -Math.random() * 0.8 - 0.25;
        p.speedX = Math.sin(p.phase) * 0.4;
        p.radius = Math.random() * 4.5 + 1.5;
        p.color = '#06b6d4';
        p.type = 'bubble';
        break;
      // 8. For a Reason (Sunflower Highlands at Sunrise)
      case 8:
        p.speedX = Math.random() * 0.4 + 0.1;
        p.speedY = -Math.random() * 0.5 - 0.1;
        p.radius = Math.random() * 3 + 1.2;
        p.color = '#facc15';
        p.type = 'dot';
        break;
      // 9. Afreen Afreen (Royal Mughal Starlight Pavilion)
      case 9:
        p.speedX = (Math.random() - 0.5) * 0.3;
        p.speedY = (Math.random() - 0.5) * 0.3;
        p.radius = Math.random() * 2.6 + 1;
        p.color = Math.random() > 0.5 ? '#fbbf24' : '#fef08a';
        p.type = 'star';
        break;
      // 10. Arz Kia Hai (Acoustic Wooden Studio)
      case 10:
        p.speedY = -Math.random() * 0.45 - 0.15;
        p.radius = Math.random() * 2.6 + 1;
        p.color = '#f59e0b';
        p.type = 'dot';
        break;
      // 11. Bulleya (Sufi Starlit Desert Shrine)
      case 11:
        p.speedX = Math.cos(p.phase) * 0.8;
        p.speedY = -Math.random() * 0.8 - 0.3;
        p.radius = Math.random() * 3.2 + 1.2;
        p.color = '#ea580c';
        p.type = 'star';
        break;
      // 12. Tose Naina (Monsoon Waters & Twilight Mist)
      case 12:
        p.speedX = 0.2;
        p.speedY = Math.random() * 5.5 + 4.5;
        p.radius = Math.random() * 2 + 1;
        p.color = '#10b981';
        p.type = 'rain';
        break;
      // 13. O Rangrez (Courtyard of Silks & Dyes)
      case 13:
        p.speedX = Math.random() * 0.7 + 0.2;
        p.speedY = Math.random() * 0.5 - 0.2;
        p.radius = Math.random() * 3.5 + 1.5;
        p.color = ['#f43f5e', '#facc15', '#ec4899', '#38bdf8'][Math.floor(Math.random() * 4)];
        p.type = 'petal';
        break;
      // 14. Darkhaast (Nordic Aurora Glacier Ridge)
      case 14:
        p.speedX = (Math.random() - 0.5) * 0.4;
        p.speedY = -Math.random() * 0.4 - 0.1;
        p.radius = Math.random() * 2.5 + 1;
        p.color = Math.random() > 0.4 ? '#22c55e' : '#a855f7';
        p.type = 'star';
        break;
      // 15. Tere Bina Na Guzara E (Enchanted Firefly Sanctuary)
      case 15:
        p.speedX = (Math.random() - 0.5) * 0.7;
        p.speedY = (Math.random() - 0.5) * 0.7;
        p.radius = Math.random() * 3.2 + 1.8;
        p.pulseSpeed = 0.045;
        p.color = '#4ade80';
        p.type = 'firefly';
        break;
      // 16. Udaarian (Golden Harvest Hot Air Balloon)
      case 16:
        p.speedX = Math.random() * 1.2 + 0.5;
        p.speedY = -Math.random() * 0.7 - 0.3;
        p.radius = Math.random() * 2.8 + 1.5;
        p.color = '#facc15';
        p.type = 'dot';
        break;
      // 17. Ranjheya Ve (Mustard Fields of Punjab)
      case 17:
        p.speedX = (Math.random() - 0.5) * 0.5;
        p.speedY = -Math.random() * 0.4 - 0.1;
        p.radius = Math.random() * 2.5 + 1;
        p.color = '#facc15';
        p.type = 'dot';
        break;
      // 18. Bairan (Storm-Lashed Coastal Beacon)
      case 18:
        p.speedX = Math.random() * 1.8 + 1.0;
        p.speedY = (Math.random() - 0.5) * 0.9;
        p.radius = Math.random() * 2.2 + 0.8;
        p.color = '#0ea5e9';
        p.type = 'rain';
        break;
      // 19. Wishes (Galaxy Observatory Summit)
      case 19:
        p.speedX = (Math.random() - 0.5) * 0.4;
        p.speedY = (Math.random() - 0.5) * 0.4;
        p.radius = Math.random() * 2.5 + 0.8;
        p.color = Math.random() > 0.4 ? '#8b5cf6' : '#38bdf8';
        p.type = 'star';
        break;
      // 20. Kashish (Futuristic Sky Lounge)
      case 20:
        p.speedX = (Math.random() - 0.5) * 0.3;
        p.speedY = -Math.random() * 0.3 - 0.1;
        p.radius = Math.random() * 5.0 + 2.0;
        p.color = Math.random() > 0.5 ? '#f59e0b' : '#ec4899';
        p.type = 'dot';
        break;
      // 21. Kajra Re (Festive Royal Haveli Courtyard)
      case 21:
        p.speedY = -Math.random() * 0.8 - 0.2;
        p.speedX = (Math.random() - 0.5) * 0.8;
        p.radius = Math.random() * 3.5 + 1.5;
        p.color = Math.random() > 0.4 ? '#f59e0b' : '#f43f5e';
        p.type = 'spark';
        break;
      // 22. Tutor (Bubblegum Synthwave Arcade)
      case 22:
        p.speedX = (Math.random() - 0.5) * 0.8;
        p.speedY = (Math.random() - 0.5) * 0.8;
        p.radius = Math.random() * 3.5 + 1.5;
        p.color = Math.random() > 0.5 ? '#ec4899' : '#06b6d4';
        p.type = 'spark';
        break;
      // 23. Kithe Reh Gaya (Fading Sunset Highway)
      case 23:
        p.speedX = Math.random() * 0.8 + 0.2;
        p.speedY = (Math.random() - 0.5) * 0.3;
        p.radius = Math.random() * 2.8 + 1.2;
        p.color = Math.random() > 0.5 ? '#f97316' : '#c084fc';
        p.type = 'dot';
        break;
      // 24. Kaise Hua (Golden Sunset Meadow)
      case 24:
        p.speedX = Math.random() * 0.5 + 0.15;
        p.speedY = Math.random() * 0.4 + 0.2;
        p.radius = Math.random() * 3.5 + 2;
        p.color = Math.random() > 0.4 ? '#fbbf24' : '#f472b6';
        p.type = 'petal';
        break;
      // 25. Dilliwali Girlfriend (Vibrant Delhi Neon Nightlife)
      case 25:
        p.speedX = (Math.random() - 0.5) * 1.2;
        p.speedY = -Math.random() * 1.0 - 0.3;
        p.radius = Math.random() * 3.5 + 1.5;
        p.color = ['#f43f5e', '#38bdf8', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 4)];
        p.type = 'spark';
        break;
      // 26. Sweetheart (Sunny Himalayan Blossom Valley)
      case 26:
        p.speedX = Math.random() * 0.7 + 0.2;
        p.speedY = Math.random() * 0.6 + 0.25;
        p.radius = Math.random() * 3.6 + 1.8;
        p.color = Math.random() > 0.5 ? '#f472b6' : '#fde047';
        p.type = 'petal';
        break;
      // 27. Meri Mummy Nu Pasand Nhi Hai Tu (Colourful Pind Courtyard)
      case 27:
        p.speedX = (Math.random() - 0.5) * 0.9;
        p.speedY = -Math.random() * 0.7 - 0.2;
        p.radius = Math.random() * 3.2 + 1.4;
        p.color = Math.random() > 0.5 ? '#f59e0b' : '#ef4444';
        p.type = 'spark';
        break;
      // 28. Ik Vaari (Twilight Rooftop Over City Lights)
      case 28:
        p.speedX = (Math.random() - 0.5) * 0.4;
        p.speedY = (Math.random() - 0.5) * 0.4;
        p.radius = Math.random() * 2.8 + 1;
        p.color = Math.random() > 0.5 ? '#8b5cf6' : '#ec4899';
        p.type = 'star';
        break;
      // 29. Lag Ja Gale (Vintage Colonial Archway & Rainy Streetlamps)
      case 29:
        p.speedX = 0.1;
        p.speedY = Math.random() * 5 + 4;
        p.radius = Math.random() * 1.8 + 1;
        p.color = Math.random() > 0.4 ? '#eab308' : '#cbd5e1';
        p.type = 'rain';
        break;
      // 30. Mere Samne Wali Khidki (Charming Pastel Balconies)
      case 30:
        p.speedX = Math.random() * 0.5 + 0.1;
        p.speedY = Math.random() * 0.5 + 0.15;
        p.radius = Math.random() * 3.2 + 1.5;
        p.color = Math.random() > 0.5 ? '#10b981' : '#f472b6';
        p.type = 'petal';
        break;
      // 31. No Love (Midnight Rain & Cyber Noir Boulevard)
      case 31:
        p.speedX = 0.2;
        p.speedY = Math.random() * 7 + 6;
        p.radius = Math.random() * 2 + 1;
        p.color = Math.random() > 0.5 ? '#38bdf8' : '#ec4899';
        p.type = 'rain';
        break;
      // 32. Lahore (Sparkling Lahore Midnight Bazaar)
      case 32:
        p.speedX = (Math.random() - 0.5) * 0.9;
        p.speedY = -Math.random() * 0.8 - 0.25;
        p.radius = Math.random() * 3.5 + 1.5;
        p.color = Math.random() > 0.5 ? '#f43f5e' : '#f59e0b';
        p.type = 'spark';
        break;
      // 33. With You (Golden Hour Coastline)
      case 33:
        p.speedY = -Math.random() * 0.4 - 0.1;
        p.speedX = Math.sin(p.phase) * 0.3;
        p.radius = Math.random() * 3 + 1.5;
        p.color = Math.random() > 0.5 ? '#f97316' : '#fed7aa';
        p.type = 'dot';
        break;
      // 34. Ve Haaniyaan (Serene Punjab Countryside & Mustard Sunset)
      case 34:
        p.speedX = Math.random() * 0.6 + 0.2;
        p.speedY = -Math.random() * 0.4 - 0.1;
        p.radius = Math.random() * 2.8 + 1.2;
        p.color = Math.random() > 0.4 ? '#fbbf24' : '#6ee7b7';
        p.type = 'dot';
        break;
      // 35. One Love (Sleek Midnight Penthouse & Neon Skyline)
      case 35:
        p.speedX = (Math.random() - 0.5) * 0.4;
        p.speedY = -Math.random() * 0.35 - 0.1;
        p.radius = Math.random() * 4.5 + 2;
        p.color = Math.random() > 0.5 ? '#c084fc' : '#38bdf8';
        p.type = 'dot';
        break;
      // 36. Raabta (Starlight Constellation Sanctuary)
      case 36:
      default:
        p.speedX = (Math.random() - 0.5) * 0.35;
        p.speedY = (Math.random() - 0.5) * 0.35;
        p.radius = Math.random() * 3.5 + 1.2;
        p.color = ['#f472b6', '#38bdf8', '#facc15', '#ffffff'][Math.floor(Math.random() * 4)];
        p.type = 'star';
        break;
    }
    return p;
  }

  startLoop() {
    const render = () => {
      if (this.isPageVisible) {
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.08;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.08;

        const bands = this.audio ? this.audio.getFrequencyBands() : { bass: 0, mids: 0, treble: 0, overall: 0 };
        this.bassPulse += (bands.bass - this.bassPulse) * 0.18;
        this.midsTurbulence += (bands.mids - this.midsTurbulence) * 0.15;
        this.trebleSparkle += (bands.treble - this.trebleSparkle) * 0.2;

        this.update3DCameraDrift(this.bassPulse);
        this.drawParticles(bands);
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  update3DCameraDrift(bass) {
    if (!this.isCameraDriftEnabled || !this.bgStage) return;
    const speedFactor = this.isTonightMode ? 4 : 7;
    const targetTiltX = ((this.mouseX / this.width) - 0.5) * speedFactor;
    const targetTiltY = ((this.mouseY / this.height) - 0.5) * -speedFactor;

    this.tiltX += (targetTiltX - this.tiltX) * 0.05;
    this.tiltY += (targetTiltY - this.tiltY) * 0.05;

    const scale = 1.01 + bass * 0.015;
    this.bgStage.style.transform = `perspective(1400px) rotateY(${this.tiltX.toFixed(2)}deg) rotateX(${this.tiltY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
  }

  drawParticles(bands) {
    if (!this.partCtx || !this.partCanvas) return;
    const ctx = this.partCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    const speedScale = this.isTonightMode ? 0.55 : 1.0;
    const mouseOffsetX = ((this.mouseX / this.width) - 0.5) * 25;
    const mouseOffsetY = ((this.mouseY / this.height) - 0.5) * 25;
    const turbulence = (1 + bands.mids * 1.1) * speedScale;

    this.particles.forEach(p => {
      p.x += p.speedX * turbulence;
      p.y += p.speedY * turbulence;
      p.phase += p.pulseSpeed * speedScale;

      const renderX = p.x + mouseOffsetX * p.z;
      const renderY = p.y + mouseOffsetY * p.z;

      if (p.x < -30) p.x = this.width + 30;
      if (p.x > this.width + 30) p.x = -30;
      if (p.y < -30) p.y = this.height + 30;
      if (p.y > this.height + 30) p.y = -30;

      const dynamicAlpha = Math.max(0.12, Math.min(0.9, p.baseAlpha + Math.sin(p.phase) * 0.22 + bands.treble * 0.25));
      const particleColor = p.color || (this.currentTheme ? this.currentTheme.primary : '#f472b6');

      ctx.save();
      ctx.translate(renderX, renderY);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = dynamicAlpha;

      if (p.type === 'rain') {
        ctx.fillStyle = particleColor;
        ctx.fillRect(0, 0, 1.5, p.radius * 3 + bands.bass * 2.5);
      } else if (p.type === 'petal') {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 1.8, p.radius * 0.9, p.phase, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'bubble') {
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + bands.bass * 1.8, 0, Math.PI * 2);
        ctx.stroke();
      } else if (p.type === 'firefly' || p.type === 'spark') {
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = dynamicAlpha * 0.35;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius * 2.2 + bands.mids * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = dynamicAlpha;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + bands.treble * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }
}

window.Visualizer = Visualizer;
