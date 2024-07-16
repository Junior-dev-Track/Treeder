// HomePage.jsx
import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';


import StadiaMap from '../components/StadiaMap.jsx';
import Scores from './Scores.jsx'; 
import Logs from './Logs.jsx';
import ProfilGamer from './ProfilGamer.jsx';
//import ProfilAdmin from './ProfilAdmin.jsx';
import Logout from './Logout.jsx';
import SpotifyButton from '../components/SpotifyButton.jsx';
import NbTrees from '../components/NbTrees.jsx';
import NbLeafs from '../components/NbLeafs.jsx';
import NbLocks from '../components/NbLocks.jsx';

import musicIcon from '../assets/img/butterfly.png';



const HomePage = ({ openModal, treeData, playerLogs, scoreData }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const pseudo = Cookies.get('pseudo');

  const avatarUrl = 'http://localhost:3000/public/avatars/' + Cookies.get('skinplayer');

  const location = useLocation();
  const openProfilePopup = location.state?.openProfilePopup;
  const navigate = useNavigate();

  useEffect(() => {
    if (openProfilePopup) {
      setIsProfileModalOpen(true);
    }

    // Cleanup function
    return () => {
      if (openProfilePopup) {
        // Reset the state
        navigate('.', { state: { openProfilePopup: false } });
      }
    };
  }, [openProfilePopup, navigate]);


  function getAvatarClass(avatarUrl) {
    if (!avatarUrl) {
      return 'general-avatar'; // Default class if avatarUrl is undefined or null
    }
    if (avatarUrl.includes('rat.png')) {
      return 'avatar-rat__general';
    } else if (avatarUrl.includes('cacaotes.png')) {
      return 'avatar-cacaotes__general';
    } else if (avatarUrl.includes('cat.png')) {
      return 'avatar-cat__general';
    } else if (avatarUrl.includes('dog.png')) {
      return 'avatar-dog__general';
    } else if (avatarUrl.includes('rabbit.png')) {
      return 'avatar-rabbit__general';
    } else {
      return 'general-avatar';
    }
  }


  const audioRef = useRef(null);

  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(1);

  const songs = [
    '/public/music/1.mp3',
    '/public/music/2.mp3',
    '/public/music/3.mp3',
    '/public/music/4.mp3',
    '/public/music/5.mp3',
    '/public/music/6.mp3',
    '/public/music/7.mp3',
    '/public/music/8.mp3',
    '/public/music/9.mp3',
    '/public/music/10.mp3',
    '/public/music/11.mp3',
    '/public/music/12.mp3',
    '/public/music/13.mp3',
    '/public/music/14.mp3',
    '/public/music/15.mp3',
  ];

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    let newIndex = currentSongIndex - 1;
    if (newIndex < 0) {
      newIndex = songs.length - 1; // Loop back to the last song if we're at the first song
    }
    setCurrentSongIndex(newIndex);
  };

  const adjustVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };


  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = `http://localhost:3000${songs[currentSongIndex]}`;
      audio.load();
      if (isPlaying) {
        audio.play();
      }
    }
    adjustVolume(0.5);
    togglePlayPause();
  }, [currentSongIndex, isPlaying]);

  
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play().catch((error) => console.error("Erreur de lecture automatique:", error));
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };


  function handleMouseOver() {
    document.querySelector('.volume-bar').style.display = 'block';
  }
  
  function handleMouseOut() {
    document.querySelector('.volume-bar').style.display = 'none';
  }
 
  /*useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = `http://localhost:3000${songs[currentSongIndex]}`
      audio.load()
      audio.play()
    }
//
  }, [currentSongIndex]); // Re-run the effect if currentSongIndex or songs array changes*/


  return (
    <div>
      <div className='map-container'>
       <StadiaMap treeData={treeData} />
      </div>

      <div className='container'>
        <div className='header'>
          <div className='logo'>
            <img className='logo__img' src="../assets/img/logo.png" alt="Logo"/>
          </div>

          <div className='infos--btn'>
            <NbTrees isAuthenticated={isAuthenticated}/>
            <NbLeafs isAuthenticated={isAuthenticated}/>
            <NbLocks isAuthenticated={isAuthenticated}/>
          </div>

          {!pseudo ? (
              isMobile ? (
                  <div className='btn login--btn'>
                    <Link to="/login">Login</Link>
                  </div>
              ) : (
                  <button className='btn login--btn' onClick={() => openModal('login')}>Login</button>
              )
          ) : (
              <>
                <button className='btn' onClick={() => setIsProfileModalOpen(true)}>
                  <div className='profil-avatar'>
                    <img className={getAvatarClass(avatarUrl)} src={avatarUrl} alt="Avatar"/>
                  </div>
                  <span className='profil--btn btn--text'>{pseudo}</span>
                </button>
                <Logout setIsAuthenticated={setIsAuthenticated}/>
              </>
          )}
        </div>


        <div className='nav--right'>
          <Scores score={scoreData}/>
        </div>

        <div className='footer'>
          <Logs logs={playerLogs}/>
          <SpotifyButton/>

          <div className="audio-player round--btn round--btn__big">
            <div className="audio-controls" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              <div className="controlers">
                <input
                  type="range"
                  className="volume-bar"
                  min="0"
                  max="1"
                  value={volume}
                  step="0.01"
                  defaultValue="1"
                  onChange={(e) => adjustVolume(e.target.value)}
                />
              </div>
              
              <div className='btn--el'>
                <button className="control-btn prev-btn" onClick={prevSong}>←</button>
                <button className="play-pause-btn" onClick={togglePlayPause}>
                  <img src={musicIcon} alt="Play/Pause" className='music-icon' style={{ display: isPlaying ? 'none' : 'inline' }} />
                  <img src={musicIcon} alt="Play/Pause" className='music-icon' style={{ display: isPlaying ? 'inline' : 'none' }} />
                  {/*{isPlaying ? 'Pause' : 'Play'}*/}
                </button>
                <button className="control-btn next-btn" onClick={nextSong}>→</button>
              </div>
             
              
            </div>
            <audio ref={audioRef} onEnded={nextSong} />
          </div>
            
          {/*<div>
            <div>
              <audio className="audio-player" controls autoPlay ref={audioRef} onEnded={nextSong}>
                <source src={`http://localhost:3000${songs[currentSongIndex]}`} type="audio/mpeg"/>
                Your browser does not support the audio element.
              </audio>
              <div className="timeline">
                <div className="progress"></div>
              </div>
            </div>
            <button className="footer--previous" onClick={prevSong}>Previous</button>
            <button className="footer--next" onClick={nextSong}>Next</button>
          </div>*/}
        </div>


        <ProfilGamer isOpen={isProfileModalOpen} setIsOpen={setIsProfileModalOpen}/>
      </div>

    </div>
  );
};

export default HomePage;