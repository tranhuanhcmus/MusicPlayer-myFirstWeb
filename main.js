const songs = [{
        "name": "So Far Away",
        "artist": "Martin Garrix & David Guetta ",
        "img": "SoFarAway.jpg",
        "audio": "SoFarAway.mp3"
    },
    {
        "name": "Nevada ",
        "artist": "Vicetone, Cozi Zuehlsdorff",
        "img": "Nevada.jpg",
        "audio": "Nevada.mp3"
    },
    {
        "name": "Faded",
        "artist": "Alan Walker",
        "img": "Faded.jpg",
        "audio": "Faded.mp3"
    },
    {
        "name": "The Spectre",
        "artist": " Alan Walker",
        "img": "Spectre.jpg",
        "audio": "Spectre.mp3"
    },
    {
        "name": "Blue Bird",
        "artist": "Ikimono Gakari",
        "img": "BlueBird.jpg",
        "audio": "Blue Bird.mp3"
    },
    {
        "name": "In The End",
        "artist": "Linkin Park",
        "img": "InTheEnd.jpg",
        "audio": "In The End.mp3"
    },
    {
        "name": "Numb",
        "artist": "Linkin Park",
        "img": "Numb.jpg",
        "audio": "Numb.mp3"
    },
    {
        "name": "Warriors",
        "artist": "Imagine Dragons",
        "img": "Warriors.jpg",
        "audio": "Warriors.mp3"
    },
    {
        "name": "Thunder",
        "artist": "Imagine Dragons",
        "img": "Thunder.jpg",
        "audio": "Thunder.mp3"
    },
    {
        "name": "Believer",
        "artist": "Imagine Dragons",
        "img": "Believer.jpg",
        "audio": "Believer.mp3"
    },
    {
        "name": "Bad Liar",
        "artist": "Imagine Dragons",
        "img": "BadLiar.jpg",
        "audio": "Bad Liar.mp3"
    }
]
var app = function() {
    isPlaying = false
    currentSong = 3
    audio = new Audio()

    disc = document.querySelector('.song-img')
    discRotate = disc.animate({
        transform: 'rotate(360deg)'
    }, {
        duration: 10000,
        iterations: Infinity,
    })


    btnPlay = document.querySelector(".btn_play-song");
    btnNext = document.querySelector(".btn-next-song")
    btnPrev = document.querySelector(".btn-prev-song")
    progressBar = document.querySelector(".progress-song")

    function updateSong() {
        var song = songs[currentSong]
        var urlSong = "src/audio/" + song.audio
        var title = song.artist + " - " + song.name
        var imgLink = "src/img/" + song.img

        disc.style.backgroundImage = `url(${imgLink})`

        document.querySelector(".title-song").innerText = `${title}`
        audio.src = urlSong
        isPlaying = false
    }


    updateSong()
    discRotate.pause()


    function playSong() {
        if (!isPlaying) {
            audio.play()
            discRotate.play()
            document.querySelector(".btn_play-song").classList.add("btn_play-song--playing")
            isPlaying = true
        } else {
            audio.pause()
            discRotate.pause()
            document.querySelector(".btn_play-song").classList.remove("btn_play-song--playing")
            isPlaying = false
        }
    }

    function PlayNextSong() {
        currentSong++
        if (currentSong >= songs.length) {
            currentSong = 0
        }

        updateSong()
        playSong()

    }

    function PlayPrevSong() {
        currentSong--
        if (currentSong <= 0) {
            currentSong = songs.length - 1
        }

        updateSong()
        playSong()

    }

    function fmtMSS(s) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + Math.floor(s) }

    btnPlay.addEventListener("click", playSong);
    btnNext.addEventListener("click", PlayNextSong)
    btnPrev.addEventListener("click", PlayPrevSong)

    audio.ontimeupdate = function() {
        if (audio.ended)
            PlayNextSong()
        var percent = audio.currentTime / audio.duration * 100

        progressBar.value = percent

        document.querySelector(".progress-bar__current-time").innerHTML = `${fmtMSS(audio.currentTime)}`
        document.querySelector(".progress-bar__duration-time").innerHTML = `${fmtMSS(audio.duration)}`
    }

    progressBar.onchange = function(e) {
        var seekTime = audio.duration * e.target.value / 100
        audio.currentTime = seekTime
    }


}
app()