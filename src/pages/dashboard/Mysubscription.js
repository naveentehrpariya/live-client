import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/AuthProvider';
import AuthLayout from '../../layout/AuthLayout';
import Api from '../../api/Api';
import CurrencyFormat from '../common/CurrencyFormat';
import Time from '../common/Time'; 
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';
import Popup from '../common/Popup';
import toast from 'react-hot-toast';
import Endpoints from '../../api/Endpoints';
import NoContent from '../common/NoContent';

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


    const navigate = useNavigate();
    const Subscribe = ({p}) => {
      console.log(p); 
      const [subscribing, setSubscribing ] = useState(false);
      const subscribePlan = async (id, d) => { 
         setSubscribing(true);
         if(!user){
            navigate('/login');
            return false;
         } 
         const m = new Endpoints();
         const resp = m.subscribePlan({ id : id, currency:user.currency || "USD", duration : d}); 
         resp.then((res) => {
            if(res.data.status && res.data.short_url){
               window.location.href = res.data.short_url;
            } else {
               toast.error(res.data.message || "Something went wrong with plans. Please try again later");
            }
         }).catch((err) => {
            setSubscribing(false);
         });
      }
      
      return <>
          <button onClick={()=>subscribePlan(p.plan._id, p.duration)} className='px-4 py-2 rounded-[30px] bg-main text-white uppercase w-full mt-3 ' >{subscribing ? "Processing..." : "RENEW PLAN"}</button>
      </>
   }


   return (
      <>
      <AuthLayout heading={"My Subscription"} >

        <div className='flex flex-wrap text-white text-lg mb-3' >
          <p className='mb-3 p-2 rounded-2xl px-4 me-2 bg-main'>Total Stream Limit : {user?.streamLimit || 0}</p>
          <p className='mb-3 p-2 rounded-2xl px-4 me-2 bg-main'>Storage Limit : {user?.storageLimit || 1} GB</p>
          {user && user?.allowed_resolutions && user?.allowed_resolutions.length ? <p className='mb-3 p-2 rounded-2xl px-4 me-2 bg-main'>Stream Resolutions : {user && user.allowed_resolutions.join(',')}</p> :''}
        </div>

        {loading ? <Loading /> :
          <>
            {data && data.length > 0 ? 
              <>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5'>
                  {data && data.map((item,i)=>{
                    const rs = JSON.parse(item.plan.resolutions);
                    return <div className={`bg-dark1 p-6 rounded-[30px] ${item.status ==='active' ? 'border border-gray-700' : 'border border-red-500'} `}>
                        <h2 className='text-white font-bold   text-2xl' >{item && item.plan && item.plan.name}</h2>
                        <div className='mt-4'> 
                          <h3 className='text-gray-400 font-bold text-md' >Plan Status : </h3>
                          <h3 className={`text-lg uppercase ${item.status ==='active' ? 'text-green-500' : 'text-red-500'}`} > {item.status}</h3>
                        </div>
                        <div className='mt-4'>
                          <h3 className='text-gray-400 font-bold text-md' >Plan : </h3>
                          <h3 className='text-white text-md' > {currency(item && item.plan && item.plan.price, "USD")}/month</h3>
                        </div>

                        <div className='mt-4'>
                          <h3 className='text-gray-400 font-bold text-md' >Allowed Resolution : </h3>
                          <h3 className='text-white text-md ' >{item && item.plan && item.plan.resolutions && rs.join(',')}</h3>
                        </div>
                        <div className='mt-4'>
                          <h3 className='text-gray-400 font-bold text-md' >Stream Limit : </h3>
                          <h3 className='text-white text-md ' >{item && item.plan && item.plan.allowed_streams}</h3>
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
                        
                        {item.status !=='active' ? <Subscribe p={item} />  : ''}

                    </div> 
                  })} 
                </div>
              </>
            :
              <>
                <NoContent subheading={true} subtext="Currently you don't have any active subscription." />
              </>
            }
          </>
        }

      </AuthLayout>
      </>
   )
}
