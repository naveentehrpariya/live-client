import React, { useContext, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';
import AdminEndpoints from '../../api/AdminEndpoints';
import toast from 'react-hot-toast';

export default function AddPricingPlan() {

  const navigate = useNavigate();
  const {Errors} = useContext(UserContext);

  const rs = [
    {
      label : '4k',
      value : '2160p',
      title : '3840x2160'
    },
    {
      label : 'uhd',
      value : '1080p',
      title : '1920x1080'
    },
    {
      label : 'hd',
      value : '720p',
      title : '1280x720'
    },
    {
      label : 'shorts',
      value : '720x1080',
      title : '720x1080'
    },
  ];

  const inputFields = [
    { type:"text", name:"name", label:"Plan Name" },
    { type:"number", name:"price", label:"Price" },
    { type:"number", name:"allowed_streams", label:"No. of Allowed Streams" },
    { type:"number", name:"storage", label:"Allowed Storage" },
  ];

  const [resolutions, setresolution] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: '',
    price: "",
    allowed_streams: "",
    storage: "",
  });

  const handleinput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value});
    console.log("data",data)
  }

  const [loading, setLoading] = useState(false);
  const addplan = (e) => {
    // if (data.name === ''  ) {
    //   toast.error("Please fill all the fields");
    //   return false;
    // }  
    setLoading(true);
    const m = new AdminEndpoints();
    const resp = m.create_plan({...data,resolutions:resolutions });
    resp.then(res => {
      if(res.data.status){
        toast.success(res.data.message);
        navigate('/admin');
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    }).catch(err => {
      Errors(err);
      setLoading(false);
    });
  }
  
  const handleResClick = (e) => {
    const isChecked = resolutions.includes(e);
    if(isChecked){
      setresolution(resolutions.filter(v=>v!==e));
    } else {
      setresolution([...resolutions, e]);
    }
    console.log("resolutions",resolutions);
  }

  return (
      <AdminLayout heading={"Add Pricing Plan"} >
         {inputFields.map((field, index) => (
            <input key={`plan-field-${index}`} name={field.name} onChange={handleinput} type={field.type} placeholder={field.label} className="input" />
          ))}
          <textarea className='input mt-6' onChange={(e)=>setData({ ...data, description:e.target.value}) } placeholder='Description' />
          <div className='flex flex-wrap justify-center' >
            {rs && rs.map((r, i)=>{
              const isChecked = resolutions.includes(r.value);
              return <button onClick={()=>handleResClick(r.value)} className={`${isChecked ? 'bg-gray-900 text-white' : " bg-gray-300"} text-black rounded-xl px-4 py-1 mb-2 me-2`} >{r.label} {r.title}</button>
            })}
          </div>
          <button disabled={loading} onClick={addplan}  className={`btn m-auto w-full sm:w-auto lg`} >{loading ? "Processing" : "Create Stream"}</button>
      </AdminLayout>
  )
}
