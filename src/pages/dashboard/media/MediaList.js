import React, { useEffect, useState } from 'react';
import Endpoints from '../../../api/Endpoints';
import Loading from '../../common/Loading';
import NoContent from '../../common/NoContent';
import Popup from '../../common/Popup';
import Addmedia from './Addmedia';
import RemoveMedia from './RemoveMedia';

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
            <Addmedia update={fetchMedias} />
      </div>
      {loading ? <Loading /> : 
         <>
            { lists && lists.length ? 
               <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <>
                     {lists && lists.map((item, index) => {
                        return <>
                        {filter === 'image'? 
                           <div className='relative' key={`file-${filter}-${index}`}>
                              <img className=" w-full object-cover max-w-full h-[130px] sm:h-[200px] rounded-lg" src={item.url} alt="Cloud" />
                              <RemoveMedia update={fetchMedias} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
                           </div>
                        : '' } 

                        {filter === 'video'? 
                           <div  className='relative max-h-[130px] min-h-[150px] sm:max-h-[200px] bg-dark2 rounded-xl overflow-hidden' key={`file-${filter}-${index}`}>
                              <video playsInline className='w-full h-full' controls >
                                 <source src={item.url} type={item.mime} />
                              </video>
                              <RemoveMedia update={fetchMedias} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
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
