// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let previousBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");

let songs = [
  { songName: "On & On", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  {
    songName: "Invincible",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  { songName: "Mortals", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Shine", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  {
    songName: "Why We Lose",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  { songName: "Sky High", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Symbolism", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  {
    songName: "Heroes Tonight",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  { songName: "Feel Good", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  {
    songName: "My Heart",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// Function to play the next song
const playNextSong = () => {
  if (songIndex < songs.length - 1) {
    songIndex++;
  } else {
    songIndex = 0; // Loop back to the first song
  }
  playSong();
};

// Function to play the previous song
const playPreviousSong = () => {
  if (songIndex > 0) {
    songIndex--;
  } else {
    songIndex = songs.length - 1; // Go to last song
  }
  playSong();
};

// Function to play a specific song
const playSong = () => {
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;

  audioElement.play().catch((error) => {
    console.error("Playback failed:", error);
    // Handle error (show message to user, etc.)
  });

  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;

  // Update the active song in the list
  makeAllPlays();
  document.getElementById(songIndex).classList.remove("fa-play-circle");
  document.getElementById(songIndex).classList.add("fa-pause-circle");
};

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong();
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

// Seek song when progress bar is clicked
myProgressBar.addEventListener("change", () => {
  const seekTime = (myProgressBar.value / 100) * audioElement.duration;
  audioElement.currentTime = seekTime;
});

// Next and Previous buttons
nextBtn.addEventListener("click", playNextSong);
previousBtn.addEventListener("click", playPreviousSong);

// Listen to the 'ended' event for playing the next song
audioElement.addEventListener("ended", playNextSong);

// Function to initialize song items
const initializeSongItems = () => {
  songItems.forEach((element, i) => {
    const img = element.getElementsByTagName("img")[0];
    if (img) img.src = songs[i].coverPath;

    const songNameElement = element.getElementsByClassName("songName")[0];
    if (songNameElement) songNameElement.innerText = songs[i].songName;

    const playButton = element.getElementsByClassName("songItemPlay")[0];
    if (playButton) {
      playButton.id = i; // Add ID for easy access
      playButton.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        playSong();
      });
    }
  });
};

// Function to make all plays inactive
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// Initialize song items when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeSongItems();

  // Error handling for audio
  audioElement.addEventListener("error", (e) => {
    console.error("Audio error:", e);
    // You might want to show an error message to the user here
  });
});