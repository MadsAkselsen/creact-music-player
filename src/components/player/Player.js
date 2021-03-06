import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  currentSong,
  songs,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  updateLibraryHighlight,
}) => {
  // state
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [audioLoaded, setAudioLoaded] = useState(false);

  const [firstLastSong, setFirstLastSong] = useState({
    firstSong: true,
    lastSong: false,
  });

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    if (!audioLoaded) {
      return;
    }
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentageCalc = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animationPercentageCalc,
    });

    if (current >= duration) {
      NextSong();
    }
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const playSongHandler = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const previousSong = () => {
    for (let i = 0; i < songs.length; i++) {
      if (songs[i].id === currentSong.id && i > 0) {
        setCurrentSong(songs[i - 1]);
        if (i === 1) {
          setFirstLastSong({ ...firstLastSong, firstSong: true });
        }
        if (i === songs.length - 1) {
          setFirstLastSong({ ...firstLastSong, lastSong: false });
        }
        return;
      }
    }
  };

  const NextSong = () => {
    //* the commented code is for cycling through the songs without reaching the end.
    /* let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const songIndex = (currentIndex + 1) % songs.length; // modolus will make the number 0 when exceeding the last index and thus start over from the first song
    setCurrentSong(songs[songIndex]);
    if (currentIndex === songs.length - 2)
      setFirstLastSong({ ...firstLastSong, lastSong: true });
    if (currentIndex === 0)
      setFirstLastSong({ ...firstLastSong, firstSong: false }); */

    for (let i = 0; i < songs.length; i++) {
      if (songs[i].id === currentSong.id && i < songs.length - 1) {
        setCurrentSong(songs[i + 1]);
        if (i === songs.length - 2) {
          setFirstLastSong({ ...firstLastSong, lastSong: true });
        }
        if (i === 0) {
          setFirstLastSong({ ...firstLastSong, firstSong: false });
        }
        return;
      }
    }
  };

  const setLoaded = (e) => {
    if (!audioLoaded) {
      const current = e.target.currentTime;
      const duration = e.target.duration;
      setAudioLoaded(true);
      setSongInfo({ ...songInfo, currentTime: current, duration: duration });
      if (isPlaying) {
        audioRef.current.play();
      }
      // check if first, last or in between in order to color the arrows.
      if (currentSong.id === songs[5].id) {
        setFirstLastSong({
          ...firstLastSong,
          lastSong: true,
          firstSong: false,
        });
      } else if (currentSong.id === songs[0].id) {
        setFirstLastSong({
          ...firstLastSong,
          firstSong: true,
          lastSong: false,
        });
      } else {
        setFirstLastSong({
          ...firstLastSong,
          firstSong: false,
          lastSong: false,
        });
      }
      //updateLibraryHighlight(currentSong);
    }
  };

  useEffect(() => {
    updateLibraryHighlight(currentSong);
    setSongInfo({ ...songInfo, animationPercentage: 0 });
    setAudioLoaded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // aad the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          ></input>
          <div className="animate-track" style={trackAnim}></div>
        </div>

        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className={`skipBack ${firstLastSong.firstSong ? 'disabled' : ''}`}
          size="2x"
          icon={faAngleLeft}
          onClick={previousSong}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className={`skipForward ${firstLastSong.lastSong ? 'disabled' : ''}`}
          size="2x"
          icon={faAngleRight}
          onClick={NextSong}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onLoadedData={setLoaded}
      ></audio>
    </div>
  );
};
export default Player;
