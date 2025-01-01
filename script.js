document.addEventListener('DOMContentLoaded', () => {
    const songs = [
        { title: 'Africa', src: 'musics/Africa.mp3' },
        { title: 'Always', src: 'musics/Always.mp3' },
        { title: 'Another Day in Paradise', src: 'musics/Another Day in Paradise.mp3' },
        { title: 'Bad', src: 'musics/Bad.mp3' },
        { title: 'Beat It', src: 'musics/Beat It.mp3' },
        { title: 'Billie Jean', src: 'musics/Billie Jean.mp3' },
        { title: 'Dust in the Wind', src: 'musics/Dust in the Wind.mp3' },
        { title: 'Ghostbusters', src: 'musics/Ghostbusters.mp3' },
        { title: 'Hold the Line', src: 'musics/Hold the Line.mp3' },
        { title: 'Hotel California', src: 'musics/Hotel California.mp3' },
        { title: 'I Love Rock \'N Roll', src: 'musics/I Love Rock \'N Roll.mp3' },
        { title: 'Imagine', src: 'musics/Imagine.mp3' },
        { title: 'In the Air Tonight', src: 'musics/In the Air Tonight.mp3' },
        { title: 'Let\'s Groove', src: 'musics/Let\'s Groove.mp3' },
        { title: 'Losing My Religion', src: 'musics/Losing My Religion.mp3' },
        { title: 'Nothing\'s Gonna Stop Us Now', src: 'musics/Nothing\'s Gonna Stop Us Now.mp3' },
        { title: 'November Rain', src: 'musics/November Rain.mp3' },
        { title: 'Put Your Head On My Shoulder', src: 'musics/Put Your Head On My Shoulder.mp3' },
        { title: 'Raindrops Keep Falling on My Head', src: 'musics/Raindrops Keep Falling on My Head.mp3' },
        { title: 'Smooth Criminal', src: 'musics/Smooth Criminal.mp3' },
        { title: 'Summer of 69', src: 'musics/Summer of 69.mp3' },
        { title: 'Sweet Child O\' Mine', src: 'musics/Sweet Child O\' Mine.mp3' },
        { title: 'Take on Me', src: 'musics/Take on Me.mp3' },
        { title: 'The Final Countdown', src: 'musics/The Final Countdown.mp3' },
        { title: 'Thunderstruck', src: 'musics/Thunderstruck.mp3' }
    ];
    

    const container = document.getElementById('players-container');

    songs.forEach(song => {
        const playerBox = document.createElement('div');
        playerBox.classList.add('player-box');

        playerBox.innerHTML = `
            <div class="tape-label">${song.title}</div>
            <div class="retro-player">
                <button class="control-button backward">◄◄</button>
                <button class="control-button play">▶</button>
                <button class="control-button stop">■</button>
                <button class="control-button forward">►►</button>
                <div class="progress-bar"></div>
                <div class="time-display">00:00 / 00:00</div>
                <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="1.0">
            </div>
            <audio>
                <source src="${song.src}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;

        const audio = playerBox.querySelector('audio');
        const playBtn = playerBox.querySelector('.play');
        const stopBtn = playerBox.querySelector('.stop');
        const backwardBtn = playerBox.querySelector('.backward');
        const forwardBtn = playerBox.querySelector('.forward');
        const progressBar = playerBox.querySelector('.progress-bar');
        const timeDisplay = playerBox.querySelector('.time-display');
        const volumeSlider = playerBox.querySelector('.volume-slider');

        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.textContent = '❚❚';
            } else {
                audio.pause();
                playBtn.textContent = '▶';
            }
        });

        stopBtn.addEventListener('click', () => {
            audio.pause();
            audio.currentTime = 0;
            playBtn.textContent = '▶'; 
            updateProgressBar();
        });

        backwardBtn.addEventListener('click', () => {
            audio.currentTime = Math.max(0, audio.currentTime - 5);
        });

        forwardBtn.addEventListener('click', () => {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        });

        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value;
        });

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * audio.duration;
            audio.currentTime = newTime;
        });

        const updateProgressBar = () => {
            const progress = (audio.currentTime / audio.duration) * 100 || 0;
            progressBar.style.setProperty('--progress', `${progress}%`);

            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            timeDisplay.textContent = `${currentTime} / ${duration}`;
        };

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60) || 0;
            const seconds = Math.floor(time % 60) || 0;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        audio.addEventListener('timeupdate', updateProgressBar);
        audio.addEventListener('loadedmetadata', updateProgressBar);

        container.appendChild(playerBox);
    });
});

function showRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 9990) + 10;
    document.getElementById("counter").innerHTML = `Total Visits: ${randomNumber}`;
}
