import { useEffect, useRef } from 'react';

const AudioPlayer = ({ audioSrc, title }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        const handleLoadedData = () => {
            audioRef.current.querySelector(".time .length").textContent = getTimeCodeFromNum(
                audioRef.current.duration
            );
            audioRef.current.volume = 0.75;
        };

        audioRef.current.addEventListener('loadeddata', handleLoadedData, false);

        return () => {
            audioRef.current.removeEventListener('loadeddata', handleLoadedData);
        };
    }, []);

    const handleTimelineClick = (e) => {
        const timelineWidth = window.getComputedStyle(audioRef.current.querySelector('.timeline')).width;
        const timeToSeek = (e.nativeEvent.offsetX / parseInt(timelineWidth)) * audioRef.current.duration;
        audioRef.current.currentTime = timeToSeek;
    };

    const handleVolumeClick = (e) => {
        const sliderWidth = window.getComputedStyle(audioRef.current.querySelector('.controls .volume-slider')).width;
        const newVolume = e.nativeEvent.offsetX / parseInt(sliderWidth);
        audioRef.current.volume = newVolume;
        audioRef.current.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
    };

    const handlePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    const handleMuteToggle = () => {
        audioRef.current.muted = !audioRef.current.muted;
    };

    const getTimeCodeFromNum = (num) => {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;

        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
            seconds % 60
        ).padStart(2, 0)}`;
    };

    return (
        <div>
            <audio controls>
                <source src="https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3" type="audio/mp3" />
            </audio>
            <div style={{ width: '50px', height: '50px' }}></div>
            <div className="audio-player">
                <div className="timeline">
                    <div className="progress"></div>
                </div>
                <div className="controls">
                    <div className="play-container">
                        <div className="toggle-play play"></div>
                    </div>
                    <div className="time">
                        <div className="current">0:00</div>
                        <div className="divider">/</div>
                        <div className="length"></div>
                    </div>
                    <div className="name">Music Song</div>
                    {/* Credit for icon to https://saeedalipoor.github.io/icono/ */}
                    <div className="volume-container">
                        <div className="volume-button">
                            <div className="volume icono-volumeMedium"></div>
                        </div>

                        <div className="volume-slider">
                            <div className="volume-percentage"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
