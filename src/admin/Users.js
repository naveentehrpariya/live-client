import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import useFetch from '../hooks/useFetch';
import Loading from '../pages/common/Loading';
import Nocontent from '../pages/common/NoContent';
import AdminTitle from './layout/AdminTitle';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../api/Api';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthProvider';
import CurrencyFormat from '../pages/common/CurrencyFormat';

export default function Users() {
  const {Errors} = useContext(UserContext);
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  async function fetch(signal) {
    if(!loading){
      setLoading(true);
      const resp = Api.get(`/admin/users/${type || "all"}`, {signal});
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

  const ITEM = ({item}) => { 
    const [status, setStatus] = useState(item.status)
    const changeStatus = () => { 
      const resp = Api.get(`/admin/user/enable-disable-user/${item._id}`);
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


    return <tr className="border-b border-gray-900">
    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-300 sm:px-3 lg:text-left">
      {item.name}
    </td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.username}</td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.email}</td>
    <td className="py-4 text-left text-sm text-gray-300 sm:px-3 lg:table-cell lg:text-left">
      <p>{item?.plan?.name || "N/A"}</p>
      {item?.plan?.price ? <p>{currency(item?.plan?.price)}/month</p> :""}
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
                    <td className="whitespace-normal py-4 text-sm font-semibold text-gray-200 sm:px-3">
                      Name
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Username</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Email</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Active Plan</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Status</td>
                  </tr>
                </thead>
                <tbody className="bg-dark1 lg:border-gray-100">
                  {data && data.map((item, index) => {
                    return <ITEM key={`user-${index}`} item={item} />
                  })}
                </tbody>
              </table>
            </div> 
            : <Nocontent />
          }
          </>
        }
      </AdminLayout>
    </>
  )
}
