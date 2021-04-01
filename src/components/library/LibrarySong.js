import React from 'react';

const LibrarySong = ({ song, setSongs, songs, setCurrentSong, isPlaying }) => {
  const songSelectHandler = () => {
    const newSongs = songs.map((state) => {
      //console.log(state.id, song.id);
      if (state.id === song.id) {
        return {
          ...state,
          active: true,
        };
      } else {
        return {
          ...state,
          active: false,
        };
      }
    });
    setSongs(newSongs);
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
