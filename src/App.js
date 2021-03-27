import React from 'react';

import Player from './components/player/Player';
import Song from './components/song/Song';

import './app.scss';

function App() {
  return (
    <div className="App">
      <Song />
      <Player />
    </div>
  );
}

export default App;
