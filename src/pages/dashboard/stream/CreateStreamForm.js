import React, { useContext, useEffect, useState } from 'react'
import AuthLayout from '../../../layout/AuthLayout'
import Endpoints from '../../../api/Endpoints';
import { UserContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MyFiles from './MyFiles';
import ConnectYoutube from './ConnectYoutube';

export default function CreateStreamForm() {

  const resolutions = [
    { title:"1080p 1920x1080 " ,label: '1080p', value: '1920x1080' },
    { title:"2160p 3840x2160" ,label: '2160p', value: '3840x2160' },
    { title:"1080x720 720x1080" ,label: '1080x720', value: '720x1080' },
    { title:"720p 1280x720" ,label: '720p', value: '1280x720' },
  ];

   const [status, setStatus] = useState();
   const check = () => { 
      const m = new Endpoints();
      const resp = m.checkYtStatus();
      resp.then((res)=>{
        if(res.data.token){
           setStatus("active");
        } else 
        {setStatus("notactive");}
      }).catch((err)=> {
         console.log(err);
         setStatus("notactive");
      });
   }
   useEffect(() => {
      check();
   },[]);

  const navigate = useNavigate();
  const {Errors} = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const inputFields = [
    { type:"text", name:"title", label:"Stream Name" },
    { type:"text", name:"stream_url", label:"Stream URL" },
    { type:"text", name:"streamkey", label:"Stream Key" },
  ];

  const [data, setData] = useState({
    title: "",
    video: "",
    audio: "",
    thumbnail: "",
    resolution: "",
    stream_url: "",
    streamkey: "",
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

  const [step, setStep] = useState(1);
  const handleStep = (type) => {
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
      <AuthLayout>
        <div className='create-stream-form box p-6 md:p-12 lg:max-w-[1000px] m-auto mt-4 md:mt-6 lg:mt-10 '>
            <div className='flex justify-between items-center mb-6  border-b border-gray-800 pb-5' >
              <h2 className='text-white text-[21px] md:text-[24px] font-bold ' >New Stream</h2>
              <button disabled={step < 2} onClick={()=>handleStep("prev")} className='bg-gray-700 rounded-[30px] text-gray-300 px-6 py-2' >Back</button>
            </div>

            {status === 'notactive' ? <ConnectYoutube /> : ''}

            <div className={`${status ? "" : "disabled"} pages-steps`} >
                <div  className={step === 1 ? "" : "hidden"}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5' >
                    {inputFields.map((field, index) => (
                      <input required key={index} name={field.name} onChange={handleinput} type={field.password} placeholder={field.label} className="input" />
                    ))}
                    <select className='input' onChange={(e)=>setData({ ...data, resolution: e.target.value})} >
                      {resolutions && resolutions.map((resolution, index) => (
                        <option key={index} value={resolution.label}>{resolution.label} ({resolution.value})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div  className={step === 2 ? "" : "hidden"}>
                  <div className='media-files' >
                    <h2 className='text-white mb-4'>Choose Video</h2>
                    {step === 2 ?  <MyFiles sendFile={getVideoFile} type={'video'} /> : ''}
                  </div>
                </div>

                <div  className={step === 3 ? "" : "hidden"}>
                  <div className='media-files' >
                    <h2 className='text-white mb-4'>Choose Thumbnail</h2>
                    {step === 3 ? <MyFiles sendFile={getImageFile} type={'image'} /> : ""}
                  </div>
                </div>

                <div className="m-auto block sm:table mt-8">
                  {step < 3 ? <button onClick={()=>handleStep("next")}  className={`btn m-auto w-full sm:w-auto lg`} >Next</button>
                  : <button disabled={loading} onClick={handleCreateStream}  className={`btn m-auto w-full sm:w-auto lg`} >{loading ? "Processing" : "Create Stream"}</button>}
                </div>
            </div>

        </div>
      </AuthLayout>
  )
}
