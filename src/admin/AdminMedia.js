import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import Loading from '../pages/common/Loading';
import AdminTitle from './layout/AdminTitle';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../api/Api';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthProvider';
import Nocontent from '../pages/common/NoContent';
import Time from '../pages/common/Time';
import RemoveMedia from '../pages/dashboard/media/RemoveMedia';
import Pagination from '../pages/common/Pagination';
import AdminApi from '../api/AdminApi';

export default function AdminMedia() {

  const { Errors } = useContext(UserContext);
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function fetch(pg,signal) {
    if(!loading){
      setLoading(true);
      const resp = AdminApi.get(`/admin/media/${type || "all"}?page=${pg}&limit=9`, {signal});
      resp.then((res)=>{
        setData(res.data.result || []);
        setLoading(false);
        if(res.data.status){
          setPage(res.data.current_page);
          setTotalPages(res.data.total_pages);
        }
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(page,signal);
  }, [type]);

  const navigate = useNavigate();
  const handleState = (e) => {
    navigate(`/admin/media/${e}`);
  }

  return (
    <>
      <AdminLayout>
        <AdminTitle heading={`${type === 'image' ? "Images" : type === 'video' ? "Videos" : "Audios"  }`}>
            <div>
                <button className={`${type === 'image' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("image")}>All Images</button>
                <button className={`${type === 'video' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("video")}>All Videos</button>
                <button className={`${type === 'audio' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("audio")}>All Audios</button>
            </div>
        </AdminTitle>
        {loading ? <Loading /> : 
        <>
            { data && data.length ? 
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                     <>
                        {data && data.map((item, index) => {
                          const size = item.size / 1024 / 1024;
                           return <>
                           {type === 'image'? 
                          <div className='relative bg-dark2 border border-gray-800 rounded-xl' key={`imagefile-${type}-${index}`}>
                            <img className=" w-full object-cover max-w-full h-[130px] sm:h-[200px] rounded-lg" src={item.url} alt="Cloud" />
                            <RemoveMedia update={fetch} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
                              <div className='p-3 text-white ' >
                                 <p className='mb-1 line-clamp-1'>{item.name}</p>
                                 <p className='mb-1 line-clamp-1'>User : {item.user.name} ({item.user.email})</p>
                                 <p>Size : {size.toFixed(2)}MB</p>
                              </div>
                           </div>
                           : '' } 

                           {type === 'video'? 
                              <div className='relative bg-dark2 border border-gray-800 rounded-xl' key={`imagefile-${type}-${index}`}>
                                 <video playsInline className='w-full h-full max-h-[200px]' controls >
                                    <source src={item.url} type={item.mime} />
                                 </video>
                                <RemoveMedia update={fetch} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
                                <div className='p-3 text-white ' >
                                   <p className='mb-1 line-clamp-1'>{item.name}</p>
                                   <p className='mb-1 line-clamp-1'>User : {item.user.name} ({item.user.email})</p>
                                   <p>Size : {size.toFixed(2)}MB</p>
                                </div>
                             </div>
                           : '' } 

                           {type === 'audio'? 
                              <div className='relative bg-dark2 border border-gray-800 rounded-xl' key={`imagefile-${type}-${index}`}>
                                  <audio playsInline className='w-full ' controls >
                                    <source src={item.url} type={item.mime} />
                                  </audio>
                                <RemoveMedia update={fetch} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
                                <div className='p-3 text-white ' >
                                    <p className='mb-1 line-clamp-1'>{item.name}</p>
                                    <p className='mb-1 line-clamp-1'>User : {item.user.name} ({item.user.email})</p>
                                    <p>Size : {size.toFixed(2)}MB</p>
                                </div>
                              </div>
                           : '' } 

                           </> 
                        })}
                     </>
               </div>
            : <Nocontent />  }
          <Pagination fetch={fetch} setPage={setPage} total={totalPages} currentPage={page} />

        </>
        }
      </AdminLayout>
    </>
  )
}
