import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import AdminTitle from '../layout/AdminTitle';
import AddTestimonials from './AddTestimonials';
import Api from '../../api/Api';
import toast from 'react-hot-toast';
import defaultimg from '../../img/default-avatar.jpg'
export default function SiteTestimonials(){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetch() {
      setLoading(true);
      const resp = Api.get('/all-testimonial');
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
        const resp = Api.get(`/remove-testimonial/${item._id}`);
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
              
              <div className="border h-full border-gray-800 mb-6 transition-all duration-200 rounded-[20px] cursor-pointer">
                  <div className={`testimonial text-center p-6`}>
                    <img alt={item.name} src={item.avatar || defaultimg} className='object-cover m-auto d-table mb-6 w-[80px] h-[80px] min-w-[80px] min-h-[80px] rounded-[50%]' />
                    <p className="text-[17px] text-white text-center font-bold">{item.name}</p>
                    <p title={item.description} className="text-[17px] text-gray-400 line-clamp-4">{item.description}</p>
                    <div className='flex item-center mt-4 justify-center'>
                    <button onClick={remove} className='text-red-500 me-6'>Remove</button>
                    <AddTestimonials text="Edit" classes={`text-main`} fetch={fetch} item={item} />
                    </div>
                  </div>
              </div>
          </>
      );
  };

  return (
      <AdminLayout heading={"Testimonials"} >

         <AdminTitle heading="Testimonials">
            <AddTestimonials classes={`bg-main text-white rounded-[30px] px-3 md:px-4 py-[4px] md:py-[13px] text-[12px] md:text-[15px] uppercase `}  fetch={fetch} />
        </AdminTitle>

        {data && data.length > 0 ? 
          <div className="features-cols">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data && data.map((item, index) => {
                    return <div key={`feature-item-${index}`}><ITEM i={index} item={item} /></div>;
                })}
              </div>
          </div>
        : ''}

      </AdminLayout>
  )
}
