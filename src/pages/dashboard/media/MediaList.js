import React, { useContext, useEffect, useState } from 'react';
import Endpoints from '../../../api/Endpoints';
import Loading from '../../common/Loading';
import NoContent from '../../common/NoContent';
import Addmedia from './Addmedia';
import RemoveMedia from './RemoveMedia';
import Pagination from '../../common/Pagination';
import Api from '../../../api/Api';
import { UserContext } from '../../../context/AuthProvider';
export default function MediaList() {

   const {user} = useContext(UserContext);
   const [filter, setFilter] = useState('image');
   const [lists, setLists] = useState([]);
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   const [hasMore, setHasMore] = useState(true);

   function fetchMedias(p, load) {
     if(loading) return false;
     if(load !== "silent_load"){
        setLoading(true);
     }
     const m = new Endpoints();
     const resp = m.mymedia(filter,p,15);
     resp.then((res) => {
         setLoading(false);
         setLists(res.data.files);
         setTotalPages(res.data.totalPages);
         if(res.data.totalPages === p){
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
      GetFilesSize();
   }

   function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    }

   const [totalSize, setTotalSize] = useState(0);
   const GetFilesSize = () => { 
      const resp = Api.get("/total-uploaded-size");
      resp.then((res) => {
         const size = res.data.totalSize
         const formattedSize = formatBytes(size, 2);
         setTotalSize(formattedSize);
      }).catch((err) => {
         console.log(err);
      });
   }

   useEffect(() => {
      GetFilesSize();
   }, []);


   const ITEM = ({item, size, index}) => {
      const [removed, setRemoved] = useState(false);
      function removeded (removed) {
         setRemoved(removed);
      }
      return <>
         {filter === 'image'? 
            <div className={`${removed ? "hiddens" : ""} relative bg-dark2 border border-gray-800 rounded-xl`} key={`imagefile-${filter}-${index}`}>
               <img className=" w-full object-cover max-w-full h-[130px] sm:h-[200px] rounded-lg" src={item.url} alt="Cloud" />
               <RemoveMedia removeded={removeded} updateSize={GetFilesSize} page={page} update={fetchMedias} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
               <div className='p-3 text-white ' >
                  <p className='text-gray-300 mb-1 line-clamp-1'>{item.name}</p>
                  <p className='text-gray-500 text-sm'>Size : {size.toFixed(2)}MB</p>
               </div>
            </div>
         : '' }  

         {filter === 'video'? 
            <div className={`${removed ? "hiddens" : ""} border border-gray-800 rounded-xl overflow-hidden`} key={`videofile-${filter}-${index}`}>
               <div className='p-3 text-white ' >
                  <p className='mb-1 text-gray-300 line-clamp-1'>{item.name}</p>
                  <p className='text-gray-500 text-sm'>Size : {size.toFixed(2)}MB</p>
               </div>
               <div  className='relative' >
                  <video preload="none" className='w-full h-[200px]' src={item.url} controls type={item.mime}>
                     {/* <source src={item.url} type={item.mime} /> */}
                  </video>
                  <RemoveMedia removeded={removeded} updateSize={GetFilesSize} page={page} update={fetchMedias} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
               </div>
            </div>
         : '' } 

         {filter === 'audio'? 
            <div  className={`${removed ? "hiddens" : ""} relative border border-gray-600  rounded-xl overflow-hidden`} key={`audiofile-${filter}-${index}`}>
               <div className=' p-3'>
                  <h2 className='text-gray-300 mb-1 max-w-[90%] text-normal  line-clamp-1'>{item.name}</h2>
                  <p className='text-gray-400'>Size : {size.toFixed(2)}MB</p>
               </div>
               <div className='p-3 pt-0'>
                  <audio preload='none' className='w-full' controls >
                     <source src={item.url} type={item.mime} />
                  </audio>
               </div>
               <RemoveMedia removeded={removeded} updateSize={GetFilesSize} page={page} update={fetchMedias} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
            </div>
         : '' }  
      </> 
   }


   return (
    <div className='medias-lists'>

      {totalSize ? <div className='text-white font-semibold mb-2 text-lg'> {totalSize} is used out of {user && user.storageLimit ? user.storageLimit : 1}GB</div> : ''}
      <div className='sm:flex justify-between mb-6 ' >
            <div className='flex items-center'>
               <button className={`${filter === 'image' ? "text-white" : 'text-gray-500 border-transparent'} pe-2 py-2 me-3 sm:me-6 sm:text-[18px] border-b border-b-2 `} onClick={(e)=>changeFilter("image")} >Images</button>
               <button className={`${filter === 'video' ? "text-white" : 'text-gray-500 border-transparent'} pe-2 py-2 me-3 sm:me-6 sm:text-[18px] border-b border-b-2 `} onClick={(e)=>changeFilter("video")} >Videos</button>
               <button className={`${filter === 'audio' ? "text-white" : 'text-gray-500 border-transparent'} pe-2 py-2 me-3 sm:me-6 sm:text-[18px] border-b border-b-2 `} onClick={(e)=>changeFilter("audio")} >Audios</button>
            </div>
            <Addmedia updateSize={GetFilesSize} classes="bg-main mt-4 sm:mt-0 !py-3 sm:py-2 w-full sm:w-auto text-white rounded-[30px] px-3 md:px-4 py-[4px] md:py-[11px] text-[12px] md:text-[15px] uppercase " update={fetchMedias} />
      </div>
      <>
         {loading ? <Loading /> : <>
            { lists && lists.length ? 
               <div className={`grid ${filter === 'audio' ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : 'grid-cols-2 md:grid-cols-3'} gap-5`}>
                  {lists && lists.map((item, index) => {
                     const size = item.size / 1024 / 1024;
                     return <ITEM item={item} size={size} index={index} />
                  })}
               </div>
               : !loading ? <NoContent /> : ""}
            </> 
         }
         {lists && lists.length ? <Pagination fetch={fetchMedias} setPage={setPage} total={totalPages} currentPage={page} /> : ''}
      </>
         
    </div>
  )
}
