import React, { useState } from 'react';

import Player from './components/player/Player';
import Song from './components/song/Song';
import Library from './components/library/Library';

import './app.scss';

import data from './data';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
      <Library songs={songs}></Library>
    </div>
  );
}

export default App;
