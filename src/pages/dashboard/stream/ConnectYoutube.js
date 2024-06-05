import React, { useContext, useState } from 'react'
import { FaYoutube } from "react-icons/fa";
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';
import { UserContext } from '../../../context/AuthProvider';
export default function ConnectYoutube({channel}) {

   const {Errors} = useContext(UserContext);
   const [loading, setLoading] = useState(false);
   const LinkYoutube = () => { 
      setLoading(true);
      const m = new Endpoints();
      const resp = m.getAuthToken();
      resp.then((res)=>{
         console.log(res)
         if(res.data.url) {
            window.location.href = res.data.url;
         } else { 
            toast.error(res.data.message);
         }
         setLoading(false);
      }).catch((err)=> {
         console.log(err);
         setLoading(false);
         Errors(err);
      });
   }

  return (
    <div>
      <div disabled={loading} onClick={LinkYoutube} class={`${loading ? "disabled" : ""} inline-flex mb-4 items-center justify-center px-4 ms:px-6 w-full cursor-pointer py-1 sm:py-3 text-base font-mediu rounded-[20px] sm:rounded-[30px] bg-gray-50 hover:text-gray-900 hover:bg-gray-100 `}>
         <FaYoutube size='4rem' color='var(--main)' className='mr-2' />                                           
         <span className="w-full text-black text-md md:text-2xl">{loading ? "Connecting..." : "Connect Youtube Account"}</span>
         <svg className="w-8 h-8 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
         </svg>
      </div> 
    </div>
  )
}
