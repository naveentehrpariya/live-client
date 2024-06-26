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

  const time = Time();


  const ITEM = ({item}) => { 
    const [status, setStatus] = useState(item.status);
   //  const stopStream = () => { 
   //    const resp = Api.get(`/admin/media/${item.streamId}`);
   //    resp.then((res)=> {
   //      if(res.data.status){
   //        setStatus(status === 1 ? 0 : 1);
   //        toast.success(res.data.message);
   //      } else { 
   //        toast.error(res.data.message);
   //      }
   //    }).catch((err)=>{
   //      console.log(err);
   //      Errors(err);
   //    });
   //  }

    return <tr className="border-b border-gray-900">
      <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-300 sm:px-3 lg:text-left">{item.title}</td>
      <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{time(item?.createdAt)}</td>
      <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{time(item?.endedAt)}</td>
      <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell capitalize">
      {status === 1 ?  <button className={`text-white rounded-xl py-1 px-3 ${status === 1 ? "bg-green-600 " : "bg-red-500" }`}>Running</button>
        :
        <span className={`text-white rounded-xl py-1 px-3 ${status == 1 ? "bg-green-600 " : "bg-red-800" }`}>ENDED</span>
      }
    </td>
      <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell capitalize">
       <a target="_blank"  rel="noreferrer" href={`https://www.youtube.com/watch?v=${item.streamId}`} className={`text-white rounded-xl py-1 px-3 ${status === 1 ? "bg-green-600 " : "bg-red-500" }`}>Watch</a>
    </td>
  </tr>
  }

  return (
    <>
      <AdminLayout>
        <AdminTitle heading={`${type === 'image' ? "Images" : "Videos"  }`}>
            <div>
                <button className={`${type == 'image' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("image")}>All Images</button>
                <button className={`${type == 'video' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("video")}>All Videos</button>
            </div>
        </AdminTitle>
        {loading ? <Loading /> : 
        <>
            { data && data.length ? 
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                     <>
                        {data && data.map((item, index) => {
                           return <>
                           {type === 'image'? 
                              <div className='relative' key={`file-${type}-${index}`}>
                                 <img className=" w-full object-cover max-w-full h-[130px] sm:h-[200px] rounded-lg" src={item.url} alt="Cloud" />
                                 <RemoveMedia update={fetch} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
                              </div>
                           : '' } 

                           {type === 'video'? 
                              <div  className='relative max-h-[130px] min-h-[150px] sm:max-h-[200px] bg-dark2 rounded-xl overflow-hidden' key={`file-${type}-${index}`}>
                                 <video playsInline className='w-full h-full' controls >
                                    <source src={item.url} type={item.mime} />
                                 </video>
                                 <RemoveMedia update={fetch} id={item._id} classes={'absolute top-2 right-2 bg-danger-600 text-white px-3 py-2 rounded-[30px'}  />
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
