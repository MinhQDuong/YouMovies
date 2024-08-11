import React, {useEffect, useState} from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const PlayVideo = () => {
    const { videoId } = useParams();
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [sentimentData, setSentimentData] = useState({
        positivePercentage: 0,
        neutralPercentage: 0,
        negativePercentage: 0,
  });

    const fetchVideoData = async () => {
    // Fetching Data from Videos
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const videoResponse = await fetch(videoDetails_url);
    const videoData = await videoResponse.json();
    setApiData(videoData.items[0]);
  };

    const fetchOtherData = async () => {
    // Fetching channel data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    const channelResponse = await fetch(channelData_url);
    const channelData = await channelResponse.json();
    setChannelData(channelData.items[0]);
    
    // Fetching comment data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    const commentResponse = await fetch(comment_url);
    const commentData = await commentResponse.json();
    if (commentData.items && commentData.items.length > 0) {
      setCommentData(commentData.items);
    } else {
      console.log('No comments found for this video.');
      setCommentData([]);
    }
  };

  const updateSentimentData = async () => {
    try {
      // Check if there are comments available
      if (commentData.length > 0) {
        // Perform sentiment analysis
        const comments = commentData.map((item) => item.snippet.topLevelComment.snippet.textOriginal);
        const sentimentResponse = await axios.post('http://127.0.0.1:5000/sentiment_analysis', { comments });

        setSentimentData({
          positivePercentage: sentimentResponse.data.positive_percentage,
          neutralPercentage: sentimentResponse.data.neutral_percentage,
          negativePercentage: sentimentResponse.data.negative_percentage,
        });
      } else {
        // If no comments, set the sentiment data to default values
        setSentimentData({
          positivePercentage: 0,
          neutralPercentage: 0,
          negativePercentage: 0,
        });
      }
    } catch (error) {
      console.error('Error fetching sentiment data:', error);
      // Add additional error handling logic here, such as displaying an error message to the user
    }
  };
    
 

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchOtherData();
    }
  }, [apiData, videoId]);

  useEffect(() => {
    if (commentData.length > 0) {
      updateSentimentData();
    }
  }, [commentData]);

  if (!apiData || !channelData) {
    return <div>Loading...</div>;
  }

    return (
      <div className="play-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <h3>{apiData.snippet.title}</h3>
        <div className="play-video-info">
          <p>
            {value_converter(apiData.statistics.viewCount)} views &nbsp;&nbsp;{" "}
            {moment(apiData.snippet.publishedAt).fromNow()}
          </p>
          <div>
            <span>
              <img src={like} alt="" />
              {value_converter(apiData.statistics.likeCount)}
            </span>
            <span>
              <img src={dislike} alt="" />
              {value_converter(apiData.statistics.dislikeCount)}
            </span>
            <span>
              <img src={share} alt="" />
              Share
            </span>
            <span>
              <img src={save} alt="" />
              Save
            </span>
          </div>
        </div>
        <hr />
        <div className="publisher">
          <img src={channelData.snippet.thumbnails.default.url} alt="" />
          <div>
            <p>{apiData.snippet.channelTitle}</p>
            <span>
              {value_converter(channelData.statistics.subscriberCount)} Subscribers
            </span>
          </div>
        </div>
        <div className="vid-description">
          <p>{apiData.snippet.description}</p>
          <hr />
          <h4>{value_converter(apiData.statistics.commentCount)} Comments</h4>
          {commentData.length > 0 && (
  <>
  {sentimentData.positivePercentage > 0 || sentimentData.neutralPercentage > 0 || sentimentData.negativePercentage > 0 ? (
    <div className="sentiment-analysis">
      <h4>Comments Sentiment Analysis:</h4>
      <div className="sentiment-bars">
        <div className="bar positive" style={{ width: `${sentimentData.positivePercentage}%` }}>
          {sentimentData.positivePercentage >= 15 ? (
            <span className="sentiment-label">Positive {sentimentData.positivePercentage}%</span>
          ) : (
            <span className="sentiment-label">{sentimentData.positivePercentage}%</span>
          )}
        </div>
        <div className="bar neutral" style={{ width: `${sentimentData.neutralPercentage}%` }}>
          {sentimentData.neutralPercentage >= 15 ? (
            <span className="sentiment-label">Neutral {sentimentData.neutralPercentage}%</span>
          ) : (
            <span className="sentiment-label">{sentimentData.neutralPercentage}%</span>
          )}
        </div>
        <div className="bar negative" style={{ width: `${sentimentData.negativePercentage}%` }}>
          {sentimentData.negativePercentage >= 15 ? (
            <span className="sentiment-label">Negative {sentimentData.negativePercentage}%</span>
          ) : (
            <span className="sentiment-label">{sentimentData.negativePercentage}%</span>
          )}
        </div>
      </div>
    </div>
  ) : null}
  </>
)}
        </div>
      </div>
    );
  };

export default PlayVideo