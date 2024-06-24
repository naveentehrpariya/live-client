import React, { useEffect, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6';
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';
import { BsFiletypeMp3 } from "react-icons/bs";

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
 
export default function AddAudioBox({ file, update }) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  return (
   <div className="flex justify-center w-full mx-auto">
   <div className='selectedMedia w-full relative border border-gray-500 rounded-xl' >
    <div className='p-4 flex justify-center items-center w-full min-h-[150px]' >
      <BsFiletypeMp3 size='3rem' color="#fff" />
    </div>
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
