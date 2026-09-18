// Tz Music - Main JavaScript

document.addEventListener("DOMContentLoaded", () => {
  console.log("Tz Music website loaded successfully 🎵");

  // Play buttons
  const playButtons = document.querySelectorAll(".play-btn");

  playButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const song = button.closest(".song-card");

      if (song) {
        const title = song.querySelector("h3")?.textContent || "Song";
        alert("▶️ Playing: " + title);
      }
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });
});