/**
 * AURA — Main Application Controller
 * Personalized Music Gift Edition with Secret Diary & Living Constellation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  let currentIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  let isRepeat = false;
  let currentTime = 0;
  let totalDuration = 214;

  // LocalStorage Persistence
  const favorites = JSON.parse(localStorage.getItem('aura_favorites') || localStorage.getItem('aura_favs') || '[]');
  const exploredWorlds = new Set(JSON.parse(localStorage.getItem('aura_explored_worlds') || localStorage.getItem('aura_explored') || '[]'));
  let isTonightMode = (localStorage.getItem('aura_tonight_mode') || localStorage.getItem('aura_tonight')) === 'true';
  const savedLastSong = parseInt(localStorage.getItem('aura_last_song'), 10);
  const savedLastTime = parseFloat(localStorage.getItem('aura_last_time') || '0');

  // Diary State & Persistence
  let diaryEntries = JSON.parse(localStorage.getItem('aura_diary_entries') || '[]');
  let diaryDraft = localStorage.getItem('aura_diary_draft') || '';
  let selectedMood = localStorage.getItem('aura_diary_mood') || 'peaceful';
  let diarySaveTimeout = null;

  // Initialize Audio & Atmosphere Engines
  const audio = new AudioEngine();
  const visualizer = new Visualizer(audio);

  const transitions = new TransitionsManager((action) => {
    switch (action) {
      case 'next': playNext(); break;
      case 'prev': playPrev(); break;
      case 'togglePlay': togglePlay(); break;
      case 'toggleTonight': toggleTonightMode(); break;
      case 'toggleWorldMap': toggleWorldMap(); break;
      case 'openDiary': openDiaryModal(); break;
      case 'collapseNowPlaying': closeNowPlaying(); break;
      case 'closeModals': closeAllModals(); break;
    }
  });

  // DOM Elements Cache
  const els = {
    introPortal: document.getElementById('introPortal'),
    btnOpenGift: document.getElementById('btnOpenGift'),
    appContainer: document.getElementById('appContainer'),

    // Top Bar
    worldTopBar: document.getElementById('worldTopBar'),
    btnOpenHome: document.getElementById('btnOpenHome'),
    topBadgeText: document.getElementById('topBadgeText'),
    btnOpenDiary: document.getElementById('btnOpenDiary'),
    btnSongNote: document.getElementById('btnSongNote'),
    btnTonightTop: document.getElementById('btnTonightTop'),
    btnUniverseTop: document.getElementById('btnUniverseTop'),

    // Center Stage
    worldCenterStage: document.getElementById('worldCenterStage'),

    // Edge Navigation
    edgePrev: document.getElementById('edgePrev'),
    edgeNext: document.getElementById('edgeNext'),

    // Mini Player
    bottomDockContainer: document.getElementById('bottomDockContainer'),
    auraMiniPlayer: document.getElementById('auraMiniPlayer'),
    miniThumb: document.getElementById('miniThumb'),
    miniTitle: document.getElementById('miniTitle'),
    miniArtist: document.getElementById('miniArtist'),
    miniFavBtn: document.getElementById('miniFavBtn'),
    miniPlayBtn: document.getElementById('miniPlayBtn'),
    miniPlayIcon: document.getElementById('miniPlayIcon'),
    miniProgressLine: document.getElementById('miniProgressLine'),

    // Fullscreen Now Playing Sheet
    nowPlayingModal: document.getElementById('nowPlayingModal'),
    sheetDragHandle: document.getElementById('sheetDragHandle'),
    closeNowPlayingBtn: document.getElementById('closeNowPlayingBtn'),
    sheetSongNoteBtn: document.getElementById('sheetSongNoteBtn'),
    sheetThumb: document.getElementById('sheetThumb'),
    sheetArtGlow: document.getElementById('sheetArtGlow'),
    sheetBadgeOverlay: document.getElementById('sheetBadgeOverlay'),
    sheetTitle: document.getElementById('sheetTitle'),
    sheetArtist: document.getElementById('sheetArtist'),
    sheetFavBtn: document.getElementById('sheetFavBtn'),

    timeCurrent: document.getElementById('timeCurrent'),
    timeTotal: document.getElementById('timeTotal'),
    seekbarContainer: document.getElementById('seekbarContainer'),
    seekbarFill: document.getElementById('seekbarFill'),
    seekbarHandle: document.getElementById('seekbarHandle'),

    shuffleBtn: document.getElementById('shuffleBtn'),
    prevBtn: document.getElementById('prevBtn'),
    playPauseBtn: document.getElementById('playPauseBtn'),
    playPauseIcon: document.getElementById('playPauseIcon'),
    nextBtn: document.getElementById('nextBtn'),
    repeatBtn: document.getElementById('repeatBtn'),

    btnDiarySheet: document.getElementById('btnDiarySheet'),
    btnTonightSheet: document.getElementById('btnTonightSheet'),
    btnUniverseSheet: document.getElementById('btnUniverseSheet'),

    // Home Drawer
    homeDrawer: document.getElementById('homeDrawer'),
    homeBackdrop: document.getElementById('homeBackdrop'),
    closeHomeBtn: document.getElementById('closeHomeBtn'),
    homeGreeting: document.getElementById('homeGreeting'),
    continueCard: document.getElementById('continueCard'),
    continueThumb: document.getElementById('continueThumb'),
    continueTitle: document.getElementById('continueTitle'),
    continueSub: document.getElementById('continueSub'),
    btnQuickDiary: document.getElementById('btnQuickDiary'),
    btnQuickUniverse: document.getElementById('btnQuickUniverse'),
    btnQuickSurprise: document.getElementById('btnQuickSurprise'),
    btnQuickTonight: document.getElementById('btnQuickTonight'),
    tonightStatusText: document.getElementById('tonightStatusText'),
    exploredCount: document.getElementById('exploredCount'),
    btnSecretUnlock: document.getElementById('btnSecretUnlock'),
    homeWorldsScroll: document.getElementById('homeWorldsScroll'),
    favsCountTag: document.getElementById('favsCountTag'),
    homeFavsContainer: document.getElementById('homeFavsContainer'),

    // Note Modal
    modalPersonalNote: document.getElementById('modalPersonalNote'),
    noteSongTitle: document.getElementById('noteSongTitle'),
    noteWorldBadge: document.getElementById('noteWorldBadge'),
    noteBodyText: document.getElementById('noteBodyText'),
    closeNoteBtn: document.getElementById('closeNoteBtn'),

    // Final Secret Modal
    modalFinalSecret: document.getElementById('modalFinalSecret'),
    finalSecretTitle: document.getElementById('finalSecretTitle'),
    finalLetterText: document.getElementById('finalLetterText'),
    closeFinalSecretBtn: document.getElementById('closeFinalSecretBtn'),

    // Constellation Map
    worldMapModal: document.getElementById('worldMapModal'),
    constellationStars: document.getElementById('constellationStars'),
    constellationSvg: document.getElementById('constellationSvg'),
    closeWorldMapBtn: document.getElementById('closeWorldMapBtn'),

    // Diary Modal
    modalDiary: document.getElementById('modalDiary'),
    closeDiaryBtn: document.getElementById('closeDiaryBtn'),
    tabDiaryWrite: document.getElementById('tabDiaryWrite'),
    tabDiaryEntries: document.getElementById('tabDiaryEntries'),
    diaryWriteSection: document.getElementById('diaryWriteSection'),
    diaryEntriesSection: document.getElementById('diaryEntriesSection'),
    diaryCurrentDate: document.getElementById('diaryCurrentDate'),
    diaryCurrentSongTag: document.getElementById('diaryCurrentSongTag'),
    diaryMoodPills: document.getElementById('diaryMoodPills'),
    diaryTextarea: document.getElementById('diaryTextarea'),
    diaryStatusText: document.getElementById('diaryStatusText'),
    btnDiarySave: document.getElementById('btnDiarySave'),
    btnDiaryClear: document.getElementById('btnDiaryClear'),
    diaryEntriesList: document.getElementById('diaryEntriesList'),
    diaryCountPill: document.getElementById('diaryCountPill')
  };

  // Constellation Coordinates optimized for permanently visible labels
  // Constellation Coordinates: Desktop (2D Wide Space) vs Mobile (Staggered Vertical Space)
  const starCoordsDesktop = [
    { x: 9, y: 38 },   // 1. Samjhawan
    { x: 22, y: 18 },  // 2. O Meri Laila
    { x: 35, y: 28 },  // 3. Aarzu
    { x: 26, y: 58 },  // 4. Maskara
    { x: 15, y: 78 },  // 5. Thinking of You
    { x: 38, y: 82 },  // 6. Boyfriend
    { x: 48, y: 62 },  // 7. Wavy
    { x: 45, y: 40 },  // 8. For a Reason
    { x: 42, y: 16 },  // 9. Afreen Afreen
    { x: 56, y: 22 },  // 10. Arz Kia Hai
    { x: 64, y: 44 },  // 11. Bulleya
    { x: 58, y: 72 },  // 12. Tose Naina
    { x: 72, y: 84 },  // 13. O Rangrez
    { x: 76, y: 54 },  // 14. Darkhaast
    { x: 68, y: 24 },  // 15. Tere Bina Na Guzara E
    { x: 80, y: 16 },  // 16. Udaarian
    { x: 87, y: 38 },  // 17. Ranjheya Ve
    { x: 84, y: 68 },  // 18. Bairan
    { x: 93, y: 48 },  // 19. Wishes
    { x: 90, y: 84 }   // 20. Kashish
  ];

  const starCoordsMobile = [
    { x: 28, y: 6 },   // 1. Samjhawan
    { x: 72, y: 11 },  // 2. O Meri Laila
    { x: 26, y: 16 },  // 3. Aarzu
    { x: 75, y: 21 },  // 4. Maskara
    { x: 24, y: 26 },  // 5. Thinking of You
    { x: 74, y: 31 },  // 6. Boyfriend
    { x: 28, y: 36 },  // 7. Wavy
    { x: 76, y: 41 },  // 8. For a Reason
    { x: 25, y: 46 },  // 9. Afreen Afreen
    { x: 72, y: 51 },  // 10. Arz Kia Hai
    { x: 28, y: 56 },  // 11. Bulleya
    { x: 75, y: 61 },  // 12. Tose Naina
    { x: 25, y: 66 },  // 13. O Rangrez
    { x: 72, y: 71 },  // 14. Darkhaast
    { x: 28, y: 76 },  // 15. Tere Bina Na Guzara E
    { x: 75, y: 81 },  // 16. Udaarian
    { x: 26, y: 86 },  // 17. Ranjheya Ve
    { x: 72, y: 90 },  // 18. Bairan
    { x: 28, y: 94 },  // 19. Wishes
    { x: 70, y: 97 }   // 20. Kashish
  ];

  function getActiveStarCoords() {
    return (window.innerWidth < 680 || window.innerHeight > window.innerWidth) 
      ? starCoordsMobile 
      : starCoordsDesktop;
  }

  // 1. LOAD & PLAYBACK ENGINE
  function loadSong(index, shouldPlay = false) {
    if (index < 0) index = SONGS_DATA.length - 1;
    if (index >= SONGS_DATA.length) index = 0;

    currentIndex = index;
    const song = SONGS_DATA[currentIndex];

    // Track exploration progress
    exploredWorlds.add(song.id);
    localStorage.setItem('aura_explored_worlds', JSON.stringify(Array.from(exploredWorlds)));
    localStorage.setItem('aura_explored', JSON.stringify(Array.from(exploredWorlds)));
    localStorage.setItem('aura_last_song', currentIndex);
    updateExplorationUI();

    // Update Top Bar & Badges
    if (els.topBadgeText) els.topBadgeText.textContent = song.worldName || song.title;

    // Update Mini Player
    if (els.miniThumb) els.miniThumb.src = song.image;
    if (els.miniTitle) els.miniTitle.textContent = song.title;
    if (els.miniArtist) els.miniArtist.textContent = song.artist;

    // Update Fullscreen Sheet
    if (els.sheetThumb) els.sheetThumb.src = song.image;
    if (els.sheetTitle) els.sheetTitle.textContent = song.title;
    if (els.sheetArtist) els.sheetArtist.textContent = song.artist;
    if (els.sheetBadgeOverlay) els.sheetBadgeOverlay.textContent = `✦ ${song.badge || song.worldName}`;
    if (els.sheetArtGlow) els.sheetArtGlow.style.background = song.theme ? song.theme.glowColor : 'rgba(244,114,182,0.4)';

    updateFavoriteUI();

    // World Visuals & Atmosphere
    transitions.transitionToWorld(song);
    visualizer.setTheme(song.theme, song.id);

    // Reset Timeline
    currentTime = 0;
    updateTimeline();

    // Update World Map
    buildConstellationMap();

    // Update Diary current song indicator
    if (els.diaryCurrentSongTag) {
      els.diaryCurrentSongTag.textContent = `🎵 ${song.title} (${song.badge || song.worldName})`;
    }

    if (shouldPlay || isPlaying) {
      startPlayback();
    }
  }

  function startPlayback() {
    isPlaying = true;
    const song = SONGS_DATA[currentIndex];
    audio.playSong(song);
    updatePlayPauseUI();
  }

  function pausePlayback() {
    isPlaying = false;
    audio.pause();
    updatePlayPauseUI();
  }

  function togglePlay() {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }

  function playNext() {
    if (isShuffle) {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * SONGS_DATA.length);
      } while (nextIdx === currentIndex && SONGS_DATA.length > 1);
      loadSong(nextIdx, true);
    } else {
      loadSong(currentIndex + 1, true);
    }
  }

  function playPrev() {
    if (currentTime > 3) {
      audio.seek(0);
      currentTime = 0;
      updateTimeline();
    } else {
      loadSong(currentIndex - 1, true);
    }
  }

  function updatePlayPauseUI() {
    if (els.miniPlayIcon) {
      els.miniPlayIcon.innerHTML = isPlaying
        ? `<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>`
        : `<polygon points="6 4 19 12 6 20 6 4" fill="currentColor"/>`;
    }
    if (els.playPauseIcon) {
      els.playPauseIcon.innerHTML = isPlaying
        ? `<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>`
        : `<polygon points="6 4 19 12 6 20 6 4" fill="currentColor"/>`;
    }
  }

  // Audio Event Listeners
  audio.onTimeUpdateCallback = (curr, dur) => {
    currentTime = curr || 0;
    if (dur && !isNaN(dur) && dur > 0) {
      totalDuration = dur;
    }
    updateTimeline();
    localStorage.setItem('aura_last_time', currentTime);
  };

  audio.onLoadedMetadataCallback = (dur) => {
    if (dur && !isNaN(dur) && dur > 0) {
      totalDuration = dur;
      updateTimeline();
    }
  };

  audio.onEndedCallback = () => {
    if (isRepeat) {
      audio.seek(0);
      audio.resume();
    } else {
      playNext();
    }
  };

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateTimeline() {
    const dur = totalDuration > 0 ? totalDuration : 1;
    const pct = Math.min(100, (currentTime / dur) * 100);
    if (els.timeCurrent) els.timeCurrent.textContent = formatTime(currentTime);
    if (els.timeTotal) els.timeTotal.textContent = formatTime(totalDuration);
    if (els.seekbarFill) els.seekbarFill.style.width = `${pct}%`;
    if (els.seekbarHandle) els.seekbarHandle.style.left = `${pct}%`;
    if (els.miniProgressLine) els.miniProgressLine.style.width = `${pct}%`;
  }

  // Seekbar scrubbing
  if (els.seekbarContainer) {
    els.seekbarContainer.addEventListener('click', (e) => {
      const rect = els.seekbarContainer.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const target = pos * totalDuration;
      currentTime = target;
      audio.seek(target);
      updateTimeline();
    });
  }

  // Shuffle & Repeat
  if (els.shuffleBtn) {
    els.shuffleBtn.addEventListener('click', () => {
      isShuffle = !isShuffle;
      els.shuffleBtn.classList.toggle('active', isShuffle);
    });
  }

  if (els.repeatBtn) {
    els.repeatBtn.addEventListener('click', () => {
      isRepeat = !isRepeat;
      els.repeatBtn.classList.toggle('active', isRepeat);
    });
  }

  // 2. FAVORITES MANAGEMENT
  function updateFavoriteUI() {
    const isFav = favorites.includes(SONGS_DATA[currentIndex].id);
    const heartSvg = isFav
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="#f43f5e"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

    if (els.miniFavBtn) {
      els.miniFavBtn.classList.toggle('favorited', isFav);
      els.miniFavBtn.innerHTML = heartSvg;
    }
    if (els.sheetFavBtn) {
      els.sheetFavBtn.classList.toggle('favorited', isFav);
      els.sheetFavBtn.innerHTML = heartSvg;
    }
    renderFavoritesList();
  }

  function toggleFavorite() {
    const id = SONGS_DATA[currentIndex].id;
    const idx = favorites.indexOf(id);
    if (idx > -1) {
      favorites.splice(idx, 1);
    } else {
      favorites.push(id);
    }
    localStorage.setItem('aura_favorites', JSON.stringify(favorites));
    localStorage.setItem('aura_favs', JSON.stringify(favorites));
    updateFavoriteUI();
  }

  if (els.miniFavBtn) els.miniFavBtn.addEventListener('click', toggleFavorite);
  if (els.sheetFavBtn) els.sheetFavBtn.addEventListener('click', toggleFavorite);

  // 3. NOW PLAYING SHEET CONTROLS
  function openNowPlaying() {
    if (els.nowPlayingModal) els.nowPlayingModal.classList.add('open');
  }

  function closeNowPlaying() {
    if (els.nowPlayingModal) els.nowPlayingModal.classList.remove('open');
  }

  if (els.auraMiniPlayer) {
    els.auraMiniPlayer.addEventListener('click', () => {
      openNowPlaying();
    });
  }

  if (els.closeNowPlayingBtn) els.closeNowPlayingBtn.addEventListener('click', closeNowPlaying);
  if (els.sheetDragHandle) els.sheetDragHandle.addEventListener('click', closeNowPlaying);

  if (els.miniPlayBtn) {
    els.miniPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  if (els.playPauseBtn) els.playPauseBtn.addEventListener('click', togglePlay);
  if (els.nextBtn) els.nextBtn.addEventListener('click', playNext);
  if (els.prevBtn) els.prevBtn.addEventListener('click', playPrev);
  if (els.edgeNext) els.edgeNext.addEventListener('click', playNext);
  if (els.edgePrev) els.edgePrev.addEventListener('click', playPrev);

  // 4. TONIGHT MODE CONTROLLER
  function applyTonightMode() {
    document.body.classList.toggle('tonight-mode', isTonightMode);
    visualizer.setTonightMode(isTonightMode);
    if (els.btnTonightTop) els.btnTonightTop.classList.toggle('active', isTonightMode);
    if (els.btnTonightSheet) els.btnTonightSheet.classList.toggle('active', isTonightMode);
    if (els.tonightStatusText) els.tonightStatusText.textContent = isTonightMode ? "active ☾" : "warm & slow";
    localStorage.setItem('aura_tonight_mode', isTonightMode);
    localStorage.setItem('aura_tonight', isTonightMode);
  }

  function toggleTonightMode() {
    isTonightMode = !isTonightMode;
    applyTonightMode();
  }

  if (els.btnTonightTop) els.btnTonightTop.addEventListener('click', toggleTonightMode);
  if (els.btnTonightSheet) els.btnTonightSheet.addEventListener('click', toggleTonightMode);
  if (els.btnQuickTonight) els.btnQuickTonight.addEventListener('click', toggleTonightMode);

  // 5. PERSONAL NOTE MODAL ("♡ little note")
  function openSongNote() {
    const song = SONGS_DATA[currentIndex];
    if (!song) return;
    if (els.noteSongTitle) els.noteSongTitle.textContent = song.title;
    if (els.noteWorldBadge) els.noteWorldBadge.textContent = `✦ ${song.worldName} ✦`;
    if (els.noteBodyText) els.noteBodyText.textContent = song.note || "A special little song just for you ♡";
    if (els.modalPersonalNote) els.modalPersonalNote.classList.add('open');
  }

  function closeSongNote() {
    if (els.modalPersonalNote) els.modalPersonalNote.classList.remove('open');
  }

  if (els.btnSongNote) els.btnSongNote.addEventListener('click', openSongNote);
  if (els.sheetSongNoteBtn) els.sheetSongNoteBtn.addEventListener('click', openSongNote);
  if (els.btnQuoteNote) els.btnQuoteNote.addEventListener('click', openSongNote);
  if (els.closeNoteBtn) els.closeNoteBtn.addEventListener('click', closeSongNote);

  // 6. FINAL SECRET UNLOCK (20 / 20)
  function updateExplorationUI() {
    const count = exploredWorlds.size;
    if (els.exploredCount) els.exploredCount.textContent = count;

    if (count >= 20) {
      if (els.btnSecretUnlock) els.btnSecretUnlock.classList.remove('hidden');
      if (els.progressSub) els.progressSub.textContent = "you found all 20! open your secret below ♡";
    }
  }

  function openFinalSecret() {
    if (els.finalSecretTitle) els.finalSecretTitle.textContent = FINAL_MESSAGE.title;
    if (els.finalLetterText) els.finalLetterText.textContent = FINAL_MESSAGE.letter;
    if (els.modalFinalSecret) els.modalFinalSecret.classList.add('open');
  }

  if (els.btnSecretUnlock) els.btnSecretUnlock.addEventListener('click', openFinalSecret);
  if (els.closeFinalSecretBtn) {
    els.closeFinalSecretBtn.addEventListener('click', () => {
      if (els.modalFinalSecret) els.modalFinalSecret.classList.remove('open');
    });
  }

  // 7. HOME DRAWER LOGIC
  function updateTimeGreeting() {
    const hour = new Date().getHours();
    let greeting = "Good evening ♡";
    if (hour >= 5 && hour < 12) {
      greeting = "Good morning ♡";
    } else if (hour >= 12 && hour < 17) {
      greeting = "Good afternoon ♡";
    }
    if (els.homeGreeting) els.homeGreeting.textContent = greeting;
  }

  function renderHomeWorlds() {
    if (!els.homeWorldsScroll) return;
    els.homeWorldsScroll.innerHTML = '';

    SONGS_DATA.forEach((song, idx) => {
      const card = document.createElement('div');
      card.className = 'home-world-card';
      card.style.setProperty('--card-accent', song.theme ? song.theme.primary : '#f472b6');
      card.style.setProperty('--card-glow', song.theme ? song.theme.glowColor : 'rgba(244,114,182,0.3)');

      card.innerHTML = `
        <div class="hw-thumb-wrap">
          <img src="${song.image}" alt="${song.title}" loading="lazy" />
          <div class="hw-tag-phrase">${song.tagPhrase || 'made for you'}</div>
        </div>
        <div class="hw-title">${song.title}</div>
        <div class="hw-artist">${song.artist}</div>
      `;

      card.addEventListener('click', () => {
        loadSong(idx, true);
        closeHomeDrawer();
      });

      els.homeWorldsScroll.appendChild(card);
    });
  }

  function renderFavoritesList() {
    if (!els.homeFavsContainer || !els.favsCountTag) return;
    els.favsCountTag.textContent = `${favorites.length} saved`;

    if (favorites.length === 0) {
      els.homeFavsContainer.innerHTML = `<p class="empty-favs-msg">Tap the heart ♡ on any song to save your favorite little worlds here.</p>`;
      return;
    }

    const favSongs = SONGS_DATA.filter(s => favorites.includes(s.id));
    els.homeFavsContainer.innerHTML = favSongs.map(song => {
      const idx = SONGS_DATA.findIndex(s => s.id === song.id);
      return `
        <div class="home-world-card" style="width:100%; flex-direction:row; gap:0.75rem; align-items:center;" data-index="${idx}">
          <div class="hw-thumb-wrap" style="width:48px; height:48px; margin:0; flex-shrink:0;">
            <img src="${song.image}" alt="${song.title}" />
          </div>
          <div style="flex:1; min-width:0;">
            <div class="hw-title">${song.title}</div>
            <div class="hw-artist">${song.artist}</div>
          </div>
          <span style="color:#f43f5e; font-size:1.1rem; padding-right:0.5rem;">❤️</span>
        </div>
      `;
    }).join('');

    els.homeFavsContainer.querySelectorAll('.home-world-card').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.index, 10) || 0;
        loadSong(idx, true);
        closeHomeDrawer();
      });
    });
  }

  function openHomeDrawer() {
    updateTimeGreeting();
    renderHomeWorlds();
    renderFavoritesList();
    updateExplorationUI();

    // Check Continue Listening
    if (!isNaN(savedLastSong) && SONGS_DATA[savedLastSong]) {
      const lastSong = SONGS_DATA[savedLastSong];
      if (els.continueCard) els.continueCard.style.display = 'flex';
      if (els.continueThumb) els.continueThumb.src = lastSong.image;
      if (els.continueTitle) els.continueTitle.textContent = lastSong.title;
    }

    if (els.homeDrawer) els.homeDrawer.classList.add('open');
  }

  function closeHomeDrawer() {
    if (els.homeDrawer) els.homeDrawer.classList.remove('open');
  }

  if (els.btnOpenHome) els.btnOpenHome.addEventListener('click', openHomeDrawer);
  if (els.closeHomeBtn) els.closeHomeBtn.addEventListener('click', closeHomeDrawer);
  if (els.homeBackdrop) els.homeBackdrop.addEventListener('click', closeHomeDrawer);

  if (els.continueCard) {
    els.continueCard.addEventListener('click', () => {
      const targetIdx = !isNaN(savedLastSong) ? savedLastSong : 0;
      loadSong(targetIdx, true);
      if (savedLastTime > 0) {
        audio.seek(savedLastTime);
      }
      closeHomeDrawer();
    });
  }

  // Quick Action Buttons
  if (els.btnQuickSurprise) {
    els.btnQuickSurprise.addEventListener('click', () => {
      const randomIdx = Math.floor(Math.random() * SONGS_DATA.length);
      loadSong(randomIdx, true);
      closeHomeDrawer();
    });
  }

  // 8. CONSTELLATION MAP (THE LITTLE UNIVERSE WITH PERMANENT SONG NAMES ABOVE STARS)
  function buildConstellationMap() {
    if (!els.constellationStars || !els.constellationSvg) return;

    const currentCoords = getActiveStarCoords();
    els.constellationStars.innerHTML = '';
    els.constellationSvg.innerHTML = '';

    let svgLines = '';
    const maxLinkDist = window.innerWidth < 680 ? 18 : 28;
    for (let i = 0; i < currentCoords.length; i++) {
      for (let j = i + 1; j < currentCoords.length; j++) {
        const p1 = currentCoords[i];
        const p2 = currentCoords[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < maxLinkDist) {
          svgLines += `<line x1="${p1.x}%" y1="${p1.y}%" x2="${p2.x}%" y2="${p2.y}%" stroke="rgba(244, 114, 182, 0.3)" stroke-width="1.5" stroke-dasharray="3, 3" />`;
        }
      }
    }
    els.constellationSvg.innerHTML = svgLines;

    SONGS_DATA.forEach((song, idx) => {
      const pos = currentCoords[idx] || { x: 50, y: 50 };
      const node = document.createElement('div');
      node.className = `star-node ${idx === currentIndex ? 'active' : ''}`;
      node.style.left = `${pos.x}%`;
      node.style.top = `${pos.y}%`;
      node.style.setProperty('--star-glow', song.theme ? song.theme.primary : '#f472b6');

      node.innerHTML = `
        <div class="star-label-above">
          <span class="star-label-text">${song.title}</span>
        </div>
        <div class="star-core"></div>
        <div class="star-popup-card">
          <span class="star-num">${String(idx + 1).padStart(2, '0')}</span>
          <div class="star-title">${song.title}</div>
          <div class="star-artist">${song.artist}</div>
          <div style="font-size:0.68rem; color:var(--color-peach); margin-top:2px;">✨ ${song.worldName}</div>
        </div>
      `;

      node.addEventListener('click', () => {
        loadSong(idx, true);
        closeAllModals();
      });

      els.constellationStars.appendChild(node);
    });
  }

  function toggleWorldMap() {
    const isOpen = els.worldMapModal && els.worldMapModal.classList.contains('open');
    closeAllModals();
    if (!isOpen && els.worldMapModal) {
      buildConstellationMap();
      els.worldMapModal.classList.add('open');
    }
  }

  if (els.btnUniverseTop) els.btnUniverseTop.addEventListener('click', toggleWorldMap);
  if (els.btnUniverseSheet) els.btnUniverseSheet.addEventListener('click', toggleWorldMap);
  if (els.btnQuickUniverse) {
    els.btnQuickUniverse.addEventListener('click', () => {
      closeHomeDrawer();
      setTimeout(toggleWorldMap, 200);
    });
  }
  if (els.closeWorldMapBtn) els.closeWorldMapBtn.addEventListener('click', closeAllModals);

  // 9. SECRET DIARY CONTROLLER (SAVED FOREVER)
  function initDiary() {
    if (els.diaryTextarea) {
      els.diaryTextarea.value = diaryDraft;
      els.diaryTextarea.addEventListener('input', (e) => {
        diaryDraft = e.target.value;
        localStorage.setItem('aura_diary_draft', diaryDraft);
        showDiarySaveStatus('saving...');
        clearTimeout(diarySaveTimeout);
        diarySaveTimeout = setTimeout(() => {
          showDiarySaveStatus('saved automatically ♡');
        }, 600);
      });
    }

    // Mood selector pills
    if (els.diaryMoodPills) {
      els.diaryMoodPills.querySelectorAll('.mood-pill').forEach(pill => {
        if (pill.dataset.mood === selectedMood) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
        pill.addEventListener('click', () => {
          els.diaryMoodPills.querySelectorAll('.mood-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          selectedMood = pill.dataset.mood;
          localStorage.setItem('aura_diary_mood', selectedMood);
        });
      });
    }

    // Tab switching
    if (els.tabDiaryWrite) {
      els.tabDiaryWrite.addEventListener('click', () => switchDiaryTab('write'));
    }
    if (els.tabDiaryEntries) {
      els.tabDiaryEntries.addEventListener('click', () => switchDiaryTab('entries'));
    }

    // Save Thought button
    if (els.btnDiarySave) {
      els.btnDiarySave.addEventListener('click', () => {
        const text = els.diaryTextarea ? els.diaryTextarea.value.trim() : '';
        if (!text) {
          showDiarySaveStatus('write a thought first ♡');
          return;
        }

        const song = SONGS_DATA[currentIndex];
        const now = new Date();
        const newEntry = {
          id: Date.now(),
          text: text,
          date: now.toISOString(),
          formattedDate: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          songTitle: song ? song.title : 'AURA',
          songWorld: song ? (song.badge || song.worldName) : 'Living World',
          mood: selectedMood
        };

        diaryEntries.unshift(newEntry);
        localStorage.setItem('aura_diary_entries', JSON.stringify(diaryEntries));

        // Clear draft
        diaryDraft = '';
        localStorage.removeItem('aura_diary_draft');
        if (els.diaryTextarea) els.diaryTextarea.value = '';

        showDiarySaveStatus('saved to your diary forever ♡');
        updateDiaryCount();
        renderDiaryEntries();
        setTimeout(() => switchDiaryTab('entries'), 500);
      });
    }

    // Clear draft button
    if (els.btnDiaryClear) {
      els.btnDiaryClear.addEventListener('click', () => {
        if (confirm('Clear your current thought draft?')) {
          diaryDraft = '';
          localStorage.removeItem('aura_diary_draft');
          if (els.diaryTextarea) els.diaryTextarea.value = '';
          showDiarySaveStatus('draft cleared');
        }
      });
    }

    // Global delete entry function for inline onclick
    window.deleteDiaryEntry = function(id) {
      if (confirm('Delete this diary memory?')) {
        diaryEntries = diaryEntries.filter(entry => entry.id !== id);
        localStorage.setItem('aura_diary_entries', JSON.stringify(diaryEntries));
        updateDiaryCount();
        renderDiaryEntries();
      }
    };

    updateDiaryCount();
    renderDiaryEntries();
  }

  function showDiarySaveStatus(msg) {
    if (els.diaryStatusText) {
      const label = els.diaryStatusText.querySelector('.status-label');
      if (label) label.textContent = msg;
      els.diaryStatusText.classList.add('pulse');
      setTimeout(() => {
        if (els.diaryStatusText) els.diaryStatusText.classList.remove('pulse');
      }, 1200);
    }
  }

  function updateDiaryCount() {
    if (els.diaryCountPill) {
      els.diaryCountPill.textContent = diaryEntries.length;
    }
  }

  function switchDiaryTab(tab) {
    if (tab === 'write') {
      if (els.tabDiaryWrite) els.tabDiaryWrite.classList.add('active');
      if (els.tabDiaryEntries) els.tabDiaryEntries.classList.remove('active');
      if (els.diaryWriteSection) els.diaryWriteSection.classList.add('active');
      if (els.diaryEntriesSection) els.diaryEntriesSection.classList.remove('active');
    } else {
      if (els.tabDiaryWrite) els.tabDiaryWrite.classList.remove('active');
      if (els.tabDiaryEntries) els.tabDiaryEntries.classList.add('active');
      if (els.diaryWriteSection) els.diaryWriteSection.classList.remove('active');
      if (els.diaryEntriesSection) els.diaryEntriesSection.classList.add('active');
      renderDiaryEntries();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br/>");
  }

  function renderDiaryEntries() {
    if (!els.diaryEntriesList) return;
    if (diaryEntries.length === 0) {
      els.diaryEntriesList.innerHTML = `
        <div class="empty-diary-state">
          <div class="empty-diary-icon">✍️</div>
          <div class="empty-diary-title">Your diary is waiting for you</div>
          <p class="empty-diary-sub">Whenever you feel a thought or emotion while listening, pen it down here. It will stay safe and saved forever ♡</p>
        </div>
      `;
      return;
    }

    const moodEmojis = {
      peaceful: '♡ peaceful',
      happy: '✨ happy',
      dreamy: '🌙 dreamy',
      cozy: '☕ cozy',
      nostalgic: '🌧️ nostalgic',
      loved: '💖 loved'
    };

    els.diaryEntriesList.innerHTML = diaryEntries.map(entry => {
      const moodDisplay = moodEmojis[entry.mood] || '♡ note';
      return `
        <div class="diary-entry-card" id="entry-${entry.id}">
          <div class="entry-header">
            <div class="entry-meta-info">
              <span class="entry-date">${entry.formattedDate || new Date(entry.date).toLocaleDateString()}</span>
              <span class="entry-mood-tag">${moodDisplay}</span>
            </div>
            <button class="entry-delete-btn" onclick="deleteDiaryEntry(${entry.id})" title="Delete entry">✕</button>
          </div>
          <div class="entry-song-pill">🎵 ${entry.songTitle} · ${entry.songWorld}</div>
          <div class="entry-content">${escapeHtml(entry.text)}</div>
        </div>
      `;
    }).join('');
  }

  function openDiaryModal() {
    const song = SONGS_DATA[currentIndex];
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    if (els.diaryCurrentDate) els.diaryCurrentDate.textContent = `📅 ${dateStr}`;
    if (els.diaryCurrentSongTag) els.diaryCurrentSongTag.textContent = `🎵 ${song ? song.title : 'AURA'} (${song ? (song.badge || song.worldName) : ''})`;

    if (els.diaryTextarea && diaryDraft) {
      els.diaryTextarea.value = diaryDraft;
    }
    updateDiaryCount();
    renderDiaryEntries();
    switchDiaryTab('write');
    if (els.modalDiary) els.modalDiary.classList.add('open');
  }

  function closeDiaryModal() {
    if (els.modalDiary) els.modalDiary.classList.remove('open');
  }

  if (els.btnOpenDiary) els.btnOpenDiary.addEventListener('click', openDiaryModal);
  if (els.btnDiarySheet) els.btnDiarySheet.addEventListener('click', openDiaryModal);
  if (els.btnQuickDiary) {
    els.btnQuickDiary.addEventListener('click', () => {
      closeHomeDrawer();
      setTimeout(openDiaryModal, 200);
    });
  }
  if (els.closeDiaryBtn) els.closeDiaryBtn.addEventListener('click', closeDiaryModal);

  // 10. ZEN MODE TOGGLE (Tap world background to hide chrome)
  let isZenMode = false;
  if (els.worldCenterStage) {
    els.worldCenterStage.addEventListener('click', () => {
      isZenMode = !isZenMode;
      document.body.classList.toggle('zen-mode', isZenMode);
    });
  }

  // 11. MODAL HELPERS
  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
    if (els.worldMapModal) els.worldMapModal.classList.remove('open');
    if (els.homeDrawer) els.homeDrawer.classList.remove('open');
    closeNowPlaying();
  }

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  // 12. OPENING SCREEN TRIGGER
  if (els.btnOpenGift) {
    els.btnOpenGift.addEventListener('click', () => {
      audio.ensureContext();
      if (els.introPortal) els.introPortal.classList.add('entered');

      const startIdx = !isNaN(savedLastSong) && SONGS_DATA[savedLastSong] ? savedLastSong : 0;
      loadSong(startIdx, true);

      // Auto open Home on first entry to welcome her
      setTimeout(() => {
        openHomeDrawer();
      }, 500);
    });
  }

  // Window resize & orientation change handler
  window.addEventListener('resize', () => {
    buildConstellationMap();
  });
  window.addEventListener('orientationchange', () => {
    setTimeout(buildConstellationMap, 200);
  });

  // Initial Initialization
  transitions.preloadAll(SONGS_DATA);
  initDiary();
  applyTonightMode();
  loadSong(!isNaN(savedLastSong) ? savedLastSong : 0, false);
  buildConstellationMap();
  updateExplorationUI();
  updateTimeGreeting();
});
