import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/AuthProvider';
import Endpoints from '../../api/Endpoints';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function YoutubeAuthVerify(){

   const {Errors} = useContext(UserContext);
   const [loading, setLoading] = useState(false);

   const urlParams = new URLSearchParams(window.location.search);
   const code = urlParams.get('code');
   const scope = urlParams.get('scope');

   const navigate = useNavigate();
   const verify = () => { 
      setLoading(true);
      const m = new Endpoints();
      const resp = m.verifyAuthToken(code, scope);
      resp.then((res)=>{
         if(res.data.status){
            toast.success(res.data.message);
         } else {
            toast.error("Link Youtube Account Failed !!");
         }
         navigate("/create-stream");
         setLoading(false);
      }).catch((err)=> {
         navigate("/home");
         console.log(err);
         setLoading(false);
         Errors(err);
      });
   }

   useEffect(() => {
      if(!loading){ verify()}
   },[]);

  return (
    <div className='h-screen w-full flex items-center justify-center '>
         <div className='text-lg font-bold text-main'>Redirecting...</div>
    </div>
  )
}
