import React from 'react';

import { progressContainer, progressElapsed, progressLeft } from './ProgressStyles.css'

function getPercentPixels (p, e) {
  if (e == 0) return String(p*100) + "%";
  else return String(((1 - p).toFixed(2)*100)) + "%";
}

const Progress = ({percent}) => {
  return (
    <div className={progressContainer}>
      <div className={progressElapsed} style={{width: getPercentPixels(percent, 0)}}></div>
      <div className={progressLeft} style={{width: getPercentPixels(percent, 1)}}></div>
    </div>
  )
  
}

export default Progress;