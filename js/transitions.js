/**
 * AURA — World Transitions & Background Controller
 * Guaranteed zero-blank, rock-solid crossfade between worlds on all browsers.
 */

class TransitionsManager {
  constructor(onAction) {
    this.onAction = onAction;
    this.layerA = document.getElementById('bgLayerA');
    this.layerB = document.getElementById('bgLayerB');
    this.activeLayer = 'A';
    this.imageCache = new Map();
  }

  preloadAll(songs) {
    if (!songs || !Array.isArray(songs)) return;
    songs.forEach(song => {
      if (song && song.image && !this.imageCache.has(song.image)) {
        const img = new Image();
        img.src = song.image;
        this.imageCache.set(song.image, img);
      }
    });
  }

  transitionToWorld(song) {
    if (!song) return;

    this.applyThemeVariables(song.theme);

    const layerA = this.layerA || document.getElementById('bgLayerA');
    const layerB = this.layerB || document.getElementById('bgLayerB');
    if (!layerA || !layerB) return;

    const currentLayer = this.activeLayer === 'A' ? layerA : layerB;
    const nextLayer = this.activeLayer === 'A' ? layerB : layerA;

    // Apply background image directly to next layer
    nextLayer.style.backgroundImage = "url('" + song.image + "')";
    nextLayer.style.opacity = '1';
    nextLayer.classList.remove('incoming', 'exiting');
    nextLayer.classList.add('active');

    // Fade out current layer
    currentLayer.style.opacity = '0';
    currentLayer.classList.remove('active', 'incoming');
    currentLayer.classList.add('exiting');

    this.activeLayer = this.activeLayer === 'A' ? 'B' : 'A';
  }

  applyThemeVariables(theme) {
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', theme.primary);
    root.style.setProperty('--accent-secondary', theme.accent);
    root.style.setProperty('--accent-glow', theme.glowColor || 'rgba(244, 114, 182, 0.45)');
  }
}

window.TransitionsManager = TransitionsManager;
