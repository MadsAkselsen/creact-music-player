import React from 'react';

const LibrarySong = ({
  song,
  setSongs,
  songs,
  setCurrentSong,
  isPlaying,
  updateLibraryHighlight,
}) => {
  const songSelectHandler = () => {
    updateLibraryHighlight(song);
    setCurrentSong(song, (song.active = true));
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img src={song.cover} alt="Song Cover"></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
export default LibrarySong;
