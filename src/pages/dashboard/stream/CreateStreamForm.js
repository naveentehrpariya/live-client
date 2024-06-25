import React, { useContext, useEffect, useMemo, useState } from 'react'
import AuthLayout from '../../../layout/AuthLayout';
import Endpoints from '../../../api/Endpoints';
import { UserContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import ConnectYoutube from './ConnectYoutube';
import { FaYoutube } from "react-icons/fa";
import { FiVideo } from "react-icons/fi";
import { LuImage } from "react-icons/lu";
import { RiListUnordered } from "react-icons/ri";

import UploadThumbnail from './UploadThumbnail';
import UploadVideos from './UploadVideos';
import UploadAudios from './UploadAudios';
import ManageFiles from './ManageFiles';
import Api from '../../../api/Api';
import { RiListOrdered2 } from "react-icons/ri";

export default function CreateStreamForm() {
    const {Errors, user} = useContext(UserContext);
    const [streamType, setStreamType] = useState("video");
    const [loop, setLoop] = useState(true);

    const resolutions = [
      { title:"2160p 3840x2160" ,label: '2160p', value: '3840x2160' },
      { title:"1080p 1920x1080 " ,label: '1080p', value: '1920x1080' },
      { title:"720p 1280x720" ,label: '720p', value: '1280x720' },
      { title:"1080x720 720x1080" ,label: '720x1080', value: '720x1080' },
    ];

    const freeresolutions = [
      { title:"1080p 1920x1080 " ,label: '1080p', value: '1920x1080' },
    ];

    const filterLabels = user && user.plan && user.plan.resolutions ? JSON.parse(user.plan.resolutions) : [];
    const filteredResolutions = resolutions.filter(resolution => filterLabels.includes(resolution.label));
    console.log(filteredResolutions);

    const [channel, setChannel] = useState();
    const [status, setStatus] = useState();
    const check = () => { 
      const m = new Endpoints();
      const resp = m.checkYtStatus();
      resp.then((res)=>{
        if(res.data && res.data.token && res.data.token.channel){
          setChannel(JSON.parse(res.data.token.channel));
        }  
        if(res.data && res.data.token && res.data.token.token){
          setStatus("active");
        } else {setStatus("notactive");}
      }).catch((err)=> {
        console.log(err);
        setStatus("notactive");
      });
    }

   useEffect(() => {
      check();
   },[]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const inputFields = [
    { type:"text", name:"title", label:"Stream Name" },
  ];

  const [videos, setVideos] = useState([]);
  const [audios, setaudios] = useState([]);
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    title: "",
    videos: videos,
    audios: audios,
    thumbnail: "",
    resolution: "",
    stream_url: "",
    streamkey: "",
    description: "",
  });

  const getImageFile = (image) => {
    setImage(image);
    setData({ ...data, ["thumbnail"]:image});
  }
 
  const suffleVideos = (array) =>{ 
    setVideos(array)
  }
  const suffleAudios = (array) =>{ 
    setaudios(array);
  }
  const getVideos = (array) => {
    const tmp = videos;
    tmp.push(array);
    setVideos(tmp);
  }

  const getAudios = (array) => {
    const tmp = audios;
    tmp.push(array);
    setaudios(tmp);
  }

  const handleinput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value});
  }

  const [playlistsCreating, setPlaylistsCreating] = useState(false);
  const [playlist, setPlaylist] = useState();

  const createPlaylist = (e) => {
    setPlaylistsCreating(true);
    let mp4 = [];
    videos.forEach(video => {
      mp4.push(video.url);
    });
    let mp3 = [];
    audios.forEach(audio => {
      mp3.push(audio.url);
    });
    console.log("mp4", mp4);
    console.log("mp3", mp3);

    const resp = Api.post(`/create-playlist`,{
        "type": streamType,
        "videos": mp4,
        "audios": mp3,
        "thumbnail": image,
        // "radio":"http://mediaserv30.live-streams.nl:8086/live"
    });
    resp.then(res => {
      if(res.data.status){
        setPlaylist(res.data);
        handleCreateStream({
          title: data.title,
          videos: videos,
          audios: audios,
          thumbnail: image,
          resolution: data.resolution,
          description: data.description,
        })
      } else {
        toast.error(res.data.message);
      }
      setPlaylistsCreating(false);
    }).catch(err => {
      Errors(err);
      setPlaylistsCreating(false);
    });
  }

  const handleCreateStream = (payload) => {
    setLoading(true);
    const m = new Endpoints();
    const resp = m.create_stream(payload);
    resp.then(res => {
      if(res.data.status){
        toast.success(res.data.message);
        navigate('/home');
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    }).catch(err => {
      Errors(err);
      setLoading(false);
    });
  }

  const removeAccount = (e) => {
    const m = new Endpoints();
    const resp = m.unLinkYoutube();
    resp.then(res => {
      if(res.data.status){
        toast.success(res.data.message);
        window.location.reload(false)
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => {
      Errors(err);
    });
  }

  const [step, setStep] = useState(1);
  const handleStep = (type) => {
    // if(type === "next" && step === 2 && !image  ){
    //     toast.error("Please select a thumbnail for video stream.");
    //     return false;
    // }
    // if(type === "next" && step === 2 && streamType === 'video' && videos.length < 1  ){
    //     toast.error("Please select atleast one video for this stream.");
    //     return false;
    // }

    // if(type === "next" && step === 2 && streamType === 'image' && audios.length < 1  ){
    //     toast.error("Please choose songs or any sound effect for this stream.");
    //     return false;
    // }

    if(type === 'prev' && step == 1){
      return false
    }
    if(type === "next"){
      setStep(step+1);
    } else {
      setStep(step-1);
    }
  }

  return (
      <>
      {/* <AuthLayout heading='New Stream'> */}
        <div className='create-stream-form m-auto mt-4 md:mt-6 lg:mt-10 '>
            <div className={`${status ? "" : "disabled"} pages-steps  lg:max-w-[700px] m-auto`} >
                
                <div className={step === 1 ? "" : "hidden"}>
                    {status === 'notactive' ? <ConnectYoutube  /> :
                      <>
                        {channel && channel.snippet ?  
                        <div className=" mb-6 sm:flex items-center justify-between youtube-wrap bg-white p-3 rounded-xl" >
                          <div className='sm:flex items-center'>
                            <img alt="" src={channel && channel.snippet.thumbnails.high.url}
                              className="mx-auto h-20 w-20  rounded-[50%] object-cover"
                            />
                            <div className='ps-3'>
                            <div className='flex justify-center '><FaYoutube size="3rem" color='red' /></div>
                              <h2 className='text-center sm:text-start '>{channel && channel?.snippet?.localized?.title || ''  }</h2>
                            </div>
                          </div>
                          <div className="">
                            <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-md">
                              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <div className="mt-1.5 sm:mt-0">
                                  <p className="font-bold text-lg text-center">{channel && channel?.statistics?.viewCount || ''  }</p>
                                  <p className="text-gray-500 text-center">Views Count</p>
                                </div>
                              </div>
                              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <div className="mt-1.5 sm:mt-0">
                                  <p className="font-bold text-lg text-center">{channel && channel?.statistics?.videoCount || ''  }</p>
                                  <p className="text-gray-500 text-center">Video Count</p>
                                </div>
                              </div>
                              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <div className="mt-1.5 sm:mt-0">
                                  <p className="font-bold text-lg text-center">{channel && channel?.statistics?.subscriberCount || ''  }</p>
                                  <p className="text-gray-500 text-center">Subscribers</p>
                                </div>
                              </div>
                            </div>
                            <div className='flex justify-center '>
                              <button onClick={removeAccount} className='text-main mt-4 text-center' >Unlink this Account</button>
                            </div>
                          </div>
                        </div>
                        : ""} 
                      </> 
                    }
                    <div className='grid sm:grid-cols-2 gap-5 my-4'>
                      <div onClick={()=>setStreamType("video")} className={`${streamType === 'video' ? "border-[var(--main)]" : "bg-dark2 border-gray-600"} cursor-pointer bg-dark2  border  sm:p-4 p-8 rounded-3xl`}>
                        <FiVideo size={'3rem'} color='#ccc' />
                        <h2 className={`${streamType === 'video' ? "text-white" : "text-gray-400"} mt-4  text-xl font-bold mb-2`}>24/7 Video background</h2>
                        <p className='text-gray-400'>Create a 24/7 stream with multiple video background and music by your choice.</p>
                      </div>
                      <div onClick={()=>setStreamType("image")} className={`${streamType === 'image' ? "border-[var(--main)]" : "bg-dark2 border-gray-600"} cursor-pointer bg-dark2  border  sm:p-4 p-8 rounded-3xl`}>
                        <LuImage size={'3rem'} color='#ccc' />
                        <h2 className={`${streamType === 'image' ? "text-white" : "text-gray-400"} mt-4  text-xl font-bold mb-2`}>24/7 Image/GIF background</h2>
                        <p className='text-gray-400'>Create a 24/7 stream with single image/gif background and music by your choice.</p>
                      </div>
                    </div>

                    <div className='stream-input-fields' >
                      {inputFields.map((field, index) => (
                        <input required key={index} name={field.name} onChange={handleinput} type={field.password} placeholder={field.label} className="input" />
                      ))}
                      { user && user.plan && user && user.trialStatus == 'active' ?
                        <select className='input mt-6' onChange={(e)=>setData({ ...data, resolution: e.target.value})} >
                          {freeresolutions && freeresolutions.map((resolution, index) => (
                            <option key={index} value={resolution.label}>{resolution.label} ({resolution.value})</option>
                          ))}
                        </select>
                        :
                        <select className='input mt-6' onChange={(e)=>setData({ ...data, resolution: e.target.value})} >
                          {filteredResolutions && filteredResolutions.map((resolution, index) => (
                            <option key={index} value={resolution.label}>{resolution.label} ({resolution.value})</option>
                          ))}
                        </select>
                      }
                      <textarea className='input mt-6' onChange={(e)=>setData({ ...data, description:e.target.value}) } placeholder='Description' />
                    </div>

                </div>

                <div className={step === 2 ? "" : "hidden"}>
                  <UploadThumbnail update={getImageFile}  />
                  {streamType === 'video' ? 
                    <UploadVideos update={getVideos}/> 
                  : ''} 
                  
                  <UploadAudios streamType={streamType} update={getAudios} />
                </div>

                <div className={step === 3 ? "" : "hidden"}>

                  {videos && videos.length > 0 ?
                    <>
                      <h2 className='mt-8 text-white font-bold text-lg'>Arrange Videos Order</h2>
                      <p className='text-gray-400 mb-4'>Arrange the order of the videos in the stream.</p>
                      <ManageFiles update={suffleVideos} data={videos} />
                    </>
                  : <></>}  

                  {audios && audios.length > 0 ?
                    <>
                      <h2 className='mt-8 text-white font-bold text-lg'>Arrange Audios Order</h2>
                      <p className='text-gray-400 mb-4'>Arrange the order of the audios in the stream.</p>
                      <ManageFiles update={suffleAudios}  data={audios} />
                    </>
                  : <></>}

                  <h2 className='text-gray-300 mt-8 font-normal text-normal mb-3 '>Playlist Sequence</h2>
                  <div className='grid sm:grid-cols-2 gap-5 my-4'>
                    <div onClick={()=>setLoop(true)} className={`${loop === true ? "border-[var(--main)]" : "bg-dark2 border-gray-600"} cursor-pointer bg-dark2  border  p-4 sm:p-6 rounded-3xl`}>
                      <RiListOrdered2 size={'2rem'} color='#ccc' />
                      <h2 className={`${loop  === true ? "text-white" : "text-gray-500 "} mt-4 text-lg font-normal`}>Ordered Loop</h2>
                    </div>
                    <div onClick={()=>setLoop(false)} className={`${loop === false ? "border-[var(--main)]" : "bg-dark2 border-gray-600"} cursor-pointer bg-dark2  border  p-4 sm:p-6 rounded-3xl`}>
                      <RiListUnordered size={'2rem'} color='#ccc' />
                      <h2 className={`${loop  === false ? "text-white" : "text-gray-500 "} mt-4 text-lg font-normal`}>Suffled Loop</h2>
                    </div>
                  </div>
                </div>
          
                <div className="m-auto flex mt-8 w-full rounded-xl justify-between">
                  <button disabled={step < 2} onClick={()=>handleStep("prev")} className='bg-gray-700 rounded-[30px] text-gray-300 px-6 py-2' >Back</button>
                  {step < 3 ? 
                    <button onClick={()=>handleStep("next")}  className={`btn sm mb-0`} >Next</button>
                      : 
                    <button disabled={playlistsCreating} onClick={createPlaylist}  className={`btn sm mb-0`} >
                      {playlistsCreating ? "Processing" : "Create Stream"}
                    </button>
                  }
                </div>
                {playlistsCreating ? <p className='text-green-500 text-center my-3'>Stream creation make take several minutes. Please wait for sometime.</p> : ''}
                {loading ? <p className='text-green-500 text-center my-3'>Almost done !! Stream initilized successfully.</p> : ''}
            </div>

        </div>
      {/* </AuthLayout> */}
      </>
  )
}
