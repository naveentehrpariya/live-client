import React from 'react'
import AdminLayout from './layout/AdminLayout'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import Loading from '../pages/common/Loading';

export default function AdminDashboard(){

  const { loading, data  } = useFetch({url:'/admin/dashboard'});

  return (
      <AdminLayout heading={"Dashboard"} >
             {loading ?  <Loading />
              : 
                <div className='grid lg:grid-cols-3 gap-8' >
                      {data && data.map((d, i)=>{ 
                        return <Link to={d.route}  className='bg-dark1 p-8 rounded-xl text-start'>
                          <h2 className="text-white font-bold text-3xl">{d.data}</h2>
                          <p className='text-gray-300 text-xl mt-2'>{d.title}</p>
                        </Link>
                      })}
                </div>
              }
      </AdminLayout>
  )
}
