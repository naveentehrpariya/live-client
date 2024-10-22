import React, { useContext,useEffect,useMemo,useState } from 'react'
import Endpoints from '../../../api/Endpoints';
import { UserContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FiVideo } from "react-icons/fi";
import { LuImage } from "react-icons/lu";
import { ImYoutube2 } from "react-icons/im";
 
import UploadVideos from './UploadVideos';
import UploadAudios from './UploadAudios';
import ManageFiles from './ManageFiles';
import Api from '../../../api/Api';
import { RiListOrdered2 } from "react-icons/ri";
import CheckYoutube from './CheckYoutube';
import StreamLayout from '../../../layout/StreamLayout';
import create_stream from '../../../img/create-stream.png';
import video from '../../../img/videostream.png';
import images from '../../../img/imagestream.png';
import { FaYoutube } from "react-icons/fa";




const resolutions = [
  { title:"1080p 1920x1080 " ,label: '1080p', value: '1920x1080' },
  { title:"2160p 3840x2160" ,label: '2160p', value: '3840x2160' },
  { title:"720p 1280x720" ,label: '720p', value: '1280x720' },
  { title:"Shorts 720x1080" ,label: '720x1080', value: '720x1080' },
];

const resolutionsTitle = {
  "1080p":"1080p 1920x1080",
  "2160p":"2160p 3840x2160",
  "720p":"720p 1280x720",
  "720x1080":"Shorts 720x1080",
};


 

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

  useMemo(() => {
    setCombineAudios([...audios, ...cloudAudios]);
    console.log("COMBINED AUDIOS",[...audios, ...cloudAudios])
  }, [audios, cloudAudios]);

  useMemo(() => {
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
    platformtype :""
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
    setCombineVideos((prev)=>[...videos, ...prev]);
  }
  
  const getAudios = (array) => {
    const tmp = audios;
    tmp.push(array);
    setCombineAudios((prev) => [...tmp, ...prev]);
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
            stream_url: data.stream_url,
            streamkey: data.streamkey,
          })
        } else {
          toast.error(res.data.message);
        }
      } else {
        setStreamStarted(false);
        toast.error(res.data.message);
      }
      setPlaylistsCreating(false);
    }).catch(err => {
      Errors(err);
      toast.error(err?.data?.message || "Please try again");
      setPlaylistsCreating(false);
      setStreamStarted(false);
    });
  }

  const handleCreateStream = (payload) => {
    setLoading(true);
    const m = new Endpoints();
    const resp = data.platformtype === 'rtmp' ? m.create_rtmp_stream(payload) : m.create_stream(payload);
    resp.then(res => {
      if(res.data.status){
        toast.success(res.data.message);
        navigate('/home');
        setStreamStarted(false);
      } else {
        setStreamStarted(false);
        toast.error(res.data.message);
      }
      setLoading(false);
    }).catch(err => {
      Errors(err);
      setStreamStarted(false);
      setLoading(false);
    });
  }

  const [step, setStep] = useState(-1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleStep = (type) => {
    console.log("data",data)
    if(type === "next" && step === 1 && data.title === ''  ){
        toast.error("Stream title is required.");
        return false;
    }

    if( type === "next" && step === 1 && data.thumbnail === ''  ){
        toast.error("Please choose a thumbnail for the stream.");
        return false;
    }

    if(data.platformtype === 'rtmp' && type === "next" && step === 1 && data.stream_url === ''  ){
        toast.error("Stream URL is required.");
        return false;
    }

    if(data.platformtype === 'rtmp' && type === "next" && step === 1 && data.streamkey === ''  ){
        toast.error("Stream key is required.");
        return false;
    }

    if(data.platformtype === 'youtube' && type === "next" && step === 1 && data.description === ''  ){
        toast.error("Stream description is required.");
        return false;
    }

    if(data.platformtype === 'youtube' && type === "next" && step === 2 && !image  ){
        toast.error("Please select a thumbnail for video stream.");
        return false;
    }
    
    const v = [...combineVideos, ...videos, ...cloudVideos];
    const aud = [...combineAudios, ...audios, ...cloudAudios];
    if(type === "next" && step === 2 && streamType === 'video' && v.length < 1 ){
        toast.error("Please select atleast one video for this stream.");
        return false;
    }
   
    if(type === "next" && step === 2 && streamType === 'audio' && aud.length < 1 ){
        toast.error("Please select atleast one audio for this stream.");
        return false;
    }
    if(type === 'prev' && step === -1){
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
  const STEPS = () => {
    return <>
      {step > 0 ? <div className="m-auto flex mt-8 w-full rounded-xl justify-between">
          <button onClick={()=>handleStep("prev")} className='bg-gray-700 rounded-[30px] text-gray-300 px-6 py-2' >Back</button>
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

  const chooseMedia = () => { 
    if(data.platformtype === 'youtube' && status === 'notactive'){
      toast.error('Please Connect Your Youtube Account First');
      return false;
    } else {
      setStep(1);
    }
  }
  const CreateStreamPage = () => {
    const proceedSteps = () => { 
      if(data.platformtype === ''){
        return false
      }
      setStep(0);
    }
    return (
        <div className='bg-dark1 w-full rounded-[30px] p-4 max-w-[700px] pt-[50px] md:pt-0  min-h-[90vh] md:flex items-center'>
          <div className='w-full'>
              <h2 className='font-bold text-white text-center mb-8 md:mb-12 text-[23px]'>Choose Stream Server</h2>
              <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div onClick={()=>setData(prev => ({...prev, platformtype: "youtube"}))} className={` ${data.platformtype === 'youtube' ? "bg-main" : "bg-dark2"} cursor-pointer chooseYt min-h-[120px]  py-4 px-6 w-full rounded-2xl`}>
                    <div className='flex leading-5 items-center justify-center'>
                      <ImYoutube2 className='max-h-[100px]' color='#fff' size={'10rem'} />
                    </div>
                    <h2 className='text-center text-white'>Youtube Stream</h2>
                </div>
                <div onClick={()=>setData(prev => ({...prev, platformtype: "rtmp"}))} className={` ${data.platformtype === 'rtmp' ? "bg-main": "bg-dark2"} cursor-pointer chooseYt   py-4 px-6  rounded-2xl`}>
                      <div className='w-full min-h-[100px] flex items-center justify-center'>
                        <h2 className='ps-3  text-5xl text-white font-bold'>Others</h2>
                      </div>
                      <h2 className='text-center text-white'>Custom RTMP Server</h2>
                </div>
                  
              </div>
              <div className='flex justify-center mt-8' >
                <button  onClick={proceedSteps} 
                className={`${data.platformtype === '' ? 'disabled' : ''} ${(user && (user.streamLimit > 0 || user?.trialStatus === "active")) ? '' : 'disabled'} btn mt-4 sm:mt-0 btn-main lg`}  >
                    Create New Stream
                </button>
              </div> 
          </div>
        </div>
    )
  }


  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState('');

  const removeFile = async (e) => {
     setFile(null);
     getImageFile(null);
     setSrc(false)
  }
  const handleFile = async (e) => {
     setFile(e.target.files[0]);
     UploadMedia(e.target.files[0]);
  }
  
  const [progress, setProgress] = useState(0);
  async function UploadMedia(f) {
     if (!f) return;
     setUploading(true);
     const m = new Endpoints();
     const fdata = new FormData();
     fdata.append('file', f);
     const resp = m.uploadMedia(fdata, setProgress);
     resp.then((res)=>{
     if(res.data.file_data.url)
        setProgress(100);
        getImageFile(res.data.file_data.url);
        setUploading(false)
     }).catch((err)=>{
        console.log(err)
        toast.error('File upload failed'); 
        setUploading(false)
     });
  }
   

  return (
    <StreamLayout step={step} heading='New Stream' disabled={playlistsCreating} onclick={createPlaylist}>
      <div className='create-stream-form m-auto px-6 pb-6'>
          <div className={`pages-steps lg:max-w-[1100px] m-auto`} >
              <div className={`${step < 0 ? "" : "hidden"}`}>
                <div className={`md:flex justify-center w-full`}>
                  <CreateStreamPage setStep={setStep} />
                </div>
              </div>
              <div className={step === 0 ? "" : "hidden"}>
                  <div className='min-h-[80vh] max-w-[800px] m-auto pt-6 lg:flex justify-center items-center' >
                    <div>
                      {data.platformtype === 'youtube' ? <CheckYoutube set={setStatus} /> : ''}
                      <div className={`grid sm:grid-cols-2 gap-5 my-4 `}>
                        <div onClick={()=>setStreamType("video")} className={`relative ${streamType === 'video' ? "border-[var(--main)]" : " border-gray-600"} cursor-pointer bg-black2 border  sm:p-4 p-8 rounded-3xl`}>
                          <img src={video} className='max-h-[170px] w-full m-auto' alt="video" />
                          <h2 className={`${streamType === 'video' ? "text-white" : "text-gray-400"} mt-4 text-lg mb-1`}>24/7 Video background</h2>
                          <p className='text-gray-400 text-sm'>Create a 24/7 stream with multiple video background and music by your choice.</p>
                          {streamType === 'video' ? <div className='absolute -top-2 -right-2' ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.31471 0.35437C4.75364 0.35437 3.25652 0.9745 2.15268 2.07834C1.04884 3.18218 0.428711 4.6793 0.428711 6.24037V18.0124C0.428711 19.5734 1.04884 21.0706 2.15268 22.1744C3.25652 23.2782 4.75364 23.8984 6.31471 23.8984H18.0867C19.6478 23.8984 21.1449 23.2782 22.2487 22.1744C23.3526 21.0706 23.9727 19.5734 23.9727 18.0124V6.24037C23.9727 4.6793 23.3526 3.18218 22.2487 2.07834C21.1449 0.9745 19.6478 0.35437 18.0867 0.35437H6.31471ZM16.5917 10.5772C16.6974 10.4643 16.7799 10.3317 16.8344 10.187C16.8889 10.0423 16.9144 9.88824 16.9093 9.73368C16.9043 9.57911 16.8689 9.42704 16.8051 9.28616C16.7413 9.14528 16.6504 9.01835 16.5375 8.91261C16.4247 8.80687 16.2921 8.72439 16.1474 8.66989C16.0026 8.61538 15.8486 8.58992 15.694 8.59494C15.5394 8.59997 15.3874 8.6354 15.2465 8.69919C15.1056 8.76299 14.9787 8.85391 14.8729 8.96676L11.2436 12.8397L9.45077 11.247C9.21587 11.0517 8.91426 10.9554 8.60966 10.9784C8.30506 11.0014 8.02131 11.1418 7.81837 11.3702C7.61543 11.5985 7.50918 11.8967 7.52207 12.2019C7.53496 12.5071 7.66598 12.7953 7.88745 13.0057L10.5361 15.3601C10.7653 15.5637 11.0649 15.6699 11.3711 15.656C11.6774 15.6422 11.9661 15.5094 12.176 15.286L16.5917 10.5772Z" fill="#E13939"/>
                            </svg></div>
                          : ""}
                        </div>
                        <div onClick={()=>setStreamType("image")} className={`relative ${streamType === 'image' ? "border-[var(--main)]" : " border-gray-600"} cursor-pointer bg-black2   border  sm:p-4 p-8 rounded-3xl`}>
                        <img src={images} className='max-h-[170px] w-full m-auto' alt="video" />
                          <h2 className={`${streamType === 'image' ? "text-white" : "text-gray-400"} mt-4  text-lg mb-1`}>24/7 Image/GIF background</h2>
                          <p className='text-gray-400 text-sm'>Create a 24/7 stream with single image/gif background and music by your choice.</p>
                          {streamType === 'image' ? <div className='absolute -top-2 -right-2' > <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.31471 0.35437C4.75364 0.35437 3.25652 0.9745 2.15268 2.07834C1.04884 3.18218 0.428711 4.6793 0.428711 6.24037V18.0124C0.428711 19.5734 1.04884 21.0706 2.15268 22.1744C3.25652 23.2782 4.75364 23.8984 6.31471 23.8984H18.0867C19.6478 23.8984 21.1449 23.2782 22.2487 22.1744C23.3526 21.0706 23.9727 19.5734 23.9727 18.0124V6.24037C23.9727 4.6793 23.3526 3.18218 22.2487 2.07834C21.1449 0.9745 19.6478 0.35437 18.0867 0.35437H6.31471ZM16.5917 10.5772C16.6974 10.4643 16.7799 10.3317 16.8344 10.187C16.8889 10.0423 16.9144 9.88824 16.9093 9.73368C16.9043 9.57911 16.8689 9.42704 16.8051 9.28616C16.7413 9.14528 16.6504 9.01835 16.5375 8.91261C16.4247 8.80687 16.2921 8.72439 16.1474 8.66989C16.0026 8.61538 15.8486 8.58992 15.694 8.59494C15.5394 8.59997 15.3874 8.6354 15.2465 8.69919C15.1056 8.76299 14.9787 8.85391 14.8729 8.96676L11.2436 12.8397L9.45077 11.247C9.21587 11.0517 8.91426 10.9554 8.60966 10.9784C8.30506 11.0014 8.02131 11.1418 7.81837 11.3702C7.61543 11.5985 7.50918 11.8967 7.52207 12.2019C7.53496 12.5071 7.66598 12.7953 7.88745 13.0057L10.5361 15.3601C10.7653 15.5637 11.0649 15.6699 11.3711 15.656C11.6774 15.6422 11.9661 15.5094 12.176 15.286L16.5917 10.5772Z" fill="#E13939"/>
                            </svg></div>
                          : ""}
                        </div>
                      </div>
                      <div className='flex justify-center pt-4 mt-4' >
                        <button onClick={chooseMedia} className={`btn mt-0 sm:mt-0 btn-main lg mb-6`} >Choose Media</button>
                      </div>
                      <div className='flex justify-center'>
                        <button onClick={()=>setStep(-1)} className={`text-main`}>Choose another platform</button>
                      </div>
                    </div>
                  </div>
              </div>

              <div className={step === 1 ? "" : "hidden"}>
                <div className='pt-[20px] md:pt-0 min-h-[90vh] md:flex items-center' >
                  <div className=' m-auto' >
                    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
                      <div className='part1'>
                        <>
                          {src  ? 
                              <div className='selectedMedia w-full border border-gray-600 mb-6 thumbnailsize max-h-[400px] rounded-3xl overflow-hidden relative' >
                                <button onClick={removeFile} className='bg-red-800 rounded-xl px-3 py-2 text-sm text-white absolute top-2 right-2 z-[2]'>Remove</button>
                                <img className="w-full h-full object-cover " src={src} alt="Cloud" />
                              </div> :  
                              <div className="flex justify-center w-full mx-auto mb-4">
                                <div className="relative w-full sm:rounded-lg">
                                    {file ? <>
                                      <div className='selectedMedia border border-gray-600 mb-6 w-full h-full max-h-[400px] rounded-2xl overflow-hidden relative' >
                                          <button onClick={removeFile} className='bg-red-800 rounded-xl px-3 py-2 text-sm text-white absolute top-2 right-2 z-[2]'>Remove</button>
                                          <img className="img-fluid m-auto table object-cover w-full h-full " src={URL.createObjectURL(file)} alt="Cloud" />
                                      </div>
                                    </> :
                                      <div class="flex items-center justify-center w-full">
                                          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-[280px] 
                                          border-gray-700 border-2
                                          border-dashed rounded-xl cursor-pointer hover:bg-dark3 ">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p class="mb-2 text-xl text-gray-400 font-normal ">Upload Stream Thumbnail</p>
                                                <p class="mb-2 text-normal text-gray-500 "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p class="text-normal text-gray-500 ">PNG, JPG or GIF (MAX. 1200x767px)</p>
                                            </div>
                                            <input onChange={handleFile} accept="image/*" id="dropzone-file" type="file" class="hidden" />
                                          </label>
                                      </div>
                                    }
                                    {uploading ? 
                                      <div class="bg-[#0007] top-0 left-0 w-full flex justify-center items-center h-full absolute mb-2">
                                      <div className='text-center p-4'>
                                            <svg class="w-16 h-16 animate-spin m-auto text-gray-400" viewBox="0 0 64 64" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                                <path
                                                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path
                                                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                                                </path>
                                            </svg>
                                            <p className='text-center text-lg text-white max-w-[200px] mt-2'>Thumbnail is being uploading..</p>
                                          </div> 
                                      </div> 
                                    : ""}
                                </div>
                              </div>
                          }
                        </>

                        { data.platformtype === 'rtmp' ?
                        <p className='text-green-600 !mb-6 md:mb-0'>Note : In custom RTMP server thumbnail will only use for system. This will not update on live stream.</p> : "" }
                      </div>
                      <div className='part2 stream-input-fields' >

                        {inputFields.map((field, index) => (
                          <input required key={index} name={field.name} onChange={handleinput} type={field.password} placeholder={field.label} className="input" />
                        ))}

                        { data.platformtype === 'rtmp' ? <>
                          <input name={'streamkey'} onChange={handleinput} type={'text'} placeholder={"Enter Stream Key"} className="input !mt-4" />
                          <input name={'stream_url'} onChange={handleinput} type={'text'} placeholder={"Enter Stream URL"} className="input !mt-4" />
                        </> : ''}

                        { user && user?.trialStatus === "active" ?
                          <select className='input mt-6' onChange={(e)=>setData({ ...data, resolution: e.target.value})} >
                              <option value={'720x1080'}>720x1080</option>
                          </select> 
                          :
                          <select className='input mt-6' onChange={(e)=>setData({ ...data, resolution: e.target.value})} >
                            {user && user.allowed_resolutions && user.allowed_resolutions.map((resolution, index) => (
                              <option key={index} value={resolution}>{resolutionsTitle[resolution]}</option>
                            ))}
                          </select>
                        } 

                        {data.platformtype === 'youtube' ?
                          <textarea className='input mt-6' onChange={(e)=>setData({ ...data, description:e.target.value}) } placeholder='Description' />
                        : ''}
                      </div>
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
