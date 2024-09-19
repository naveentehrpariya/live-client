import React, { useEffect, useState, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function LiveRTMP (){
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [src, setSrc] = useState('rtmp://192.168.1.10:1935/live/livestream')

  useEffect(() => {
    // Initialize video.js player
    playerRef.current = videojs(videoRef.current, {
      autoplay: true,
      controls: true,
      sources: [{
        src: src,
        type: 'application/x-mpegURL'  // HLS format
      }]
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [src]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

 
 