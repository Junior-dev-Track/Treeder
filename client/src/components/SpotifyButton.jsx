import React from 'react';
import spotifyLogo from '../assets/img/spotify.svg'; 

const SpotifyButton = () => {
  return (
    <a href="https://open.spotify.com/playlist/1OIoOoiF5tirMwy3Uk9s2J?si=76f528335a7b4797" target="_blank" rel="noopener noreferrer">
      <img src={spotifyLogo} alt="Spotify Logo" style={{width: '32px', height: '32px'}} />
    </a>
  );
}

export default SpotifyButton;