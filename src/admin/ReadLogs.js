import React from 'react'
import useFetch from '../hooks/useFetch';
import AdminLayout from './layout/AdminLayout';
import Api from '../api/Api';
import AdminApi from '../api/AdminApi';

export default function ReadLogs() {
   
   const { loading, data  } = useFetch({url:'/admin/readlogs'});
   const clearLogs = () => {
      const resp = AdminApi.get(`/admin/clearlog`);
      resp.then((res)=>{
         if(res.data.status){
           window.location.reload();
         }
      }).catch((err)=>{
         console.log(err);
      });
   }   

   return (
      <div className='text-white'>
         <AdminLayout heading={"Logs"} >
            <button onClick={clearLogs} className='main-btn mb-3'>Clear Log</button>
            {data && data.map((log, index) => {
               return <>
                  <p className='text-gray-300 mb-2 break-words'>{log.timestamp} -- {log.message}</p>
               </>
            })}
         </AdminLayout>
      </div>
  )
}
