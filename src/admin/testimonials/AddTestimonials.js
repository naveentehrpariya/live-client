import React, { useContext, useState } from 'react'
import Popup from '../../pages/common/Popup';
import Api from '../../api/Api';
import toast from 'react-hot-toast';
import Endpoints from '../../api/Endpoints';
import { UserContext } from '../../context/AuthProvider';

export default function AddTestimonials({fetch, item, classes, text}) {

   const [open, setOpen] = useState();
   const [loading, setLoading] = useState(false);
   const [name, setname] = useState(item?.name || '');
   const [description, setDescription] = useState(item?.description || '');
   const [avatar, setavatar] = useState(item?.avatar || '');
   const [uploading, setUploading] = useState(false);
   const [file, setFile] = useState(null);
   const [src, setSrc] = useState('');
   const {Errors} = useContext(UserContext);

   async function edit() {
      const resp = Api.post('/edit-testimonial', {
         "id":item._id,
         "name":name,
         "avatar":avatar,
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
         "avatar":avatar,
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


   const removeFile = async (e) => {
      setFile(null);
      setSrc(false)
   }
   const handleFile = async (e) => {
      setFile(e.target.files[0]);
      UploadMedia(e.target.files[0]);
   }
   
   const [progress, setProgress] = useState(0);
   async function UploadMedia(f) {
      if (!f) return;
      setUploading(true);
      const m = new Endpoints();
      const fdata = new FormData();
      fdata.append('file', f);
      const resp = m.uploadMedia(fdata, setProgress);
      resp.then((res)=>{
      if(res.data.fileUrl){
         setavatar(res.data.fileUrl);
      }else {
         toast.error(res.data.message);
      }
      setUploading(false);
      }).catch((err)=>{
         Errors(err);
         toast.error('File upload failed'); 
         setUploading(false)
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

                  {src  ? 
                     <div className='selectedMedia border border-gray-600 mb-6 thumbnailsize max-h-[768px] rounded-3xl overflow-hidden relative' >
                        <button onClick={removeFile} className='bg-red-800 rounded-xl px-3 py-2 text-sm text-white absolute top-2 right-2 z-[2]'>Remove</button>
                        <img className="h-full w-full thumbnailsize object-cover max-w-full" src={src} alt="Cloud" />
                     </div> :  
                     <div className="flex justify-center w-full mx-auto">
                        <div className="relative w-full sm:rounded-lg">
                           {file ? <>
                              <div className='flex justify-center mb-6 rounded-2xl relative' >
                                 <div className='text-center'>
                                    <img className="h-24 w-24 min-w-24 min-h-24 rounded-[50%] object-cover" src={URL.createObjectURL(file)} alt="Cloud" />
                                    <button onClick={removeFile} className='bg-red-800 rounded-xl px-3 py-2 m-auto text-sm text-white'>Remove</button>
                                 </div>
                              </div>
                           </> :
                              <div class="flex mb-4 items-center justify-center w-full">
                                 <label for="dropzone-file" class="flex flex-col items-center justify-center w-full 
                                 border-gray-700 border-2
                                 border-dashed rounded-xl cursor-pointer hover:bg-dark3 ">
                                    <div class="flex flex-col items-center justify-center py-3">
                                       <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                       </svg>
                                       <p class="mb-2 text-xl text-gray-400 font-normal ">Upload User Avatar</p>
                                    </div>
                                    <input onChange={handleFile} accept="image/*" id="dropzone-file" type="file" class="hidden" />
                                 </label>
                              </div>
                           }
                           {uploading ? 
                              <div class="top-0 left-0 w-full flex justify-center items-center h-full absolute mb-2">
                              <div className='text-center p-4'>
                                    <svg class="w-16 h-16 animate-spin m-auto text-gray-400" viewBox="0 0 64 64" fill="none"
                                       xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                       <path
                                          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                          stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                       <path
                                          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                          stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                                       </path>
                                    </svg>
                                    <p className='text-center text-lg text-white max-w-[200px] mt-2'>Uploading..</p>
                                 </div> 
                              </div> 
                           : ""}
                        </div>
                     </div>
                  }

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
