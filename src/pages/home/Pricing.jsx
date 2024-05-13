import React, { useContext, useEffect, useState } from 'react'
import Endpoints from '../../api/Endpoints';
import { UserContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {

   const {isAuthenticated} = useContext(UserContext);

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

   const PLAN = ({p, i}) => { 

      const features =  [
         { text: `Number of streams: ${p.allowed_streams}`},
         { text: "Stream duration: 24/7" },
         { text: `Storage: ${p.storage}GB` },
         { text: "Stream builder" },
         { text: "Video quality: 1080p@30fps" },
         { text: "Audio quality: 320kbps" },
         { text: "Instant server availability" },
      ]
      const navigate = useNavigate();

      const [subscribing, setSubscribing ] = useState(false);
      const subscribePlan = (id) => { 
         if(!isAuthenticated){
            navigate('/login');
            return false;
         }
         setSubscribing(true);
         const m = new Endpoints();
         const resp = m.subscribePlan({
            productId : id
         });
         resp.then((res) => {
            setSubscribing(false);
            if(res.data.url){
               window.location.href = res.data.url;
            }
         }).catch((err) => {
            setSubscribing(false);
         });
      }

      return <div key={p._id} className="bg-dark2 flex flex-col items-center py-6 text-lg leading-6 text-white rounded-3xl bg-white bg-opacity-10">
      <h2 className='text-[25px] font-bold  ' >{p.name}</h2>
      <div className="mt-3.5 font-bold text-red-500 text-[24px] capitalize leading-[90%]">${p.price}</div>
      <div className="flex flex-col self-stretch px-4 mt-6 w-full text-base">
      <hr className="shrink-0 h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10" />
      {features && features.map((f, index) => (
         <FeatureItem key={index} >
            {f.text}
         </FeatureItem>
      ))}
      <button onClick={()=>subscribePlan(p.productId)} className="btn md mt-8">
         {subscribing ? "Loading" : "Start your free trial"}
      </button>
      </div>
   </div>
   }

    function FeatureItem({ icon, children }) {
      return (
        <div className="flex gap-2 mt-5">
          <div><svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill="#E13939"/>
               </svg>
            </div>
          <div>{children}</div>
        </div>
      );
    }

  return (
    <div id='pricing' className='px-8'>
      <div className='pricing py-24 bg-dark1 rounded-[35px]'>
         <div className='container m-auto' >
            <h2 className='heading-md text-center ' >Our <span className='text-main' >Pricing</span>  </h2>
            <p className='text-gray-400  text-center text-[18px] mt-2' >We have many feature for you to use in live stream </p>
         
            <div className='mt-12 grid grid-cols-4 gap-5' >
               {lists && lists.map((p, i)=>{
                  return <PLAN p={p} key={`plan-${i}`} i={i} />
               })}
            </div>
         </div>
      </div>
   </div>
  )
}



 