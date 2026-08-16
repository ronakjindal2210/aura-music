/**
 * AURA — Mobile Gestures & Transitions Controller
 * Smooth world crossfades, swipe navigation, and touch gestures.
 */

class TransitionsManager {
  constructor(onAction) {
    this.onAction = onAction;
    this.layerA = document.getElementById('bgLayerA');
    this.layerB = document.getElementById('bgLayerB');
    this.activeLayer = 'A';
    this.isTransitioning = false;

    this.touchStartX = null;
    this.touchStartY = null;
    this.touchStartTime = 0;

    this.initGestures();
    this.initKeyboard();
  }

  transitionToWorld(song) {
    if (!song) return;

    const currentLayer = this.activeLayer === 'A' ? this.layerA : this.layerB;
    const nextLayer = this.activeLayer === 'A' ? this.layerB : this.layerA;

    // Apply theme variables immediately
    this.applyThemeVariables(song.theme);

    let isApplied = false;
    const applyImage = () => {
      if (isApplied) return;
      isApplied = true;
      nextLayer.style.backgroundImage = `url('${song.image}')`;
      nextLayer.className = 'bg-layer incoming';
      currentLayer.className = 'bg-layer exiting';

      void nextLayer.offsetWidth; // force reflow

      nextLayer.className = 'bg-layer active';
      this.activeLayer = this.activeLayer === 'A' ? 'B' : 'A';
    };

    const img = new Image();
    img.onload = applyImage;
    img.onerror = applyImage;
    img.src = song.image;

    // Fallback timer so mobile network hiccups never block transition
    setTimeout(applyImage, 300);
  }

  applyThemeVariables(theme) {
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', theme.primary);
    root.style.setProperty('--accent-secondary', theme.accent);
    root.style.setProperty('--accent-glow', theme.glowColor || 'rgba(244, 114, 182, 0.45)');
  }

  initGestures() {
    // Touch Navigation
    window.addEventListener('touchstart', (e) => {
      // Don't intercept swipe if touching inside any modal, drawer, or sheet
      if (e.target.closest('.home-drawer') || 
          e.target.closest('.modal-backdrop') || 
          e.target.closest('.world-map-modal') ||
          e.target.closest('.now-playing-sheet') ||
          e.target.closest('.cute-diary-sheet')) {
        this.touchStartX = null;
        return;
      }
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.touchStartTime = Date.now();
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (this.touchStartX === null) return;
      
      const diffX = e.changedTouches[0].clientX - this.touchStartX;
      const diffY = e.changedTouches[0].clientY - this.touchStartY;
      const timeDiff = Date.now() - this.touchStartTime;

      // Handle swipe gestures
      if (Math.abs(diffX) > 45 && Math.abs(diffY) < 55 && timeDiff < 600) {
        if (diffX < 0) {
          this.onAction('next');
        } else {
          this.onAction('prev');
        }
      } else if (Math.abs(diffY) > 50 && Math.abs(diffX) < 50 && timeDiff < 600) {
        if (e.target.closest('.now-playing-sheet') && diffY > 50) {
          this.onAction('collapseNowPlaying');
        }
      }
      this.touchStartX = null;
    }, { passive: true });
  }

  initKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.code) {
        case 'ArrowRight':
          e.preventDefault();
          this.onAction('next');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.onAction('prev');
          break;
        case 'Space':
          e.preventDefault();
          this.onAction('togglePlay');
          break;
        case 'KeyM':
          this.onAction('toggleWorldMap');
          break;
        case 'KeyD':
          this.onAction('openDiary');
          break;
        case 'KeyT':
          this.onAction('toggleTonight');
          break;
        case 'Escape':
          this.onAction('closeModals');
          break;
      }
    });
  }
}

window.TransitionsManager = TransitionsManager;
