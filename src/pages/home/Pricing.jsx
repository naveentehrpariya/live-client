import React, { useContext, useEffect, useState } from 'react'
import Endpoints from '../../api/Endpoints';
import { UserContext } from '../../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from '../common/CurrencyFormat';
import toast from 'react-hot-toast';
import Loading from '../common/Loading';

export default function Pricing({classes, colclasses, heading}) {

   const {user, admin} = useContext(UserContext);
   const [lists, setLists] = useState([]);
   const [loading, setLoading] = useState(false);
   
   function fetch_plans() {
      setLoading(true);
      const m = new Endpoints();
      const resp = m.pricingPlanLists();
      resp.then((res) => {
      setLoading(false);
      setLists(res.data.items);
      }).catch((err) => {
      setLoading(false);
      });
   }
  
    useEffect(()=>{
      fetch_plans();
    },[]);

    async function getUserCurrencyByIP() {
      try {
        const response = await fetch('https://ipapi.co/json/'); // Using IPAPI as an example
        const data = await response.json();
        console.log("data.currency",data.currency)
        return data.currency || 'USD'; // Default to USD if not available
      } catch (error) {
        console.error('Error fetching user location:', error);
        return 'USD'; // Default to USD on error
      }
    }

   const PLAN = ({p, i}) => { 
      const rsarrya = JSON.parse(p && p.resolutions);
      const features =  [
         { text: `Number of streams: ${p.allowed_streams}`},
         { text: "Stream duration: 24/7" },
         { text: `Storage: ${p.storage}GB` },
         { text: "Stream builder" },
         { text: `Video quality: ${rsarrya.join(", ")}` },
         { text: "Audio quality: 320kbps" },
         { text: "Instant server availability" },
      ]
      const navigate = useNavigate();
      const [subscribing, setSubscribing ] = useState(false);

      const subscribePlan = async (id) => { 
         const c =  await getUserCurrencyByIP();
         console.log('c', c)
         if(!user){
            navigate('/login');
            return false;
         } 
         setSubscribing(true);
         const m = new Endpoints();
         const resp = m.subscribePlan({ id : id, currency:c || "USD"}); 
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
      const currency = CurrencyFormat(); 
      return <div key={p._id} className={`bg-dark2 flex flex-col items-center py-6 text-lg leading-6 text-white rounded-3xl bg-white bg-opacity-10`}>
         <h2 className='text-[25px] font-bold  ' >{p.name}</h2>
         <div className="mt-3.5 font-bold text-red-500 text-[24px] capitalize leading-[90%]">{currency(p.price)} -  {p.duration} months</div>
         <div className="flex flex-col self-stretch px-4 mt-6 w-full text-base">
         <hr className="shrink-0 h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10" />
         {features && features.map((f, index) => (
            <FeatureItem key={index} >
               {f.text}
            </FeatureItem>
         ))}
         {admin && admin.role === '1' ? 
         <Link to={`/admin/edit-plan/${p._id}`} className="btn md mt-8"> Edit Plan</Link>
         : <button onClick={()=>subscribePlan(p._id)} className="btn md mt-8">
            {subscribing ? "Loading" : "Buy Now"}
         </button> 
         }
         </div>
      </div>
   }

   function FeatureItem({ icon, children }) {
      return (
        <div className="flex gap-2 mt-5">
          <div className='mt-2'><svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill="#E13939"/>
               </svg>
            </div>
          <div>{children}</div>
        </div>
      );
   }

  return (
    <div id='pricing'>

      { loading ? <Loading /> : 
      <div className={` ${classes}`}>
         {heading ? <>
            <h2 className='heading-md text-center' >Our <span className='text-main' >Pricing</span>  </h2>
            <p className='text-gray-400  text-center text-[18px] mt-2' >We have many feature for you to use in live stream </p>
         </> : ''}
         <div className={`grid ${colclasses}`} >
            {lists && lists.map((p, i)=>{
               return <PLAN p={p} key={`plan-${i}`} i={i} />
            })}
         </div>
      </div>
      }
   </div>
  )
}



 