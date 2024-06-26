import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import Loading from '../pages/common/Loading';
import AdminTitle from './layout/AdminTitle';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthProvider';
import Nocontent from '../pages/common/NoContent';
import Time from '../pages/common/Time';
import Pagination from '../pages/common/Pagination';
import { GrFormView } from "react-icons/gr";
import AdminApi from '../api/AdminApi';

export default function Streams() {

  const { Errors } = useContext(UserContext);
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  async function fetch(pg, signal) {
    if(!loading){
      setLoading(true);
      const resp = AdminApi.get(`/admin/streams/${type || "all"}?page=${pg}&limit=10`, {signal});
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
    fetch(page, signal);
  }, [type]);

  const navigate = useNavigate();
  const handleState = (e) => {
    navigate(`/admin/streams/${e}`);
  }

  const time = Time();
  const ITEM = ({item}) => { 
    const [status, setStatus] = useState(item.status)
    const stopStream = () => { 
      const resp = AdminApi.get(`/admin/stop-stream/${item.streamId}`);
      resp.then((res)=> {
        if(res.data.status){
          setStatus(status === 1 ? 0 : 1);
          toast.success(res.data.message);
        } else { 
          toast.error(res.data.message);
        }
      }).catch((err)=>{
        console.log(err);
        Errors(err);
      });
    }

    return <tr className="border-b border-gray-900">
      <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-300 sm:px-3 lg:text-left"><p>{item.title}</p> <p>{item.user.email}</p></td>
      <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left"><p>Started : {time(item?.createdAt)}</p><p className='text-red-500'>Ended : {time(item?.endedAt)}</p></td>
      <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">
        <p>
        {item.thumbnail ? <a target='_blank'  rel='noreferrer' className='flex items-center text-gray-300' href={item.thumbnail}><GrFormView size={'1.2rem'} /> Thumbnail</a> : ""}
        </p>
        <p>
        {item.video ? <a target='_blank' rel='noreferrer' className='flex items-center text-gray-300' href={item.video}><GrFormView size={'1.2rem'} /> Video</a> : ""}
        </p>
      </td>
      <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell capitalize">
      {status === 1 ?  <button onClick={stopStream} className={`text-white rounded-xl py-1 px-3 ${status === 1 ? "bg-green-600 " : "bg-red-500" }`}>Running</button>
        :
        <span className={`text-white rounded-xl py-1 px-3 ${status === 1 ? "bg-green-600 " : "bg-red-800" }`}>ENDED</span>
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
        <AdminTitle heading={`${type === 'all' ? "Streams" : type == 1 ? "Live Stream" : "Ended Streams"  }`}>
            <div>
                <button className={`${type === 'all' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("all")}>All</button>
                <button className={`${type === 1 ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState(1)}>Active</button>
                <button className={`${type === 0 ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState(0)}>Ended</button>
            </div>
        </AdminTitle>
        {loading ? <Loading /> : 
        <>
        {data && data.length ? 
          <div className="overflow- rounded-xl bg-dark1 px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead className=" border-b border-gray-800 lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-200 sm:px-3">Title</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Started/Ended</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Content</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Status</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Action</td>
                </tr>
              </thead>
              <tbody className="bg-dark1 lg:border-gray-100">
                {data && data.map((item, index) => {
                  return <ITEM key={`stream-${index}`} item={item} />
                })}
              </tbody>
            </table>
          </div> : <Nocontent />
        }
        <Pagination fetch={fetch} setPage={setPage} total={totalPages} currentPage={page} />
        </>
        }
      </AdminLayout>
    </>
  )
}
