// TZ MUSIC - ADMIN PANEL

document.addEventListener("DOMContentLoaded", () => {

  console.log("TZ Music Admin Panel loaded 🎵");

  const songForm = document.getElementById("songForm");
  const songsList = document.getElementById("songsList");
  const totalSongs = document.getElementById("totalSongs");
  const logoutBtn = document.getElementById("logoutBtn");
  const refreshSongs = document.getElementById("refreshSongs");

  // Temporary song storage
  // Later we will replace this with Supabase Database
  let songs = JSON.parse(
    localStorage.getItem("tzMusicSongs") || "[]"
  );


  // DISPLAY SONGS

  function displaySongs() {

    if (songs.length === 0) {

      songsList.innerHTML = `
        <div class="empty-state">
          🎵 No songs added yet.
        </div>
      `;

      totalSongs.textContent = "0";
      return;
    }


    songsList.innerHTML = "";

    songs.forEach((song, index) => {

      const item = document.createElement("div");

      item.className = "song-admin-item";

      item.innerHTML = `

        <div class="song-admin-cover">
          🎵
        </div>

        <div class="song-admin-info">

          <h3>${escapeHTML(song.title)}</h3>

          <p>
            ${escapeHTML(song.artist)}
            •
            ${escapeHTML(song.category)}
          </p>

        </div>

        <button
          class="delete-btn"
          data-index="${index}"
        >
          🗑 Delete
        </button>

      `;

      songsList.appendChild(item);

    });


    totalSongs.textContent = songs.length;
  }


  // ADD SONG

  if (songForm) {

    songForm.addEventListener("submit", (event) => {

      event.preventDefault();


      const title =
        document.getElementById("songTitle").value.trim();

      const artist =
        document.getElementById("songArtist").value;

      const category =
        document.getElementById("songCategory").value;

      const album =
        document.getElementById("songAlbum").value.trim();

      const cover =
        document.getElementById("coverFile").files[0];

      const audio =
        document.getElementById("audioFile").files[0];


      if (!title || !artist || !audio) {

        alert("Tafadhali jaza taarifa muhimu za wimbo.");

        return;
      }


      const newSong = {

        id: Date.now(),

        title: title,

        artist: artist,

        category: category,

        album: album || "Single",

        coverName: cover ? cover.name : "",

        audioName: audio.name,

        createdAt: new Date().toISOString()

      };


      songs.unshift(newSong);


      localStorage.setItem(
        "tzMusicSongs",
        JSON.stringify(songs)
      );


      displaySongs();

      songForm.reset();


      alert(
        "✅ Wimbo umeongezwa kwenye Admin Panel."
      );

    });

  }


  // DELETE SONG

  songsList.addEventListener("click", (event) => {

    const button =
      event.target.closest(".delete-btn");

    if (!button) return;


    const index =
      Number(button.dataset.index);


    if (
      confirm(
        "Una uhakika unataka kufuta wimbo huu?"
      )
    ) {

      songs.splice(index, 1);


      localStorage.setItem(
        "tzMusicSongs",
        JSON.stringify(songs)
      );


      displaySongs();

    }

  });


  // REFRESH

  if (refreshSongs) {

    refreshSongs.addEventListener("click", () => {

      songs =
        JSON.parse(
          localStorage.getItem("tzMusicSongs") || "[]"
        );

      displaySongs();

    });

  }


  // LOGOUT BUTTON

  if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

      const confirmLogout =
        confirm("Unataka kutoka Admin Panel?");

      if (confirmLogout) {

        window.location.href = "index.html";

      }

    });

  }


  // SETTINGS

  const saveSettings =
    document.getElementById("saveSettings");


  if (saveSettings) {

    saveSettings.addEventListener("click", () => {

      const siteName =
        document.getElementById("siteName").value;

      const siteDescription =
        document.getElementById("siteDescription").value;


      localStorage.setItem(
        "tzMusicSiteName",
        siteName
      );

      localStorage.setItem(
        "tzMusicDescription",
        siteDescription
      );


      alert("✅ Settings zimehifadhiwa.");

    });

  }


  // SECURITY HELPER

  function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

  }


  // START

  displaySongs();

});