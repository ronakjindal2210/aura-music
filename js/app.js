
  // Instant Mobile Audio Unlock & Touch Gesture Listener
  window.addEventListener('touchstart', function unlockAudioOnFirstTouch() {
    audio.ensureContext();
    window.removeEventListener('touchstart', unlockAudioOnFirstTouch);
  }, { passive: true });

/**
 * AURA — Main Application Controller (36 Worlds Sanctuary Edition)
 * Living Constellation, Today's Universe, Little Companion, Time Atmosphere & YOUR AURA Profile
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. APPLICATION STATE & PERSISTENCE
  let currentIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  let isRepeat = false;
  let currentTime = 0;
  let totalDuration = 214;
  let recentSurprisePicks = [];

  // LocalStorage Persistence
  const favorites = JSON.parse(localStorage.getItem('aura_favorites') || localStorage.getItem('aura_favs') || '[]');
  const exploredWorlds = new Set(JSON.parse(localStorage.getItem('aura_explored_worlds') || localStorage.getItem('aura_explored') || '[]'));
  const worldPlayCounts = JSON.parse(localStorage.getItem('aura_world_plays') || '{}');
  const playTimestamps = JSON.parse(localStorage.getItem('aura_play_times') || '[]');
  const unlockedMilestones = new Set(JSON.parse(localStorage.getItem('aura_unlocked_milestones') || '[]'));
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
    introTagline: document.getElementById('introTagline'),
    appContainer: document.getElementById('appContainer'),

    // Top Bar
    worldTopBar: document.getElementById('worldTopBar'),
    btnOpenHome: document.getElementById('btnOpenHome'),
    topBadgeText: document.getElementById('topBadgeText'),
    btnOpenAuraTop: document.getElementById('btnOpenAuraTop'),
    btnOpenDiary: document.getElementById('btnOpenDiary'),
    btnSongNote: document.getElementById('btnSongNote'),
    btnTonightTop: document.getElementById('btnTonightTop'),
    btnUniverseTop: document.getElementById('btnUniverseTop'),

    // Center Stage & Companion
    worldCenterStage: document.getElementById('worldCenterStage'),
    auraCompanionWrapper: document.getElementById('auraCompanionWrapper'),
    companionBubble: document.getElementById('companionBubble'),
    auraCompanion: document.getElementById('auraCompanion'),

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

    btnAuraSheet: document.getElementById('btnAuraSheet'),
    btnDiarySheet: document.getElementById('btnDiarySheet'),
    btnTonightSheet: document.getElementById('btnTonightSheet'),
    btnUniverseSheet: document.getElementById('btnUniverseSheet'),

    // Home Drawer
    homeDrawer: document.getElementById('homeDrawer'),
    homeBackdrop: document.getElementById('homeBackdrop'),
    closeHomeBtn: document.getElementById('closeHomeBtn'),
    homeGreeting: document.getElementById('homeGreeting'),
    homeSubtitle: document.getElementById('homeSubtitle'),

    // Today's Universe Card
    todayUniverseCard: document.getElementById('todayUniverseCard'),
    tuGreetingTag: document.getElementById('tuGreetingTag'),
    tuThumb: document.getElementById('tuThumb'),
    tuBadge: document.getElementById('tuBadge'),
    tuPromptText: document.getElementById('tuPromptText'),
    tuSongTitle: document.getElementById('tuSongTitle'),
    tuSongArtist: document.getElementById('tuSongArtist'),
    btnEnterTodayUniverse: document.getElementById('btnEnterTodayUniverse'),

    // Continue Listening Card
    continueCard: document.getElementById('continueCard'),
    continueThumb: document.getElementById('continueThumb'),
    continueTitle: document.getElementById('continueTitle'),
    continueSub: document.getElementById('continueSub'),

    // Quick Actions
    btnQuickAura: document.getElementById('btnQuickAura'),
    btnQuickDiary: document.getElementById('btnQuickDiary'),
    btnQuickUniverse: document.getElementById('btnQuickUniverse'),
    universeStarCount: document.getElementById('universeStarCount'),
    btnQuickSurprise: document.getElementById('btnQuickSurprise'),
    btnQuickTonight: document.getElementById('btnQuickTonight'),
    tonightStatusText: document.getElementById('tonightStatusText'),

    // Progress
    exploredCount: document.getElementById('exploredCount'),
    totalWorldsCount: document.getElementById('totalWorldsCount'),
    progressSub: document.getElementById('progressSub'),
    btnSecretUnlock: document.getElementById('btnSecretUnlock'),
    allWorldsCountTag: document.getElementById('allWorldsCountTag'),
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
    mapTagWorlds: document.getElementById('mapTagWorlds'),
    mapExploredCount: document.getElementById('mapExploredCount'),
    mapTotalCount: document.getElementById('mapTotalCount'),
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
    diaryCountPill: document.getElementById('diaryCountPill'),

    // YOUR AURA Modal
    modalYourAura: document.getElementById('modalYourAura'),
    auraArchetypeTitle: document.getElementById('auraArchetypeTitle'),
    auraArchetypeDesc: document.getElementById('auraArchetypeDesc'),
    closeAuraProfileBtn: document.getElementById('closeAuraProfileBtn'),
    closeAuraProfileBtnBottom: document.getElementById('closeAuraProfileBtnBottom'),
    auraStatExplored: document.getElementById('auraStatExplored'),
    auraStatFavs: document.getElementById('auraStatFavs'),
    auraStatMood: document.getElementById('auraStatMood'),
    auraStatFavTime: document.getElementById('auraStatFavTime'),
    auraStatTopWorld: document.getElementById('auraStatTopWorld'),
    auraStatDiaryCount: document.getElementById('auraStatDiaryCount'),

    // Surprise Me Overlay
    surpriseTransitionOverlay: document.getElementById('surpriseTransitionOverlay'),

    // Secret Milestone Toast
    secretMilestoneToast: document.getElementById('secretMilestoneToast'),
    smtIcon: document.getElementById('smtIcon'),
    smtTitle: document.getElementById('smtTitle'),
    smtSub: document.getElementById('smtSub')
  };

    // Constellation Coordinates: 36 Unique Worlds (100% Exact Aligned)
  const starCoordsDesktop = [
    { x: 8, y: 35 },   // 1. Samjhawan
    { x: 15, y: 18 },  // 2. O Meri Laila
    { x: 22, y: 32 },  // 3. Aarzu
    { x: 18, y: 58 },  // 4. Maskara
    { x: 10, y: 78 },  // 5. Thinking of You
    { x: 25, y: 82 },  // 6. Boyfriend
    { x: 28, y: 55 },  // 7. Wavy
    { x: 32, y: 34 },  // 8. For a Reason
    { x: 28, y: 14 },  // 9. Afreen Afreen
    { x: 38, y: 20 },  // 10. Arz Kia Hai
    { x: 42, y: 44 },  // 11. Bulleya
    { x: 37, y: 70 },  // 12. Tose Naina
    { x: 46, y: 84 },  // 13. O Rangrez
    { x: 50, y: 62 },  // 14. Darkhaast
    { x: 48, y: 36 },  // 15. Tere Bina Na Guzara E
    { x: 47, y: 15 },  // 16. Udaarian
    { x: 58, y: 22 },  // 17. Ranjheya Ve
    { x: 60, y: 46 },  // 18. Bairan
    { x: 58, y: 72 },  // 19. Wishes
    { x: 66, y: 85 },  // 20. Kashish
    { x: 74, y: 85 },  // 21. Kajra Re
    { x: 68, y: 58 },  // 22. Tutor
    { x: 67, y: 32 },  // 23. Kithe Reh Gaya
    { x: 68, y: 14 },  // 24. Kaise Hua
    { x: 77, y: 20 },  // 25. Dilliwali Girlfriend
    { x: 78, y: 45 },  // 26. Sweetheart
    { x: 76, y: 68 },  // 27. Meri Mummy Nu Pasand Nhi Hai Tu
    { x: 84, y: 86 },  // 28. Ik Vaari
    { x: 86, y: 62 },  // 29. Lag Ja Gale
    { x: 85, y: 38 },  // 30. Mere Samne Wali Khidki
    { x: 85, y: 16 },  // 31. No Love
    { x: 93, y: 24 },  // 32. Lahore
    { x: 94, y: 48 },  // 33. With You
    { x: 92, y: 70 },  // 34. Ve Haaniyaan
    { x: 91, y: 90 },  // 35. One Love
    { x: 50, y: 50 }   // 36. Raabta (Kehte Hain Khuda - Center Sanctuary)
  ];

  // Mobile (Vertical Staggered Celestial Trail)
  const starCoordsMobile = [
    { x: 26, y: 3 },   // 1. Samjhawan
    { x: 74, y: 5.5 }, // 2. Kajra Re
    { x: 24, y: 8 },   // 3. O Meri Laila
    { x: 76, y: 11 },  // 4. Kaise Hua
    { x: 28, y: 13.5 },// 5. Aarzu
    { x: 72, y: 16 },  // 6. No Love
    { x: 25, y: 19 },  // 7. Maskara
    { x: 75, y: 21.5 },// 8. With You
    { x: 27, y: 24.5 },// 9. Thinking of You
    { x: 73, y: 27 },  // 10. Lag Ja Gale
    { x: 25, y: 30 },  // 11. Boyfriend
    { x: 76, y: 32.5 },// 12. Dilliwali Girlfriend
    { x: 28, y: 35.5 },// 13. Wavy
    { x: 74, y: 38 },  // 14. Tutor
    { x: 26, y: 41 },  // 15. For a Reason
    { x: 75, y: 43.5 },// 16. Ve Haaniyaan
    { x: 24, y: 46.5 },// 17. Afreen Afreen
    { x: 76, y: 49 },  // 18. Mere Samne Wali Khidki
    { x: 27, y: 52 },  // 19. Arz Kia Hai
    { x: 73, y: 54.5 },// 20. Kithe Reh Gaya
    { x: 25, y: 57.5 },// 21. Bulleya
    { x: 75, y: 60 },  // 22. Sweetheart
    { x: 28, y: 63 },  // 23. Tose Naina
    { x: 74, y: 65.5 },// 24. Meri Mummy Nu Pasand Nhi Hai Tu
    { x: 26, y: 68.5 },// 25. O Rangrez
    { x: 76, y: 71 },  // 26. Ik Vaari
    { x: 24, y: 74 },  // 27. Darkhaast
    { x: 75, y: 76.5 },// 28. Lahore
    { x: 27, y: 79.5 },// 29. Tere Bina Na Guzara E
    { x: 73, y: 82 },  // 30. One Love
    { x: 25, y: 85 },  // 31. Udaarian
    { x: 76, y: 87.5 },// 32. Ranjheya Ve
    { x: 28, y: 90.5 },// 33. Bairan
    { x: 74, y: 93 },  // 34. Wishes
    { x: 26, y: 95.5 },// 35. Kashish
    { x: 50, y: 98 }   // 36. Raabta
  ];

  function getActiveStarCoords() {
    return (window.innerWidth < 680 || window.innerHeight > window.innerWidth) 
      ? starCoordsMobile 
      : starCoordsDesktop;
  }

  // 2. TIME-BASED ATMOSPHERE ENGINE
  function updateTimeAtmosphere() {
    const hour = new Date().getHours();
    let atmosphereClass = 'atmosphere-evening';
    let greetingText = 'Good evening ♡';

    if (hour >= 5 && hour < 12) {
      atmosphereClass = 'atmosphere-morning';
      greetingText = 'Good morning 🌷';
    } else if (hour >= 12 && hour < 17) {
      atmosphereClass = 'atmosphere-afternoon';
      greetingText = 'Good afternoon ☀️';
    } else if (hour >= 17 && hour < 21) {
      atmosphereClass = 'atmosphere-evening';
      greetingText = 'Good evening ♡';
    } else if (hour >= 21 && hour < 24) {
      atmosphereClass = 'atmosphere-night';
      greetingText = 'Good night ☾';
    } else {
      atmosphereClass = 'atmosphere-late-night';
      greetingText = 'Late night dreaming 🌌';
    }

    document.body.className = document.body.className
      .replace(/atmosphere-(morning|afternoon|evening|night|late-night)/g, '')
      .trim();
    document.body.classList.add(atmosphereClass);

    if (els.homeGreeting) els.homeGreeting.textContent = greetingText;
  }

  // 3. TODAY'S UNIVERSE DAILY SELECTION
  function getTodayUniverseIndex() {
    const now = new Date();
    const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    let hash = 0;
    for (let i = 0; i < dateKey.length; i++) {
      hash = ((hash << 5) - hash) + dateKey.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % SONGS_DATA.length;
  }

  function renderTodayUniverse() {
    const todayIdx = getTodayUniverseIndex();
    const song = SONGS_DATA[todayIdx];
    if (!song) return;

    const hour = new Date().getHours();
    let greetingPrefix = "Good evening 🌷";
    if (hour >= 5 && hour < 12) greetingPrefix = "Good morning 🌷";
    else if (hour >= 12 && hour < 17) greetingPrefix = "Good afternoon ☀️";
    else if (hour >= 21 || hour < 5) greetingPrefix = "Late night starlight ✨";

    if (els.tuGreetingTag) els.tuGreetingTag.textContent = `${greetingPrefix} · Today's Universe ✨`;
    if (els.tuThumb) els.tuThumb.src = song.image;
    if (els.tuBadge) els.tuBadge.textContent = song.badge || song.worldName;
    if (els.tuSongTitle) els.tuSongTitle.textContent = song.title;
    if (els.tuSongArtist) els.tuSongArtist.textContent = song.artist;
    if (els.tuPromptText) els.tuPromptText.textContent = `"Your universe has ${song.title} waiting for you."`;

    if (els.btnEnterTodayUniverse) {
      els.btnEnterTodayUniverse.onclick = () => {
        loadSong(todayIdx, true);
        closeHomeDrawer();
      };
    }
  }

  // 4. LITTLE CHARACTER COMPANION CONTROLLER
  const companionPhrases = [
    "listening with you ♡",
    "this melody feels so magical ✨",
    "dancing under the stars 🌌",
    "your little music companion ♡",
    "peace and warmth for your day 🌸",
    "look at all the glowing stars ✨",
    "soft thoughts and warm chai ☕",
    "forever your little friend ♡"
  ];

  function updateCompanionMood(song) {
    if (!els.auraCompanionWrapper) return;
    const mood = song.companionMood || 'calm';
    els.auraCompanionWrapper.className = `aura-companion-wrapper mood-${mood}`;
  }

  if (els.auraCompanionWrapper) {
    let danceTimeout = null;
    els.auraCompanionWrapper.addEventListener('click', (e) => {
      e.stopPropagation();

      // Trigger joyful energetic dance
      els.auraCompanionWrapper.classList.add('is-dancing');
      els.auraCompanionWrapper.classList.add('active-bubble');

      const dancePhrases = [
        "yay! let's dance together! ✨",
        "loving this rhythm with you! 🎶",
        "dancing under the stars! 🌌",
        "this melody makes my heart happy! ♡",
        "feeling the beat! 💃 ✨",
        "your little music buddy loves you! 🌸",
        "grooving through the cosmos! 🪐",
        "forever dancing to your aura! 💖"
      ];

      const randomPhrase = dancePhrases[Math.floor(Math.random() * dancePhrases.length)];
      if (els.companionBubble) {
        els.companionBubble.textContent = randomPhrase;
      }

      clearTimeout(danceTimeout);
      danceTimeout = setTimeout(() => {
        if (els.auraCompanionWrapper) {
          els.auraCompanionWrapper.classList.remove('is-dancing');
          setTimeout(() => {
            if (els.auraCompanionWrapper) els.auraCompanionWrapper.classList.remove('active-bubble');
          }, 1200);
        }
      }, 3200);
    });
  }

  // 5. SECRET MILESTONE UNLOCKS
  function checkMilestones(count) {
    const milestones = [
      { count: 10, key: 'm10', title: 'Something new appeared...', sub: '✦ Starlight Sanctuary Unlocked' },
      { count: 20, key: 'm20', title: 'A secret path opened...', sub: '☾ Midnight Velvet Mode Unlocked' },
      { count: SONGS_DATA.length, key: 'm36', title: 'You found them all ♡', sub: '👑 All 36 Worlds Unlocked' }
    ];

    milestones.forEach(m => {
      if (count >= m.count && !unlockedMilestones.has(m.key)) {
        unlockedMilestones.add(m.key);
        localStorage.setItem('aura_unlocked_milestones', JSON.stringify(Array.from(unlockedMilestones)));
        showMilestoneToast(m.title, m.sub);
      }
    });
  }

  function showMilestoneToast(title, sub) {
    if (!els.secretMilestoneToast) return;
    if (els.smtTitle) els.smtTitle.textContent = title;
    if (els.smtSub) els.smtSub.textContent = sub;

    els.secretMilestoneToast.classList.add('show');
    setTimeout(() => {
      if (els.secretMilestoneToast) els.secretMilestoneToast.classList.remove('show');
    }, 4500);
  }

  // 6. YOUR AURA LISTENING PROFILE CALCULATOR
  function calculateYourAura() {
    const totalExplored = exploredWorlds.size;
    const totalFavs = favorites.length;
    const totalDiary = diaryEntries.length;

    // Mood frequency calculation
    const moodCounts = {};
    Array.from(exploredWorlds).forEach(id => {
      const song = SONGS_DATA.find(s => s.id === id);
      if (song && song.mood) {
        const primaryMood = song.mood.split('&')[0].trim();
        moodCounts[primaryMood] = (moodCounts[primaryMood] || 0) + 1;
      }
    });

    let topMood = 'Soulful';
    let maxMoodCount = 0;
    Object.entries(moodCounts).forEach(([mood, cnt]) => {
      if (cnt > maxMoodCount) {
        maxMoodCount = cnt;
        topMood = mood;
      }
    });

    // Top visited sanctuary
    let topSongTitle = 'Himalayan Twilight Valley';
    let maxPlays = 0;
    Object.entries(worldPlayCounts).forEach(([id, plays]) => {
      if (plays > maxPlays) {
        maxPlays = plays;
        const s = SONGS_DATA.find(song => song.id === parseInt(id, 10));
        if (s) topSongTitle = s.worldName || s.title;
      }
    });

    // Peak Listening Hour calculation
    const hour = new Date().getHours();
    let favTimeStr = '11:00 PM';
    if (playTimestamps.length > 0) {
      const avgHour = Math.round(playTimestamps.reduce((a, b) => a + b, 0) / playTimestamps.length);
      const period = avgHour >= 12 ? 'PM' : 'AM';
      const dispHour = avgHour % 12 === 0 ? 12 : avgHour % 12;
      favTimeStr = `${dispHour}:00 ${period}`;
    } else {
      const period = hour >= 12 ? 'PM' : 'AM';
      const dispHour = hour % 12 === 0 ? 12 : hour % 12;
      favTimeStr = `${dispHour}:00 ${period}`;
    }

    // Archetype generation
    let archetype = '🌙 Midnight Dreamer';
    let archetypeDesc = 'You find sanctuary when the world goes quiet under starlight.';

    if (totalExplored >= 30) {
      archetype = '🌌 Cosmic Pioneer';
      archetypeDesc = 'You have traversed nearly every corner of this infinite musical universe.';
    } else if (topMood.toLowerCase().includes('romantic') || topMood.toLowerCase().includes('intimate')) {
      archetype = '🌸 Starlight Romantic';
      archetypeDesc = 'Your soul seeks gentle warmth, tender poetry, and timeless connection.';
    } else if (topMood.toLowerCase().includes('energetic') || topMood.toLowerCase().includes('celebratory')) {
      archetype = '✨ Golden Sunbeam';
      archetypeDesc = 'You bring celebratory rhythm and radiant energy wherever you wander.';
    } else if (topMood.toLowerCase().includes('melancholic') || topMood.toLowerCase().includes('soulful')) {
      archetype = '☕ Nostalgic Wanderer';
      archetypeDesc = 'You appreciate deep melodies that feel like warm chai on a quiet rainy evening.';
    }

    // Render to modal
    if (els.auraArchetypeTitle) els.auraArchetypeTitle.textContent = archetype;
    if (els.auraArchetypeDesc) els.auraArchetypeDesc.textContent = archetypeDesc;
    if (els.auraStatExplored) els.auraStatExplored.textContent = `${totalExplored} / ${SONGS_DATA.length}`;
    if (els.auraStatFavs) els.auraStatFavs.textContent = `${totalFavs} saved`;
    if (els.auraStatMood) els.auraStatMood.textContent = topMood;
    if (els.auraStatFavTime) els.auraStatFavTime.textContent = favTimeStr;
    if (els.auraStatTopWorld) els.auraStatTopWorld.textContent = topSongTitle;
    if (els.auraStatDiaryCount) els.auraStatDiaryCount.textContent = `${totalDiary} memories penned`;
  }

  function openYourAuraModal() {
    calculateYourAura();
    closeAllModals();
    if (els.modalYourAura) els.modalYourAura.classList.add('open');
  }

  function closeYourAuraModal() {
    if (els.modalYourAura) els.modalYourAura.classList.remove('open');
  }

  if (els.btnOpenAuraTop) els.btnOpenAuraTop.addEventListener('click', openYourAuraModal);
  if (els.btnAuraSheet) els.btnAuraSheet.addEventListener('click', openYourAuraModal);
  if (els.btnQuickAura) {
    els.btnQuickAura.addEventListener('click', () => {
      closeHomeDrawer();
      setTimeout(openYourAuraModal, 200);
    });
  }
  if (els.closeAuraProfileBtn) els.closeAuraProfileBtn.addEventListener('click', closeYourAuraModal);
  if (els.closeAuraProfileBtnBottom) els.closeAuraProfileBtnBottom.addEventListener('click', closeYourAuraModal);

  // 7. CINEMATIC SURPRISE ME
  function triggerSurpriseMe() {
    if (els.surpriseTransitionOverlay) {
      els.surpriseTransitionOverlay.classList.add('active');
    }

    // History-aware random selection
    let pick;
    let attempts = 0;
    do {
      pick = Math.floor(Math.random() * SONGS_DATA.length);
      attempts++;
    } while ((pick === currentIndex || recentSurprisePicks.includes(pick)) && attempts < 20 && SONGS_DATA.length > 1);

    recentSurprisePicks.push(pick);
    if (recentSurprisePicks.length > 4) recentSurprisePicks.shift();

    setTimeout(() => {
      loadSong(pick, true);
      closeAllModals();
      setTimeout(() => {
        if (els.surpriseTransitionOverlay) {
          els.surpriseTransitionOverlay.classList.remove('active');
        }
      }, 400);
    }, 700);
  }

  if (els.btnQuickSurprise) els.btnQuickSurprise.addEventListener('click', triggerSurpriseMe);

  // 8. LOAD & PLAYBACK ENGINE
  function loadSong(index, shouldPlay = false) {
    if (index < 0) index = SONGS_DATA.length - 1;
    if (index >= SONGS_DATA.length) index = 0;

    currentIndex = index;
    const song = SONGS_DATA[currentIndex];
    trackEvent("song_opened", song.title);

    // Track exploration progress
    exploredWorlds.add(song.id);
    localStorage.setItem('aura_explored_worlds', JSON.stringify(Array.from(exploredWorlds)));
    localStorage.setItem('aura_explored', JSON.stringify(Array.from(exploredWorlds)));
    localStorage.setItem('aura_last_song', currentIndex);

    // Track play counts & time
    worldPlayCounts[song.id] = (worldPlayCounts[song.id] || 0) + 1;
    localStorage.setItem('aura_world_plays', JSON.stringify(worldPlayCounts));

    const currentHour = new Date().getHours();
    playTimestamps.push(currentHour);
    if (playTimestamps.length > 30) playTimestamps.shift();
    localStorage.setItem('aura_play_times', JSON.stringify(playTimestamps));

    updateExplorationUI();
    checkMilestones(exploredWorlds.size);

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
    updateCompanionMood(song);

    // World Visuals & Atmosphere
    transitions.transitionToWorld(song);
    visualizer.setTheme(song.theme, song.id);

    // Reset Timeline
    currentTime = 0;
    updateTimeline();

    // Update Constellation Map
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
    trackEvent("song_played", song.title);
    audio.playSong(song);
    updatePlayPauseUI();
  }

  function pausePlayback() {
    isPlaying = false;
    trackEvent("song_paused", SONGS_DATA[currentIndex].title);
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
    const playSvg = `<polygon points="6 4 19 12 6 20 6 4" fill="currentColor"/>`;
    const pauseSvg = `<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>`;

    if (els.miniPlayIcon) {
      els.miniPlayIcon.innerHTML = isPlaying ? pauseSvg : playSvg;
    }
    if (els.playPauseIcon) {
      els.playPauseIcon.innerHTML = isPlaying ? pauseSvg : playSvg;
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

  // 9. FAVORITES MANAGEMENT
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

  
  // Mobile Touch Swipe Navigation (Left/Right swipe to change worlds)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const stage = document.getElementById('worldCenterStage');
  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    // Require at least 50px horizontal swipe and mostly horizontal direction
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        playNext(); // Swiped left -> Next world
      } else {
        playPrev(); // Swiped right -> Previous world
      }
    }
  }

  // 10. NOW PLAYING SHEET CONTROLS
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

  // 11. TONIGHT MODE CONTROLLER
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

  // 12. PERSONAL NOTE MODAL ("♡ little note")
  function openSongNote() {
    const song = SONGS_DATA[currentIndex];
    if (!song) return;
    if (els.noteSongTitle) els.noteSongTitle.textContent = song.title;
    if (els.noteWorldBadge) els.noteWorldBadge.textContent = `✦ ${song.worldName} ✦`;
    if (els.noteBodyText) els.noteBodyText.textContent = song.note || "A special little song just for you ♡";
    closeAllModals();
    if (els.modalPersonalNote) els.modalPersonalNote.classList.add('open');
  }

  function closeSongNote() {
    if (els.modalPersonalNote) els.modalPersonalNote.classList.remove('open');
  }

  if (els.btnSongNote) els.btnSongNote.addEventListener('click', openSongNote);
  if (els.sheetSongNoteBtn) els.sheetSongNoteBtn.addEventListener('click', openSongNote);
  if (els.closeNoteBtn) els.closeNoteBtn.addEventListener('click', closeSongNote);

  // 13. EXPLORATION UI & FINAL SECRET UNLOCK
  function updateExplorationUI() {
    const count = exploredWorlds.size;
    const total = SONGS_DATA.length;

    if (els.exploredCount) els.exploredCount.textContent = count;
    if (els.totalWorldsCount) els.totalWorldsCount.textContent = total;
    if (els.mapExploredCount) els.mapExploredCount.textContent = count;
    if (els.mapTotalCount) els.mapTotalCount.textContent = total;
    if (els.introTagline) els.introTagline.textContent = `${total} little worlds made from ${total} songs`;
    if (els.universeStarCount) els.universeStarCount.textContent = total;
    if (els.allWorldsCountTag) els.allWorldsCountTag.textContent = `${total} songs`;
    if (els.mapTagWorlds) els.mapTagWorlds.textContent = `${total} glowing stars`;

    if (count >= total) {
      if (els.btnSecretUnlock) els.btnSecretUnlock.classList.remove('hidden');
      if (els.progressSub) els.progressSub.textContent = `you found all ${total}! open your secret below ♡`;
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

  // 14. HOME DRAWER LOGIC
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

  
  // 14b. LIVE SEARCH IN HOME DRAWER
  const homeSearchInput = document.getElementById('homeSearchInput');
  const hsbClearBtn = document.getElementById('hsbClearBtn');

  if (homeSearchInput) {
    homeSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (hsbClearBtn) {
        hsbClearBtn.style.display = q.length > 0 ? 'block' : 'none';
      }
      filterHomeWorlds(q);
    });

    if (hsbClearBtn) {
      hsbClearBtn.addEventListener('click', () => {
        homeSearchInput.value = '';
        hsbClearBtn.style.display = 'none';
        filterHomeWorlds('');
        homeSearchInput.focus();
      });
    }
  }

  function filterHomeWorlds(query) {
    if (!els.homeWorldsScroll) return;
    const cards = els.homeWorldsScroll.querySelectorAll('.home-world-card');
    cards.forEach(card => {
      const title = card.querySelector('.hw-title')?.textContent.toLowerCase() || '';
      const artist = card.querySelector('.hw-artist')?.textContent.toLowerCase() || '';
      const tag = card.querySelector('.hw-tag-phrase')?.textContent.toLowerCase() || '';
      const matches = !query || title.includes(query) || artist.includes(query) || tag.includes(query);
      card.style.display = matches ? 'flex' : 'none';
    });
  }

  function openHomeDrawer() {
    updateTimeAtmosphere();
    renderTodayUniverse();
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

  // 15. CONSTELLATION MAP (THE LITTLE UNIVERSE WITH EVOLVING GLOWING STARS)
  function buildConstellationMap() {
    if (!els.constellationStars || !els.constellationSvg) return;

    const currentCoords = getActiveStarCoords();
    els.constellationStars.innerHTML = '';
    els.constellationSvg.innerHTML = '';

    let svgLines = '';
    const maxLinkDist = window.innerWidth < 680 ? 15 : 22;

    for (let i = 0; i < currentCoords.length; i++) {
      for (let j = i + 1; j < currentCoords.length; j++) {
        const p1 = currentCoords[i];
        const p2 = currentCoords[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < maxLinkDist) {
          const s1 = SONGS_DATA[i];
          const s2 = SONGS_DATA[j];
          const isBothExplored = s1 && s2 && exploredWorlds.has(s1.id) && exploredWorlds.has(s2.id);
          const lineClass = isBothExplored ? 'active-link' : '';
          const strokeCol = isBothExplored ? 'rgba(244, 114, 182, 0.75)' : 'rgba(244, 114, 182, 0.22)';
          svgLines += `<line class="${lineClass}" x1="${p1.x}%" y1="${p1.y}%" x2="${p2.x}%" y2="${p2.y}%" stroke="${strokeCol}" stroke-width="1.5" stroke-dasharray="3, 3" />`;
        }
      }
    }
    els.constellationSvg.innerHTML = svgLines;

    SONGS_DATA.forEach((song, idx) => {
      const pos = currentCoords[idx] || { x: 50, y: 50 };
      const isExplored = exploredWorlds.has(song.id);
      const isActive = idx === currentIndex;

      const node = document.createElement('div');
      node.className = `star-node ${isActive ? 'active' : ''} ${isExplored ? 'explored' : 'unexplored'}`;
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

  // 16. SECRET DIARY CONTROLLER (SAVED FOREVER)
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

    if (els.tabDiaryWrite) {
      els.tabDiaryWrite.addEventListener('click', () => switchDiaryTab('write'));
    }
    if (els.tabDiaryEntries) {
      els.tabDiaryEntries.addEventListener('click', () => switchDiaryTab('entries'));
    }

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

        diaryDraft = '';
        localStorage.removeItem('aura_diary_draft');
        if (els.diaryTextarea) els.diaryTextarea.value = '';

        showDiarySaveStatus('saved to your diary forever ♡');
        updateDiaryCount();
        renderDiaryEntries();
        setTimeout(() => switchDiaryTab('entries'), 500);
      });
    }

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
    closeAllModals();
    renderDiaryEntries();
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

  // 17. ZEN MODE TOGGLE
  let isZenMode = false;
  if (els.worldCenterStage) {
    els.worldCenterStage.addEventListener('click', (e) => {
      if (e.target.closest('#auraCompanionWrapper')) return;
      isZenMode = !isZenMode;
      document.body.classList.toggle('zen-mode', isZenMode);
    });
  }

  // 18. MODAL HELPERS
  function closeAllModals() {
    if (els.homeDrawer) els.homeDrawer.classList.remove('open');
    if (els.nowPlayingModal) els.nowPlayingModal.classList.remove('open');
    if (els.worldMapModal) els.worldMapModal.classList.remove('open');
    if (els.modalDiary) els.modalDiary.classList.remove('open');
    if (els.modalYourAura) els.modalYourAura.classList.remove('open');
    if (els.modalPersonalNote) els.modalPersonalNote.classList.remove('open');
    if (els.modalFinalSecret) els.modalFinalSecret.classList.remove('open');
  }

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  // 19. OPENING SCREEN TRIGGER
  if (els.btnOpenGift) {
    els.btnOpenGift.addEventListener('click', () => {
      trackEvent("gift_opened");
      audio.ensureContext();
      if (els.introPortal) els.introPortal.classList.add('entered');

      const startIdx = !isNaN(savedLastSong) && SONGS_DATA[savedLastSong] ? savedLastSong : 0;
      loadSong(startIdx, true);

      setTimeout(() => {
        openHomeDrawer();
      }, 500);
    });
  }

  // Window resize & orientation change handler
  window.addEventListener('resize', () => {
    buildConstellationMap();
  }, { passive: true });

  window.addEventListener('orientationchange', () => {
    setTimeout(buildConstellationMap, 200);
  }, { passive: true });

  // 20. INITIALIZATION
  transitions.preloadAll(SONGS_DATA);
  initDiary();
  applyTonightMode();
  updateTimeAtmosphere();
  loadSong(!isNaN(savedLastSong) ? savedLastSong : 0, false);
  buildConstellationMap();
  updateExplorationUI();
});
