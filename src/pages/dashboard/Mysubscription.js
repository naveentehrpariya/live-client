import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/AuthProvider';
import AuthLayout from '../../layout/AuthLayout';
import Api from '../../api/Api';
import CurrencyFormat from '../common/CurrencyFormat';
import Time from '../common/Time';
import { Link } from 'react-router-dom';

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
         {data ?
         <>
            {user.planStatus === 'active' ? 
            <div className="bg-dark1 mx-auto border !border-gray-600 p-8 rounded-xl max-w-[400px] items-center justify-center text-start">
                <h2 className='text-white font-bold text-2xl mb-1' >{data && data.plan && data.plan.name}</h2>
                <h3 className='text-white font-bold text-2xl ' >{currency(data && data.plan && data.plan.price)} /{data && data.plan && data.plan.duration_title}</h3>
                <p className='text-gray-200 font-bold text-lg mt-2' >{data && data.plan && data.plan.description}</p>
                <p className='text-gray-200 mt-2' >Benefits Start From : {time(data && data.createdAt)}</p>
                <p className='text-gray-200 mt-2' >Plan benefits will ends on  : {time(data && data.endOn)}</p>
                {/* <button className='text-main mt-2 disabled'  >Cancel Subscription</button> */}
            </div> : 
            <div className="bg-dark1 mx-auto border !border-gray-600 p-8 rounded-xl max-w-[400px] items-center justify-center text-start">
                <h2 className='text-gray-200 mt-2 text-2xl text-red-500 mb-3' >Your plan has been expired.</h2>
                <h2 className='text-white font-bold text-2xl mb-1' >{data && data.plan && data.plan.name}</h2>
                <h3 className='text-white font-bold text-2xl ' >{currency(data && data.plan && data.plan.price)} /{data && data.plan && data.plan.duration_title}</h3>
                <p className='text-gray-200 font-bold text-lg mt-2' >{data && data.plan && data.plan.description}</p>
                <p className='text-gray-200 mt-2' >Plan benefits has been ended on : {time(data && data.endOn)}</p>
                <Link to='/upgrade/subscription' className="block text-xl mt-4 px-4 py-3 rounded-3xl text-center text-white uppercase bg-green-600">
                  Renew Plan
                </Link>
            </div>
          } 
         </>
         : 
          <div className="bg-dark1 mx-auto border !border-gray-600 p-8 rounded-xl max-w-[400px] items-center justify-center text-start">
                <h2 className="text-white text-2xl mb-3">There is not any subscription active.</h2>
                <Link to='/upgrade/subscription' className="block text-xl mt-4 px-4 py-3 rounded-3xl text-center text-white uppercase bg-green-600">
                  Renew Plan
                </Link>
            </div>
         }
      </AuthLayout>
      </>
   )
}
