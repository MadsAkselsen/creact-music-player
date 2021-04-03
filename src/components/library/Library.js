import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  libraryStatus,
  updateLibraryHighlight,
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
            setIsPlaying={setIsPlaying}
            updateLibraryHighlight={updateLibraryHighlight}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
