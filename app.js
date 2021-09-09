
const searchSong = async () => {
  try{
    const searchText = document.getElementById("searchText").value;
    const res = await fetch(`https://api.lyrics.ovh/suggest/${searchText}`);
    const data = await res.json();
    displaySongs(data.data);
  }
  catch(error){
    displayError('Sorry something went wrong!! please try again late')
  }
};

// display songs
const displaySongs = (songs) => {
  const songsContainer = document.getElementById("songsContainer");
  songsContainer.innerText = "";
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.title}','${song.artist.name}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
    songsContainer.appendChild(songDiv);
  });
};

// get lyric

const getLyric = async (title, artist) => {
  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await res.json();
    displayLyrics(data.lyrics);
  } catch (error) {
    displayError('Sorry something went wrong!! please try again late')
  }
};
// or
// const getLyric = async (title, artist) => {
//    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
//     .then((response) => response.json())
//     .then((data) => {
//       displayLyrics(data);
//     });
// };

// display lyrics
const displayLyrics = (lyrics) => {
  const lyricsContainer = document.getElementById("lyricsContainer");
  lyricsContainer.innerText = lyrics;
};

// display error function

const displayError = error => {
  const errorMessage = document.getElementById('errorMessage')
  errorMessage.innerText = error

}
