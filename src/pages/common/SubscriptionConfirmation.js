import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Endpoints from '../../api/Endpoints';
import toast from 'react-hot-toast';

export default function SubscriptionConfirmation() {

   const [loading, setLoading] = useState(false);
   const [data, setData] = useState([]);
   const {razorpay_payment_link_status} = useParams();

   // function getDetails() {
   //    setLoading(true); 
   //    const m = new Endpoints();
   //    const resp = m.update_payment_status({
   //       id:id
   //    });
   //    resp.then((res) => {
   //       if(res.data.status){
   //          toast.success(res.data.message);
   //          setTimeout(()=>{
   //             window.location.href = '/home';
   //          }, 2000);
   //       } else { 
   //          toast.error(res.data.message);
   //       }
   //       setLoading(false);
   //    }).catch((err) => {
   //       setLoading(false);
   //    });
   // }
   //  useEffect(()=>{
   //    setTimeout(()=>{
   //       window.location.href = '/home';
   //    }, 5000);
   //  },[]);

   const [count, setCount] = useState(0);
    useEffect(()=>{
      if(razorpay_payment_link_status !== 'paid'){
          toast.error("Payment Failed");
      } else { 
         const interval = setInterval(() => {
            setCount(count + 1);
            if(count === 5){
               window.location.href = '/home';
            }
            clearInterval(interval);
         }, 1000);
         return () => clearInterval(interval);
      }
   },[]);

  return (
    <div className='w-full h-screen bg-gray-200 flex items-center justify-center' >
         <div className="">
            <div className=" p-6  md:mx-auto">
               <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                     <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                     </path>
               </svg>

               <div className="text-center">
                     <h3 className="md:text-2xl text-base text-green-600 font-semibold text-center">Payment Done!</h3>
                     <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                     <p> Have a great day!  </p>
                     {/* <p> Redirecting in 5 secs.</p> */}
                     <div className="py-10 text-center">
                        <Link to="/home" className="sm btn btn-main">
                           BACK TO HOMEPAGE
                        </Link>
                     </div>
               </div>
            </div>
         </div>
    </div>
  )
}
