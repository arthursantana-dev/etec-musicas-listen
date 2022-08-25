
const player = document.createElement('audio');
const playPauseButton = document.querySelector('.play-pause-button')
const previousSongButton = document.querySelector('.previous-song-button')
const nextSongButton = document.querySelector('.next-song-button')

const imgTocarUrl = "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/tocar.png" 
const imgPausarUrl = "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/pausar.png"

const songCards = document.querySelectorAll('.song-card');

const playerSongName = document.querySelector('.player__song-name')
const playerSongAuthor = document.querySelector('.player__song-author')
const playerSongImage = document.querySelector('.player__song-img')
const playerSongYTButton = document.querySelector('.player__yt-button')
const playerSongDuration = document.getElementById('song__final-time-value')
const playerSongCurrentTime = document.querySelector('#song__current-time-value')
const playerSongRangeInput = document.querySelector('input[name="player__song-current-time-i"]')


previousSongButton.addEventListener('click', () => {
	playSong(currentSongId - 1)
})

nextSongButton.addEventListener('click', () => {
	playSong(currentSongId + 1)
})

songCards.forEach(card => {
	card.addEventListener('click', () => {
		playSong(card.dataset.songId)
	})
})

const songList = [
	{
		name: "Don't Throw Out My Legos",
		author: "AJR",
		source: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/AJR%20-%20Don't%20Throw%20Out%20My%20Legos.mp3",
		cover: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/img-musicas/ajr-dtoml.jpg",
		youTubeUrl: "https://www.youtube.com/watch?v=pdOIHNF2vJc",
		duration: '4:11'
	},
	{
		name: "World's Smallest Violin",
		author: "AJR",
		source: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/AJR%20-%20World's%20Smallest%20Violin%20(Lyrics)%20(128%20kbps).mp3",
		cover: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/img-musicas/ajr-wsv.jpg",
		youTubeUrl: "https://github.com/arthursantana-dev/musicas-etec-listen/blob/main/AJR%20-%20World's%20Smallest%20Violin%20(Lyrics)%20(128%20kbps).mp3",
		duration: '3:07'
	},
	{
		name: "Can You Feel My Heart",
		author: "Bring Me The Horizon",
		source: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/Bring%20Me%20The%20Horizon%20-%20Can%20You%20Feel%20My%20Heart%20(128%20kbps).mp3",
		cover: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/img-musicas/cyfmh.jpg",
		youTubeUrl: "https://www.youtube.com/watch?v=H8Wx8GV1Oiw",
		duration: '3:48'
	},
	{
		name: "Smells Like Teen Spirit",
		author: "Nirvana",
		source: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/Nirvana%20-%20Smells%20Like%20Teen%20Spirit%20(128%20kbps)%20(1).mp3",
		cover: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/img-musicas/slts.jpg",
		youTubeUrl: "https://www.youtube.com/watch?v=3u2YbzQHT14",
		duration: '5:01'
	},
	{
		name: "Another Love",
		author: "Tom Odell",
		source: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/Another%20Love%20(128%20kbps).mp3",
		cover: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/img-musicas/to-ao.jpg",
		youTubeUrl: "https://www.youtube.com/watch?v=MwpMEbgC7DA",
		duration: '4:07'
	},
	{
		name: "Dandelions",
		author: "Ruth B.",
		source: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/Ruth%20B.%20-%20Dandelions%20(Audio)%20(128%20kbps).mp3",
		cover: "https://github.com/arthursantana-dev/musicas-etec-listen/raw/main/img-musicas/d.png",
		youTubeUrl: "https://www.youtube.com/watch?v=W8a4sUabCUo",
		duration: '3:55'
	}
]

let isPlaying = false
let currentSongId = 0

// player.src = songList[currentSongId].source
// playerSongName.innerText = songList[currentSongId].name
// playerSongAuthor.innerText = songList[currentSongId].author
// playerSongImage.src = songList[currentSongId].cover
// playerSongYTButton.addEventListener('click', () => { window.open(songList[currentSongId].youTubeUrl) })
// playerSongDuration.textContent = songList[currentSongId].duration
// playerSongRangeInput.max = minsToSec(songList[currentSongId].duration)



function minsToSec(mins) {
	const [min, sec] = mins.split(':')
	return sec + min * 60
}

function updateSongRangeInput(newValue) {
	playerSongRangeInput.value = newValue
}

function secToMins(sec) {
	const min = Math.floor(sec / 60)
	const sec2 = parseInt(sec % 60)

	return sec2 > 9 ? `${min}:${sec2}` : `${min}:0${sec2}`
	
}

player.addEventListener('timeupdate', () => {
	playerSongCurrentTime.textContent = secToMins(player.currentTime)
	updateSongRangeInput(player.currentTime)
	console.log(`${playerSongRangeInput.value} / ${playerSongRangeInput.max}`, playerSongCurrentTime.textContent);
	// playerSongRangeInput.value = `${player.currentTime/player.duration * 100}` 
})


function playSong(songId) {

	currentSongId = songId
	isPlaying = true
	playPauseButton.src = imgPausarUrl

	if (songId < 0) {
		songId = songList.length - 1
		currentSongId = songId
	}

	if (songId > songList.length - 1) {
		songId = 1
		currentSongId = songId
	}

	player.src = songList[songId].source
	playerSongName.textContent = songList[songId].name
	playerSongAuthor.textContent = songList[songId].author
	playerSongImage.src = songList[songId].cover

	playerSongDuration.innerHTML = songList[songId].duration

	
	playerSongYTButton.removeEventListener('click', () => { window.open(songList[currentSongId].youTubeUrl) })
	playerSongYTButton.addEventListener('click', () => { window.open(songList[currentSongId].youTubeUrl) })

	console.log(currentSongId);

	player.play()

}

playPauseButton.addEventListener('click', () => {

	playPauseButton.src == imgTocarUrl? playPauseButton.src = imgPausarUrl : playPauseButton.src = imgTocarUrl

	if (isPlaying) {
		player.pause()
		isPlaying = false
		// playPauseButton.src = imgTocarUrl
	} else {
		player.play()
		isPlaying = true
		// playPauseButton.src = imgPausarUrl
	}
	
	console.log(isPlaying);
})

function inputSongTime(value){
	console.log('input-range: ', value);

	console.log(playerSongDuration.textContent)

	console.log(minsToSec(playerSongDuration.textContent) / 100 * value);
	
	player.currentTime = value 

}
