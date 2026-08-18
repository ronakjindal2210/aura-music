const AURA_SUPABASE_URL = "https://kxwtyjbsfegngyjjfasn.supabase.co";

const AURA_SUPABASE_KEY =
  "sb_publishable_tTN20AeTCGOYSyWhdabqRQ_fY6MR2YQ";

// One anonymous session ID per browser tab/session
const AURA_SESSION_ID =
  sessionStorage.getItem("aura_session_id") ||
  crypto.randomUUID();

sessionStorage.setItem("aura_session_id", AURA_SESSION_ID);

function trackEvent(eventType, songName = null) {
  console.log("📡 Sending event:", eventType, songName);

  fetch(`${AURA_SUPABASE_URL}/rest/v1/aura_events`, {
    method: "POST",
    headers: {
      "apikey": AURA_SUPABASE_KEY,
      "Authorization": `Bearer ${AURA_SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({
      session_id: AURA_SESSION_ID,
      event_type: eventType,
      song_name: songName,
      page: window.location.pathname
    })
  })
  .then(response => {
    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      return response.text().then(text => {
        console.error("❌ Supabase error:", text);
      });
    }

    console.log("✅ Event saved:", eventType);
  })
  .catch(err => {
    console.error("❌ Tracking failed:", err);
  });
}

// Log website opening
trackEvent("site_opened");

// Log when the visitor leaves / hides the page
window.addEventListener("pagehide", () => {
  trackEvent("session_ended");
});