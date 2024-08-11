
import './Feed.css'
import {Link} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, value_converter, decodeHtml } from '../../data';
import moment from 'moment'


const Feed = ({ selectedGenre }) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=32&q=${selectedGenre}%20official%20movie%20trailer&type=video&relevanceLanguage=en&key=${API_KEY}`
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
    <div className="feed">
      {videos.map((video) => (
        <Link to={`/video/${video.id.videoId}`} className="card" key={video.id.videoId}>
          <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
          <h2>{decodeHtml(video.snippet.title)}</h2>
          <h3>{video.snippet.channelTitle}</h3>
          <p>{value_converter(video.viewCount)} views &bull; {moment(video.snippet.publishedAt).fromNow()}</p>
        </Link>
      ))}
    </div>
  );
};
  
export default Feed;

