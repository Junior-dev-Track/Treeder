import React from 'react';
import spotifyLogo from '../assets/img/spotify.svg'; 

const SpotifyButton = () => {
  return (
    <div className='round--btn'>
      <a href="https://open.spotify.com/playlist/1OIoOoiF5tirMwy3Uk9s2J?si=76f528335a7b4797" target="_blank" rel="noopener noreferrer">
        <img src={spotifyLogo} alt="Spotify Logo" className='spotifyLogo' />
      </a>
    </div>
  );
}

export default SpotifyButton;