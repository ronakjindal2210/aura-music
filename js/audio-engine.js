/**
 * Audio Engine - Full Fidelity Soundtrack Player & Multi-Band Analyser
 * Routes real MP3 soundtracks through Web Audio API for live Bass/Mids/Treble
 * frequency analysis, custom equalizers, and blended ambient soundscapes.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;
    this.mediaSource = null;
    this.isPlaying = false;
    this.currentSong = null;

    // HTML5 Audio Element for real MP3s
    this.audioEl = new Audio();
    this.audioEl.crossOrigin = "anonymous";
    this.audioEl.preload = "auto";

    // Frequency Analysis Buffers
    this.freqData = null;
    this.timeDomainData = null;
    this.bands = { bass: 0, mids: 0, treble: 0, overall: 0 };

    // Ambient Nature Generators
    this.ambientNodes = {
      rain: null,
      wind: null,
      cosmic: null
    };

    this.ambientLevels = {
      rain: 0.0,
      wind: 0.02,
      cosmic: 0.02
    };

    this.volume = 0.85;
    this.isMuted = false;

    this.onTimeUpdateCallback = null;
    this.onLoadedMetadataCallback = null;
    this.onEndedCallback = null;

    this.initAudioEvents();
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.82;
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this.timeDomainData = new Uint8Array(this.analyser.frequencyBinCount);

    // Connect Audio element to Web Audio graph
    try {
      this.mediaSource = this.ctx.createMediaElementSource(this.audioEl);
      this.mediaSource.connect(this.masterGain);
    } catch (e) {
      console.warn("Audio element source already connected or fallback", e);
    }

    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.initAmbientGenerators();
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initAudioEvents() {
    this.audioEl.addEventListener('timeupdate', () => {
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.audioEl.currentTime, this.audioEl.duration);
      }
    });

    this.audioEl.addEventListener('loadedmetadata', () => {
      if (this.onLoadedMetadataCallback) {
        this.onLoadedMetadataCallback(this.audioEl.duration);
      }
    });

    this.audioEl.addEventListener('ended', () => {
      if (this.onEndedCallback) {
        this.onEndedCallback();
      }
    });

    this.audioEl.addEventListener('error', (e) => {
      console.warn("Audio element playback error, falling back", e);
    });
  }

  playSong(song) {
    this.ensureContext();
    this.currentSong = song;
    this.isPlaying = true;

    if (song.audioSrc) {
      this.audioEl.src = song.audioSrc;
      this.audioEl.currentTime = 0;
      this.audioEl.play().catch(e => {
        console.warn("Audio play prevented until user gesture", e);
      });
    }

    this.adjustAmbianceForWorld(song.audio ? song.audio.ambientType : null);
  }

  pause() {
    this.isPlaying = false;
    this.audioEl.pause();
  }

  resume() {
    this.ensureContext();
    this.isPlaying = true;
    if (this.audioEl.src) {
      this.audioEl.play().catch(() => {});
    } else if (this.currentSong) {
      this.playSong(this.currentSong);
    }
  }

  seek(seconds) {
    if (this.audioEl && !isNaN(seconds)) {
      this.audioEl.currentTime = seconds;
    }
  }

  getCurrentTime() {
    return this.audioEl ? this.audioEl.currentTime : 0;
  }

  getDuration() {
    return (this.audioEl && !isNaN(this.audioEl.duration) && this.audioEl.duration > 0)
      ? this.audioEl.duration
      : 214;
  }

  getFrequencyBands() {
    if (!this.analyser || !this.isPlaying) {
      return { bass: 0, mids: 0, treble: 0, overall: 0, raw: new Uint8Array(64) };
    }

    this.analyser.getByteFrequencyData(this.freqData);

    const binCount = this.analyser.frequencyBinCount;
    // Bass: ~20Hz to 180Hz (bins 0 to 8)
    let bassSum = 0;
    const bassBins = Math.min(10, binCount);
    for (let i = 0; i < bassBins; i++) {
      bassSum += this.freqData[i];
    }
    const bass = (bassSum / bassBins) / 255;

    // Mids: ~250Hz to 2000Hz (bins 10 to 60)
    let midSum = 0;
    const midStart = 10;
    const midEnd = Math.min(65, binCount);
    for (let i = midStart; i < midEnd; i++) {
      midSum += this.freqData[i];
    }
    const mids = (midSum / (midEnd - midStart)) / 255;

    // Treble: ~2000Hz to 16000Hz (bins 65 to 200)
    let trebleSum = 0;
    const trebleStart = 65;
    const trebleEnd = Math.min(200, binCount);
    for (let i = trebleStart; i < trebleEnd; i++) {
      trebleSum += this.freqData[i];
    }
    const treble = (trebleSum / (trebleEnd - trebleStart)) / 255;

    const overall = (bass * 0.5 + mids * 0.35 + treble * 0.15);

    this.bands = { bass, mids, treble, overall, raw: this.freqData };
    return this.bands;
  }

  getTimeDomainData() {
    if (!this.analyser || !this.isPlaying) {
      return null;
    }
    if (!this.timeDomainData) {
      this.timeDomainData = new Uint8Array(this.analyser.frequencyBinCount);
    }
    this.analyser.getByteTimeDomainData(this.timeDomainData);
    return this.timeDomainData;
  }

  initAmbientGenerators() {
    if (!this.ctx) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    // Rain Node (Pink-filtered noise)
    const rainWhite = this.ctx.createBufferSource();
    rainWhite.buffer = noiseBuffer;
    rainWhite.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(this.ambientLevels.rain, this.ctx.currentTime);

    rainWhite.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(this.masterGain);
    rainWhite.start(0);

    this.ambientNodes.rain = rainGain;

    // Wind Node (Bandpass Swept Noise)
    const windWhite = this.ctx.createBufferSource();
    windWhite.buffer = noiseBuffer;
    windWhite.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(this.ambientLevels.wind, this.ctx.currentTime);

    windWhite.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);
    windWhite.start(0);

    this.ambientNodes.wind = windGain;

    // Cosmic Drone Oscillator
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, this.ctx.currentTime);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(this.ambientLevels.cosmic, this.ctx.currentTime);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(0);

    this.ambientNodes.cosmic = oscGain;
  }

  setAmbientLevel(type, level) {
    if (this.ambientNodes[type] && this.ctx) {
      this.ambientLevels[type] = level;
      this.ambientNodes[type].gain.setTargetAtTime(level, this.ctx.currentTime, 0.05);
    }
  }

  adjustAmbianceForWorld(ambientType) {
    if (!this.ctx) return;
    let targetRain = 0.0;
    let targetWind = 0.02;
    let targetCosmic = 0.02;

    switch (ambientType) {
      case 'wind_pine':
      case 'desert_breeze':
      case 'meadow_wind':
        targetWind = 0.06;
        break;
      case 'cyber_rain':
      case 'tropical_monsoon':
        targetRain = 0.08;
        break;
      case 'cosmic_starlight':
      case 'aurora_drone':
        targetCosmic = 0.06;
        break;
      case 'stormy_waves':
        targetWind = 0.08;
        targetRain = 0.04;
        break;
    }

    this.setAmbientLevel('rain', targetRain);
    this.setAmbientLevel('wind', targetWind);
    this.setAmbientLevel('cosmic', targetCosmic);
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.03);
    }
    if (this.audioEl) {
      this.audioEl.volume = this.isMuted ? 0 : this.volume;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }
}

window.AudioEngine = AudioEngine;
