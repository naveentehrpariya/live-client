import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function SubscriptionCancel(){

   const {id} = useParams();
   const [count, setCount] = useState(0);
      useEffect(()=>{
      const interval = setInterval(() => {
         setCount(count + 1);
         if(count == 5){
            clearInterval(interval);
            // window.location.href = '/home';
         }
      }, 1000);
      return () => clearInterval(interval);
   },[]);


   return (
      <div className='w-full h-screen bg-gray-200 flex items-center justify-center' >
         <div class="">
            <div class=" p-6  md:mx-auto">
               <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
                     <path fill="#a90d0d"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                     </path>
               </svg>
               <div class="text-center">
                     <h3 class="md:text-2xl text-base text-[#a90d0d] font-semibold text-center">Payment Failed !</h3>
                     <p class="text-gray-600 my-2">If any money is deducted from your account, it will be refunded  in 3-5 working days. </p>
                     <p> Redirecting in 5 secs. </p>
                     <div class="py-10 text-center">
                        <Link to="/home" class="sm btn btn-main">
                           GO BACK 
                        </Link>
                     </div>
               </div>
            </div>


         </div>
      </div>
   )
}
   