import React, { useContext, useState } from 'react'
import AuthLayout from '../../../layout/AuthLayout'
import Endpoints from '../../../api/Endpoints';
import { UserContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CreateStreamForm() {

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

  return (
      <AuthLayout>
        <div className='create-stream-form box p-12 max-w-[1000px] m-auto mt-10 '>
          <h2 className='text-white text-[24px] font-bold mb-6 border-b border-gray-800 pb-5' >Create New Stream</h2>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-5' >
          {inputFields.map((field, index) => (
            <input required key={index} name={field.name} onChange={handleinput} type={field.password} placeholder={field.label} className="input" />
          ))}
          <select className='input' onChange={(e)=>setData({ ...data, resolution: e.target.value})} >
            <option value={'default'}>Default</option>
            <option value={"1920x1080"} >1920x1080</option>
            <option value="720x960" >720x960</option>
          </select>
         </div>
        <div className="m-auto table mt-8">
          <button disabled={loading} onClick={handleCreateStream}  className={`btn main-btn m-auto lg`} >{loading ? "Processing" : "Create Stream"}</button>
        </div>
        </div>
      </AuthLayout>
  )
}
