import React, { useState, useContext } from 'react'
import Popup from '../../common/Popup'
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';
import { UserContext } from '../../../context/AuthProvider';

export default function Addmedia({update, classes, updateSize}) {

   const [open, setOpen] = useState();
   const [uploading, setUploading] = useState(false);
   const [file, setFile] = useState(null);
   const [fileMime, setFileMime] = useState(null);
   const {Errors} = useContext(UserContext);

   const handleFile = async (e) => {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
      const type = e.target.files[0] && e.target.files[0].type;
      const isImage = type.includes('image');
      const isVideo = type.includes('video');
      const isAudio = type.includes('audio');
      if (isImage) {
         setFileMime('image');
      } else if (isAudio) {
         setFileMime('audio');
      } else if (isVideo) {
         setFileMime('video');
      } else {
         setFileMime();
      }
   }
   
   const [progress, setProgress] = useState(0);
   async function UploadMedia() {
      if (!file) return;
      setUploading(true);
      const m = new Endpoints();
      const fdata = new FormData();
      fdata.append('file', file);
      const resp = m.uploadMedia(fdata, setProgress); 
      resp.then((res)=>{
         if(res.data.status){
            toast.success(res.data.message);
            setProgress(100);
            setTimeout(()=>{
               setFile(null);
               setOpen('close');
               update && update(1);
               updateSize && updateSize();
               setTimeout(()=>{
                  setOpen('');
               }, 500); 
               setUploading(false); 
            }, 1000);
         } else {
            toast.error(res.data.message);
            setUploading(false);
         }
      }).catch(err => {
         Errors(err);
         toast.error('File upload failed');
         setUploading(false);
      });
   }

  return (
   <>
      <Popup action={open} space={'p-6 sm:p-10'} btntext={"+ Add More"} btnclasses={classes ? classes : 'bg-main text-white rounded-[30px] px-3 md:px-4 py-[4px] md:py-[11px] text-[12px] md:text-[15px]   uppercase  '} >
            <div className="flex justify-center w-full mx-auto">
               <div className=" w-full bg-white sm:rounded-lg">
                  <div className="mb-4 md:mb-10 text-center">
                     <h2 className="text-xl sm:text-2xl font-semibold mb-2">Upload your files</h2>
                     <p className="text-md text-gray-500">File should be of format .mp4, .png, .jpeg, .mp3, or .avif</p>
                  </div>

                  {file ? <>
                     <div className='selectedMedia mb-6 relative' >
                        <button onClick={()=>setFile(null)} className='bg-red-800 rounded-xl px-3 py-2 text-sm text-white absolute top-2 right-2 z-[2]'>Remove</button>
                        { fileMime === 'image'? 
                           <img className="h-auto w-full object-cover max-w-full max-h-[200px] sm:max-h-[300px] rounded-xl" src={URL.createObjectURL(file)} alt="Cloud" />
                           : ""
                        }
                        { fileMime === 'video'?
                           <video playsInline className='w-full h-full rounded-xl min-h-[200px] max-h-[300px]' controls >
                              <source src={URL.createObjectURL(file)} type={file.type} />
                           </video>
                           : ""
                        }
                        { fileMime === 'audio'?
                           <audio playsInline className='w-full rounded-xl ' controls >
                              <source src={URL.createObjectURL(file)} type={file.type} />
                           </audio>
                           : ""
                        }
                     </div>
                  </> :
                  <div className="relative w-full max-w-xs mb-10  bg-white bg-gray-200 rounded-lg border border-dashed m-auto">
                        <input onChange={handleFile} type="file" id="file-upload" className="hidden" />
                        <label for="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full cursor-pointer p-8">
                           <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
                           <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                           </svg>
                        </label>
                  </div>
                  }

                  <div className='flex justify-center'>
                     <button disabled={uploading} onClick={UploadMedia} className='btn w-full max-w-xs' > 
                        {uploading ? 
                           `${progress ? `${progress === 100 ? "Processing..." : `${progress}% Uploading...` }` : "" } `
                        : "Upload"}
                     </button>
                  </div>
               </div>
            </div>
      </Popup> 
   </>
  )
}
