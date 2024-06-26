import React, { useContext,useState } from 'react'
import AuthLayout from '../../../layout/AuthLayout';
import Endpoints from '../../../api/Endpoints';
import { UserContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FiVideo } from "react-icons/fi";
import { LuImage } from "react-icons/lu";
import { RiListUnordered } from "react-icons/ri";
import UploadThumbnail from './UploadThumbnail';
import UploadVideos from './UploadVideos';
import UploadAudios from './UploadAudios';
import ManageFiles from './ManageFiles';
import Api from '../../../api/Api';
import { RiListOrdered2 } from "react-icons/ri";
import CheckYoutube from './CheckYoutube';
const resolutions = [
  { title:"2160p 3840x2160" ,label: '2160p', value: '3840x2160' },
  { title:"1080p 1920x1080 " ,label: '1080p', value: '1920x1080' },
  { title:"720p 1280x720" ,label: '720p', value: '1280x720' },
  { title:"1080x720 720x1080" ,label: '720x1080', value: '720x1080' },
];
const freeresolutions = [
  { title:"1080p 1920x1080 " ,label: '1080p', value: '1920x1080' },
];

export default function CreateStreamForm() {
    const [status, setStatus] = useState();
    const {Errors, user} = useContext(UserContext);
    const [streamType, setStreamType] = useState("video");
    const [loop, setLoop] = useState(true);

    const filterLabels = user && user.plan && user.plan.resolutions ? JSON.parse(user.plan.resolutions) : [];
    const filteredResolutions = resolutions.filter(resolution => filterLabels.includes(resolution.label));
    console.log(filteredResolutions);


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const inputFields = [
    { type:"text", name:"title", label:"Stream Name" },
  ];

  const [videos, setVideos] = useState([]);
  const [audios, setaudios] = useState([]);
  const [image, setImage] = useState(null);
  const [radio, setRadio] = useState(null);

  const [data, setData] = useState({
    title: "",
    videos: videos,
    audios: audios,
    thumbnail: "",
    resolution: "1080p",
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
  const removeUploadedAudio = (l) => {
    const temp = audios;
    const removed = temp.filter(f => f.name !== l.name);
    setaudios(removed);
    console.log("updated uploaded audio files removed", removed);
}

  const [cloudVideos, setCloudVideos] = useState([]);
  const getCloudFiles = (array) => {
    setCloudVideos(array);
  }

  const [cloudAudios, setCloudAudios] = useState([]);
  const getCloudAudio = (array) => {
    setCloudAudios(array);
  }

  const removeUploadedVideo = (l) => {
      const temp = videos;
      const removed = temp.filter(f => f.name !== l.name);
      setVideos(removed);
      console.log("updated upload files removed", removed);
  }
  const getVideos = (array) => {
    const tmp = videos;
    tmp.push(array);
    setVideos(tmp);
    console.log("final video array tmp",tmp)
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

  const [streamStarted, setStreamStarted] = useState(false);
  const createPlaylist = async (e) => {
    setStreamStarted(true);
    setPlaylistsCreating(true);
    let mp4 = [];
    videos.forEach(video => {
      mp4.push(video.url);
    });
    let mp3 = [];
    audios.forEach(audio => {
      mp3.push(audio.url);
    });
    const resp = Api.post(`/create-playlist`,{
        "type": videos.length < 1 ? 'image' : streamType,
        "videos": mp4,
        "audios": mp3.length ? mp3 : false,
        "thumbnail": image,
        "radio":radio,
        "loop":loop
    });
    resp.then(res => {
      if(res.data.status){
        if(res.data.playlistId){
          setPlaylist(res.data);
          handleCreateStream({
            title: data.title,
            video: res.data.video,
            audio: res.data.audio,
            playlistId: res.data.playlistId,
            type:streamType,
            thumbnail: image,
            resolution: data.resolution,
            description: data.description,
            ordered : loop,
            radio:radio,
            audios: mp3,
            videos: mp4,
          })
        } else {
          toast.error(res.data.message);
        }
      } else {
        setStreamStarted(false);
      }
      setPlaylistsCreating(false);
    }).catch(err => {
      Errors(err);
      setPlaylistsCreating(false);
      setStreamStarted(false);
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
        setStreamStarted(false);
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    }).catch(err => {
      Errors(err);
      setStreamStarted(false);
      setLoading(false);
    });
  }

 

  const [step, setStep] = useState(1);
  const handleStep = (type) => {
    // if(type === "next" && step === 1 && data.title === ''  ){
    //     toast.error("Stream title is required.");
    //     return false;
    // }
    // if(type === "next" && step === 1 && data.description === ''  ){
    //     toast.error("Stream description is required.");
    //     return false;
    // }
    // if(type === "next" && step === 2 && !image  ){
    //     toast.error("Please select a thumbnail for video stream.");
    //     return false;
    // }
    // if(type === "next" && step === 2 && streamType === 'video' && videos.length < 1  ){
    //     toast.error("Please select atleast one video for this stream.");
    //     return false;
    // }
   
    // if (type === "next" && step === 2 && streamType === 'image' && (!audios || audios.length === 0) && (!radio || radio.length === 0)) {
    //   toast.error("Please choose songs or any sound effect for this stream.");
    //   return false;
    // }

    if(type === 'prev' && step === 1){
      return false
    }
    if(type === "next"){
      setStep(step+1);
    } else {
      setStep(step-1);
    }
  }

  const LOADING = () => {
    return <div className="filter-blur z-10 bg-[#0009] h-screen w-screen fixed top-0 left-0 flex justify-center items-center">
      <div className="wraps p-8" >
        <div class="grid w-full h-full place-items-center overflow-x-scroll rounded-lg lg:overflow-visible">
        <svg class="w-16 h-16 animate-spin text-gray-400" viewBox="0 0 64 64" fill="none"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
        </path>
        </svg>
        </div>
        {playlistsCreating ? <p className='text-green-500 text-lg text-center my-3'>Creating Live Stream..</p> : ''}
        {loading ? <p className='text-green-500 text-lg text-center my-3'>Almost done !!. Waiting for connection. </p> : ''}
      </div>
    </div>
  }

  return (
      <>
      <AuthLayout heading='New Stream'>
        <div className='create-stream-form m-auto mt-4 md:mt-6 lg:mt-10 '>
            <div className={`${status ? "" : "disabled"} pages-steps  lg:max-w-[700px] m-auto`} >
                <div className={step === 1 ? "" : "hidden"}>
                    <CheckYoutube set={setStatus} />
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
                    <UploadVideos getCloudFiles={getCloudFiles} removeUploadedVideo={removeUploadedVideo}  update={getVideos}/> 
                  : ''} 
                  <UploadAudios getCloudFiles={getCloudAudio} removeUploadedAudio={removeUploadedAudio} setRadio={setRadio} streamType={streamType} update={getAudios} />
                </div>

                <div className={step === 3 ? "" : "hidden"}>
                  {/* {videos && videos.length > 0 ?
                    <> */}
                      <h2 className='mt-8 text-white font-bold text-lg'>Arrange Videos Order</h2>
                      <p className='text-gray-400 mb-4'>Arrange the order of the videos in the stream.</p>
                      <ManageFiles update={suffleVideos} data={videos} />
                    {/* </>
                  : <></>}   */}

                  {audios && audios.length > 0 ?
                    <>
                      <h2 className='mt-8 text-white font-bold text-lg'>Arrange Audios Order</h2>
                      <p className='text-gray-400 mb-4'>Arrange the order of the audios in the stream.</p>
                      <ManageFiles update={suffleAudios}  data={audios} />
                    </>
                  : <></>}

                  <h2 className='text-gray-300 mt-8 font-normal text-normal mb-3 '>Playlist Sequence</h2>
                  <div className='grid sm:grid-cols-2 gap-5 my-4'>
                    <div onClick={()=>setLoop(true)} className={`${loop === true ? "border-[var(--main)]" : "bg-dark2 border-gray-600"} ${radio !== '' ? 'disableds' : ''} cursor-pointer bg-dark2  border  p-4 sm:p-6 rounded-3xl`}>
                      <RiListOrdered2 size={'2rem'} color='#ccc' />
                      <h2 className={`${loop  === true ? "text-white" : "text-gray-500 "} mt-4 text-lg font-normal`}>Ordered Loop</h2>
                    </div>
                    <div onClick={()=>setLoop(false)} className={`${loop === false ? "border-[var(--main)]" : "bg-dark2 border-gray-600"} ${radio !== '' ? 'disableds' : ''} cursor-pointer bg-dark2  border  p-4 sm:p-6 rounded-3xl`}>
                      <RiListUnordered size={'2rem'} color='#ccc' />
                      <h2 className={`${loop  === false ? "text-white" : "text-gray-500 "} mt-4 text-lg font-normal`}>Suffled Loop</h2>
                    </div>
                  </div>
                </div>
          
                {<div className="m-auto flex mt-8 w-full rounded-xl justify-between">
                  <button disabled={step < 2} onClick={()=>handleStep("prev")} className='bg-gray-700 rounded-[30px] text-gray-300 px-6 py-2' >Back</button>
                  {step < 3 ? 
                    <button onClick={()=>handleStep("next")}  className={`btn sm mb-0`} >Next</button>
                      : 
                    <button disabled={playlistsCreating} onClick={createPlaylist}  className={`btn sm mb-0`} >
                      {playlistsCreating ? "Processing" : "Create Stream"}
                    </button>
                  }
                </div>}

                {streamStarted ? <LOADING /> : ''}
               
            </div>
        </div>
      </AuthLayout>
      </>
  )
}
