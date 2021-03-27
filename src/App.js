import React, { useState } from 'react';

import Player from './components/player/Player';
import Song from './components/song/Song';

import './app.scss';

import data from './data';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} />
    </div>
  );
}

export default App;
