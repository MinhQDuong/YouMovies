import React, {useState, useEffect} from 'react'
import './Recommended.css'
import { API_KEY, value_converter, decodeHtml } from '../../data'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Recommended = ({selectedGenre, searchQuery}) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}${selectedGenre}%20official%20movie%20trailer&type=video&relevanceLanguage=en&key=${API_KEY}`
        );

        // Fetch the view count for each video
        const videoIds = response.data.items.map((item) => item.id.videoId);
        const viewCountResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(',')}&key=${API_KEY}`
        );

        // Combine the video data with the view count
        const videoData = response.data.items.map((item) => {
          const viewCount = viewCountResponse.data.items.find((video) => video.id === item.id.videoId)?.statistics?.viewCount;
          return { ...item, viewCount: viewCount || 0 };
        });

        setVideos(videoData);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      }
    };

    fetchVideos();
  }, [selectedGenre]);



  
  return (
    <div className="recommended">
      {videos.map((video) => (
        <Link to={`/video/${video.id.videoId}`} className="side-video-list" key={video.id.videoId}>
          <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
          <div className="vid-info">
            <h4>{decodeHtml(video.snippet.title)}</h4>
            <p>{video.snippet.channelTitle}</p>
            <p>{value_converter(video.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Recommended