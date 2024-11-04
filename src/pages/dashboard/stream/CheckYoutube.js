import React, { useContext, useEffect, useState } from 'react'
import Endpoints from '../../../api/Endpoints';
import { UserContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import ConnectYoutube from './ConnectYoutube';
import { FaYoutube } from 'react-icons/fa6';

export default function CheckYoutube({set}) {

   const {Errors} = useContext(UserContext);

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
            set("active");
         } else {
            setStatus("notactive")
            set("notactive")
         }
      }).catch((err)=> {
         console.log(err);
         setStatus("notactive");
      });
   }
   useEffect(() => {
      check();
   },[]);

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

    const yticon = 'https://1.bp.blogspot.com/-hY5-pNrOcKw/XeI_00cpCgI/AAAAAAAAF4A/J7jS49V8kNozycy0PgY6wfc7SUU9gulTgCLcBGAsYHQ/s320/Youtube-Icon-square-2340x2340.png'
    const [url, setUrl] = useState(channel?.snippet?.thumbnails?.high.url || yticon);

  return (
    <div>
      {status === 'notactive' ? <ConnectYoutube  /> :
         <>
         {channel && channel.snippet ?  
         <div className=" mb-6 sm:flex items-center justify-between youtube-wrap bg-white p-3 rounded-xl" >
            <div className='sm:flex items-center'>
               <img alt="" onError={(e)=>setUrl(yticon)} src={url || yticon}
               className="mx-auto h-14 w-14  rounded-[50%] object-cover"
               />
               <div className='ps-3'>
               <div className='flex justify-center '><FaYoutube size="2rem" color='red' /></div>
               <h2 className='text-center text-sm sm:text-start '>{channel && channel?.snippet?.localized?.title || ''  }</h2>
               </div>
            </div>
            <div className="">
               <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-md">
               <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <div className="mt-1.5 sm:mt-0">
                     <p className="font-bold text-normal text-center">{channel && channel?.statistics?.viewCount || ''  }</p>
                     <p className="text-gray-500 text-center text-sm">Views Count</p>
                  </div>
               </div>
               <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <div className="mt-1.5 sm:mt-0">
                     <p className="font-bold text-normal text-center">{channel && channel?.statistics?.videoCount || ''  }</p>
                     <p className="text-gray-500 text-center text-sm">Video Count</p>
                  </div>
               </div>
               <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <div className="mt-1.5 sm:mt-0">
                     <p className="font-bold text-normal text-center">{channel && channel?.statistics?.subscriberCount || ''  }</p>
                     <p className="text-gray-500 text-center text-sm">Subscribers</p>
                  </div>
               </div>
               </div>
               <div className='flex justify-center '>
               <button onClick={removeAccount} className='text-main mt-4 text-center' >Unlink this Account</button>
               </div>
            </div>
         </div>
         : ""} 
         </> 
      }
    </div>
  )
}
