const processSong = (song) => {
    const playIconContainer = song.querySelector('#play-icon');
    const audioPlayerContainer = song.querySelector('#audio-player-container');
    const seekSlider = song.querySelector('#seek-slider');
    const audio = song.querySelector('audio');
    const durationContainer = song.querySelector('#duration');
    const currentTimeContainer = song.querySelector('#current-time');
    
    let playState = 'play';
    
    playIconContainer.addEventListener('click', () => {
        if(playState === 'play') {
            pauseAllSongs();
            audio.play();
            playState = 'pause';
            playIconContainer.querySelector('img').src = './src/images/pause.png';
        } else {
            audio.pause();
            playState = 'play';
            playIconContainer.querySelector('img').src = './src/images/play.png';
        };
    });
    
    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    };
    
    const displayDuration = () => {
        durationContainer.textContent = calculateTime(audio.duration);
    };
    
    const setSliderMax = () => {
        seekSlider.max = Math.floor(audio.duration);
    };
    
    const displayBufferedAmount = () => {
        const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
        audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
    };
    
    const whilePlaying = () => {
        seekSlider.value = Math.floor(audio.currentTime);
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
        raf = requestAnimationFrame(whilePlaying);
    };
    
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
        });
    };
    
    audio.addEventListener('progress', displayBufferedAmount);
    
    seekSlider.addEventListener('input', () => {
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
    });
    
    seekSlider.addEventListener('change', () => {
        audio.currentTime = seekSlider.value;

        if(!audio.paused) {
            requestAnimationFrame(whilePlaying);
        };
    });
};

const songs = document.querySelectorAll('.song');

for (let i = 0; i < songs.length; i++) {
    processSong(songs[i]);
};

const pauseAllSongs = () => {
    for (let i = 0; i < songs.length; i++) {
        const playIconContainer = songs[i].querySelector('#play-icon');
        const audio = songs[i].querySelector('audio');

        audio.pause();
        playIconContainer.querySelector('img').src = './src/images/play.png';
    };    
};