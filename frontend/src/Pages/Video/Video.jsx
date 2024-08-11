import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'
import {useParams} from 'react-router-dom'

const Video = ({selectedGenre}) => {

  const {videoId} = useParams();


  return (
    <div className = 'play-container'>
      <PlayVideo videoId = {videoId}/>
      <Recommended selectedGenre = {selectedGenre}/>
    </div>
  )
}

export default Video