import React, { useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import Loading from '../pages/common/Loading';
import Nocontent from '../pages/common/NoContent';
import AdminTitle from './layout/AdminTitle';
import { useParams } from 'react-router-dom';
import AdminApi from '../api/AdminApi';

export default function Inquiries() {
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function fetch(signal) {
    if(!loading){
      setLoading(true);
      const resp = AdminApi.get(`/user/contact/inquiries`, {signal});
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


  const ITEM = ({item, index}) => { 
    return <tr className="border-b border-gray-900">
    <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-300 sm:px-3 lg:text-left">{item.name}</td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.email}</td>
    <td className="py-4 text-sm font-normal text-gray-300 sm:px-3 lg:table-cell">{item.message}</td>
  </tr>
  }

  return (
    <>
      <AdminLayout>
        <AdminTitle heading="Inquiries"></AdminTitle>
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
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Email</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-3">Message</td>
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
          </>
        }
      </AdminLayout>
    </>
  )
}
