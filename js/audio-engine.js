/**
 * Audio Engine - Full Fidelity Soundtrack Player & Multi-Band Analyser
 * Robust HTML5 audio playback for all mobile/desktop browsers with
 * optional Web Audio API frequency analysis and subtle ambient blending.
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
    this.audioEl.preload = "auto";
    this.audioEl.playsInline = true;
    this.audioEl.setAttribute('playsinline', 'true');
    this.audioEl.setAttribute('webkit-playsinline', 'true');

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
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.82;
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
      this.timeDomainData = new Uint8Array(this.analyser.frequencyBinCount);

      try {
        this.mediaSource = this.ctx.createMediaElementSource(this.audioEl);
        this.mediaSource.connect(this.masterGain);
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      } catch (e) {
        // If media element source fails (e.g. mobile Safari security policy), audioEl still plays directly!
        console.warn("Direct HTML5 audio fallback enabled", e);
      }

      this.initAmbientGenerators();
    } catch (err) {
      console.warn("Web Audio initialization skipped, using standard HTML5 Audio", err);
    }
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
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
      console.warn("Audio element status notice", e);
    });
  }

  playSong(song) {
    this.ensureContext();
    this.currentSong = song;
    this.isPlaying = true;

    if (song && song.audioSrc) {
      // Append cache buster to bypass stale browser cache
      const sep = song.audioSrc.includes('?') ? '&' : '?';
      this.audioEl.src = song.audioSrc + sep + 'v=' + Date.now();
      this.audioEl.load();
      const playPromise = this.audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log("Mobile autoplay waiting for user tap", e);
        });
      }
    }

    this.adjustAmbianceForWorld(song && song.audio ? song.audio.ambientType : null);
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
      // Return simulated subtle pulse so visualizer still dances nicely on mobile
      const time = Date.now() * 0.002;
      const simBass = (Math.sin(time * 2.5) * 0.5 + 0.5) * (this.isPlaying ? 0.35 : 0.05);
      return { bass: simBass, mids: 0.15, treble: 0.1, overall: simBass, raw: new Uint8Array(32) };
    }

    try {
      this.analyser.getByteFrequencyData(this.freqData);

      const binCount = this.analyser.frequencyBinCount;
      let bassSum = 0;
      const bassBins = Math.min(6, binCount);
      for (let i = 0; i < bassBins; i++) {
        bassSum += this.freqData[i];
      }
      const bass = (bassSum / bassBins) / 255;

      let midSum = 0;
      const midStart = 6;
      const midEnd = Math.min(30, binCount);
      for (let i = midStart; i < midEnd; i++) {
        midSum += this.freqData[i];
      }
      const mids = (midSum / (midEnd - midStart)) / 255;

      let trebleSum = 0;
      const trebleStart = 30;
      const trebleEnd = Math.min(80, binCount);
      for (let i = trebleStart; i < trebleEnd; i++) {
        trebleSum += this.freqData[i];
      }
      const treble = (trebleSum / (trebleEnd - trebleStart)) / 255;

      const overall = (bass * 0.5 + mids * 0.35 + treble * 0.15);

      this.bands = { bass, mids, treble, overall, raw: this.freqData };
      return this.bands;
    } catch (e) {
      return { bass: 0.1, mids: 0.1, treble: 0.1, overall: 0.1, raw: new Uint8Array(32) };
    }
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
    try {
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      // Rain Node
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

      // Wind Node
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

      // Cosmic Sine Drone
      const cosmicOsc = this.ctx.createOscillator();
      cosmicOsc.type = 'sine';
      cosmicOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

      const cosmicGain = this.ctx.createGain();
      cosmicGain.gain.setValueAtTime(this.ambientLevels.cosmic, this.ctx.currentTime);

      cosmicOsc.connect(cosmicGain);
      cosmicGain.connect(this.masterGain);
      cosmicOsc.start(0);

      this.ambientNodes.cosmic = cosmicGain;
    } catch (e) {
      console.warn("Ambient nodes skipped", e);
    }
  }

  adjustAmbianceForWorld(ambientType) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const rampTime = 2.0;

    let targetRain = 0.0;
    let targetWind = 0.01;
    let targetCosmic = 0.01;

    switch (ambientType) {
      case 'rain':
      case 'ocean':
        targetRain = 0.06;
        targetWind = 0.04;
        break;
      case 'wind':
      case 'nature':
        targetWind = 0.05;
        break;
      case 'night':
      case 'cosmic':
      case 'spiritual':
        targetCosmic = 0.03;
        targetWind = 0.02;
        break;
      default:
        targetWind = 0.01;
        targetCosmic = 0.01;
    }

    try {
      if (this.ambientNodes.rain) {
        this.ambientNodes.rain.gain.linearRampToValueAtTime(targetRain, now + rampTime);
      }
      if (this.ambientNodes.wind) {
        this.ambientNodes.wind.gain.linearRampToValueAtTime(targetWind, now + rampTime);
      }
      if (this.ambientNodes.cosmic) {
        this.ambientNodes.cosmic.gain.linearRampToValueAtTime(targetCosmic, now + rampTime);
      }
    } catch (e) {}
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    this.audioEl.volume = this.volume;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioEl.muted = this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}

window.AudioEngine = AudioEngine;
