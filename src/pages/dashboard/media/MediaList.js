import React, { useEffect, useState } from 'react';
import Endpoints from '../../../api/Endpoints';
import Loading from '../../common/Loading';
import NoContent from '../../common/NoContent';
import Popup from '../../common/Popup';
import Addmedia from './Addmedia';

export default function MediaList() {

   const [filter, setFilter] = useState('image');
   const [lists, setLists] = useState([]);
   const [loading, setLoading] = useState(false);

   function fetchMedias() {
     setLoading(true);
     const m = new Endpoints();
     const resp = m.mymedia(filter);
     resp.then((res) => {
      setTimeout(()=>{
         setLoading(false);
      }, 2000)
       setLists(res.data.files);
     }).catch((err) => {
      //  setLoading(false);
       setTimeout(()=>{
         setLoading(false);
      }, 2000)
     });
   }

   useEffect(()=>{
     fetchMedias();
   },[filter]);

  return (
    <div className='medias-lists'>
      <div className='flex justify-between mb-6 ' >
            <div className='flex items-center'>
               <button className={`${filter === 'image' ? "text-white" : 'text-gray-500 border-transparent'} pe-2 py-2 me-3 sm:me-6 sm:text-[18px] border-b border-b-2 `} onClick={(e)=>setFilter("image")} >Images</button>
               <button className={`${filter === 'video' ? "text-white" : 'text-gray-500 border-transparent'} pe-2 py-2 me-3 sm:me-6 sm:text-[18px] border-b border-b-2 `} onClick={(e)=>setFilter("video")} >Videos</button>
            </div>
            <Addmedia />
      </div>
      {loading ? <Loading /> : 
         <>
            { lists && lists.length ? 
               <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <>
                     {lists && lists.map((item, index) => {
                        return <>
                        {filter === 'image'? 
                           <div key={`file-${filter}-${index}`}>
                              <img class="h-auto w-full object-cover max-w-full max-h-[130px] sm:max-h-[200px] rounded-lg" src={item.url} alt="Cloud" />
                           </div>
                        : '' } 

                        {filter === 'video'? 
                           <div className='max-h-[130px] sm:max-h-[200px] bg-dark2 rounded-xl overflow-hidden' key={`file-${filter}-${index}`}>
                              <video playsInline className='w-full h-full' controls >
                                 <source src={item.url} type={item.mime} />
                              </video>
                           </div>
                        : '' } 

                        </> 
                     })}
                  </>
            </div>
            : <NoContent />  }
            
         </>
      }
         
    </div>
  )
}
