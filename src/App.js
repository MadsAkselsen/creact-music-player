import React, { useState } from 'react';

import Player from './components/player/Player';
import Song from './components/song/Song';
import Library from './components/library/Library';
import Nav from './components/nav/Nav';

import './app.scss';

import data from './data';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const updateLibraryHighlight = (song) => {
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
    //setCurrentSong(song, (song.active = true));
  };
  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        updateLibraryHighlight={updateLibraryHighlight}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        updateLibraryHighlight={updateLibraryHighlight}
      ></Library>
    </div>
  );
}

export default App;
