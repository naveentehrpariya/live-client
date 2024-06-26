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
import Pagination from '../pages/common/Pagination';
import AdminApi from '../api/AdminApi';

export default function Subscriptions() {

  const { Errors } = useContext(UserContext);
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  async function fetch(pg, signal) {
    if(!loading){
      setLoading(true);
      const resp = AdminApi.get(`/admin/subscriptions/${type || "all"}?page=${pg}&limit=10`, {signal});
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

  const time = Time();

  const navigate = useNavigate();
  const handleState = (e) => {
    navigate(`/admin/subscriptions/${e}`);
  }
  
  const ITEM = ({item}) => { 
    const [status, setStatus] = useState(item.status);

    return <tr className="border-b border-gray-900">
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.user.name}</td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.user.email}</td>
    <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{item?.plan ? <>{item?.plan?.name || "N/A"} ({item?.plan?.price || "N/A"}/month) </> : "--"}</td>
    <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{status === "paid" ? time(item?.upcomingPayment) : "N/A"}</td>
    <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{item?.createdAt ? time(item?.createdAt) : "N/A"}</td>
    <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{item?.endedAt ? time(item?.createdAt) : "N/A"}</td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell capitalize">
      {status === "paid" ? <span className={`text-white rounded-xl py-1 px-3 bg-green-600`}>
        Paid
      </span> : ""}
      {status === "expired" ? <span className={`text-white rounded-xl py-1 px-3 bg-red-600`}>
        Expired
      </span> : ""}
      {status === "pending" ? <span className={`text-white rounded-xl py-1 px-3 bg-yellow-600`}>
        Pending
      </span> : ""}
      {status === "inactive" ? <span className={`text-white rounded-xl py-1 px-3 bg-indigo-600`}>
        Inactive
      </span> : ""}
      {status === "payment_failed" ? <span className={`text-white rounded-xl py-1 px-3 bg-danger-600`}>
        Payment Failed
      </span> : ""}
    </td>
  </tr>
  }

  return (
    <>
      <AdminLayout>

        <AdminTitle heading="Subscriptions">
            <div>
              <button className={`${type === 'all' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("all")}>All</button>
              <button className={`${type === "paid" ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("paid")}>Paid</button>
              {/* <button className={`${type === "pending" ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("pending")}>Pending</button> */}
              <button className={`${type === "inactive" ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("inactive")}>Inactive</button>
            </div>
        </AdminTitle>
        {loading ? <Loading /> :
        
        <>
        {data && data.length ? 
          <div className="overflow- rounded-xl bg-dark1 px-6 shadow lg:px-4">
          <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
            <thead className=" border-b border-gray-800 lg:table-header-group">
              <tr className="">
                <td className="whitespace-normal py-4 text-sm font-semibold text-gray-200 sm:px-3">User</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Email</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Plan</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Upcoming Payment</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Start Date</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Ended Date</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Status</td>
              </tr>
            </thead>
            <tbody className="bg-dark1 lg:border-gray-100">
              {data && data.map((item, index) => {
                return <ITEM key={`subscription-${index}`} item={item} />
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
