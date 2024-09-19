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
         {data ?
         <>
            {user?.planStatus === 'active' ? 
            <>
              <div className=" mt-6 lg:max-w-[400px] m-auto items-center justify-center">

                <div className='flex lg:justify-center'>
                  <div className='subscription-icon w-auto bg-dark2 border border-gray-600 rounded-xl px-[15px] py-[8px]'>
                    <FaAddressCard size={'90px'} color='white' />
                  </div>
                </div>

                  <h2 className='text-white font-bold lg:text-center mt-3 text-2xl' >{data && data.plan && data.plan.name}</h2>
                  <p className='text-gray-200 text-center  text-md mb-4 mt-2' >{data && data.plan && data.plan.description}</p>
                  
                  <div className='flex justify-between mt-8'>
                    <h3 className='text-white font-bold text-md' >Plan : </h3>
                    <h3 className='text-white text-md' > {currency(data && data.plan && data.plan.price, "USD")}/month</h3>
                  </div>

                  <div className='flex justify-between mt-4'>
                    <h3 className='text-white font-bold text-md' >Plan Duration : </h3>
                    <h3 className='text-white text-md ' >{user?.plan_months || 1} Months</h3>
                  </div>

                  <div className='flex justify-between mt-4'>
                    <h3 className='text-white font-bold text-md' >Start On : </h3>
                    <h3 className='text-white text-md ' >{time(data && data.createdAt)}</h3>
                  </div>

                  <div className='flex justify-between mt-4'>
                    <h3 className='text-white font-bold text-md' >Expire On : </h3>
                    <h3 className='text-white text-md ' >{time(data && data.endOn)}</h3>
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
            </>
            : 
            <div className=" mt-6 lg:max-w-[400px] m-auto items-center justify-center">

                <div className='flex lg:justify-center'>
                  <div className='subscription-icon w-auto bg-dark2 border border-gray-600 rounded-xl px-[15px] py-[8px]'>
                    <FaAddressCard size={'90px'} color='white' />
                  </div>
                </div>

                <h2 className='text-white font-bold lg:text-center mt-3 text-2xl' >{data && data.plan && data.plan.name}</h2>
                <p className='text-gray-200 text-center  text-md mb-4 mt-2' >{data && data.plan && data.plan.description}</p>
                  
                  <h2 className='text-red-500 text-xl my-2 lg:text-center'>Your Subscription has been expired.</h2>
                  <div className='flex justify-between mt-8'>
                    <h3 className='text-white font-bold text-md' >Plan : </h3>
                    <h3 className='text-white text-md' > {currency(data && data.plan && data.plan.price, "USD")}/month</h3>
                  </div>

                  <div className='flex justify-between mt-4'>
                    <h3 className='text-white font-bold text-md' >Plan Duration : </h3>
                    <h3 className='text-white text-md ' >{user?.plan_months || 1} Months</h3>
                  </div>
                  <div className='flex justify-between mt-4'>
                    <h3 className='text-white font-bold text-md' >Started From : </h3>
                    <h3 className='text-white text-md ' >{time(data && data.createdAt)}</h3>
                  </div>
                  <div className='flex justify-between mt-4'>
                    <h3 className='text-white font-bold text-md' >Expired On : </h3>
                    <h3 className='text-white  text-md ' >{time(data && data.endOn)}</h3>
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
                  <Link to='/upgrade/subscription' className="block text-normal mt-6 px-4 py-3 rounded-3xl text-center text-white uppercase bg-[var(--main)]">
                    Renew Plan
                </Link>
              </div>
          } 
         </>
         : 
          <div className="rounded-xl max-w-[400px] py-6 m-auto items-center justify-center text-start">
                <h2 className="text-white text-2xl mb-3">There are no active subscriptions.</h2>
                <Link to='/upgrade/subscription' className="block text-normal mt-4 px-4 py-3 rounded-3xl text-center text-white uppercase bg-green-600">
                  Renew Plan
                </Link>
            </div>
         }
      </AuthLayout>
      </>
   )
}
