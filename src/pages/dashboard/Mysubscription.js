import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/AuthProvider';
import AuthLayout from '../../layout/AuthLayout';
import Api from '../../api/Api';
import CurrencyFormat from '../common/CurrencyFormat';
import Time from '../common/Time';

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


   return (
      <>
      <AuthLayout heading={"My Subscription"} >
         {data ? <div class="mx-auto rounded-xl max-w-[400px] pt-6 items-center justify-center text-center">
            <h2 className='text-white font-bold text-2xl ' >{data && data.plan && data.plan.name}</h2>
            <h3 className='text-white font-bold text-2xl ' >{currency(data && data.plan && data.plan.price)} /month</h3>
            <p className='text-gray-400 font-bold text-md mt-2' >{data && data.plan && data.plan.description}</p>
            <p className='text-gray-400 mt-2' >Benefits Ends on :{time(data && data.plan && data.createdAt)}</p>
            <p className='text-gray-400 mt-2' >Next payment will be on :{time(data && data.plan && data.upcomingPayment)}</p>
            <button className='text-main  mt-2 disabled'  >Cancel Subscription</button>
         </div> 
         : 
         <h2>There is not any subscription active</h2>
         }
      </AuthLayout>
      </>
   )
}
