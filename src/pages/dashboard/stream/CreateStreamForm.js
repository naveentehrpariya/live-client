import React, { useContext, useEffect, useState } from 'react'
import AuthLayout from '../../../layout/AuthLayout'
import Endpoints from '../../../api/Endpoints';
import { UserContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import MyFiles from './MyFiles';
import ConnectYoutube from './ConnectYoutube';
import { FaYoutube } from "react-icons/fa";
import { FiVideo } from "react-icons/fi";
import { LuImage } from "react-icons/lu";
import { MdDragIndicator } from "react-icons/md";

export default function CreateStreamForm() {
    const {Errors, user} = useContext(UserContext);
    const [streamType, setStreamType] = useState("video");
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
    // { type:"text", name:"description", label:"Description" }
    // { type:"text", name:"stream_url", label:"Stream URL" },
  ];

  const [data, setData] = useState({
    title: "",
    video: "",
    audio: "",
    thumbnail: "",
    resolution: "",
    stream_url: "",
    streamkey: "",
    description: "",
  });

  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);

  const getImageFile = (image) => {
    setImage(image);
    setData({ ...data, ["thumbnail"]:image});
  }

  const getVideoFile = (video) => {
    setVideo(video);
    setData({ ...data, ["video"]:video});
  }

  const handleinput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value});
  }

  const handleCreateStream = (e) => {
    if(video === null || video === ''){
      toast.error("Please select a video");
      return false;
    }
    setLoading(true);
    const m = new Endpoints();
    const resp = m.create_stream(data);
    resp.then(res => {
      if(res.data.status){
        toast.success(res.data.message);
        navigate('/home');
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    }).catch(err => {
      console.log("catch")
      Errors(err);
      console.log("err",err)
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
    if(type === "next" &&  step === 2 && video === null || video === '') {
      toast.error("Please select a video");
      return false;
    }
    if(type === "next"  && step === 3 && image === null || image === '') {
      toast.error("Please select a thumbnail for this video.");
      return false;
    }
    if(type === 'prev' && step == 1){
      return false
    }
    if(type === "next"){
      setStep(step+1);
    } else {
      setStep(step-1);
    }
  }
  console.log("channel",channel)
  return (
<<<<<<< HEAD
      <>
        <div className='create-stream-form box p-6 md:p-12 lg:max-w-[1000px] m-auto mt-4 md:mt-6 lg:mt-10 '>
=======
      <AuthLayout>
        <div className='create-stream-form m-auto max-w-[1000px] md:mt-6 lg:mt-10 '>
>>>>>>> 9276510597d7e786ad689d18c1d322ee7e9371bb
            <div className='flex justify-between items-center mb-6  border-b border-gray-800 pb-5' >
              <h2 className='text-white text-[21px] md:text-[24px] font-bold ' >New Stream</h2>
              <button disabled={step < 2} onClick={()=>handleStep("prev")} className='bg-gray-700 rounded-[30px] text-gray-300 px-6 py-2' >Back</button>
            </div>
            {status === 'notactive' ? <ConnectYoutube  /> :
            <>
            {channel && channel.snippet ?  <div className="mb-6 sm:flex items-center justify-between youtube-wrap bg-white p-3 rounded-xl" >
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
            </div> : ""} </> }
            
            <div className='grid grid-cols-2 gap-5 my-4'>
              <div onClick={()=>setStreamType("image")} className={`${streamType === 'image' ? "border-[var(--main)]" : "bg-dark2 border-gray-600"} cursor-pointer bg-dark2  border  p-8 rounded-3xl`}>
                <LuImage size={'3rem'} color='#ccc' />
                <h2 className='mt-4 text-white text-xl font-bold mb-2'>24/7 Image/GIF background</h2>
                <p className='text-gray-400'>Create a 24/7 stream with single image/gif background and music by your choice.</p>
              </div>
              <div onClick={()=>setStreamType("video")} className={`${streamType === 'video' ? "border-[var(--main)]" : "bg-dark2 border-gray-600"} cursor-pointer bg-dark2  border  p-8 rounded-3xl`}>
                <FiVideo size={'3rem'} color='#ccc' />
                <h2 className='mt-4 text-white text-xl font-bold mb-2'>24/7 Video background</h2>
                <p className='text-gray-400'>Create a 24/7 stream with multiple video background and music by your choice.</p>
              </div>
            </div>


            <ul className="flex flex-col">
               <li class={`{selected === file.url ? "bg-green-900" : "" } border-gray-400 flex rounded-xl flex-row mb-2`}>
                    <div className="select-none cursor-pointer bg-dark2 rounded-xl flex flex-1 items-center p-4  transition duration-500 ease-in-out transform ">
                      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-2">🎥</div>
                      <div className="flex flex-col rounded-md justify-center items-center mr-4">
                        <MdDragIndicator size='2rem' color="#cccccc" />
                      </div>
                      <div className="flex-1 pl-1 mr-16">
                        <div className="font-medium text-white">file.name</div>
                        <div className="text-gray-600 text-sm">200ml</div>
                      </div>
                      <div className="text-gray-600 text-xs">file.mime</div>
                    </div>
                </li>
               <li class={`{selected === file.url ? "bg-green-900" : "" } border-gray-400 flex rounded-xl flex-row mb-2`}>
                    <div className="select-none cursor-pointer bg-dark2 rounded-xl flex flex-1 items-center p-4  transition duration-500 ease-in-out transform ">
                      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-2">🎥</div>
                      <div className="flex flex-col rounded-md justify-center items-center mr-4">
                        <MdDragIndicator size='2rem' color="#cccccc" />
                      </div>
                      <div className="flex-1 pl-1 mr-16">
                        <div className="font-medium text-white">file.name</div>
                        <div className="text-gray-600 text-sm">200ml</div>
                      </div>
                      <div className="text-gray-600 text-xs">file.mime</div>
                    </div>
                </li>
               <li class={`{selected === file.url ? "bg-green-900" : "" } border-gray-400 flex rounded-xl flex-row mb-2`}>
                    <div className="select-none cursor-pointer bg-dark2 rounded-xl flex flex-1 items-center p-4  transition duration-500 ease-in-out transform ">
                      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-2">🎥</div>
                      <div className="flex flex-col rounded-md justify-center items-center mr-4">
                        <MdDragIndicator size='2rem' color="#cccccc" />
                      </div>
                      <div className="flex-1 pl-1 mr-16">
                        <div className="font-medium text-white">file.name</div>
                        <div className="text-gray-600 text-sm">200ml</div>
                      </div>
                      <div className="text-gray-600 text-xs">file.mime</div>
                    </div>
                </li>
               <li class={`{selected === file.url ? "bg-green-900" : "" } border-gray-400 flex rounded-xl flex-row mb-2`}>
                    <div className="select-none cursor-pointer bg-dark2 rounded-xl flex flex-1 items-center p-4  transition duration-500 ease-in-out transform ">
                      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-2">🎥</div>
                      <div className="flex flex-col rounded-md justify-center items-center mr-4">
                        <MdDragIndicator size='2rem' color="#cccccc" />
                      </div>
                      <div className="flex-1 pl-1 mr-16">
                        <div className="font-medium text-white">file.name</div>
                        <div className="text-gray-600 text-sm">200ml</div>
                      </div>
                      <div className="text-gray-600 text-xs">file.mime</div>
                    </div>
                </li>
               <li class={`{selected === file.url ? "bg-green-900" : "" } border-gray-400 flex rounded-xl flex-row mb-2`}>
                    <div className="select-none cursor-pointer bg-dark2 rounded-xl flex flex-1 items-center p-4  transition duration-500 ease-in-out transform ">
                      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-2">🎥</div>
                      <div className="flex flex-col rounded-md justify-center items-center mr-4">
                        <MdDragIndicator size='2rem' color="#cccccc" />
                      </div>
                      <div className="flex-1 pl-1 mr-16">
                        <div className="font-medium text-white">file.name</div>
                        <div className="text-gray-600 text-sm">200ml</div>
                      </div>
                      <div className="text-gray-600 text-xs">file.mime</div>
                    </div>
                </li>
            </ul>



            <div className={`${status ? "" : "disabled"} pages-steps`} >
                <div  className={step === 1 ? "" : "hidden"}>
                    <div className='' >
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

                <div  className={step === 2 ? "" : "hidden"}>
                  <div className='media-files' >
                    <div  className='flex items-center justify-between mb-6' > 
                      <h2 className='text-white '>Choose Video</h2>
                      <Link to={'/media'} className='text-main'>+ Add Media</Link>
                    </div>
                    {step === 2 ?  <MyFiles sendFile={getVideoFile} type={'video'} /> : ''}
                  </div>
                </div>

                <div className={step === 3 ? "" : "hidden"}>
                  <div className='media-files' >
                    <div  className='flex items-center justify-between mb-6' > 
                      <h2 className='text-white '>Choose Thumbnail</h2>
                      <Link to={'/media'} className='text-main'>+ Add Media</Link>
                    </div>
                    {step === 3 ? <MyFiles sendFile={getImageFile} type={'image'} /> : ""}
                  </div>
                </div>

                <div className="m-auto block sm:table mt-8">
                  {step < 3 ? <button onClick={()=>handleStep("next")}  className={`btn m-auto w-full sm:w-auto lg`} >Next</button>
                  : <button disabled={loading} onClick={handleCreateStream}  className={`btn m-auto w-full sm:w-auto lg`} >{loading ? "Processing" : "Create Stream"}</button>}
                </div>
            </div>

        </div>
      </>
  )
}
