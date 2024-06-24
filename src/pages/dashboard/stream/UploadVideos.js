import React, { useState } from 'react'
import { BsCameraVideo } from "react-icons/bs";
import AddVideoBox from './AddVideoBox';

export default function UploadVideos({sendVideos}) {
  const [selected, setSelected] = useState([]);

   const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setSelected(files);
   };
   
  
  return (
    <div>
      <h2 className='mb-3 text-gray-200 text-xl '>Choose videos</h2>
      <div className="relative w-full mb-4 bg-dark1 rounded-2xl border border-dashed border-gray-600 m-auto">
         <input onChange={handleFile} type="file" id="file-upload-video" accept="video/*" className="hidden" multiple />
         <label htmlFor="file-upload-video" className="flex flex-col-reverse items-center justify-center w-full cursor-pointer p-6">
         <p className="text-md font-light text-center text-gray-300 py-3">Drag & Drop your files here</p>
         <BsCameraVideo color="#ffffff" size={'3rem'} />
         </label>
      </div>

      {selected && selected.length > 0 ? 
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
          {selected.map((file, i) => (
            <div key={i} className='wrap'>
              <AddVideoBox update={sendVideos} file={file} />
            </div>
          ))}
        </div> 
        :  ''
      }
        
    </div>
  );
}
