import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import Loading from '../pages/common/Loading';
import Nocontent from '../pages/common/NoContent';
import AdminTitle from './layout/AdminTitle';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthProvider';
import CurrencyFormat from '../pages/common/CurrencyFormat';
import Pagination from '../pages/common/Pagination';
import Time from '../pages/common/Time';
import AdminApi from '../api/AdminApi';

export default function Users() {
  const {Errors} = useContext(UserContext);
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const time = Time();
  const limit = 30
  async function fetch(pg,signal) {
    if(!loading){
      setLoading(true);
      const resp = AdminApi.get(`/admin/users/${type || "all"}?page=${pg}&limit=${limit}`, {signal});
      resp.then((res)=>{
        setData(res.data.result || []);
        if(res.data.status){
          setPage(res.data.current_page);
          setTotalPages(res.data.total_pages);
        }
        setLoading(false);
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
    navigate(`/admin/users/${e}`);
  }

  const ITEM = ({item, index}) => { 
    const [status, setStatus] = useState(item.status)

    const changeStatus = () => { 
      const resp = AdminApi.get(`/admin/user/enable-disable-user/${item._id}`);
      resp.then((res)=> {
        if(res.data.status){
          setStatus(status === "active" ? "inactive" : "active");
          toast.success(res.data.message);
        } else { 
          toast.error(res.data.message);
        }
      }).catch((err)=>{
        console.log(err);
        Errors(err);
      });
    }
    const currency = CurrencyFormat(); 

    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      if(bytes){
        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
      } else { 
        return "N/A";
      }
    }

    return <tr className="border-b border-gray-900">
    {/* <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-300 sm:px-3 lg:text-left">
      {index+(limit*page-1)}
    </td> */}
    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-300 sm:px-3 lg:text-left">
      <p>{item.name}</p>
      <p>{item.email}</p>
    </td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.country} ({item.country_code})</td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{time(item.createdAt)}</td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{formatBytes(parseInt(item.uploaded_content) || 0)}</td>
    <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">
      <p>Stream Limit : {item?.streamLimit|| "0"}</p>
      <p>Storage Limit : {item?.storageLimit|| "0"} GB</p>
    </td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell capitalize">
      <button onClick={changeStatus} className={`capitalize text-white rounded-xl py-1 px-3 ${status === 'active' ? "bg-green-600 " : "bg-red-500" }`}>
        {status}
      </button>
    </td>
    
  </tr>
  }

  return (
    <>
      <AdminLayout>
        <AdminTitle heading="Users">
            <div>
              <button className={`${type === 'active' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("active")}>Active</button>
              <button className={`${type === 'inactive' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("inactive")}>Inactive</button>
            </div>
        </AdminTitle>
        {loading ? <Loading /> : 
        <>
          {data && data.length ?
            <div className="overflow- rounded-xl bg-dark1 px-6 shadow lg:px-4">
              <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                <thead className=" border-b border-gray-800 lg:table-header-group">
                  <tr className="">
                    <td className="whitespace-normal py-4 text-sm font-semibold text-gray-200 sm:px-3">Name</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Country</td>
                    <td className="whitespace-normal py-4 text-sm font-semibold text-gray-200 sm:px-3">Joined Date</td>
                    <td className="whitespace-normal py-4 text-sm font-semibold text-gray-200 sm:px-3">Uploaded Media</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Stream Limit / Storage Limit</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Status</td>
                  </tr>
                </thead>
                <tbody className="bg-dark1 lg:border-gray-100">
                  {data && data.map((item, index) => {
                    return <ITEM key={`user-${index}`} index={index+1} item={item} />
                  })}
                </tbody>
              </table>
            </div> 
            : <Nocontent />
          }
          <Pagination fetch={fetch} setPage={setPage} total={totalPages} currentPage={page} />
          </>
        }
      </AdminLayout>
    </>
  )
}
