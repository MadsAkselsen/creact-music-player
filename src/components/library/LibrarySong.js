import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const LibrarySong = ({
  song,
  setSongs,
  songs,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  updateLibraryHighlight,
}) => {
  const songSelectHandler = () => {
    updateLibraryHighlight(song);
    console.log('1');
    if (!song.active || !isPlaying) {
      console.log('2');
      setCurrentSong(song, (song.active = true));
      setIsPlaying(true);
    } else {
      console.log('3');
      setIsPlaying(false);
    }
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <div className="cover-image-container">
        <FontAwesomeIcon
          className={`play-pause-icon ${
            song.active && isPlaying ? 'playing' : ''
          }`}
          size="3x"
          icon={song.active && isPlaying ? faPause : faPlay}
        />
        <img src={song.cover} alt="Song Cover"></img>
      </div>

      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
export default LibrarySong;
