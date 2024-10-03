import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/AuthProvider';
import AuthLayout from '../../layout/AuthLayout';
import Api from '../../api/Api';
import CurrencyFormat from '../common/CurrencyFormat';
import Time from '../common/Time';
import { Link } from 'react-router-dom';
import { FaAddressCard } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export default function Mysubscription () {

    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    async function fetch(signal) {
      if(!loading){
        setLoading(true);
        const resp = Api.get(`/my-subscriptions`, {signal});
        resp.then((res)=>{
          setData(res.data.subscriptions || null);
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
    }, []);

    const currency = CurrencyFormat(); 
    const time = Time();

    const vr = data && data.plan ? JSON.parse(data.plan.resolutions) : [];
    
   return (
      <>
      <AuthLayout heading={"My Subscription"} >

        <div className='flex flex-wrap text-white text-lg mb-3' >
          <p className='mb-3 p-2 rounded-2xl px-4 me-2 bg-main'>Total Stream Limit {user && user.streamLimit}</p>
          <p className='mb-3 p-2 rounded-2xl px-4 me-2 bg-main'>Storage Limit : {user && user.storageLimit} GB</p>
          <p className='mb-3 p-2 rounded-2xl px-4 me-2 bg-main'>Stream Resolutions : {user && user.allowed_resolutions.join(',')}</p>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5'>
          {data && data.map((item,i)=>{
            return <div className="bg-dark1 p-6 rounded-2xl">
                <h2 className='text-white font-bold mt-3 text-2xl' >{item && item.plan && item.plan.name}</h2>
                <p className='text-gray-200 text-md mb-4 mt-2' >{item && item.plan && item.plan.description}</p>
                
                <div className='mt-8'>
                  <h3 className='text-gray-400 font-bold text-md' >Plan : </h3>
                  <h3 className='text-white text-md' > {currency(item && item.plan && item.plan.price, "USD")}/month</h3>
                </div>

                <div className='mt-4'>
                  <h3 className='text-gray-400 font-bold text-md' >Plan Duration : </h3>
                  <h3 className='text-white text-md ' >{user?.plan_months || 1} Months</h3>
                </div>

                <div className=' mt-4'>
                  <h3 className='text-gray-400 font-bold text-md' >Start On : </h3>
                  <h3 className='text-white text-md ' >{time(item && item.createdAt)}</h3>
                </div>

                <div className=' mt-4'>
                  <h3 className='text-gray-400 font-bold text-md' >Expire On : </h3>
                  <h3 className='text-white text-md ' >{time(item && item.endOn)}</h3>
                </div>

                {/* <div className='checklist mt-6 border-t border-gray-800 py-3 flex items-center justify-between'>
                  <h2 className='flex items-center text-lg text-gray-200'><FaCheck size={'22px'} className='me-2' color='var(--main)' /> Streams</h2>
                  <div className='text-white text-lg'>{data?.plan?.allowed_streams} streams</div>
                </div>

                <div className='checklist border-t border-gray-800 py-3 flex items-center justify-between'>
                  <h2 className='flex items-center text-lg text-gray-200'><FaCheck size={'22px'} className='me-2' color='var(--main)' /> Video quality</h2>
                  <div className='max-w-[50%] text-white text-lg'>{vr.join(", ")}</div>
                </div>
                
                <div className='checklist border-t border-gray-800 py-3 flex items-center justify-between'>
                  <h2 className='flex items-center text-lg text-gray-200'><FaCheck size={'22px'} className='me-2' color='var(--main)' /> Audio quality</h2>
                  <div className='text-white text-lg'>320kbps</div>
                </div> */}

            </div> 
          })}
        </div>
        {/* <Link to='/upgrade/subscription' className="block text-normal mt-4 px-4 py-3 rounded-3xl text-center text-white uppercase bg-green-600">
          Renew Plan
        </Link> */}
      </AuthLayout>
      </>
   )
}
