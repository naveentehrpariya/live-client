import React, { useState } from 'react'
import Popup from '../../common/Popup'
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';

export default function Addmedia({update}) {

   const [open, setOpen] = useState();
   const [uploading, setUploading] = useState(false);
   const [file, setFile] = useState(null);
   const [fileMime, setFileMime] = useState(null);

   const handleFile = async (e) => {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
      const type = e.target.files[0] && e.target.files[0].type;
      const isImage = type.includes('image');
      const isVideo = type.includes('video');
      if (isImage) {
         setFileMime('image');
      } else if (isVideo) {
         setFileMime('video');
      } else {
         setFileMime(null);
      }
   }
   const [progress, setProgress] = useState(0);
   async function UploadMedia() {
      
      if (!file) return;
      setUploading(true);
      const m = new Endpoints();
      const fdata = new FormData();
      fdata.append('attachment', file);
      try {
          await m.uploadMedia(fdata, setProgress);
          toast.success('File uploaded successfully');
          setFile(null);
          setOpen('close');
          update && update();
            setTimeout(()=>{
               setOpen('');
            }, 1000);
      } catch (err) {
          toast.error('File upload failed');
      } finally {
          setUploading(false);
      }
   }

  return (
   <>

      <Popup action={open} space={'p-6 sm:p-10'} btntext={"+ Add More"} btnclasses={'bg-main text-white rounded-[30px] px-3 md:px-4 py-[4px] md:py-[13px] text-[12px] md:text-[15px] font-bold uppercase  '} >
            <div class="flex justify-center w-full mx-auto">
               <div class=" w-full bg-white sm:rounded-lg">
                  <div class="mb-4 md:mb-10 text-center">
                     <h2 class="text-xl sm:text-2xl font-semibold mb-2">Upload your files</h2>
                     <p class="text-xs text-gray-500">File should be of format .mp4, .png, .jpeg or .jpg</p>
                  </div>

                  {file ? <>
                     <div className='selectedMedia mb-6' >
                     { fileMime === 'image'? 
                        <img class="h-auto w-full object-cover max-w-full max-h-[200px] sm:max-h-[300px] rounded-xl" src={URL.createObjectURL(file)} alt="Cloud" />
                        : fileMime === 'video'?
                        <video playsInline className='w-full h-full rounded-xl min-h-[200px]' controls >
                           <source src={URL.createObjectURL(file)} type={file.type} />
                        </video>
                        : ""
                     }
                     </div>
                  </> :
                  <div class="relative w-full max-w-xs mb-10 p-8 bg-white bg-gray-200 rounded-lg border border-dashed m-auto">
                        <input onChange={handleFile} type="file" id="file-upload" class="hidden" />
                        <label for="file-upload" class="z-20 flex flex-col-reverse items-center justify-center w-full cursor-pointer">
                           <p class="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                           <svg class="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                           </svg>
                        </label>
                  </div>
                  }

                  <div className='flex justify-center'>
                     <button onClick={UploadMedia} className='btn w-full max-w-xs' > {uploading ? "Uploading.." : "Upload"}</button>
                  </div>
               </div>
            </div>
      </Popup>
   </>
  )
}
