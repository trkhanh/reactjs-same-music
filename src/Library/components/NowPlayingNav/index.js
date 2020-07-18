
import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom'

import Progress from '../Progress'

import { container, topSectionContainer, npImg, npDetailsContainer, npTitle, npArtist, npAlbum, npControllerContainer,
controlButtons, controlButton, npImgContainer, npImgAlt } from './NowPlayingNavStyles.css'

const NowPlayingNav = ({ handlePause, handleResume, handleRestart, handleNext, isPlaying, currentTrack, currentArtwork, currentTime, duration }) => {
  return (
    <div className={container}>
      <div className={topSectionContainer}>

      <div className={npImgContainer}>
        {
          currentArtwork
            ? <img className={npImg} src={currentArtwork}/>
            : <div className={npImgAlt}></div>
        }
      </div>

        <div className={npDetailsContainer}>
          <div className={npTitle}>{currentTrack ? currentTrack.title : "Nothing playing yet"}</div>
          <div className={npArtist}>{currentTrack ? currentTrack.artist : '' }</div>
          <div className={npAlbum}>{currentTrack ? currentTrack.album : '' }</div>
        </div>
        <div className={npControllerContainer}>
          <div className={controlButtons}>
            <img onClick={handleRestart} className={controlButton} src={require('./assets/previous-track.svg')}/>

            {
              isPlaying
                ? <img onClick={handlePause} className={controlButton} src={require('./assets/pause-button.svg')}/>
                : <img onClick={handleResume} className={controlButton} src={require('./assets/play-arrow.svg')}/>
            }
            
            <img onClick={handleNext} className={controlButton} src={require('./assets/play-next-button.svg')}/>
          </div>
        </div>
      </div>
      <Progress percent={currentTime == -1 ? 0 : currentTime / duration}/>
    </div>
  )
}

export default NowPlayingNav;