import React, { useContext, useState } from 'react'
import AuthLayout from '../../../layout/AuthLayout'
import Endpoints from '../../../api/Endpoints';
import { UserContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MyFiles from './MyFiles';

export default function CreateStreamForm() {

  const resolutions = [
    { title:"1080p 1920x1080 " ,label: '1080p', value: '1920x1080' },
    { title:"2160p 3840x2160" ,label: '2160p', value: '3840x2160' },
    { title:"1080x720 720x1080" ,label: '1080x720', value: '720x1080' },
    { title:"720p 1280x720" ,label: '720p', value: '1280x720' },
  ];

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

  const handleinput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value});
  }

  const handleCreateStream = (e) => {
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
      Errors(err);
      setLoading(false);
    });
  }

  const [step, setStep] = useState(1);
  const handleStep = (type) => {
    if(type === "next"){
      setStep(step+1);
    } else {
      setStep(step-1);
    }
  }

  const STEPS = () => { 
    return <>
    <div className="flex justify-center items-center mt-8">
            <button onClick={()=>handleStep("prev")}  className={`btn main-btn m-auto lg`} >{loading ? "Processing" : "Create Stream"}</button>
            <button onClick={()=>handleStep("next")}   className={`btn main-btn m-auto lg`} >{loading ? "Processing" : "Create Stream"}</button>
      </div>
    </>
  }

  return (
      <AuthLayout>
        <div className='create-stream-form box p-12 max-w-[1000px] m-auto mt-10 '>
          <h2 className='text-white text-[24px] font-bold mb-6 border-b border-gray-800 pb-5' >Create New Stream</h2>
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

          <div className='media-files' >
            <MyFiles type={'video'} />
          </div>

          <STEPS></STEPS>

          {/* <div className="m-auto table mt-8">
            <button disabled={loading} onClick={handleCreateStream}  className={`btn main-btn m-auto lg`} >{loading ? "Processing" : "Create Stream"}</button>
          </div> */}
        </div>
      </AuthLayout>
  )
}
