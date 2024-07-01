import React, { useState } from 'react'
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';
import MyFiles from './MyFiles';

export default function UploadThumbnail({update}) {
   const [uploading, setUploading] = useState(false);
   const [file, setFile] = useState(null);

   const getImageFile = (image) => {
      update && update(image);
   }
    
   const removeFile = async (e) => {
      setFile(null);
      update && update(null);
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
      fdata.append('attachment', f);
      const resp = m.uploadMedia(fdata, setProgress);
      resp.then((res)=>{
      if(res.data.file_data.url)
         setProgress(100);
         update && update(res.data.file_data.url);
         setUploading(false)
      }).catch((err)=>{
         console.log(err)
         toast.error('File upload failed'); 
         setUploading(false)
      });
   }

  return (
   <>
      <div className="flex justify-center w-full mx-auto mb-4">
         <div className=" w-full sm:rounded-lg">
            {file ? <>
               <div className='selectedMedia border border-gray-700 mb-6 thumbnailsize max-h-[768px] rounded-2xl overflow-hidden relative' >
                  <button onClick={removeFile} className='bg-red-800 rounded-xl px-3 py-2 text-sm text-white absolute top-2 right-2 z-[2]'>Remove</button>
                  <img className="h-full w-full thumbnailsize object-cover max-w-full" src={URL.createObjectURL(file)} alt="Cloud" />
               </div>
            </> :
               <div class="flex items-center justify-center w-full">
                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border 
                  border-gray-500 border-dashed rounded-xl cursor-pointer bg-dark1 hover:bg-dark3 ">
                     <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-xl text-gray-600 font-normal ">Upload Stream Thumbnail</p>
                        <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 ">PNG, JPG or GIF (MAX. 1200x767px)</p>
                     </div>
                     <input onChange={handleFile} accept="image/*" id="dropzone-file" type="file" class="hidden" />
                  </label>
               </div>
            }
            {uploading ? 
               <div class="w-full bg-gray-200 rounded-full h-2.5 my-2">
                  <div class={`bg-blue-600 h-2.5 rounded-full w-[${progress || 0}%]`} ></div>
               </div> 
            : ""}
         </div>
      </div>

      {/* <h3 className='my-4 text-gray-300 text-center'>Or</h3>
      <div className='media-files' >
         <p className='text-gray-300 mb-2 text-lg'>Choose thumbnail</p>
         <MyFiles sendFile={getImageFile} type={'image'} />
      </div> */}
   </>
  )
}
