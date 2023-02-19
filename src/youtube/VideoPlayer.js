import { useState, useEffect, useRef } from "react";
import axios from "axios";
import YouTube from "react-youtube";
// import { throttle } from "lodash"; 

const YoutubePlayer = ({ cocktailName }) => {
  const [videoId, setVideoId] = useState("");
  const cachedResponse = useRef({});

  useEffect(() => {
    const getVideo = async () => {
      if (cachedResponse.current[cocktailName]) {
        // Retrieve response from cache
        const response = cachedResponse.current[cocktailName];
        const videoArray = response.data.items;
        const randomIndex = Math.floor(Math.random() * videoArray.length);
        setVideoId(videoArray[randomIndex].id.videoId);
      } else {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${cocktailName}&key=AIzaSyAaKyVvxsQ5JtdE7zAKMNABVHxPnXYP7wk`
          );
          // Store response in cache
          cachedResponse.current[cocktailName] = response;
          const videoArray = response.data.items;
          const randomIndex = Math.floor(Math.random() * videoArray.length);
          setVideoId(videoArray[randomIndex].id.videoId);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getVideo();
  }, [cocktailName]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
};

export default YoutubePlayer;