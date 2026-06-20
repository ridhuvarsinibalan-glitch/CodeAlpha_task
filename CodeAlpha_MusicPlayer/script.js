// script.js

let songs = []

let songIndex = 0

/* ELEMENTS */

const audio =
  document.getElementById('audio')

const title =
  document.getElementById('title')

const artist =
  document.getElementById('artist')

const cover =
  document.getElementById('cover')

const playBtn =
  document.getElementById('play')

const playIcon =
  document.getElementById('playIcon')

const nextBtn =
  document.getElementById('next')

const prevBtn =
  document.getElementById('prev')

const progress =
  document.getElementById('progress')

const progressContainer =
  document.getElementById(
    'progressContainer'
  )

const currentTimeEl =
  document.getElementById(
    'currentTime'
  )

const durationEl =
  document.getElementById(
    'duration'
  )

const volumeValue =
  document.getElementById(
    'volumeValue'
  )

const playlist =
  document.getElementById(
    'playlist'
  )

/* VOLUME BUTTONS */

const volumeUp =
  document.querySelector('.volume-up')

const volumeDown =
  document.querySelector('.volume-down')

/* FETCH SONGS */

async function fetchSongs(){

  try{

    const response =
      await fetch(
      'https://deezerdevs-deezer.p.rapidapi.com/search?q=synthwave',
      {
        method:'GET',

        headers:{

          'X-RapidAPI-Key':
          'c615cb9818mshee1d6896d86a272p170b40jsn7af95b017a7d',

          'X-RapidAPI-Host':
          'deezerdevs-deezer.p.rapidapi.com'
        }
      })

    const data =
      await response.json()

    songs = data.data.map(song => ({

      title: song.title,

      artist: song.artist.name,

      src: song.preview,

      cover: song.album.cover_big,

      theme: randomTheme()
    }))

    loadSong(songs[songIndex])

  }catch(error){

    console.log(error)
  }
}

fetchSongs()

/* RANDOM COLORS */

function randomTheme(){

  const colors = [

    '#00e5ff',
    '#ff00ff',
    '#00ff99',
    '#ff8800',
    '#8a2eff'
  ]

  return colors[
    Math.floor(
      Math.random() * colors.length
    )
  ]
}

/* LOAD SONG */

function loadSong(song){

  title.innerText =
    song.title

  artist.innerText =
    song.artist

  audio.src =
    song.src

  cover.src =
    song.cover

  document.documentElement
  .style.setProperty(
    '--theme-color',
    song.theme
  )

  renderPlaylist()
}

/* PLAY */

function playSong(){

  audio.play()

  playIcon.classList
  .remove('fa-play')

  playIcon.classList
  .add('fa-pause')

  cover.classList
  .add('playing')
}

/* PAUSE */

function pauseSong(){

  audio.pause()

  playIcon.classList
  .remove('fa-pause')

  playIcon.classList
  .add('fa-play')

  cover.classList
  .remove('playing')
}

/* TOGGLE */

playBtn.addEventListener(
  'click',
  ()=>{

  const isPlaying =
    playIcon.classList
    .contains('fa-pause')

  if(isPlaying){

    pauseSong()

  }else{

    playSong()
  }
})

/* NEXT */

function nextSong(){

  songIndex++

  if(songIndex >
    songs.length - 1){

    songIndex = 0
  }

  loadSong(
    songs[songIndex]
  )

  playSong()
}

/* PREVIOUS */

function prevSong(){

  songIndex--

  if(songIndex < 0){

    songIndex =
      songs.length - 1
  }

  loadSong(
    songs[songIndex]
  )

  playSong()
}

nextBtn.addEventListener(
  'click',
  nextSong
)

prevBtn.addEventListener(
  'click',
  prevSong
)

/* PROGRESS */

audio.addEventListener(
  'timeupdate',
  ()=>{

  if(!audio.duration) return

  const progressPercent =

    (audio.currentTime /
    audio.duration) * 100

  progress.style.width =
    `${progressPercent}%`

  let currentMinutes =
    Math.floor(
      audio.currentTime / 60
    )

  let currentSeconds =
    Math.floor(
      audio.currentTime % 60
    )

  if(currentSeconds < 10){

    currentSeconds =
      `0${currentSeconds}`
  }

  currentTimeEl.innerText =
    `${currentMinutes}:${currentSeconds}`
})

/* DURATION */

audio.addEventListener(
  'loadedmetadata',
  ()=>{

  let durationMinutes =
    Math.floor(
      audio.duration / 60
    )

  let durationSeconds =
    Math.floor(
      audio.duration % 60
    )

  if(durationSeconds < 10){

    durationSeconds =
      `0${durationSeconds}`
  }

  durationEl.innerText =
    `${durationMinutes}:${durationSeconds}`
})

/* SEEK */

progressContainer
.addEventListener(
  'click',
  (e)=>{

  const width =
    progressContainer.clientWidth

  const clickX =
    e.offsetX

  const duration =
    audio.duration

  audio.currentTime =
    (clickX / width) * duration
})

/* AUTO NEXT */

audio.addEventListener(
  'ended',
  nextSong
)

/* PLAYLIST */

function renderPlaylist(){

  playlist.innerHTML = ''

  songs.forEach(
    (song,index)=>{

    const item =
      document.createElement(
        'div'
      )

    item.classList.add(
      'playlist-item'
    )

    if(index === songIndex){

      item.classList.add(
        'active'
      )
    }

    item.innerHTML = `
      <strong>
        ${song.title}
      </strong><br>

      <small>
        ${song.artist}
      </small>
    `

    item.addEventListener(
      'click',
      ()=>{

      songIndex = index

      loadSong(
        songs[songIndex]
      )

      playSong()
    })

    playlist.appendChild(item)
  })
}

/* VOLUME */

audio.volume = 0.5

volumeValue.innerText = 50

volumeUp.addEventListener(
  'click',
  ()=>{

  audio.volume += 0.1

  if(audio.volume > 1){

    audio.volume = 1
  }

  volumeValue.innerText =
    Math.floor(
      audio.volume * 100
    )
})

volumeDown.addEventListener(
  'click',
  ()=>{

  audio.volume -= 0.1

  if(audio.volume < 0){

    audio.volume = 0
  }

  volumeValue.innerText =
    Math.floor(
      audio.volume * 100
    )
})

