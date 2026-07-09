const STREAK_KEY = "aiStudyBuddyStreak";

function updateStreak() {
  const today = new Date().toDateString();
  const saved = JSON.parse(localStorage.getItem(STREAK_KEY)) || { lastVisit: null, streak: 0 };

  if (saved.lastVisit === today) {
    // Already counted today, just display
    displayStreak(saved.streak);
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let newStreak;
  if (saved.lastVisit === yesterday.toDateString()) {
    newStreak = saved.streak + 1; // continued streak
  } else {
    newStreak = 1; // streak broken or first visit
  }

  const updated = { lastVisit: today, streak: newStreak };
  localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  displayStreak(newStreak);
}

function displayStreak(streak) {
  const badge = document.getElementById("streakBadge");
  if (!badge) return;
  badge.textContent = `🔥 ${streak} day${streak === 1 ? "" : "s"} streak`;
}

updateStreak();