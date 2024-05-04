import React, { useState } from 'react';
import defaultimg from '../../../img/default-stream.png';
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';
import TimeFormat from '../../common/TimeFormat';
export default function Stream({data, reload}) {

   const [loading, setLoading] = useState(false);
   const endStream = (e) => {
      setLoading(true);
      const m = new Endpoints();
      const resp = m.stop_stream({
         id:e
      });
      resp.then((res) => {
         setLoading(false);
         if(res.data.status){
            toast.success(res.data.message);
            reload && reload();
         } else {
            toast.error(res.data.message);
         }
      }).catch((err) => {
         setLoading(false);
      });
   }


  return (
    <div className='stream box overflow-hidden'>
      <div className='stream-img w-full relative' >
         <img src={defaultimg} className='img-fluid w-full max-h-[200px] object-cover'  />
         <div className={`absolute top-3 left-3 z-1 stream-status font-bold bg-green-700 text-white rounded-xl px-3 py-1 ${data.status === '1' ? "bg-green-700" : "bg-red-700"}`} >{data.status === '1' ? "Active" : "Ended"}</div>
      </div>
      <div className='stream-info p-6'>
         <div className='stream-date text-xs text-main'><TimeFormat date={data.createdAt} /></div>
         <div className='stream-desc text-white font-bold text-xl my-4'>{data.title}</div>
         {/* <a href='ww.gogole.com' className={`${data.status === '0' ? "disabled" : ""} btn btn-main sm flex items-center justify-center`}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M17.6016 8.23338L17.6016 8.2334L17.6057 8.2356C17.9259 8.40584 18.1937 8.65999 18.3804 8.9708C18.5672 9.28161 18.6658 9.63737 18.6658 9.99997C18.6658 10.3626 18.5672 10.7183 18.3804 11.0291C18.1937 11.34 17.9259 11.5941 17.6057 11.7643L17.6057 11.7643L17.6016 11.7665L6.92498 17.5724L6.92479 17.5725C5.52301 18.3355 3.83301 17.3336 3.83301 15.8066V4.19414C3.83301 2.66654 5.52289 1.665 6.92495 2.42671C6.92501 2.42674 6.92506 2.42677 6.92512 2.4268L17.6016 8.23338Z" stroke="white"/>
         </svg> &nbsp; Watch Stream</a> */}
         <button onClick={()=>endStream(data._id)} className={`${data.status === '0' ? "disabled" : ""} mt-3 btn w-full btn-main sm flex items-center justify-center`}>
            {loading ? "Ending..." : "End Stream"}
         </button>
      </div>
    </div>
  )
}
