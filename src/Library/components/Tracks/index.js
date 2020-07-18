import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom'

import { container, trackContainer, tracksContainer, tkImg, tkImgAlt, tkDetailsContainer, tkArtistName, tkAlbumName, tkTrackName,
total, tracksHeader, tracksHeaderItem } from './TracksStyles.css'

const Track = ({track, trackIndex, artwork, handleSelectTrack }) => (
  <div onClick={() => handleSelectTrack(track, trackIndex)} className={trackContainer}>
    {
      artwork
        ? <img className={tkImg} src={artwork}/>
        : <div className={tkImgAlt}></div>
    }
    <div className={tkDetailsContainer}>
      <div className={tkTrackName}>{track.title}</div>
      <div className={tkArtistName}>{track.artist}</div>
      <div className={tkAlbumName}>{track.album}</div>
    </div>
  </div>
)

const Tracks = ({ tracks, artists, handleSelectTrack }) => (
  <div className={container}>
    <div className={tracksHeader}>
      <div className={tracksHeaderItem}>Title</div>
      <div className={tracksHeaderItem}>Artist</div>
      <div className={tracksHeaderItem}>Album</div>
    </div>
    <div className={tracksContainer}>
      {
        tracks.map((track, index) => (
          <Track 
            handleSelectTrack={handleSelectTrack}
            key={index} 
            track={track} 
            trackIndex={index}
            artwork={artists[track.artist] 
              ? artists[track.artist][track.album]
                ? artists[track.artist][track.album].albumArtwork 
                : ''
              : ''} />
        ))
      }
    </div>
    <div className={total}>{tracks.length} songs total</div>
  </div>
)

export default Tracks;