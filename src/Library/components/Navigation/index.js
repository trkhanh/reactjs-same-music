import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom'

import NowPlayingNav from '../NowPlayingNav'

import { container, navItemsContainer } from './NavigationStyles.css'

const Navigation = ({ handlePause, handleResume, handleRestart, handleNext, isPlaying, currentTrack, currentArtwork, currentTime, duration }) => (
  <div className={container}>
    <ul className={navItemsContainer}>
      <Link to={`/songs`}>
        Songs
      </Link>
      <Link to={`/artists`}>
        Artists
      </Link>
      <Link to={`/playlists`}>
        Playlists
      </Link>
    </ul>
    <NowPlayingNav 
      handlePause={handlePause} 
      handleResume={handleResume} 
      handleRestart={handleRestart}
      handleNext={handleNext} 
      isPlaying={isPlaying}
      currentTrack={currentTrack}
      currentArtwork={currentArtwork}
      currentTime={currentTime}
      duration={duration}
    />
  </div>
)

export default Navigation;