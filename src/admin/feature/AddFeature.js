import React, { useState } from 'react'
import Popup from '../../pages/common/Popup';
import Api from '../../api/Api';
import toast from 'react-hot-toast';

export default function AddFeature({fetch, item, classes, text}) {

   const [open, setOpen] = useState();
   const [loading, setLoading] = useState(false);
   const [title, setTitle] = useState(item?.title || '');
   const [description, setDescription] = useState(item?.description || '');

   async function edit() {
      const resp = Api.post('/edit-feature', {
         "id":item._id,
         "title":title,
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
         },100);
      }).catch((err)=>{
         console.log(err);
         setLoading(false);
         toast.error("Failed to add feature. Something went wrong.");
      });
   }
   async function post() {
      const resp = Api.post('/add-feature', {
         "title":title,
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
         toast.error("Failed to add feature. Something went wrong.");
      });
   }


   return (
    <div>
      <Popup action={open} space={'p-6 sm:p-10'} btntext={text || "+ Add More"} 
      btnclasses={classes} >
            <div className="flex justify-center w-full mx-auto">
               <div className=" w-full bg-white sm:rounded-lg">
                  <div className="mb-4 md:mb-10 text-center">
                     <h2 className="text-xl sm:text-2xl font-semibold mb-2">{item && item.title ? "Edit" : "Add"} Feature</h2>
                     <p className="text-md text-gray-500">Choose the type of feature to list on website.</p>
                  </div>

                  <div className='mb-6'>
                     <label className='text-gray-500 w-full block mb-1'>Feature Title</label>
                     <input defaultValue={item?.title} onChange={(e)=>setTitle(e.target.value)} className='focus:outline-none bg-gray-200 w-full rounded-lg px-4 py-3' placeholder='Enter feature name' />
                  </div>

                  <div className='mb-6'>
                     <label className='text-gray-500 w-full block mb-1'>Feature Description</label>
                     <textarea row='8' defaultValue={item?.description} onChange={(e)=>setDescription(e.target.value)} className='focus:outline-none bg-gray-200 min-h-[100px] w-full rounded-lg px-4 py-3' placeholder='Enter feature description' />
                  </div>

                  <div className='flex justify-center'>
                     {item?.title  ? 
                        <button onClick={edit} className='btn w-full max-w-xs' >{loading ? "Processing..." : "Edit Feature"}</button>
                        :
                        <button onClick={post} className='btn w-full max-w-xs' >{loading ? "Adding..." : "Add Feature"}</button>
                     }
                  </div>
               </div>
            </div>
      </Popup>
    </div>
  )
}
