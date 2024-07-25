import React, { useContext,useEffect,useState } from 'react'
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
import StreamLayout from '../../../layout/StreamLayout';
import CreateStreamPage from './CreateStreamPage';
import video from '../../../img/videostream.png';
import images from '../../../img/imagestream.png';




const resolutions = [
  { title:"1080p 1920x1080 " ,label: '1080p', value: '1920x1080' },
  { title:"2160p 3840x2160" ,label: '2160p', value: '3840x2160' },
  { title:"720p 1280x720" ,label: '720p', value: '1280x720' },
  { title:"Shorts 720x1080" ,label: '720x1080', value: '720x1080' },
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

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const inputFields = [
    { type:"text", name:"title", label:"Stream Name" },
  ];
  const [cloudVideos, setCloudVideos] = useState([]);
  const [cloudAudios, setCloudAudios] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setaudios] = useState([]);
  const [image, setImage] = useState(null);
  const [radio, setRadio] = useState(null);
  const [combineVideos, setCombineVideos] = useState([]);
  const [combineAudios, setCombineAudios] = useState([]);

  useEffect(() => {
    setCombineAudios([...audios, ...cloudAudios]);
    console.log("COMBINED AUDIOS",[...audios, ...cloudAudios])
  }, [audios, cloudAudios]);

  useEffect(() => {
    setCombineVideos([...videos, ...cloudVideos]);
    console.log("COMBINED VIDEOS",[...videos, ...cloudVideos])
  }, [videos, cloudVideos]);

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
    setCombineVideos(array);
  }
  const suffleAudios = (array) =>{ 
    setCombineAudios(array);
  }
  const removeUploadedAudio = (l) => {
    const temp = audios;
    const removed = temp.filter(f => f.name !== l.name);
    setaudios(removed);
    console.log("updated uploaded audio files removed", removed);
  }

  const getCloudFiles = (array) => {
    setCloudVideos(array);
    console.log("cloud videos updated",array)
  }

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
    combineVideos.forEach(video => {
      mp4.push(video.url);
    });

    let mp3 = [];
    combineAudios.forEach(audio => {
      mp3.push(audio.url);
    });

    const resp = Api.post(`/create-playlist`,{
        "type": combineVideos.length < 1 ? 'image' : streamType,
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
            audios: combineAudios,
            videos: combineVideos,
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

  const [step, setStep] = useState(0);
  const handleStep = (type) => {
    if(type === "next" && step === 1 && data.title === ''  ){
        toast.error("Stream title is required.");
        return false;
    }
    if(type === "next" && step === 1 && data.description === ''  ){
        toast.error("Stream description is required.");
        return false;
    }
    if(type === "next" && step === 2 && !image  ){
        toast.error("Please select a thumbnail for video stream.");
        return false;
    }

    
    const v = [...combineVideos, ...videos, ...cloudVideos];
    if(type === "next" && step === 2 && streamType === 'video' && v.length < 1 ){
        toast.error("Please select atleast one video for this stream.");
        return false;
    }
   
    const aud = [...combineAudios, ...audios, ...cloudAudios];
    if(type === "next" && step === 2 && streamType === 'audio' && aud.length < 1 ){
        toast.error("Please select atleast one audio for this stream.");
        return false;
    }
    if(type === 'prev' && step === 1){
      return false
    }
    if(type === "next"){
      setStep(step+1);
    } else {
      setStep(step-1);
    }
    const wrapper = document.querySelector('.main-wrap');
    wrapper && wrapper.scrollTo(0, 0);
  }

  const LOADING = () => {
    return <div className="filter-blur z-10 bg-[#0009] h-screen w-screen fixed top-0 left-0 flex justify-center items-center">
      <div className="wraps p-8" >
        <div class="grid w-full h-full place-items-center rounded-lg">
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


  const STEPS = () => {
    return <>
      {step > 0 ? <div className="m-auto flex mt-8 w-full rounded-xl justify-between">
          <button disabled={step < 1} onClick={()=>handleStep("prev")} className='bg-gray-700 rounded-[30px] text-gray-300 px-6 py-2' >Back</button>
          {step < 3 ? 
            <button onClick={()=>handleStep("next")}  className={`btn sm mb-0`} >Next</button>
              : 
            <button disabled={playlistsCreating} onClick={createPlaylist}  className={`btn sm mb-0`} >
              {playlistsCreating ? "Processing" : "Start Stream"}
            </button>
          }
        </div> : ''}
      </>
  }
  return (
    <StreamLayout heading='New Stream' disabled={playlistsCreating} onclick={createPlaylist}>
      <div className='create-stream-form m-auto px-6 pb-6'>
          <div className={`${status ? "" : "disabled"} pages-steps  lg:max-w-[1100px] m-auto`} >
            
              <div className={step === 0 ? "" : "hidden"}>
                <div className='h-full flex justify-center items-center'>
                    <CreateStreamPage setStep={setStep} />
                </div>
              </div>

              <div className={step === 'link' ? "" : "hidden"}>
                  <div className='min-h-[80vh] max-w-[800px] m-auto pt-6 lg:flex justify-center items-center' >
                    <div>
                      <CheckYoutube set={setStatus} />
                      <div className={`grid sm:grid-cols-2 gap-5 my-4 `}>
                        <div onClick={()=>setStreamType("video")} className={`relative ${streamType === 'video' ? "border-[var(--main)]" : " border-gray-600"} cursor-pointer bg-black2 border  sm:p-4 p-8 rounded-3xl`}>
                          <img src={video} className='w-full m-auto max-w-[200px]' alt="video" />
                          <h2 className={`${streamType === 'video' ? "text-white" : "text-gray-400"} mt-4 text-xl mb-2`}>24/7 Video background</h2>
                          <p className='text-gray-400'>Create a 24/7 stream with multiple video background and music by your choice.</p>
                          {streamType === 'video' ? <div className='absolute -top-2 -right-2' ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.31471 0.35437C4.75364 0.35437 3.25652 0.9745 2.15268 2.07834C1.04884 3.18218 0.428711 4.6793 0.428711 6.24037V18.0124C0.428711 19.5734 1.04884 21.0706 2.15268 22.1744C3.25652 23.2782 4.75364 23.8984 6.31471 23.8984H18.0867C19.6478 23.8984 21.1449 23.2782 22.2487 22.1744C23.3526 21.0706 23.9727 19.5734 23.9727 18.0124V6.24037C23.9727 4.6793 23.3526 3.18218 22.2487 2.07834C21.1449 0.9745 19.6478 0.35437 18.0867 0.35437H6.31471ZM16.5917 10.5772C16.6974 10.4643 16.7799 10.3317 16.8344 10.187C16.8889 10.0423 16.9144 9.88824 16.9093 9.73368C16.9043 9.57911 16.8689 9.42704 16.8051 9.28616C16.7413 9.14528 16.6504 9.01835 16.5375 8.91261C16.4247 8.80687 16.2921 8.72439 16.1474 8.66989C16.0026 8.61538 15.8486 8.58992 15.694 8.59494C15.5394 8.59997 15.3874 8.6354 15.2465 8.69919C15.1056 8.76299 14.9787 8.85391 14.8729 8.96676L11.2436 12.8397L9.45077 11.247C9.21587 11.0517 8.91426 10.9554 8.60966 10.9784C8.30506 11.0014 8.02131 11.1418 7.81837 11.3702C7.61543 11.5985 7.50918 11.8967 7.52207 12.2019C7.53496 12.5071 7.66598 12.7953 7.88745 13.0057L10.5361 15.3601C10.7653 15.5637 11.0649 15.6699 11.3711 15.656C11.6774 15.6422 11.9661 15.5094 12.176 15.286L16.5917 10.5772Z" fill="#E13939"/>
                            </svg></div>
                          : ""}
                        </div>
                        <div onClick={()=>setStreamType("image")} className={`relative ${streamType === 'image' ? "border-[var(--main)]" : " border-gray-600"} cursor-pointer bg-black2   border  sm:p-4 p-8 rounded-3xl`}>
                        <img src={images} className='w-full m-auto max-w-[200px]' alt="video" />
                          <h2 className={`${streamType === 'image' ? "text-white" : "text-gray-400"} mt-4  text-xl mb-2`}>24/7 Image/GIF background</h2>
                          <p className='text-gray-400'>Create a 24/7 stream with single image/gif background and music by your choice.</p>
                          {streamType === 'image' ? <div className='absolute -top-2 -right-2' > <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.31471 0.35437C4.75364 0.35437 3.25652 0.9745 2.15268 2.07834C1.04884 3.18218 0.428711 4.6793 0.428711 6.24037V18.0124C0.428711 19.5734 1.04884 21.0706 2.15268 22.1744C3.25652 23.2782 4.75364 23.8984 6.31471 23.8984H18.0867C19.6478 23.8984 21.1449 23.2782 22.2487 22.1744C23.3526 21.0706 23.9727 19.5734 23.9727 18.0124V6.24037C23.9727 4.6793 23.3526 3.18218 22.2487 2.07834C21.1449 0.9745 19.6478 0.35437 18.0867 0.35437H6.31471ZM16.5917 10.5772C16.6974 10.4643 16.7799 10.3317 16.8344 10.187C16.8889 10.0423 16.9144 9.88824 16.9093 9.73368C16.9043 9.57911 16.8689 9.42704 16.8051 9.28616C16.7413 9.14528 16.6504 9.01835 16.5375 8.91261C16.4247 8.80687 16.2921 8.72439 16.1474 8.66989C16.0026 8.61538 15.8486 8.58992 15.694 8.59494C15.5394 8.59997 15.3874 8.6354 15.2465 8.69919C15.1056 8.76299 14.9787 8.85391 14.8729 8.96676L11.2436 12.8397L9.45077 11.247C9.21587 11.0517 8.91426 10.9554 8.60966 10.9784C8.30506 11.0014 8.02131 11.1418 7.81837 11.3702C7.61543 11.5985 7.50918 11.8967 7.52207 12.2019C7.53496 12.5071 7.66598 12.7953 7.88745 13.0057L10.5361 15.3601C10.7653 15.5637 11.0649 15.6699 11.3711 15.656C11.6774 15.6422 11.9661 15.5094 12.176 15.286L16.5917 10.5772Z" fill="#E13939"/>
                            </svg></div>
                          : ""}
                        </div>
                      </div>
                      <div className='flex justify-center pt-4 mt-4' >
                        <button onClick={()=>setStep(1)} className={`${status ? "" : "disabled"} btn mt-0 sm:mt-0 btn-main lg mb-6`} >Choose Media</button>
                      </div>
                    </div>
                  </div>
              </div>

              <div className={step === 1 ? "" : "hidden"}>
                <div className='pt-[50px]' >
                  <div className=' m-auto' >
                      <UploadThumbnail update={getImageFile}  />
                      <div className='stream-input-fields' >
                        {inputFields.map((field, index) => (
                          <input required key={index} name={field.name} onChange={handleinput} type={field.password} placeholder={field.label} className="input" />
                        ))}
                        { user && user.plan ?
                          <select className='input mt-6' onChange={(e)=>setData({ ...data, resolution: e.target.value})} >
                          {filteredResolutions && filteredResolutions.map((resolution, index) => (
                            <option key={index} value={resolution.label}>{resolution.label} ({resolution.value})</option>
                          ))}
                          </select> 
                          :
                          <select className='input mt-6' onChange={(e)=>setData({ ...data, resolution: e.target.value})} >
                            {freeresolutions && freeresolutions.map((resolution, index) => (
                              <option key={index} value={resolution.label}>{resolution.label} ({resolution.value})</option>
                            ))}
                          </select>
                        }
                        <textarea className='input mt-6' onChange={(e)=>setData({ ...data, description:e.target.value}) } placeholder='Description' />
                      </div>
                      <STEPS />
                  </div>
                </div>
              </div>

              <div className={step === 2 ? "" : "hidden"}>
                  <div className='mt-6 bg-dark2 border border-gray-800 w-full p-6 lg:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8'>
                    <div className='system-status w-full' >
                      <p className='uppercase text-gray-100 mb-2'>System Type</p>
                      <div className='button-row flex justify-between items-center bg-dark2 border border-gray-800 p-2 rounded-3xl' >
                        <button onClick={()=>setStreamType("video")} className={`${streamType === 'video' ? "bg-main text-white rounded-3xl px-2 py-2" : "text-main"} w-full px-3 py-2 me-2`}>24/7 Video Background</button>
                        <button onClick={()=>setStreamType("image")} className={`${streamType === 'image' ? "bg-main text-white rounded-3xl px-2 py-2" : "text-main"} w-full px-3 py-2 `} >  24/7 Image/GIF Background</button>
                      </div>
                    </div>
                    <div className='system-status w-full' >
                      <p className='uppercase text-gray-100 mb-2'>Stream Loop</p>
                      <div className='button-row flex justify-between items-center bg-dark2 border border-gray-800 p-2 rounded-3xl' >
                        <button onClick={()=>setLoop(true)} className={`${loop === true ? "bg-main text-white rounded-3xl px-2 py-2" : "text-main"} w-full px-3 py-2 me-2`}>Loop Video</button>
                        <button onClick={()=>setLoop(false)} className={`${loop === false ? "bg-main text-white rounded-3xl px-2 py-2" : "text-main"} w-full px-3 py-2 `} >Suffle</button>
                      </div>
                    </div>
                  </div>
                  <div className='mt-6 w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
                      <div className={`mt-6 bg-dark2 border border-gray-800 w-full p-8 rounded-3xl`}>
                        <UploadAudios getCloudFiles={getCloudAudio} removeUploadedAudio={removeUploadedAudio} setRadio={setRadio} streamType={streamType} update={getAudios} />
                      </div>
                      <div className={`${streamType === 'video' ? '' : "disabled"}  mt-6 bg-dark2 border border-gray-800 w-full p-8 rounded-3xl`}>
                        <UploadVideos getCloudFiles={getCloudFiles} removeUploadedVideo={removeUploadedVideo}  update={getVideos}/> 
                      </div>
                  </div>
                  <STEPS />
              </div>

              <div className={step === 3 ? "" : "hidden"}>
              <div className='mt-6 bg-dark2 border border-gray-800 w-full p-6 lg:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8'>
                    <div className='system-status w-full' >
                      <p className='uppercase text-gray-100 mb-2'>System Type</p>
                      <div className='button-row flex justify-between items-center bg-dark2 border border-gray-800 p-2 rounded-3xl' >
                        <button onClick={()=>setStreamType("video")} className={`${streamType === 'video' ? "bg-main text-white rounded-3xl px-2 py-2" : "text-main"} w-full px-3 py-2 me-2`}>24/7 Video Background</button>
                        <button onClick={()=>setStreamType("image")} className={`${streamType === 'image' ? "bg-main text-white rounded-3xl px-2 py-2" : "text-main"} w-full px-3 py-2 `} >  24/7 Image/GIF Background</button>
                      </div>
                    </div>
                    <div className='system-status w-full' >
                      <p className='uppercase text-gray-100 mb-2'>Stream Loop</p>
                      <div className='button-row flex justify-between items-center bg-dark2 border border-gray-800 p-2 rounded-3xl' >
                        <button onClick={()=>setLoop(true)} className={`${loop === true ? "bg-main text-white rounded-3xl px-2 py-2" : "text-main"} w-full px-3 py-2 me-2`}>Loop Video</button>
                        <button onClick={()=>setLoop(false)} className={`${loop === false ? "bg-main text-white rounded-3xl px-2 py-2" : "text-main"} w-full px-3 py-2 `} >Suffle</button>
                      </div>
                    </div>
                  </div>
                  
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8 pb-6' >
                  <div className='mt-6 bg-dark2 border border-gray-800 w-full  p-6 lg:p-8 rounded-3xl' >
                      <h2 className=' text-white text-lg'>Arrange Videos Order</h2>
                      <p className='text-gray-400 mb-4'>Arrange the order of the videos in the stream.</p>
                      <ManageFiles update={suffleVideos} data={combineVideos} />
                  </div>
                  <div className={`${combineAudios && combineAudios.length <1 ? "disabled" : ""} mt-6 bg-dark2 border border-gray-800 w-full  p-6 lg:p-8 rounded-3xl`} >
                    <h2 className=' text-white text-lg'>Arrange Audios Order</h2>
                    <p className='text-gray-400 mb-4'>Arrange the order of the audios in the stream.</p>
                    <ManageFiles update={suffleAudios}  data={combineAudios} />
                  </div>
                </div>
                  <STEPS />
              </div>

              {streamStarted ? <LOADING /> : ''}
              
          </div>
      </div>
    </StreamLayout>
  )
}
