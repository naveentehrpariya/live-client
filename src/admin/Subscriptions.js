import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import Loading from '../pages/common/Loading';
import AdminTitle from './layout/AdminTitle';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../api/Api';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthProvider';

export default function Subscriptions() {

  const { Errors } = useContext(UserContext);
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  async function fetch(signal) {
    if(!loading){
      setLoading(true);
      const resp = Api.get(`/admin/subscriptions/${type || "all"}`, {signal});
      resp.then((res)=>{
        setData(res.data.result || []);
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
    fetch(signal);
  }, [type]);

  const navigate = useNavigate();
  const handleState = (e) => {
    navigate(`/admin/subscriptions/${e}`);
  }
  
  const ITEM = ({item}) => { 
    const [status, setStatus] = useState(item.status);

    return <tr class="border-b border-gray-900">
    <td class="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.user.name}</td>
    <td class="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.user.email}</td>
    <td class="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{item?.plan?.name || "N/A"} ({item?.plan?.price || "N/A"}/month)</td>
    <td class="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{item?.upcomingPayment || "--"}</td>
    <td class="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{item?.createdAt || "--"}</td>
    <td class="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{item?.endedAt || "--"}</td>
    <td class="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell capitalize">
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
    </td>
  </tr>
  }

  return (
    <>
      <AdminLayout>
        <AdminTitle heading="Youtube Streams">
            <div>
              <button className={`${type === 'all' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("all")}>All</button>
              <button className={`${type === "paid" ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("paid")}>Paid</button>
              <button className={`${type === "pending" ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("pending")}>Pending</button>
              <button className={`${type === "expired" ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("expired")}>Expired</button>
            </div>
        </AdminTitle>
        {loading ? <Loading /> : 
          <div class="overflow- rounded-xl bg-dark1 px-6 shadow lg:px-4">
            <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead class=" border-b border-gray-800 lg:table-header-group">
                <tr class="">
                  <td class="whitespace-normal py-4 text-sm font-semibold text-gray-200 sm:px-3">Title</td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Video</td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Stream Key</td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Start Date</td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">End Date</td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Status</td>
                </tr>
              </thead>
              <tbody class="bg-dark1 lg:border-gray-100">
                {data && data.map((item, index) => {
                  return <ITEM key={`subscription-${index}`} item={item} />
                })}
              </tbody>
            </table>
          </div>
        }
      </AdminLayout>
    </>
  )
}
