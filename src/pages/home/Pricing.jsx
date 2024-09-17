import React, { useContext, useEffect, useState } from 'react'
import Endpoints from '../../api/Endpoints';
import { UserContext } from '../../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from '../common/CurrencyFormat';
import toast from 'react-hot-toast';
import Loading from '../common/Loading';
import AdminApi from '../../api/AdminApi';
import Popup from '../common/Popup';

export default function Pricing({classes, colclasses, heading, type}) {

   const {user, admin, Errors} = useContext(UserContext);

   const [lists, setLists] = useState([]);
   const [loading, setLoading] = useState(false);

   function fetch_plans() {
      setLoading(true);
      const m = new Endpoints();
      const resp = type === "admin" ? m.adminpricingPlanLists() : m.pricingPlanLists() ;
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
         { text: `${rsarrya.join(", ")}` },
         { text: "Audio quality: 320kbps" },
         { text: "Instant server availability" },
      ];


      const navigate = useNavigate();
      const [subscribing, setSubscribing ] = useState(false);
      const [selectedDuration, setSelectedDuration] = useState(1);
      const subscribePlan = async (id) => { 
         const c =  await getUserCurrencyByIP();
         if(!user){
            navigate('/login');
            return false;
         } 
         setSubscribing(true);
         const m = new Endpoints();
         const resp = m.subscribePlan({ id : id, currency:c || "USD", duration : selectedDuration}); 
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

      const Subscribe = ({p}) => {
         const [open, setOpen] = useState();
         const durations = [1, 2, 4, 6, 12];
         return <>
            <Popup action={open} space={'p-6 sm:p-10'} btntext={"Buy Now"} btnclasses={'btn md mt-8'} >
               <div className="flex justify-center w-full mx-auto">
                  <div className=" w-full bg-white sm:rounded-lg">
                     <div className="mb-4 md:mb-10 text-center">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Subscribe Plan</h2>
                        <p className="text-md text-gray-500"> You are subscribing to {p.name} for {selectedDuration} months. </p>
                     </div>

                     <div className='chooseDurations grid grid-cols-2 sm:grid-cols-3 gap-2' >
                        {durations && durations.map((d, index) => (
                           <div onClick={()=>setSelectedDuration(d)} key={index}  className={` ${selectedDuration === d ? "bg-main text-white" : "bg-gray-200 text-black"} rounded-xl px-4 py-2 text-center cursor-pointer choosedurationItem`}>{d} Months</div>
                        ))}
                     </div>

                     <div className='flex justify-center'>
                        <button onClick={()=>subscribePlan(p._id)} className="btn md mt-8">{subscribing ? "Loading" : "Buy Now"}</button>                
                     </div>
                  </div>
               </div>
            </Popup>
         </>
      }

      const currency = CurrencyFormat(); 
         return <div key={p._id} className={`bg-dark2 px-4 py-8 text-lg leading-6 text-white rounded-3xl bg-white bg-opacity-10`}>
            <div className='px-4'>
               <h2 className='text-[17px] font-bold mb-6' >{p.name}</h2>
               <div className="mt-3.5 font-[900] text-red-500 text-[40px] capitalize leading-[90%]">{currency(p.price)}<span className='text-[17px]'> /month</span></div>
               <div title={p.description} className="mb-6 mt-3.5 font-[900] text-gray-300 text-[16px] capitalize line-clamp-2">{p.description}</div>
            </div>
            {dloading ? <Loading fixed={true} /> : ""}
            <div className="flex flex-col self-stretch px-4 mt-6 w-full text-base">
            {features && features.map((f, index) => (
               <FeatureItem key={index} >
                  {f.text}
               </FeatureItem>
            ))}
            {admin && admin.role === '1' ? 
            <>
            <Link to={`/admin/edit-plan/${p._id}`} className="btn md mt-8">Edit Plan</Link>
            {p.status === "active" ?
               <button onClick={()=>disablePlan(p._id)}  className={`btn !bg-red-800 md mt-3 cursor-pointer`} >{"Disable Plan"}</button>
            :
               <button onClick={()=>disablePlan(p._id)}  className={`btn !bg-green-800 md mt-3 cursor-pointer`} >{dloading ? "Processing" : "Enable Plan"}</button>
            }
            </>
            : <Subscribe p={p}  /> 
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

   const navigate = useNavigate();
   const [dloading, setDloading] = useState(false);
   const disablePlan = (id) => {
      setDloading(true);
      const resp =  AdminApi.get(`/disable_pricing_plan/${id}`);
      resp.then(res => {
        if(res.data.status){
           window.location.reload();  // Refresh the page to reflect the changes in plans.  //
           toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
        setDloading(false);
      }).catch(err => {
        Errors(err);
        setDloading(false);
      });
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



 