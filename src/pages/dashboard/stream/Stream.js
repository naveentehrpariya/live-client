import React, { useState } from 'react';
import defaultimg from '../../../img/default-stream.png';
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';
import TimeFormat from '../../common/TimeFormat';
import { Link } from 'react-router-dom';

import { IoTrash } from "react-icons/io5";

export default function Stream({data, reload}) {

   const [loading, setLoading] = useState(false);
   const [isLive, setisLive] = useState(data.status === '1' ? true : false);
   const endStream = (e) => {
      setLoading(true);
      const m = new Endpoints();
      const resp = m.stop_stream(e);
      resp.then((res) => {
         setLoading(false);
         if(res.data.status){
            reload && reload();
            toast.success(res.data.message);
         } else {
            toast.error(res.data.message);
         }
      }).catch((err) => {
         setLoading(false);
      });
   }
   const deleteStream = (e) => {
      setLoading(true);
      const m = new Endpoints();
      const resp = m.delete_stream(data?._id);
      resp.then((res) => {
         setLoading(false);
         if(res.data.status){
            reload && reload();
            toast.success(res.data.message);
         } else {
            toast.error(res.data.message);
         }
      }).catch((err) => {
         setLoading(false);
      });
   }


   const [thumbURL, setthumbURL] = useState(data.thumbnail || defaultimg);
   return (
      <div className='stream box border border-gray-800 overflow-hidden'>
         <div className='stream-img w-full relative' >
            <div className='min-h-[170px]'>
               <img onError={() => setthumbURL(defaultimg)} src={thumbURL} className='img-fluid w-full min-h-[170px] max-h-[170px] object-cover' alt='stream thumbnail'  />
            </div>

            {data.status !== '1' ? <div onClick={deleteStream} className={`text-[10px] cursor-pointer absolute top-4 right-4 z-1 `} >
               <IoTrash size={'1rem'} color='red' />
            </div> : ''}

            <div className={`text-[10px] md:text-[13px] absolute top-3 left-3 z-1 stream-status bg-green-700 text-white rounded-xl px-3 py-1 ${isLive ? "bg-red-800 " : "bg-yellow-700"}`} >
            {data.status === '1' ? <div className="flex items-center"><span className="pulse block w-2 h-2 me-2 bg-red-500 rounded-[50%] "></span>LIVE </div> : "Ended"}</div>
            {data.platformtype ? <div className="text-[8px] md:text-[11px] absolute bottom-3 left-3 z-1 stream-status bg-green-800 text-white rounded-xl px-3 py-1 uppercase">{data.platformtype || 'Youtube'} Stream </div> : '' }
            {data.status === '1' ? 
               <Link className='absolute z-[2] top-3 right-3 bg-blue-600 text-white px-3 py-1 uppercase text-[13px] rounded-xl'
               to={`/edit-stream/${data._id}`} >Edit Stream</Link>
            : '' } 
            
         </div>
         <div className='stream-info p-4'>
            <div className='stream-desc line-clamp-1 text-white font-bold text-xl mb-4'> {data.title}</div>
            <div className='mb-4'>
               <div className='stream-date text-xs text-gray-200'>Start At : <TimeFormat date={data.createdAt} /></div>
               {data.endedAt ? <div className='stream-date text-xs text-main mt-2'>Ended At : <TimeFormat date={data.endedAt} /></div> : <div className=' opacity-0 stream-date text-xs text-main mt-2'>.</div>}
            </div>
            
            { data.platformtype === 'youtube' ? 
            <a target='_blank' rel="noreferrer" href={`https://www.youtube.com/watch?v=${data.streamId}`} className={` btn btn-main sm flex items-center justify-center`}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6016 8.23338L17.6016 8.2334L17.6057 8.2356C17.9259 8.40584 18.1937 8.65999 18.3804 8.9708C18.5672 9.28161 18.6658 9.63737 18.6658 9.99997C18.6658 10.3626 18.5672 10.7183 18.3804 11.0291C18.1937 11.34 17.9259 11.5941 17.6057 11.7643L17.6057 11.7643L17.6016 11.7665L6.92498 17.5724L6.92479 17.5725C5.52301 18.3355 3.83301 17.3336 3.83301 15.8066V4.19414C3.83301 2.66654 5.52289 1.665 6.92495 2.42671C6.92501 2.42674 6.92506 2.42677 6.92512 2.4268L17.6016 8.23338Z" stroke="white"/>
            </svg> &nbsp; {isLive ? "Watch Live" : "Watch Video"}</a>
             : ''
            //  <Link to={`/live-stream/${data.streamkey}`} className={`${data.endedAt ? 'disabled' : ''} btn btn-main sm flex items-center justify-center`}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            // <path d="M17.6016 8.23338L17.6016 8.2334L17.6057 8.2356C17.9259 8.40584 18.1937 8.65999 18.3804 8.9708C18.5672 9.28161 18.6658 9.63737 18.6658 9.99997C18.6658 10.3626 18.5672 10.7183 18.3804 11.0291C18.1937 11.34 17.9259 11.5941 17.6057 11.7643L17.6057 11.7643L17.6016 11.7665L6.92498 17.5724L6.92479 17.5725C5.52301 18.3355 3.83301 17.3336 3.83301 15.8066V4.19414C3.83301 2.66654 5.52289 1.665 6.92495 2.42671C6.92501 2.42674 6.92506 2.42677 6.92512 2.4268L17.6016 8.23338Z" stroke="white"/>
            // </svg> &nbsp; {isLive ? "Watch Live" : "Watch Video"}</Link>
             }
             
            {data.endedAt ? "" :
               <> 
               <button onClick={()=>endStream(data._id)} className={`${isLive ? "" :  "sdisabled"} mt-3 btn w-full btn-main sm flex items-center justify-center`}>
                  {loading ? "Ending..." : "End Stream"}
               </button>
               </>
            }
         </div>
      </div>
   )
}
