import React, { useEffect } from 'react'
import AdminLayout from './layout/AdminLayout'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import Loading from '../pages/common/Loading';
import CurrencyFormat from '../pages/common/CurrencyFormat';
import axios from 'axios';
import AdminApi from '../api/AdminApi';

export default function AdminDashboard(){

  const { loading, data  } = useFetch({url:'/admin/dashboard'});

  const [earnings, setearnings] = React.useState([]);

  async function fetchEarnings() {
    const resp = AdminApi.get('/admin/earnings');
    resp.then((res)=>{
      setearnings(res.data.result || []);
    }).catch((err)=>{
      console.log(err);
    });
  }


  useEffect(() => {
    fetchEarnings();
  }, []);

  const currency = CurrencyFormat(); 

  return (
      <AdminLayout heading={"Dashboard"} >
             {loading ?  <Loading />
              : 
                <div className='grid lg:grid-cols-3 gap-8' >
                      <div className='bg-dark1 p-8 rounded-xl text-start'>
                          <h2 className="text-white font-bold text-3xl">{currency(earnings.totalEarnings||0)}</h2>
                          <p className='text-gray-300 text-xl mt-2'>Total Earning</p>
                      </div>
                      <div className='bg-dark1 p-8 rounded-xl text-start'>
                          <h2 className="text-white font-bold text-3xl">{currency(earnings.currentMonthEarnings||0)}</h2>
                          <p className='text-gray-300 text-xl mt-2'>Earning This Month</p>
                      </div>

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
