import React, { useEffect, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6';
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';

async function UploadMedia(file, setProgress, setUploading, update, setUrl, ) {
   if (!file) return;
   setUploading(true);
   const m = new Endpoints();
   const fdata = new FormData();
   fdata.append('attachment', file);
   try {
     const res = await m.uploadMedia(fdata, setProgress);
     if (res.data.file_data.url) {
       setProgress("Completed");
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
 
export default function AddVideoBox({ file, update, removeFile, key }) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  return (
   <div key={key} className="w-full mx-auto">
    <div className='flex justify-center '>
      <div className='selectedMedia w-full relative bg-gray-900 rounded-xl' >
        <button className='z-10 absolute top-2 right-2 bg-red-600 px-2 py-1 uppercase text-[13px] rounded-lg text-white' 
          onClick={()=>removeFile(file)} >Remove</button>
        <video playsInline className='w-full object-cover h-full max-h-[150px] rounded-xl min-h-[150px]'>
          <source src={URL.createObjectURL(file)} type={file.type} />
        </video>
        {progress === "Completed" ? 
            <div className='progresscomplete'><FaCircleCheck size={'2rem'} color='green' /></div>
          : 
          <>
            <div className='absolute bg-[#0009] rounded-xl top-0 left-0 w-full h-full flex justify-center items-center'>
              {uploading ? 
                  <div>
                    <div class="grid w-full h-full place-items-center rounded-lg">
                      <svg class="w-16 h-16 animate-spin text-gray-400" viewBox="0 0 64 64" fill="none"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                          stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                          stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                        </path>
                      </svg>
                    </div>
                    <h1 className='text-gray-400 text-sm text-center'>{progress || 0}% Uploaded</h1>
                  </div>
                  : 
                  <button className='bg-main max-w-[100px] text-white text-center p-3 py-2 text-[14px] rounded-xl w-full' 
                  onClick={()=>UploadMedia(file, setProgress, setUploading, update, setUrl)}>
                      {uploading ? `${progress}%` : "Upload" }
                  </button>
                } 
            </div>
          </>}
      </div>
    </div>
    <h2 className='text-gray-200 text-[14px] mt-2 line-clamp-1'>{file.name}</h2>
 </div>
  );
}
