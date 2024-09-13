import React, { useState } from 'react'
import Popup from '../../pages/common/Popup';
import Api from '../../api/Api';
import toast from 'react-hot-toast';

export default function AddTestimonials({fetch, item, classes, text}) {

   const [open, setOpen] = useState();
   const [loading, setLoading] = useState(false);
   const [name, setname] = useState(item?.name || '');
   const [description, setDescription] = useState(item?.description || '');
   const [avatar, setavatar] = useState(item?.avatar || '');

   async function edit() {
      const resp = Api.post('/edit-testimonial', {
         "id":item._id,
         "name":name,
         "avatar":"avatar",
         "description":description
      });
      resp.then((res)=>{
         if(res.data.status){
            toast.success(res.data.message);
         } else { 
            toast.error(res.data.message);
         }
         setLoading(false);
         fetch && fetch();
         setOpen('close');
      }).catch((err)=>{
         console.log(err);
         setLoading(false);
         toast.error("Failed to add testimonial. Something went wrong.");
      });
   }
   async function post() {
      const resp = Api.post('/add-testimonial', {
         "name":name,
         "avatar":"avatar",
         "description":description
      });
      resp.then((res)=>{
         if(res.data.status){
            toast.success(res.data.message);
         } else { 
            toast.error(res.data.message);
         }
         setLoading(false);
         fetch && fetch();
         setOpen('close');
         setTimeout(()=>{
            setOpen();
         })
      }).catch((err)=>{
         console.log(err);
         setLoading(false);
         toast.error("Failed to add testimonial. Something went wrong.");
      });
   }

   return (
    <div>
      <Popup action={open} space={'p-6 sm:p-10'} btntext={text || "+ Add More"} 
      btnclasses={classes} >
            <div className="flex justify-center w-full mx-auto">
               <div className=" w-full bg-white sm:rounded-lg">
                  <div className="mb-4 md:mb-10 text-center">
                     <h2 className="text-xl sm:text-2xl font-semibold mb-2">{item && item.name ? "Edit" : "Add"} Testimonial</h2>
                     <p className="text-md text-gray-500">Choose the type of feature to list on website.</p>
                  </div>

                  <div className='mb-6'>
                     <label className='text-gray-500 w-full block mb-1'>Name</label>
                     <input defaultValue={item?.name} onChange={(e)=>setname(e.target.value)} className='focus:outline-none bg-gray-200 w-full rounded-lg px-4 py-3' placeholder='Enter feature name' />
                  </div>

                  <div className='mb-6'>
                     <label className='text-gray-500 w-full block mb-1'>Message</label>
                     <textarea rows={'6'} defaultValue={item?.description} onChange={(e)=>setDescription(e.target.value)} className='focus:outline-none bg-gray-200 w-full rounded-lg px-4 py-3' placeholder='Enter feature description' />
                  </div>

                  <div className='flex justify-center'>
                     {item?.name  ? 
                        <button onClick={edit} className='btn w-full max-w-xs' >{loading ? "Processing..." : "Edit Item"}</button>
                        :
                        <button onClick={post} className='btn w-full max-w-xs' >{loading ? "Adding..." : "Add Item"}</button>
                     }
                  </div>
               </div>
            </div>
      </Popup>
    </div>
  )
}
