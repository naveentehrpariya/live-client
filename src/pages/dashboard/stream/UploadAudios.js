import React, { useState } from 'react'
import AddVideoBox from './AddVideoBox';
import { BsFiletypeMp3 } from "react-icons/bs";
import AddAudioBox from './AddAudioBox';

export default function UploadAudios({update}) {
  const [selected, setSelected] = useState([]);

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setSelected(files);
  };

  return (
    <div className='pt-4'>
      <h2 className='mb-3 text-gray-400 text-normal'>Choose Stream Audio</h2>
      <div className="relative w-full mb-4 bg-dark1 rounded-2xl border border-dashed border-gray-600 m-auto">
         <input onChange={handleFile} type="file" id="file-upload-audio"  accept="audio/mp3" className="hidden" multiple />
         <label htmlFor="file-upload-audio" className="flex flex-col-reverse items-center justify-center w-full cursor-pointer p-6">
         <p className="text-md font-light text-center text-gray-400 py-3">Drag & Drop your files here</p>
         <BsFiletypeMp3 color="#616161" size={'3rem'} />
         </label>
      </div>

      {selected && selected.length > 0 ? 
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
          {selected.map((file, i) => (
            <div key={i} className='wrap'>
              <AddAudioBox update={update} file={file} />
            </div>
          ))}
        </div> 
        : 
        ''
      }
    </div>
  );
}
