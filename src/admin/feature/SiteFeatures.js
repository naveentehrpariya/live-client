import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import AdminTitle from '../layout/AdminTitle';
import useFetch from './../../hooks/useFetch';
import AddFeature from './AddFeature';
import Api from '../../api/Api';
import toast from 'react-hot-toast';

export default function SiteFeatures(){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetch() {
      setLoading(true);
      const resp = Api.get('/all-features');
      resp.then((res)=>{
          setData(res.data.result || []);
          setLoading(false);
      }).catch((err)=>{
          console.log(err);
          setLoading(false);
      });
    }
    useEffect(()=>{
        fetch();
    },[]);

  const ITEM = ({ item, i }) => { 
    async function remove() {
        setLoading(true);
        const resp = Api.get(`/remove-feature/${item._id}`);
        resp.then((res)=>{
            if(res.data.status){
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
            fetch();
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
        });
    }

      return (
          <>
              <style>{`
                  .feature-item-${i} {opacity: 0; transition: 0.9s; max-height: 0px; overflow: hidden; }
                  .feature-item-${i}.open { opacity: 1; transition: 0.9s; max-height: 300px; overflow: visible; }
              `}</style>
              
              <div className=" border border-gray-800 mb-6 transition-all duration-200 rounded-[20px] cursor-pointer">
                  <button className="flex items-center justify-between w-full p-4 pb-2">
                      <span className="flex text-[18px] font-semibold text-white font-mona"> {item.title} </span>
                  </button>
                  <div className={`feature-item-${i} open`}>
                      <div className='fitem text-gray-400 pt-0 p-4  '>
                          <p className="text-[17px]">{item.description}</p>
                          <div className='flex item-center mt-4'>
                            <button onClick={remove} className='text-red-500 me-6'>Remove</button>
                            <AddFeature text="Edit Feature" classes={`text-main`} fetch={fetch} item={item} />
                          </div>
                      </div>
                  </div>
              </div>
          </>
      );
  };

  return (
      <AdminLayout heading={"Features"} >
         <AdminTitle heading="Features">
            <AddFeature classes={`bg-main text-white rounded-[30px] px-3 md:px-4 py-[4px] md:py-[13px] text-[12px] md:text-[15px] uppercase `}  fetch={fetch} />
        </AdminTitle>

        {data && data.length > 0 ? 
          <div className="features-cols">
              <div className="features-faq">
                {data && data.map((item, index) => {
                    return <div key={`feature-item-${index}`}><ITEM i={index} item={item} /></div>;
                })}
              </div>
          </div>
        : ''}
      </AdminLayout>
  )
}
