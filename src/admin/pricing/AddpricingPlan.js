import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';
import AdminEndpoints from '../../api/AdminEndpoints';
import toast from 'react-hot-toast';
import AdminTitle from '../layout/AdminTitle';
import Api from '../../api/Api';

export default function AddPricingPlan() {

  const navigate = useNavigate();
  const {Errors} = useContext(UserContext);

  const {id} = useParams();
  const [plan, setPlan] = useState(null);

  const [resolutions, setresolution] = useState(plan && plan.resolutions ? JSON.parse(plan.resolutions) : []);
  const [data, setData] = useState({
    name: (plan && plan.name) || "",
    description: (plan && plan.description) || '',
    price: (plan && plan.price) || "",
    allowed_streams: (plan && plan.allowed_streams) || "",
    storage: (plan && plan.storage) || "",
  });

  useEffect(()=>{
    setData({
      name: (plan && plan.name) || "",
      description: (plan && plan.description) || '',
      price: (plan && plan.price) || "",
      allowed_streams: (plan && plan.allowed_streams) || "",
      storage: (plan && plan.storage) || "",
    });
    setresolution(plan && plan.resolutions? JSON.parse(plan.resolutions) : []);
  }, [plan]);
  

  async function fetch() {
    setLoading(true);
    const resp = Api.get(`/plan-detail/${id}`);
    resp.then((res)=>{
      setPlan(res.data.plan);
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
      setLoading(false);
    });
  }

  useEffect(()=>{
    if(id){
      fetch();
    }
  },[id]);


  const rs = [
    {
      label : '4k',
      value : '2160p',
      title : '3840x2160'
    },
    {
      label : 'UHD',
      value : '1080p',
      title : '1920x1080'
    },
    {
      label : 'HD',
      value : '720p',
      title : '1280x720'
    },
    {
      label : 'Shorts',
      value : '720x1080',
      title : '720x1080'
    },
  ];

  const inputFields = [
    { type:"text", name:"name", label:"Plan Name", default : (plan && plan.name) || "" },
    { type:"number", name:"price", label:"Price", default :( plan && plan.price) || ""},
    { type:"number", name:"allowed_streams", label:"No. of Allowed Streams", default : (plan && plan.allowed_streams) || ''},
    { type:"number", name:"storage", label:"Allowed Storage (GB)", default : (plan && plan.storage) || ''},
  ];

  const handleinput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value});
  }

  const [loading, setLoading] = useState(false);
  const addPlan = (e) => {
    setLoading(true);
    const m = new AdminEndpoints();
    const resp = m.create_plan({...data,resolutions:resolutions });
    resp.then(res => {
      if(res.data.status){
        toast.success(res.data.message);
        navigate('/admin/pricing');
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    }).catch(err => {
      Errors(err);
      setLoading(false);
    });
  }
  
  const updateplan = (e) => {
    setLoading(true);
    const resp = Api.post(`/update-pricing-plan/${plan._id}`,{...data, resolutions:resolutions });
    resp.then(res => {
      if(res.data.status){
        toast.success(res.data.message);
        navigate('/admin/pricing');
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
        <AdminTitle heading={"Add New Plan"}></AdminTitle>
        <div className='grid grid-cols-2 gap-6' >
         {inputFields.map((field, index) => (
          <div>
            <label className='ps-0 text-gray-300 mb-2'>{field.label}</label>
            <input key={`plan-field-${index}`} defaultValue={field.default} name={field.name} onChange={handleinput} type={field.type} placeholder={field.label} className="input" />
          </div>
          ))}
        </div>
        <textarea defaultValue={plan && plan.description}  className='input mt-8' onChange={(e)=>setData({ ...data, description:e.target.value}) } placeholder='Description' />
        <p className='text-gray-300 mt-6 mb-3'>Choose Resolution</p>
        <div className='flex flex-wrap justify-start' >
          {rs && rs.map((r, i)=>{
            const isChecked = resolutions.includes(r.value);
            return <button onClick={()=>handleResClick(r.value)} 
            className={`text-lg  ${isChecked ? 'bg-main text-gray-200' : " bg-gray-900 text-gray-500"}  rounded-xl px-5 py-2 mb-2 me-2 text-lg capitalize`} >{r.label} {r.title}</button>
          })}
        </div>
        <div className='flex justify-center pt-4'>
          {id ?
          <button disabled={loading} onClick={updateplan}  className={`btn w-full mx-auto sm:w-auto lg`} >{loading ? "Processing" : "Update Plan"}</button>
          : 
          <button disabled={loading} onClick={addPlan}  className={`btn w-full mx-auto sm:w-auto lg`} >{loading ? "Processing" : "Create Plan"}</button>
           }
        </div>
      </AdminLayout>
  )
}
