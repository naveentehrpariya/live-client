import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Api from '../../../api/Api';

export default function LiveRTMP (props){

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const [stream, setstream] = useState();
  const {streamkey} = useParams()
  const [checking, setchecking] = useState();
  function fetchStream(signal) {
    if(checking){
      return false;
    }
    if(streamkey){
        setchecking(true);
        const resp = Api.get(`/stream/${streamkey}`, {signal});
        resp.then((res) => {
          console.log(res);
          setstream(res.data.stream);
          setSrc(`${stream.stream_url}/${stream.streamkey}`);
          console.log(`${stream.stream_url}/${stream.streamkey}`);
          setchecking(false);
        }).catch((err) => {
          setchecking(false);
        });
    }
  }

  useEffect(()=>{
    fetchStream();
  },[])

  const [src, setSrc] = useState('')

  useEffect(() => {
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
    <>
    <div data-vjs-player>
      <video ref={videoRef || 'https://files.runstream.cloud/file/runstreamco/offline-video.mp4'} className="video-js" />
    </div>
    </>
  );
};

 
 