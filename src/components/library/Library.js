import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  isPlaying,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            song={song}
            setSongs={setSongs}
            songs={songs}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
