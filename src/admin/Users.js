import React, { useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import useFetch from '../hooks/useFetch';
import Loading from '../pages/common/Loading';
import AdminTitle from './layout/AdminTitle';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../api/Api';

export default function Users() {
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  async function fetch(signal) {
    if(!loading){
      setLoading(true);
      const resp = Api.get(`/admin/users/${type || "active"}`, {signal});
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
    navigate(`/admin/users/${e}`);
  }

  return (
    <>
      <AdminLayout>
        <AdminTitle heading="Users">
            <div>
              <button className={`${type == 'active' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("active")}>Active</button>
              <button className={`${type == 'inactive' ? 'bg-main' :  'bg-dark3'} text-white px-4 py-1 rounded-xl ms-3`}  onClick={()=>handleState("inactive")}>Inactive</button>
            </div>
        </AdminTitle>
        {loading ? <Loading /> : 
          <div class="overflow- rounded-xl bg-dark1 px-6 shadow lg:px-4">
            <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead class=" border-b border-gray-800 lg:table-header-group">
                <tr class="">
                  <td class="whitespace-normal py-4 text-sm font-semibold text-gray-200 sm:px-3">
                    Name
                  </td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Username</td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Email</td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Status</td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Active Plan</td>
                  {/* <td class="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Action</td> */}
                </tr>
              </thead>
              <tbody class="bg-dark1 lg:border-gray-100">
                {data && data.map((item, index) => {
                  return  <tr class="border-b border-gray-900">
                      <td class="whitespace-no-wrap py-4 text-left text-sm text-gray-300 sm:px-3 lg:text-left">
                        {item.name}
                      </td>
                      <td class="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.username}</td>
                      <td class="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.email}</td>
                      <td class="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell capitalize"><span className={`text-white rounded-xl py-1 px-3 ${item.status === 'active' ? "bg-green-600 " : "bg-red-500" }`}>{item.status}</span></td>
                      <td class="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">{item?.plan?.name || "N/A"}</td>
                      {/* <td class="py-4 text-sm font-normal text-gray-200 sm:px-3 lg:table-cell">
                        <span class="ml-2 mr-3 rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">Action Required</span>
                      </td> */}
                    </tr>
                })}
              
              </tbody>
            </table>
          </div>
        }
      </AdminLayout>
    </>
  )
}
