// import clientPromise from "../lib/mongodb";

// export default function Top({ movies }) {
//     return (
//         <div>
//             <h1>Top 1000 Movies of All Time</h1>
//             <p>
//                 <small>(According to Metacritic)</small>
//             </p>
//             <ul>
//                 {movies.map((movie) => (
//                     <li>
//                         <h2>{movie.title}</h2>
//                         <h3>{movie.metacritic}</h3>
//                         <p>{movie.plot}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export async function getStaticProps() {
//     try {
//         const client = await clientPromise;
//         const db = client.db("Audio");

//         const movies = await db
//             .collection("AudioFiles")
//             .find({})
//             .sort({ metacritic: -1 })
//             .limit(5)
//             .toArray();

//         return {
//             props: { movies: JSON.parse(JSON.stringify(movies)) },
//         };
//     } catch (e) {
//         console.error(e);
//     }
// }
//-----------------------------------------------
// import React, { useRef } from 'react';

// const AudioPlayer = () => {
//     const audioRef = useRef(null);

//     const handlePlay = () => {
//         audioRef.current.play();
//     };

//     const handlePause = () => {
//         audioRef.current.pause();
//     };

//     return (
//         <div>
//             <audio ref={audioRef} controls draggable="false">
//                 <source src="https://gateway.pinata.cloud/ipfs/QmQeaQQ5rq6xLd767kZZ5zfVDGEdUts1EoUBR7BsJYuZBA?stream=true" type="audio/mp3" />
//                 Your browser does not support the audio element.
//             </audio>

//             <button onClick={handlePlay}>Play</button>
//             <button onClick={handlePause}>Pause</button>
//         </div>
//     );
// };

// export default AudioPlayer;
//------------------------------------------------


// import React from 'react';
// import AudioPlayer from '../components/AudioPlayer';

// const IndexPage = () => {
//     return (
//         <div>
//             <h1>Your Next.js App</h1>
//             <AudioPlayer audioSrc="https://gateway.pinata.cloud/ipfs/QmQeaQQ5rq6xLd767kZZ5zfVDGEdUts1EoUBR7BsJYuZBA?stream=true" title="Your Custom Title" />
//         </div>
//     );
// };

// export default IndexPage;



import { useEffect, useRef } from 'react';

const AudioPlayer = () => {

    const audioPlayerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        const audioPlayer = audioPlayerRef.current;

        if (typeof window !== 'undefined') {
            audioRef.current = new window.Audio("audio.mp3");
        }

        const audio = audioRef.current;
        if (!audioPlayer || !audio) return;

        audio.addEventListener("loadeddata", handleLoadedData, false);

        const handleTimelineClick = (e) => {
            const timelineWidth = window.getComputedStyle(audioPlayer.querySelector(".timeline")).width;
            const timeToSeek = e.nativeEvent.offsetX / parseInt(timelineWidth) * audio.duration;
            audio.currentTime = timeToSeek;
        };

        const handleVolumeClick = (e) => {
            const sliderWidth = window.getComputedStyle(audioPlayer.querySelector(".controls .volume-slider")).width;
            const newVolume = e.nativeEvent.offsetX / parseInt(sliderWidth);
            audio.volume = newVolume;
            audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
        };

        const updateProgressBar = () => {
            const progressBar = audioPlayer.querySelector(".progress");
            progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
            audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(audio.currentTime);
        };

        const handlePlayPause = () => {
            const playBtn = audioPlayer.querySelector(".controls .toggle-play");
            if (audio.paused) {
                playBtn.classList.remove("play");
                playBtn.classList.add("pause");
                audio.play();
            } else {
                playBtn.classList.remove("pause");
                playBtn.classList.add("play");
                audio.pause();
            }
        };

        const handleMuteToggle = () => {
            const volumeEl = audioPlayer.querySelector(".volume-container .volume");
            audio.muted = !audio.muted;
            if (audio.muted) {
                volumeEl.classList.remove("icono-volumeMedium");
                volumeEl.classList.add("icono-volumeMute");
            } else {
                volumeEl.classList.add("icono-volumeMedium");
                volumeEl.classList.remove("icono-volumeMute");
            }
        };

        setInterval(updateProgressBar, 500);

        audioPlayer.querySelector(".timeline").addEventListener("click", handleTimelineClick);
        audioPlayer.querySelector(".controls .volume-slider").addEventListener('click', handleVolumeClick);
        audioPlayer.querySelector(".controls .toggle-play").addEventListener("click", handlePlayPause);
        audioPlayer.querySelector(".volume-button").addEventListener("click", handleMuteToggle);

        return () => {
            audio.removeEventListener("loadeddata", handleLoadedData);
            audioPlayer.querySelector(".timeline").removeEventListener("click", handleTimelineClick);
            audioPlayer.querySelector(".controls .volume-slider").removeEventListener('click', handleVolumeClick);
            audioPlayer.querySelector(".controls .toggle-play").removeEventListener("click", handlePlayPause);
            audioPlayer.querySelector(".volume-button").removeEventListener("click", handleMuteToggle);
        };
    }, []);

    function getTimeCodeFromNum(num) {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;

        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right, #b968c5, skyblue)',
    };

    const audioPlayerStyle = {
        height: '50px',
        width: '350px',
        background: '#444',
        boxShadow: '0 0 20px 0 #000a',
        fontFamily: 'arial',
        color: 'white',
        fontSize: '0.75em',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: '6px auto',
    };

    const timelineStyle = {
        background: 'white',
        width: '100%',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '0 2px 10px 0 #0008',
    };

    const progressStyle = {
        background: 'coral',
        width: '0%',
        height: '100%',
        transition: '0.25s',
    };

    const controlsStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: '0 20px',
    };

    const togglePlayStyle = {
        cursor: 'pointer',
        position: 'relative',
        left: '0',
        height: '0',
        width: '0',
        border: '7px solid #0000',
        borderLeft: '13px solid white',
    };

    const playStyle = {
        height: '15px',
        width: '20px',
        cursor: 'pointer',
        position: 'relative',
    };

    const volumeContainerStyle = {
        cursor: 'pointer',
    };

    const volumeButtonStyle = {
        height: '26px',
        display: 'flex',
        alignItems: 'center',
    };

    const volumeStyle = {
        transform: 'scale(0.7)',
    };

    const volumeSliderStyle = {
        position: 'absolute',
        left: '-3px',
        top: '15px',
        zIndex: '-1',
        width: '0',
        height: '15px',
        background: 'white',
        boxShadow: '0 0 20px #000a',
        transition: '.25s',
    };

    const volumePercentageStyle = {
        background: 'coral',
        height: '100%',
        width: '75%',
    };



    return (
        <div style={containerStyle}>
            <div style={audioPlayerStyle}>
                <div className="timeline" style={timelineStyle}>
                    <div className="progress" style={progressStyle}></div>
                </div>

                <div className="controls" style={controlsStyle}>
                    <div className="toggle-play play" style={togglePlayStyle} ></div>
                    <div className="time" style={{ display: 'flex' }}>
                        <div style={{ padding: '2px' }}>0:00</div>
                        <div style={{ padding: '2px' }}>/</div>
                        <div style={{ padding: '2px' }}></div>
                    </div>
                    <div className="name" style={{ padding: '2px' }}>Music Song</div>

                    <div className="volume-container" style={volumeContainerStyle}>
                        <div className="volume-button" style={volumeButtonStyle}>
                            <div className="volume" style={volumeStyle}></div>
                        </div>
                        <div className="volume-slider" style={volumeSliderStyle}>
                            <div className="volume-percentage" style={volumePercentageStyle}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;



