import React, { useEffect, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6';
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';

async function UploadMedia(file, setProgress, setUploading, update, setUrl) {
   if (!file) return;
   setUploading(true);
   const m = new Endpoints();
   const fdata = new FormData();
   fdata.append('attachment', file);
   try {
     const res = await m.uploadMedia(fdata, setProgress);
     if (res.data.file_data.url) {
       setProgress(100);
       if (update) update(res.data.file_data);
       setUrl(res.data.file_data.url);
     }
   } catch (err) {
     console.error(err);
     toast.error('File upload failed');
   } finally {
     setUploading(false);
   }
 }
 
export default function AddVideoBox({ file, update }) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);

   

  return (
   <div className="flex justify-center w-full mx-auto">
   <div className='selectedMedia w-full relative bg-gray-900 rounded-xl' >
     <video playsInline className='w-full object-cover h-full max-h-[150px] rounded-xl min-h-[150px]'>
       <source src={URL.createObjectURL(file)} type={file.type} />
     </video>
     {progress === 100 && <div className='progresscomplete'><FaCircleCheck size={'2rem'} color='green' /></div>}
     
     <div className='p-2'>
         {progress === 100 ?
         <button className='bg-main text-white text-center p-3 py-2 text-[14px] rounded-xl w-full' >
            Remove Video
         </button>
         :
         <button className='bg-dark2 text-white text-center p-3 py-2 text-[14px] rounded-xl w-full' 
         onClick={()=>UploadMedia(file, setProgress, setUploading, update, setUrl)}>
            {uploading ? `${progress}% Uploading` : "Upload Video" }
         </button>
         }
     </div>
   </div>
 </div>
  );
}
