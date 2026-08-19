/**
 * AURA — 36 Living World Sanctuaries (100% Exact Aligned Edition)
 */

const SONGS_DATA = [
  {
    "id": 1,
    "title": "Samjhawan",
    "artist": "Arijit Singh & Shreya Ghoshal",
    "album": "Humpty Sharma Ki Dulhania",
    "worldName": "Himalayan Twilight Valley",
    "mood": "Soulful & Melancholic",
    "badge": "Amber Twilight",
    "tagPhrase": "warm & peaceful",
    "note": "This melody always feels like a warm cup of chai on a rainy evening. I hope it brings peace to your mind whenever things feel overwhelming ♡",
    "image": "assets/images/world_01.jpg",
    "audioSrc": "assets/audio/track_01.mp3",
    "audioMatch": "Samjhawan",
    "quote": "Main tenu samjhawan ki, na tere bina lagda jee...",
    "translation": "How do I make you understand? My soul finds no peace without you...",
    "lore": "A quiet, misty Himalayan valley where warm amber lantern lights flicker softly against cold blue mountain twilight.",
    "theme": {
      "primary": "#f59e0b",
      "accent": "#f472b6",
      "bgGradient": "linear-gradient(135deg, #1f140e 0%, #2e1d14 50%, #151828 100%)",
      "glowColor": "rgba(245, 158, 11, 0.45)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Mountain Flute & Twilight Strings ✦",
      "Nahi jeena tere baaju, nahi jeena, nahi jeena",
      "Main tenu samjhawan ki, na tere bina lagda jee",
      "Tu ki jaane pyaar mera, main karaan intezaar tera",
      "Tu dil, tu-yun jaan meri",
      "✦ Sarangi & Acoustic Guitar ✦",
      "Mere dil vich rehke mere dil da haal na jaane",
      "Tere baajon koi vi mera dard pachhan na paave",
      "Ve maahi mera tu hi ae, sahara mera tu hi ae",
      "Main tenu samjhawan ki, na tere bina lagda jee...",
      "✦ Soft Twilight Rain Outro ✦"
    ]
  },
  {
    "id": 2,
    "title": "O Meri Laila",
    "artist": "Jyotica Tangri & Atif Aslam",
    "album": "Laila Majnu",
    "worldName": "Oasis of Thousand Lanterns",
    "mood": "Passionate & Ethereal",
    "badge": "Lustrous Oasis",
    "tagPhrase": "glowing & dreamy",
    "note": "Listen to the violins swell here. It feels like floating through a starry desert under glowing purple dunes ♡",
    "image": "assets/images/world_02.jpg",
    "audioSrc": "assets/audio/track_02.mp3",
    "audioMatch": "O Meri Laila",
    "quote": "O meri Laila, khwaab tu pehla...",
    "translation": "O my Laila, you are my first and eternal dream...",
    "lore": "An ethereal desert sanctuary surrounded by floating glowing lanterns and whispering wind.",
    "theme": {
      "primary": "#c084fc",
      "accent": "#fbbf24",
      "bgGradient": "linear-gradient(135deg, #1c0f2a 0%, #2e1545 50%, #1a1528 100%)",
      "glowColor": "rgba(192, 132, 252, 0.45)"
    },
    "audio": {
      "ambientType": "night"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Ethereal Desert Echoes ✦",
      "O meri Laila, khwaab tu pehla",
      "Floating beneath the violet desert night",
      "Thousand lanterns burning golden and bright",
      "Tere bina koi aalam nahi",
      "Tu hi toh meri manzil hai",
      "✦ Floating Lantern Swell ✦",
      "O meri Laila, laila ho meri laila...",
      "✦ Soft Wind & Starlight Outro ✦"
    ]
  },
  {
    "id": 3,
    "title": "Aarzu",
    "artist": "Asim Azhar, Noor Khan & Madhurxo",
    "album": "Aarzu - Single",
    "worldName": "Cherry Blossom Dusk Garden",
    "mood": "Soft & Nostalgic",
    "badge": "Petal Reverie",
    "tagPhrase": "gentle breeze",
    "note": "Soft pink cherry blossoms swirling in the evening air. Whenever you listen to this, take a deep breath and relax ♡",
    "image": "assets/images/world_03.jpg",
    "audioSrc": "assets/audio/track_03.mp3",
    "audioMatch": "Aarzu",
    "quote": "Yeh aarzu meri, tu ho rubaroo...",
    "translation": "This one deep yearning of my heart: just to have you here before my eyes...",
    "lore": "A tranquil Japanese courtyard under a lavender dusk sky, filled with falling sakura petals and soft candlelight.",
    "theme": {
      "primary": "#f472b6",
      "accent": "#a78bfa",
      "bgGradient": "linear-gradient(135deg, #240d1a 0%, #3d152c 50%, #1c152e 100%)",
      "glowColor": "rgba(244, 114, 182, 0.45)"
    },
    "audio": {
      "ambientType": "nature"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Soft Piano & Falling Blossoms ✦",
      "Yeh aarzu meri, tu ho rubaroo",
      "Sakura petals drifting in the breeze",
      "Whispering melodies through the trees",
      "Tere siva kuch bhi na chaha",
      "Yeh aarzu meri... tu ho rubaroo...",
      "✦ Lavender Dusk Rain Echoes ✦"
    ]
  },
  {
    "id": 4,
    "title": "Maskara",
    "artist": "A.R. Rahman, Vedang Raina & Nilanjana",
    "album": "Main Vaapas Aaunga",
    "worldName": "Punjab Golden Hour Horizon",
    "mood": "Warm & Reflective",
    "badge": "Golden Saffron",
    "tagPhrase": "warm & nostalgic",
    "note": "The golden warmth of fields at sundown. A reminder that you bring so much warmth to the world around you ♡",
    "image": "assets/images/world_04.jpg",
    "audioSrc": "assets/audio/track_04.mp3",
    "audioMatch": "Maskara",
    "quote": "Khol aankhein zara, dekh le tu sama...",
    "translation": "Open your eyes and behold this breathtaking moment...",
    "lore": "Endless golden fields bathed in the rich, soothing rays of an autumn sunset.",
    "theme": {
      "primary": "#ea580c",
      "accent": "#facc15",
      "bgGradient": "linear-gradient(135deg, #261108 0%, #421e0a 50%, #211910 100%)",
      "glowColor": "rgba(234, 88, 12, 0.45)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Golden Hour Acoustic Intro ✦",
      "Khol aankhein zara, dekh le tu sama",
      "Sunlight fading into shades of gold",
      "Stories waiting to be told",
      "Maskara tere naina da...",
      "✦ Saffron Sunset Guitar Echoes ✦"
    ]
  },
  {
    "id": 5,
    "title": "Thinking of You",
    "artist": "AP Dhillon",
    "album": "Thinking of You",
    "worldName": "Neon Coastal Shoreline",
    "mood": "Late-Night & Introspective",
    "badge": "Tidal Luminescence",
    "tagPhrase": "3:00 am thoughts",
    "note": "For those quiet late nights when you are staring out the window with headphones on. You're never alone ♡",
    "image": "assets/images/world_05.jpg",
    "audioSrc": "assets/audio/track_05.mp3",
    "audioMatch": "Thinking Of You",
    "quote": "I've been thinking about you late night under city lights...",
    "translation": "Lost in quiet thoughts of you as the coastline glows beneath the night...",
    "lore": "A deserted coastline where neon reflections shimmer across wet sand and rhythmic tides.",
    "theme": {
      "primary": "#38bdf8",
      "accent": "#ec4899",
      "bgGradient": "linear-gradient(135deg, #0a1926 0%, #0e2a42 50%, #201124 100%)",
      "glowColor": "rgba(56, 189, 248, 0.45)"
    },
    "audio": {
      "ambientType": "ocean"
    },
    "companionMood": "late_night",
    "lyrics": [
      "✦ Late Night Synth Waves ✦",
      "I've been thinking of you late night",
      "Watching waves beneath the neon light",
      "Tere baare sochan har ghadi",
      "Kalli raat vich yaadan di ladi...",
      "✦ Ocean Tide & Synth Outro ✦"
    ]
  },
  {
    "id": 6,
    "title": "Boyfriend",
    "artist": "Karan Aujla ft. Sunanda Sharma",
    "album": "Boyfriend - Single",
    "worldName": "Miami Art-Deco Sunset Boulevard",
    "mood": "Chic & Playful",
    "badge": "Deco Velvet",
    "tagPhrase": "stylish & sassy",
    "note": "Upbeat, stylish, and full of confidence! Whenever you need a little burst of joy, play this on full blast ♡",
    "image": "assets/images/world_06.jpg",
    "audioSrc": "assets/audio/track_06.mp3",
    "audioMatch": "BOYFRIEND",
    "quote": "Kudi kehndi mainu boyfriend bana lai apna...",
    "translation": "She playfully says: make me your one and only...",
    "lore": "Pastel art-deco streets with swaying palm trees under an electric pink-orange sunset.",
    "theme": {
      "primary": "#f43f5e",
      "accent": "#06b6d4",
      "bgGradient": "linear-gradient(135deg, #240a12 0%, #3e1220 50%, #0d212b 100%)",
      "glowColor": "rgba(244, 63, 94, 0.45)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "energetic",
    "lyrics": [
      "✦ Palm Trees & 808 Groove ✦",
      "Kudi kehndi mainu boyfriend bana lai apna",
      "Cruising down the sunset boulevard",
      "Neon lights glowing bright in our yard",
      "✦ Energetic Punjabi Drop ✦"
    ]
  },
  {
    "id": 7,
    "title": "Wavy",
    "artist": "Karan Aujla",
    "album": "Four Me - EP",
    "worldName": "Bioluminescent Crystal Abyss",
    "mood": "Hypnotic & Wavy",
    "badge": "Cyan Glow",
    "tagPhrase": "flow with the vibe",
    "note": "Hypnotic underwater neon crystals and deep bass. Just close your eyes and let the rhythm carry you ♡",
    "image": "assets/images/world_07.jpg",
    "audioSrc": "assets/audio/track_07.mp3",
    "audioMatch": "WAVY",
    "quote": "Everything is wavy when you ride the rhythm...",
    "translation": "Surrendering to the hypnotic pulse of the deep...",
    "lore": "A deep bioluminescent underwater world with glowing neon corals and crystal formations.",
    "theme": {
      "primary": "#06b6d4",
      "accent": "#a855f7",
      "bgGradient": "linear-gradient(135deg, #081d24 0%, #0d2f3b 50%, #20122e 100%)",
      "glowColor": "rgba(6, 182, 212, 0.45)"
    },
    "audio": {
      "ambientType": "cosmic"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Submerged Crystal Bassline ✦",
      "Everything is wavy in the deep neon blue",
      "Floating through the current with you",
      "Rhythm flowing like the ocean tide",
      "✦ Deep Aquatic Outro ✦"
    ]
  },
  {
    "id": 8,
    "title": "For a Reason",
    "artist": "Karan Aujla ft. Tania",
    "album": "Four Me - EP",
    "worldName": "Sunflower Highlands at Sunrise",
    "mood": "Uplifting & Bright",
    "badge": "Morning Rays",
    "tagPhrase": "everything happens for a reason",
    "note": "Sunflowers turning towards the morning sun. Never forget that everything works out in the end ♡",
    "image": "assets/images/world_08.jpg",
    "audioSrc": "assets/audio/track_08.mp3",
    "audioMatch": "For A Reason",
    "quote": "Everything happened for a reason, trust the journey...",
    "translation": "Every moment unfolds with divine purpose...",
    "lore": "Vast green highlands blooming with sunflowers as the golden morning sun breaks over the mountain ridge.",
    "theme": {
      "primary": "#facc15",
      "accent": "#22c55e",
      "bgGradient": "linear-gradient(135deg, #24200a 0%, #3b3310 50%, #0d2415 100%)",
      "glowColor": "rgba(250, 204, 21, 0.45)"
    },
    "audio": {
      "ambientType": "nature"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Acoustic Morning Strum ✦",
      "Everything happens for a reason in this life",
      "Sunflowers blooming after the storm and strife",
      "Trust the journey, trust the sun...",
      "✦ Golden Sunbeam Outro ✦"
    ]
  },
  {
    "id": 9,
    "title": "Afreen Afreen",
    "artist": "Rahat Fateh Ali Khan & Momina Mustehsan",
    "album": "Coke Studio Season 9",
    "worldName": "Royal Mughal Starlight Pavilion",
    "mood": "Timeless & Divine",
    "badge": "Celestial Ivory",
    "tagPhrase": "pure grace",
    "note": "A timeless masterpiece. Starlight reflecting off marble arches with the sweetest harmonium notes ♡",
    "image": "assets/images/world_09.jpg",
    "audioSrc": "assets/audio/track_09.mp3",
    "audioMatch": "Afreen Afreen",
    "quote": "Husn-e-jaana ki taareef mumkin nahi...",
    "translation": "Words fail to describe the radiant, heavenly beauty of the beloved...",
    "lore": "A pristine white marble Mughal courtyard under a midnight sky sparkling with constellations.",
    "theme": {
      "primary": "#fbbf24",
      "accent": "#f472b6",
      "bgGradient": "linear-gradient(135deg, #241a0e 0%, #3b2b15 50%, #2b1120 100%)",
      "glowColor": "rgba(251, 191, 36, 0.45)"
    },
    "audio": {
      "ambientType": "night"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Starlight Harmonium Alaap ✦",
      "Aisa dekha nahi khoobsurat koi",
      "Jism jaise ajanta ki moorat koi",
      "Husn-e-jaana ki taareef mumkin nahi",
      "Afreen afreen, afreen afreen...",
      "✦ Celestial Tabla & Vocals Swell ✦",
      "Chehra ik phool ki tarah shaadaab hai",
      "Afreen afreen... afreen afreen...",
      "✦ Marble Pavilion Echoes ✦"
    ]
  },
  {
    "id": 10,
    "title": "Arz Kia Hai",
    "artist": "Anuv Jain X Lost Stories",
    "album": "Coke Studio Bharat",
    "worldName": "Acoustic Wooden Studio",
    "mood": "Intimate & Cozy",
    "badge": "Amber Velvet",
    "tagPhrase": "quiet memories",
    "note": "Warm fairy lights and acoustic strings. Like sitting in a cozy room while rain gently taps the windowpane ♡",
    "image": "assets/images/world_10.jpg",
    "audioSrc": "assets/audio/track_10.mp3",
    "audioMatch": "Arz Kiya Hai",
    "quote": "Arz kiya hai, tere husn ke qaseede...",
    "translation": "I offer these humble verses, devoted entirely to your gentle grace...",
    "lore": "A warm rustic wood cabin filled with fairy lights, vintage guitars, and amber candlelight.",
    "theme": {
      "primary": "#f59e0b",
      "accent": "#e11d48",
      "bgGradient": "linear-gradient(135deg, #24170d 0%, #3d2414 50%, #260a12 100%)",
      "glowColor": "rgba(245, 158, 11, 0.45)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Warm Acoustic Picking ✦",
      "Arz kiya hai tere naam se shuru",
      "Quiet rain tapping on the windowpane",
      "Washing away all the sorrow and pain",
      "✦ Cozy Studio Harmonies ✦"
    ]
  },
  {
    "id": 11,
    "title": "Bulleya",
    "artist": "Papon",
    "album": "Sultan",
    "worldName": "Sufi Starlit Desert Shrine",
    "mood": "Mystic & Yearning",
    "badge": "Mystic Saffron",
    "tagPhrase": "seeking truth",
    "note": "The soul-stirring depth of Sufi poetry. May you always find peace and clarity on your journey ♡",
    "image": "assets/images/world_11.jpg",
    "audioSrc": "assets/audio/track_11.mp3",
    "audioMatch": "Bulleya",
    "quote": "Kuch rishton ka namak hi doori hota hai...",
    "translation": "Some sacred bonds find their true reverence in silence and distance...",
    "lore": "An ancient desert shrine glowing under an infinite starry sky with swirling mystical sand trails.",
    "theme": {
      "primary": "#ea580c",
      "accent": "#facc15",
      "bgGradient": "linear-gradient(135deg, #261108 0%, #421e0a 50%, #211910 100%)",
      "glowColor": "rgba(234, 88, 12, 0.45)"
    },
    "audio": {
      "ambientType": "night"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Mystic Sufi Strings ✦",
      "Kuch rishton ka namak hi doori hota hai",
      "Na milna bhi bohat zaroori hota hai",
      "Bulleya... bulleya... tu hi mera yaar...",
      "✦ Starlit Desert Echoes ✦"
    ]
  },
  {
    "id": 12,
    "title": "Tose Naina",
    "artist": "Arijit Singh",
    "album": "Mickey Virus",
    "worldName": "Monsoon Waters & Twilight Mist",
    "mood": "Dreamy & Intimate",
    "badge": "Emerald Dew",
    "tagPhrase": "rain & longing",
    "note": "Gentle raindrops falling on still waters. One of the most peaceful and intimate melodies ever created ♡",
    "image": "assets/images/world_12.jpg",
    "audioSrc": "assets/audio/track_12.mp3",
    "audioMatch": "Tose Naina",
    "quote": "Tose naina jab se mile, ban gaye silsile...",
    "translation": "Ever since our eyes met, endless stories of love were born...",
    "lore": "A serene lake enveloped in cool evening monsoon mist with gentle lotus petals floating across the ripples.",
    "theme": {
      "primary": "#10b981",
      "accent": "#38bdf8",
      "bgGradient": "linear-gradient(135deg, #092119 0%, #0e382b 50%, #0d2130 100%)",
      "glowColor": "rgba(16, 185, 129, 0.45)"
    },
    "audio": {
      "ambientType": "rain"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Monsoon Rain & Acoustic Chords ✦",
      "Tose naina jab se mile, ban gaye silsile",
      "Raindrops rippling on the quiet lake",
      "A tender promise love will never break",
      "Tose naina jab se mile...",
      "✦ Emerald Twilight Rain Fade ✦"
    ]
  },
  {
    "id": 13,
    "title": "O Rangrez",
    "artist": "Javed Bashir & Shreya Ghoshal",
    "album": "Bhaag Milkha Bhaag",
    "worldName": "Courtyard of Silks & Dyes",
    "mood": "Vibrant & Spiritual",
    "badge": "Crimson Velvet",
    "tagPhrase": "color my soul",
    "note": "Rich fabrics drying in the evening breeze. A song about being colored in love and devotion ♡",
    "image": "assets/images/world_13.jpg",
    "audioSrc": "assets/audio/track_13.mp3",
    "audioMatch": "O Rangrez",
    "quote": "O rangrez, tere rang rang ke...",
    "translation": "O master dyer of souls, immerse me completely in your divine shade...",
    "lore": "A historic palace courtyard draped in flowing silks of saffron, crimson, indigo and emerald.",
    "theme": {
      "primary": "#f43f5e",
      "accent": "#facc15",
      "bgGradient": "linear-gradient(135deg, #240a12 0%, #3e1220 50%, #2b1f0d 100%)",
      "glowColor": "rgba(244, 63, 94, 0.45)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Sitar & Classical Vocal Intro ✦",
      "O rangrez mere, tere rang rang ke",
      "Draped in silk and golden sunset light",
      "Coloring my spirit through the night",
      "O rangrez... o rangrez...",
      "✦ Flowing Silk Echoes ✦"
    ]
  },
  {
    "id": 14,
    "title": "Darkhaast",
    "artist": "Arijit Singh & Sunidhi Chauhan",
    "album": "Shivaay",
    "worldName": "Nordic Aurora Glacier Ridge",
    "mood": "Epic & Romantic",
    "badge": "Glacial Aurora",
    "tagPhrase": "aurora lights",
    "note": "Snow-capped peaks and vibrant green-violet northern lights dancing across the sky. Pure grandeur ♡",
    "image": "assets/images/world_14.jpg",
    "audioSrc": "assets/audio/track_14.mp3",
    "audioMatch": "DARKHAAST",
    "quote": "Iss qadar tu mujhe pyaar kar, chhad na javein...",
    "translation": "Hold me so tenderly beneath the dancing sky, let not a whisper of doubt remain...",
    "lore": "A crystal glacier peak where radiant green and violet auroras sweep across the starry night.",
    "theme": {
      "primary": "#22c55e",
      "accent": "#a855f7",
      "bgGradient": "linear-gradient(135deg, #092114 0%, #0e3822 50%, #201133 100%)",
      "glowColor": "rgba(34, 197, 94, 0.45)"
    },
    "audio": {
      "ambientType": "cosmic"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Glacial Strings & Electric Guitar ✦",
      "Iss qadar tu mujhe pyaar kar",
      "Aurora dancing in shades of green and violet",
      "Beneath the cosmic mountain silhouette",
      "Darkhaast hai yeh meri...",
      "✦ Nordic Starlight Outro ✦"
    ]
  },
  {
    "id": 15,
    "title": "Tere Bina Na Guzara E",
    "artist": "Josh Brar ft. Kinza Hashmi",
    "album": "Single",
    "worldName": "Enchanted Firefly Sanctuary",
    "mood": "Tender & Loving",
    "badge": "Emerald Firefly",
    "tagPhrase": "glowing in the dark",
    "note": "Thousands of tiny fireflies lighting up an enchanted forest path. Even the smallest light can guide the way ♡",
    "image": "assets/images/world_15.jpg",
    "audioSrc": "assets/audio/track_15.mp3",
    "audioMatch": "Tere Bina Na Guzara",
    "quote": "Tere bina na guzara ae, tu hi mera sahara ae...",
    "translation": "Life has no melody without you; you are my anchor and my guiding star...",
    "lore": "A deep lush forest where ancient moss-covered trees glow with thousands of floating fireflies.",
    "theme": {
      "primary": "#4ade80",
      "accent": "#facc15",
      "bgGradient": "linear-gradient(135deg, #092112 0%, #0e361d 50%, #24200d 100%)",
      "glowColor": "rgba(74, 222, 128, 0.45)"
    },
    "audio": {
      "ambientType": "nature"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Acoustic Guitar & Firefly Glow ✦",
      "Tere bina na guzara ae, tu hi mera sahara ae",
      "Fireflies dancing along the mossy stone path",
      "Lighting up our world in the aftermath",
      "Tere bina na guzara ae...",
      "✦ Soft Forest Twilight Outro ✦"
    ]
  },
  {
    "id": 16,
    "title": "Udaarian",
    "artist": "Satinder Sartaaj",
    "album": "Seasons of Sartaaj",
    "worldName": "Golden Harvest Hot Air Balloon",
    "mood": "Joyful & Poetic",
    "badge": "Golden Flight",
    "tagPhrase": "soar high",
    "note": "Soaring peacefully above golden fields in a hot air balloon. Let your dreams fly without fear ♡",
    "image": "assets/images/world_16.jpg",
    "audioSrc": "assets/audio/track_16.mp3",
    "audioMatch": "Udaarian",
    "quote": "Laye ne udaarian, chhad de khumaarian...",
    "translation": "We have taken flight towards the endless blue, leaving all worldly worries behind...",
    "lore": "A gentle hot air balloon floating above endless golden harvest fields at sunrise.",
    "theme": {
      "primary": "#facc15",
      "accent": "#38bdf8",
      "bgGradient": "linear-gradient(135deg, #241f0a 0%, #3d3511 50%, #0d2130 100%)",
      "glowColor": "rgba(250, 204, 21, 0.45)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "energetic",
    "lyrics": [
      "✦ Punjabi Folk Flute & Tumbi ✦",
      "Laye ne udaarian, chhad de khumaarian",
      "Floating high above the golden harvest plain",
      "Sunshine washing over joy and pain",
      "✦ Poetic Folk Outro ✦"
    ]
  },
  {
    "id": 17,
    "title": "Ranjheya Ve",
    "artist": "Zain Zohaib",
    "album": "Yratta Media",
    "worldName": "Mustard Fields of Punjab",
    "mood": "Devotional & Heartfelt",
    "badge": "Sarson Bloom",
    "tagPhrase": "warm & sweet",
    "note": "Pure devotional folk magic. May your days be as bright and golden as yellow mustard blossoms in winter ♡",
    "image": "assets/images/world_17.jpg",
    "audioSrc": "assets/audio/track_17.mp3",
    "audioMatch": "Ranjheya Ve",
    "quote": "Ranjheya ve, dil ditta tenu saunh...",
    "translation": "O my eternal beloved, I have surrendered my heart to you forever...",
    "lore": "Vibrant yellow mustard flower fields stretching to the horizon, glowing under the crimson-gold rays of sunset.",
    "theme": {
      "primary": "#facc15",
      "accent": "#f43f5e",
      "bgGradient": "linear-gradient(135deg, #261f08 0%, #42350f 50%, #290d16 100%)",
      "glowColor": "rgba(250, 204, 21, 0.45)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Sarson Bloom Harmonium Alaap ✦",
      "Ranjheya ve, dil ditta tenu saunh",
      "Mustard fields shining in crimson sunset glow",
      "Where sweet melodies of love endlessly flow",
      "Ranjheya ve... ranjheya ve...",
      "✦ Sunset Harmonium Echoes ✦"
    ]
  },
  {
    "id": 18,
    "title": "Bairan",
    "artist": "Banjaare / MC Square",
    "album": "Bairan (Animated Love Story)",
    "worldName": "Storm-Lashed Coastal Beacon",
    "mood": "Fierce & Passionate",
    "badge": "Tempest Beacon",
    "tagPhrase": "storm & light",
    "note": "A steady lighthouse in the middle of crashing stormy waves. No matter how stormy life gets, remember you have a light inside you ♡",
    "image": "assets/images/world_18.jpg",
    "audioSrc": "assets/audio/track_18.mp3",
    "audioMatch": "Bairan",
    "quote": "Bairan hawa kyun chali re, yaadan teri leke...",
    "translation": "Why did the tempest wind blow, bringing with it echoes of your memory...",
    "lore": "A towering historic stone lighthouse standing firm upon rugged sea cliffs as crashing stormy ocean waves send white mist into the dark sky.",
    "theme": {
      "primary": "#0ea5e9",
      "accent": "#f43f5e",
      "bgGradient": "linear-gradient(135deg, #091e2b 0%, #103348 50%, #20101b 100%)",
      "glowColor": "rgba(14, 165, 233, 0.45)"
    },
    "audio": {
      "ambientType": "rain"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Coastal Tempest & Guitar ✦",
      "Bairan hawa kyun chali re, yaadan teri leke",
      "Crashing ocean tempest against the rocky shore",
      "Lighthouse beacon calling you once more",
      "Bairan hawa kyun chali re...",
      "✦ Tempest Ocean Outro ✦"
    ]
  },
  {
    "id": 19,
    "title": "Wishes",
    "artist": "Hasan Raheem ft. Talwiinder & Umair",
    "album": "Wishes - Single",
    "worldName": "Galaxy Observatory Summit",
    "mood": "Contemplative & Infinite",
    "badge": "Cosmic Wishes",
    "tagPhrase": "make a wish",
    "note": "A mountain observatory looking out into a deep violet galaxy. Make a silent wish on the stars tonight — it might just come true ♡",
    "image": "assets/images/world_19.jpg",
    "audioSrc": "assets/audio/track_19.mp3",
    "audioMatch": "Wishes",
    "quote": "I make wishes on the stars tonight, hope you see the same light...",
    "translation": "Sending silent wishes across the celestial tapestry, trusting our paths intertwine...",
    "lore": "A high-altitude stargazing observatory atop a silent mountain, looking out into a deep violet galaxy with meteor trails.",
    "theme": {
      "primary": "#8b5cf6",
      "accent": "#38bdf8",
      "bgGradient": "linear-gradient(135deg, #18102b 0%, #261a45 50%, #0d1e38 100%)",
      "glowColor": "rgba(139, 92, 246, 0.45)"
    },
    "audio": {
      "ambientType": "cosmic"
    },
    "companionMood": "late_night",
    "lyrics": [
      "✦ Cosmic Observatory Synth ✦",
      "I make wishes on the stars tonight",
      "Hope you see the same starlight",
      "Kash tu vi taareyan nu vekhdi hovein",
      "Mere baare thoda sochni hovein...",
      "✦ Deep Galaxy Starlight Fade ✦"
    ]
  },
  {
    "id": 20,
    "title": "Kashish",
    "artist": "Ashish Bhatia & Omkar Singh ft. Kashish",
    "album": "Kashish - Official Video",
    "worldName": "Futuristic Sky Lounge",
    "mood": "Sophisticated & Velvet",
    "badge": "Obsidian Twilight",
    "tagPhrase": "for late night thoughts",
    "note": "High above the sparkling city lights with amber warmth. The final world in this universe, but our story is just getting started ♡",
    "image": "assets/images/world_20.jpg",
    "audioSrc": "assets/audio/track_20.mp3",
    "audioMatch": "KASHISH",
    "quote": "Yeh kashish dil ki jo hai, har lamha tera hi suroor hai...",
    "translation": "This irresistible magnetic pull of the heart turns every passing moment into ecstasy...",
    "lore": "An ultra-luxurious glass penthouse high above the glowing city lights at twilight.",
    "theme": {
      "primary": "#f59e0b",
      "accent": "#ec4899",
      "bgGradient": "linear-gradient(135deg, #1b131c 0%, #2c1a2e 50%, #12101b 100%)",
      "glowColor": "rgba(245, 158, 11, 0.45)"
    },
    "audio": {
      "ambientType": "night"
    },
    "companionMood": "late_night",
    "lyrics": [
      "✦ Velvet Penthouse Sky Lounge Keys ✦",
      "Yeh kashish dil ki jo hai, har lamha tera hi suroor hai",
      "City lights bokeh sparkling in the night",
      "Velvet sky lounge bathed in amber light",
      "Yeh kashish dil ki jo hai...",
      "✦ City Bokeh Twilight Fade ✦"
    ]
  },
  {
    "id": 21,
    "title": "Kajra Re",
    "artist": "Alisha Chinai, Shankar Mahadevan & Javed Ali",
    "album": "Bunty Aur Babli",
    "worldName": "Festive Royal Haveli Courtyard",
    "mood": "Celebratory & Bollywood",
    "badge": "Amber Diya Glow",
    "tagPhrase": "dance & celebration",
    "note": "Opulent royal arches, thousands of warm diya lamps, and sparkling chandeliers. Let your spirit dance in joyful celebration ♡",
    "image": "assets/images/world_21.jpg",
    "audioSrc": "assets/audio/track_21.mp3",
    "audioMatch": "Kajra Re",
    "quote": "Kajra re, kajra re, tere kaare kaare naina...",
    "translation": "O dark-eyed beauty, your eyes hold the spell of a thousand starry nights...",
    "lore": "A grand Rajasthani royal palace illuminated by thousands of golden oil lamps and marigold garlands.",
    "theme": {
      "primary": "#f59e0b",
      "accent": "#f43f5e",
      "bgGradient": "linear-gradient(135deg, #2a110a 0%, #4a1d0d 50%, #260914 100%)",
      "glowColor": "rgba(245, 158, 11, 0.55)"
    },
    "audio": {
      "ambientType": "night"
    },
    "companionMood": "energetic",
    "lyrics": [
      "✦ Royal Dholak & Shehnai Celebration ✦",
      "Aisi nazar se dekha usne zaalim ne chauk par",
      "Humne kaleja rakh diya chaaku ki taak par",
      "Kajra re, kajra re, tere kaare kaare naina",
      "Ho mere naina, mere naina, mere naina judwaa naina",
      "✦ Sitar & Festive Beats ✦",
      "Surmayi se jaise boondein, naina tere aise doondein",
      "Raat ke taaron jaise chamkein",
      "Kajra re, kajra re, tere kaare kaare naina...",
      "✦ Grand Haveli Palace Finale ✦"
    ]
  },
  {
    "id": 22,
    "title": "Tutor",
    "artist": "Cheema Y & Gur Sidhu",
    "album": "Tutor - Single",
    "worldName": "Bubblegum Synthwave Arcade",
    "mood": "Playful & Youthful",
    "badge": "Neon Arcade",
    "tagPhrase": "cheeky & fun",
    "note": "Retro arcade lights, neon bubblegum pinks, and cheeky beats. A world of pure nostalgic fun ♡",
    "image": "assets/images/world_22.jpg",
    "audioSrc": "assets/audio/track_22.mp3",
    "audioMatch": "TUTOR",
    "quote": "Tutor laade koi dil di padhai da...",
    "translation": "Find me a tutor to teach me the playful lessons of the heart...",
    "lore": "An 80s neon arcade bathed in glowing pastel cyan and magenta lights with vintage game cabinets.",
    "theme": {
      "primary": "#ec4899",
      "accent": "#06b6d4",
      "bgGradient": "linear-gradient(135deg, #240a1b 0%, #3b0e2c 50%, #09212b 100%)",
      "glowColor": "rgba(236, 72, 153, 0.55)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "energetic",
    "lyrics": [
      "✦ 8-Bit Synth & Heavy 808 Bass ✦",
      "Ni tu pardi college ch, main parda teriyan akhaan",
      "Neon arcade glowing bright through the night",
      "Tutor laade koi dil di padhai da",
      "✦ Playful Drop & Cheerful Groove ✦"
    ]
  },
  {
    "id": 23,
    "title": "Kithe Reh Gaya",
    "artist": "Neeti Mohan",
    "album": "Kithe Reh Gaya - Single",
    "worldName": "Fading Sunset Highway",
    "mood": "Nostalgic & Longing",
    "badge": "Amber Horizon",
    "tagPhrase": "waiting for you",
    "note": "Watching the sun dip below rolling hills while waiting for someone special. May distance only make the heart fonder ♡",
    "image": "assets/images/world_23.jpg",
    "audioSrc": "assets/audio/track_23.mp3",
    "audioMatch": "Kithe Reh Gaya",
    "quote": "Kithe reh gaya ve saanu nehar wale pul te bulake...",
    "translation": "Where have you lingered, my love, after promising to meet by the bridge...",
    "lore": "An open winding road through golden grassland hills at fading sunset under a dramatic violet-amber sky.",
    "theme": {
      "primary": "#f97316",
      "accent": "#c084fc",
      "bgGradient": "linear-gradient(135deg, #261208 0%, #441e0b 50%, #201130 100%)",
      "glowColor": "rgba(249, 115, 22, 0.5)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Sunset Acoustic Chords & Harmonium ✦",
      "Kithe reh gaya ve saanu nehar wale pul te bulake",
      "Roads stretching into the golden violet sky",
      "Waiting for the footsteps to draw nigh",
      "Kithe reh gaya... kithe reh gaya...",
      "✦ Twilight Amber Breeze Fade ✦"
    ]
  },
  {
    "id": 24,
    "title": "Kaise Hua",
    "artist": "Vishal Mishra",
    "album": "Kabir Singh",
    "worldName": "Golden Sunset Meadow of Wildflowers",
    "mood": "Romantic & Awe-Inspiring",
    "badge": "Golden Lily Bloom",
    "tagPhrase": "soft & gentle wonder",
    "note": "Soft sunbeams warming a hillside of blooming wild lilies. Love arriving so quietly you wonder when it all began ♡",
    "image": "assets/images/world_24.jpg",
    "audioSrc": "assets/audio/track_24.mp3",
    "audioMatch": "Kaise Hua",
    "quote": "Kaise hua, tu itna zaroori kaise hua...",
    "translation": "How did this happen, how did you become as essential as my very breath...",
    "lore": "A dreamy rolling meadow covered in blooming golden wild lilies and wildflowers at golden hour.",
    "theme": {
      "primary": "#fbbf24",
      "accent": "#f472b6",
      "bgGradient": "linear-gradient(135deg, #291c08 0%, #452e0c 50%, #290e1f 100%)",
      "glowColor": "rgba(251, 191, 36, 0.5)"
    },
    "audio": {
      "ambientType": "nature"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Gentle Acoustic Fingerpicking ✦",
      "Haste haste chehre pe kyun nami si chhayi hai",
      "Kaise hua, kaise hua, tu itna zaroori kaise hua",
      "Sunbeams dancing across wild golden lilies",
      "Soothing all the world's quiet miseries",
      "Kaise hua... tu itna zaroori kaise hua...",
      "✦ Soft Meadow Wind Outro ✦"
    ]
  },
  {
    "id": 25,
    "title": "Dilliwali Girlfriend",
    "artist": "Arijit Singh & Sunidhi Chauhan",
    "album": "Yeh Jawaani Hai Deewani",
    "worldName": "Vibrant Delhi Neon Nightlife",
    "mood": "Energetic & Electric",
    "badge": "Delhi Neon Pulse",
    "tagPhrase": "lively & electric",
    "note": "Bright city lights, historic colonnade arches glowing with fairy lights, and unstoppable energy! Dance your heart out ♡",
    "image": "assets/images/world_25.jpg",
    "audioSrc": "assets/audio/track_25.mp3",
    "audioMatch": "Dilliwali Girlfriend",
    "quote": "Tere liye hi toh signal tod taad ke...",
    "translation": "Rushing past every red light just to be where you are...",
    "lore": "The bustling historic white arches of Connaught Place lit by festive neon signs and lively city nightlife.",
    "theme": {
      "primary": "#f43f5e",
      "accent": "#38bdf8",
      "bgGradient": "linear-gradient(135deg, #240a12 0%, #3e1220 50%, #0d212b 100%)",
      "glowColor": "rgba(244, 63, 94, 0.55)"
    },
    "audio": {
      "ambientType": "night"
    },
    "companionMood": "energetic",
    "lyrics": [
      "✦ High-Energy Brass & Dhol Intro ✦",
      "Tere liye hi toh signal tod taad ke",
      "Aaya Dilliwali girlfriend chhod chhad ke",
      "Neon lights shining bright in CP town",
      "Never gonna let this party down",
      "✦ Electric Bollywood Dance Drop ✦"
    ]
  },
  {
    "id": 26,
    "title": "Sweetheart",
    "artist": "Dev Negi",
    "album": "Kedarnath",
    "worldName": "Sunny Himalayan Blossom Valley",
    "mood": "Cheerful & Flirtatious",
    "badge": "Alpine Blossom",
    "tagPhrase": "sweet & cute",
    "note": "Snowy peaks in the distance, sunshine in the valley, and bright pink blossoms everywhere. Pure happiness ♡",
    "image": "assets/images/world_26.jpg",
    "audioSrc": "assets/audio/track_26.mp3",
    "audioMatch": "Sweetheart",
    "quote": "Do naina tere meethe meethe, sweetheart...",
    "translation": "Those two sweet eyes of yours, enchanting my world...",
    "lore": "A bright spring valley in Kedarnath blooming with thousands of pink rhododendrons under clear blue alpine skies.",
    "theme": {
      "primary": "#f472b6",
      "accent": "#fde047",
      "bgGradient": "linear-gradient(135deg, #240d1c 0%, #3d142d 50%, #29240d 100%)",
      "glowColor": "rgba(244, 114, 182, 0.5)"
    },
    "audio": {
      "ambientType": "nature"
    },
    "companionMood": "energetic",
    "lyrics": [
      "✦ Festive Dholak & Clarinet ✦",
      "Do naina tere meethe meethe, sweetheart",
      "Himalayan peaks glistening with spring snow",
      "Dancing where the sweet alpine breezes blow",
      "Sweetheart... do naina tere meethe meethe...",
      "✦ Cheerful Mountain Folk Outro ✦"
    ]
  },
  {
    "id": 27,
    "title": "Meri Mummy Nu Pasand Nhi Hai Tu",
    "artist": "Sunanda Sharma & Sukh-E",
    "album": "Jai Mummy Di",
    "worldName": "Colourful Pind Courtyard",
    "mood": "Playful & Vibrant",
    "badge": "Pind Festive Glow",
    "tagPhrase": "naughty & lively",
    "note": "Hanging fairylights, colorful phulkari fabrics, and endless laughter. Don't take life too seriously, just smile ♡",
    "image": "assets/images/world_27.jpg",
    "audioSrc": "assets/audio/track_27.mp3",
    "audioMatch": "MUMMY NU PASAND",
    "quote": "Meri mummy nu pasand naiyo tu, ve tera gora rang naiyo...",
    "translation": "My mother says you're far too mischievous for me...",
    "lore": "A festive Punjabi village courtyard adorned with colorful lights, traditional fabrics, and warm tea stalls.",
    "theme": {
      "primary": "#f59e0b",
      "accent": "#ef4444",
      "bgGradient": "linear-gradient(135deg, #261408 0%, #44220b 50%, #260a0a 100%)",
      "glowColor": "rgba(245, 158, 11, 0.5)"
    },
    "audio": {
      "ambientType": "wind"
    },
    "companionMood": "energetic",
    "lyrics": [
      "✦ Sukh-E Beats & Punjabi Harmonium ✦",
      "Meri mummy nu pasand naiyo tu",
      "Tents of red and saffron in the village square",
      "Laughter and music floating in the air",
      "✦ Bouncy Punjabi Drop ✦"
    ]
  },
  {
    "id": 28,
    "title": "Ik Vaari",
    "artist": "Arijit Singh",
    "album": "Raabta",
    "worldName": "Twilight Rooftop Over City Lights",
    "mood": "Romantic & Longing",
    "badge": "Violet Twilight",
    "tagPhrase": "just once more",
    "note": "Looking out over the glowing city skyline at dusk. A tender plea for one more gentle embrace ♡",
    "image": "assets/images/world_28.jpg",
    "audioSrc": "assets/audio/track_28.mp3",
    "audioMatch": "Ik Vaari",
    "quote": "Ik vaari aa bhi jaa yaara, ik vaari aa...",
    "translation": "Come back to me just once more, my beloved, just once more...",
    "lore": "A quiet rooftop terrace looking out over thousands of sparkling city lights as twilight deepens into violet.",
    "theme": {
      "primary": "#8b5cf6",
      "accent": "#ec4899",
      "bgGradient": "linear-gradient(135deg, #160c29 0%, #251442 50%, #290d20 100%)",
      "glowColor": "rgba(139, 92, 246, 0.5)"
    },
    "audio": {
      "ambientType": "night"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Ambient Synth & Acoustic Chords ✦",
      "Ik vaari aa bhi jaa yaara, ik vaari aa",
      "City lights twinkling like fallen stars below",
      "Whispering in the quiet evening glow",
      "Ik vaari aa... ik vaari aa...",
      "✦ Violet Sky Skyline Outro ✦"
    ]
  },
  {
    "id": 29,
    "title": "Lag Ja Gale",
    "artist": "Lata Mangeshkar",
    "album": "Woh Kaun Thi",
    "worldName": "Vintage Colonial Archway & Rainy Streetlamps",
    "mood": "Timeless & Soulful",
    "badge": "Vintage Rain Mist",
    "tagPhrase": "timeless vintage grace",
    "note": "Timeless classic elegance. Vintage stone arches, soft rain, and glowing streetlamps in the quiet night ♡",
    "image": "assets/images/world_29.jpg",
    "audioSrc": "assets/audio/track_29.mp3",
    "audioMatch": "Lag Ja Gale",
    "quote": "Lag ja gale ki phir ye haseen raat ho na ho...",
    "translation": "Hold me close in this precious moment, for who knows if such a beautiful night will ever return...",
    "lore": "A vintage colonial stone street glistening in soft rainy mist with warm amber gas lamps glowing in the dark.",
    "theme": {
      "primary": "#eab308",
      "accent": "#94a3b8",
      "bgGradient": "linear-gradient(135deg, #1c1809 0%, #30280f 50%, #111827 100%)",
      "glowColor": "rgba(234, 179, 8, 0.5)"
    },
    "audio": {
      "ambientType": "rain"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Legendary Violins & Soft Rain Mist ✦",
      "Lag ja gale ki phir ye haseen raat ho na ho",
      "Shayad phir iss janam mein mulaqaat ho na ho",
      "Raindrops falling on vintage cobblestone",
      "Love that lives forever, never alone",
      "Lag ja gale... ki phir ye haseen raat ho na ho...",
      "✦ Timeless Violin Solo & Rain Echoes ✦"
    ]
  },
  {
    "id": 30,
    "title": "Mere Samne Wali Khidki",
    "artist": "Kishore Kumar",
    "album": "Padosan",
    "worldName": "Charming Pastel Balconies",
    "mood": "Cute & Playful",
    "badge": "Bougainvillea Balcony",
    "tagPhrase": "cute old-school romance",
    "note": "Bright bougainvillea flowers, cute retro balconies, and sweet old-school melodies. A little smile for your heart ♡",
    "image": "assets/images/world_30.jpg",
    "audioSrc": "assets/audio/track_30.mp3",
    "audioMatch": "Mere Samne Wali Khidki",
    "quote": "Mere samne wali khidki mein ek chaand ka tukda rehta hai...",
    "translation": "In the window right across from mine lives a gentle piece of the moon...",
    "lore": "A colorful pastel neighbourhood with flowering bougainvillea balconies under a warm evening sky.",
    "theme": {
      "primary": "#10b981",
      "accent": "#f472b6",
      "bgGradient": "linear-gradient(135deg, #092118 0%, #0e3b2b 50%, #290e20 100%)",
      "glowColor": "rgba(16, 185, 129, 0.5)"
    },
    "audio": {
      "ambientType": "nature"
    },
    "companionMood": "energetic",
    "lyrics": [
      "✦ Bouncy Bongo & Whistle Intro ✦",
      "Mere samne wali khidki mein ek chaand ka tukda rehta hai",
      "Afsos yeh hai ke woh humse kuch ukhda ukhda rehta hai",
      "Pink bougainvillea swaying in the breeze",
      "Sweet melodies drifting through the trees",
      "Mere samne wali khidki mein...",
      "✦ Kishore Kumar Yodel Outro ✦"
    ]
  },
  {
    "id": 31,
    "title": "No Love",
    "artist": "Shubh",
    "album": "No Love - Single",
    "worldName": "Midnight Rain & Cyber Noir Boulevard",
    "mood": "Confident & Gritty",
    "badge": "Cyber Rain",
    "tagPhrase": "rain & neon glow",
    "note": "Dark wet asphalt, neon lights reflecting in puddles, and deep confident beats. Walk with pride ♡",
    "image": "assets/images/world_31.jpg",
    "audioSrc": "assets/audio/track_31.mp3",
    "audioMatch": "No Love",
    "quote": "Karan na care meri jaan, dil ch na rakhi koi bair...",
    "translation": "Walking through the stormy dark with pride, holding no bitterness in my soul...",
    "lore": "A modern cyberpunk metropolis boulevard where neon cyan and magenta reflect on rain-slicked black asphalt.",
    "theme": {
      "primary": "#38bdf8",
      "accent": "#ec4899",
      "bgGradient": "linear-gradient(135deg, #07131f 0%, #0b2238 50%, #24081c 100%)",
      "glowColor": "rgba(56, 189, 248, 0.5)"
    },
    "audio": {
      "ambientType": "rain"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Heavy Trap Sub-Bass & Raindrops ✦",
      "Karan na care meri jaan",
      "Neon cyan reflecting in the dark rainy street",
      "Walking to the heavy pulse of the beat",
      "No love, no love...",
      "✦ Cyber Noir Rain Outro ✦"
    ]
  },
  {
    "id": 32,
    "title": "Lahore",
    "artist": "Guru Randhawa",
    "album": "Lahore - Single",
    "worldName": "Sparkling Lahore Midnight Bazaar",
    "mood": "Festive & Vibrant",
    "badge": "Midnight Bazaar",
    "tagPhrase": "sparkling nights",
    "note": "Golden lanterns, bustling old city streets, and energetic rhythms. Celebrating the beauty of life ♡",
    "image": "assets/images/world_32.jpg",
    "audioSrc": "assets/audio/track_32.mp3",
    "audioMatch": "Lahore",
    "quote": "Lagdi Lahore di aa, jis hisaab na hasdi aa...",
    "translation": "Her radiant laughter carries the timeless charm of Lahore's glowing nights...",
    "lore": "A vibrant historic night market illuminated by thousands of colorful lanterns and festive city lights.",
    "theme": {
      "primary": "#f43f5e",
      "accent": "#f59e0b",
      "bgGradient": "linear-gradient(135deg, #240a12 0%, #3e1220 50%, #261608 100%)",
      "glowColor": "rgba(244, 63, 94, 0.55)"
    },
    "audio": {
      "ambientType": "night"
    },
    "companionMood": "energetic",
    "lyrics": [
      "✦ Catchy Synth Melody & Urban Dhol ✦",
      "Lagdi Lahore di aa, jis hisaab na hasdi aa",
      "Lanterns glowing under the midnight dome",
      "Feeling right at home in the bustling bazaar",
      "Lagdi Lahore di aa...",
      "✦ High-Energy Finale ✦"
    ]
  },
  {
    "id": 33,
    "title": "With You",
    "artist": "AP Dhillon",
    "album": "With You - Single",
    "worldName": "Golden Hour Coastline & Cliffside Serenade",
    "mood": "Warm & Romantic",
    "badge": "Golden Shore",
    "tagPhrase": "forever with you",
    "note": "Gentle ocean waves under golden evening sunlight. Pure peace and warm companionship ♡",
    "image": "assets/images/world_33.jpg",
    "audioSrc": "assets/audio/track_33.mp3",
    "audioMatch": "With You",
    "quote": "Tere naal rehna har pal, teri hansi meri zindagi...",
    "translation": "Every second beside you is where peace resides; your smile is my home...",
    "lore": "A serene coastal cliff overlooking calm ocean waves glowing in rich amber and gold sunset light.",
    "theme": {
      "primary": "#f97316",
      "accent": "#fed7aa",
      "bgGradient": "linear-gradient(135deg, #261208 0%, #441e0b 50%, #1f1a14 100%)",
      "glowColor": "rgba(249, 115, 22, 0.5)"
    },
    "audio": {
      "ambientType": "ocean"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Warm Acoustic Strum & Smooth 808 ✦",
      "Tere naal rehna har pal, teri hansi meri zindagi",
      "Waves gently kissing the golden sandy shore",
      "Loving you more and more",
      "With you... forever with you...",
      "✦ Golden Coastal Sunset Outro ✦"
    ]
  },
  {
    "id": 34,
    "title": "Ve Haaniyaan",
    "artist": "Danny & Avvy Sra",
    "album": "Ve Haaniyaan - Single",
    "worldName": "Serene Punjab Countryside & Mustard Sunset",
    "mood": "Sweet & Endearing",
    "badge": "Golden Sarson",
    "tagPhrase": "sweet companion",
    "note": "Endless yellow mustard fields swaying under a warm golden sun. A tender melody for someone special ♡",
    "image": "assets/images/world_34.jpg",
    "audioSrc": "assets/audio/track_34.mp3",
    "audioMatch": "Ve Haaniyaan",
    "quote": "Ve haaniyaan, ve dil jaaniyaan...",
    "translation": "O my soulmate, my companion through every season of life...",
    "lore": "Vast mustard fields glowing bright yellow under a warm golden sunset with gentle village breezes.",
    "theme": {
      "primary": "#fbbf24",
      "accent": "#6ee7b7",
      "bgGradient": "linear-gradient(135deg, #261d08 0%, #42320d 50%, #0d261e 100%)",
      "glowColor": "rgba(251, 191, 36, 0.5)"
    },
    "audio": {
      "ambientType": "nature"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Sweet Mandolin & Countryside Acoustic ✦",
      "Ve haaniyaan, ve dil jaaniyaan",
      "Mustard blossoms swaying in the warm golden light",
      "Everything feeling so pure and right",
      "Ve haaniyaan... ve dil jaaniyaan...",
      "✦ Countryside Sunset Fade ✦"
    ]
  },
  {
    "id": 35,
    "title": "One Love",
    "artist": "Shubh",
    "album": "One Love - Single",
    "worldName": "Sleek Midnight Penthouse & Neon Skyline",
    "mood": "Modern & Stylish",
    "badge": "Penthouse Neon",
    "tagPhrase": "one true love",
    "note": "Modern luxury sky lounge overlooking glowing midnight city lights. Unshakable love in a fast-moving world ♡",
    "image": "assets/images/world_35.jpg",
    "audioSrc": "assets/audio/track_35.mp3",
    "audioMatch": "One Love",
    "quote": "One love, bas tu hi hai mere dil ch...",
    "translation": "One true love, holding the only key to my heart...",
    "lore": "A sleek modern penthouse with glass walls overlooking an infinite glowing neon skyline under the night stars.",
    "theme": {
      "primary": "#c084fc",
      "accent": "#38bdf8",
      "bgGradient": "linear-gradient(135deg, #170d29 0%, #261445 50%, #0a1f2e 100%)",
      "glowColor": "rgba(192, 132, 252, 0.5)"
    },
    "audio": {
      "ambientType": "night"
    },
    "companionMood": "calm",
    "lyrics": [
      "✦ Smooth R&B Synth & Crisp Trap Beat ✦",
      "One love, bas tu hi hai mere dil ch",
      "High above the neon skyline glowing in the dark",
      "You are the only spark",
      "One love... one love...",
      "✦ Midnight Skyline Echoes ✦"
    ]
  },
  {
    "id": 36,
    "title": "Raabta (Kehte Hain Khuda)",
    "artist": "Arijit Singh & Shreya Ghoshal",
    "album": "Agent Vinod",
    "worldName": "Starlight Constellation Sanctuary",
    "mood": "Destined & Cosmic",
    "badge": "Celestial Raabta",
    "tagPhrase": "written in the stars",
    "note": "A grand cosmic sanctuary where every star in the universe connects. Our story was always written in the stars ♡",
    "image": "assets/images/world_36.jpg",
    "audioSrc": "assets/audio/track_36.mp3",
    "audioMatch": "Kehte Hain Khuda",
    "quote": "Kehte hain khuda ne iss jahan mein sabhi ke liye kisi na kisi ko hai banaya...",
    "translation": "They say God has fashioned a kindred soul for every heart wandering this universe...",
    "lore": "The ultimate celestial observatory in the center of the cosmos, where all 36 worlds unite in starlight.",
    "theme": {
      "primary": "#f472b6",
      "accent": "#38bdf8",
      "bgGradient": "linear-gradient(135deg, #240a1b 0%, #3d1130 50%, #0c2033 100%)",
      "glowColor": "rgba(244, 114, 182, 0.6)"
    },
    "audio": {
      "ambientType": "cosmic"
    },
    "companionMood": "romantic",
    "lyrics": [
      "✦ Heavenly Cosmic Harp & Piano Intro ✦",
      "Kehte hain khuda ne iss jahan mein sabhi ke liye",
      "Kisi na kisi ko hai banaya har kisi ke liye",
      "Tera milna hai uss rab ka ishaara maano",
      "Mujhko banaya tere jaise hi kisi ke liye",
      "✦ Celestial Starlight Strings Swell ✦",
      "Kuch toh hai tujhse raabta",
      "Kuch toh hai tujhse raabta",
      "Kaise hum jaane hume kya pata",
      "Kuch toh hai tujhse raabta...",
      "✦ Cosmic Sanctuary Symphony Outro ✦"
    ]
  }
];

const FINAL_MESSAGE = {
  title: "you found them all ♡",
  subtitle: "36 worlds · countless memories",
  letter: "Dear you,\n\nIf you're reading this, you've wandered through all 36 little worlds in this universe. From quiet Himalayan twilights and vintage rainy streets, to golden mustard fields, neon arcades, and cosmic starlight sanctuaries.\n\nEvery single world, melody, and little thought here was made to bring a smile to your face and peace to your mind whenever the world feels loud.\n\nI hope you felt loved, understood, and at peace. No matter where you wander, this little sanctuary will always be here for you.\n\nForever and always ♡"
};

const SECRET_UNLOCKS = {
  10: { name: "Starlight Sanctuary", icon: "✨" },
  20: { name: "Midnight Velvet Mode", icon: "☾" },
  36: { name: "Cosmic Wanderer Crown", icon: "👑" }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SONGS_DATA, FINAL_MESSAGE, SECRET_UNLOCKS };
}
