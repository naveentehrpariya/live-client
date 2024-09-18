import React, { useEffect, useState } from 'react';
import Endpoints from '../../../api/Endpoints';
import Loading from '../../common/Loading';
import NoContent from '../../common/NoContent';
import Addmedia from './Addmedia';
import RemoveMedia from './RemoveMedia';
import Pagination from '../../common/Pagination';
export default function MediaList() {

   const [filter, setFilter] = useState('image');
   const [lists, setLists] = useState([]);
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [hasMore, setHasMore] = useState(true);

   function fetchMedias(p) {
     if(loading) return false;
     setLoading(true);
     const m = new Endpoints();
     const resp = m.mymedia(filter,p,3);
     resp.then((res) => {
      setLoading(false);
      if(p === 1) setLists(res.data.files);
      else setLists(prev => [...prev, ...res.data.files]);
      setTotalPages(res.data.totalPages);
      if(res.data.totalPages == p){
         setHasMore(false);
      }
     }).catch((err) => {
       setTimeout(()=>{
         setLoading(false);
      }, 2000)
     });
   }
 
   useEffect(()=>{
     fetchMedias(page);
   },[filter]);

   const changeFilter = (e) => {
      setFilter(e);
      setPage(1);
   }


  return (
    <div className='medias-lists'>
      <div className='flex justify-between mb-6 ' >
            <div className='flex items-center'>
               <button className={`${filter === 'image' ? "text-white" : 'text-gray-500 border-transparent'} pe-2 py-2 me-3 sm:me-6 sm:text-[18px] border-b border-b-2 `} onClick={(e)=>changeFilter("image")} >Images</button>
               <button className={`${filter === 'video' ? "text-white" : 'text-gray-500 border-transparent'} pe-2 py-2 me-3 sm:me-6 sm:text-[18px] border-b border-b-2 `} onClick={(e)=>changeFilter("video")} >Videos</button>
               <button className={`${filter === 'audio' ? "text-white" : 'text-gray-500 border-transparent'} pe-2 py-2 me-3 sm:me-6 sm:text-[18px] border-b border-b-2 `} onClick={(e)=>changeFilter("audio")} >Audios</button>
            </div>
            <Addmedia update={fetchMedias} />
      </div>
      <>
         { lists && lists.length ? 
            <div className={`grid ${filter === 'audio' ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : 'grid-cols-2 md:grid-cols-3'} gap-5`}>
                  {lists && lists.map((item, index) => {
                     const size = item.size / 1024 / 1024;
                     return <>
                     {filter === 'image'? 
                        <div className='relative bg-dark2 border border-gray-800 rounded-xl' key={`imagefile-${filter}-${index}`}>
                           <img className=" w-full object-cover max-w-full h-[130px] sm:h-[200px] rounded-lg" src={item.url} alt="Cloud" />
                           <RemoveMedia update={fetchMedias} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
                           <div className='p-3 text-white ' >
                              <p className='mb-1 line-clamp-1'>{item.name}</p>
                              <p>Size : {size.toFixed(2)}MB</p>
                           </div>
                        </div>
                     : '' } 

                     {filter === 'video'? 
                     <div className='border border-gray-800 rounded-xl overflow-hidden' key={`videofile-${filter}-${index}`}>
                        <div className='p-3 text-white ' >
                           <p className='mb-1 line-clamp-1'>{item.name}</p>
                           <p>Size : {size.toFixed(2)}MB</p>
                        </div>
                        <div  className='relative' >
                           <video playsInline className='w-full h-[200px]' src={item.url} controls type={item.mime}>
                              {/* <source src={item.url} type={item.mime} /> */}
                           </video>
                           <RemoveMedia update={fetchMedias} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
                        </div>
                     </div>
                     : '' } 

                     {filter === 'audio'? 
                        <div  className='relative border border-gray-600  rounded-xl overflow-hidden' key={`audiofile-${filter}-${index}`}>
                           <div className=' p-3'>
                              <h2 className='text-white mb-1 max-w-[90%] text-normal  line-clamp-1'>{item.name}</h2>
                              <p className='text-gray-300'>Size : {size.toFixed(2)}MB</p>
                           </div>
                           <div className='p-3 pt-0'>
                              <audio playsInline className='w-full' controls >
                                 <source src={item.url} type={item.mime} />
                              </audio>
                           </div>
                           <RemoveMedia update={fetchMedias} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
                        </div>
                     : '' }  
                     </> 
                  })}
         </div>
         : <NoContent />  }
         {loading ? <Loading /> :  '' }
         {lists && lists.length ? <Pagination fetch={fetchMedias} setPage={setPage} total={totalPages} currentPage={page} /> : ''}
      </>
         
    </div>
  )
}
