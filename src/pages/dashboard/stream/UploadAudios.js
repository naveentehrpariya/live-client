import React, { useState } from 'react'
import { BsFiletypeMp3 } from "react-icons/bs";
import AddAudioBox from './AddAudioBox';

export default function UploadAudios({update, streamType, setRadio}) {
  const [selected, setSelected] = useState([]);

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setSelected(files);
  };

  const [audioType, setAudioType] = useState('music');
  const changeMusicType = (e) => {
    setAudioType(e);
    setRadio('')
  }

  return (
    <div className='pt-4'>
      <h2 className='mb-2 text-gray-400 text-normal'>Choose Songs Or Sound Effects</h2>
      {streamType === 'video' ? <p className='mb-4 text-gray-400 text-sm'>
        Audio files are not mandatory but if you want to play custom music over your stream you can upload it here.
        Main video music will be used by default.
      </p> : ""}

      <div className='flex mb-2'>
        <button onClick={()=>changeMusicType("music")} className={`${audioType === 'music' ? 'bg-main text-white' : 'bg-gray-600 text-gray-300'}  uppercase rounded-xl px-3 py-1 me-3 mb-3 text-[13px]`}>Songs Lists</button>
        <button onClick={()=>changeMusicType("radio")} className={`${audioType === 'radio' ? 'bg-main text-white' : 'bg-gray-600 text-gray-300'}  uppercase rounded-xl px-3 py-1 me-3 mb-3 text-[13px]`}>Radio Stream</button>
      </div>
      
      {audioType === 'music' ?
        <div className="relative w-full mb-4 bg-dark1 rounded-2xl border border-dashed border-gray-600 m-auto">
          <input onChange={handleFile} type="file" id="file-upload-audio"  accept="audio/mp3" className="hidden" multiple />
          <label htmlFor="file-upload-audio" className="flex flex-col-reverse items-center justify-center w-full cursor-pointer p-6">
          <p className="text-md font-light text-center text-gray-400 py-3">Drag & Drop your files here</p>
          <BsFiletypeMp3 color="#616161" size={'3rem'} />
          </label>
        </div> 
        : 
        <input onChange={(e)=>setRadio(e.target.value)} name='radiostream' type={'text'} placeholder={"Radio stream url"} className="input" />
      }

      {selected && selected.length > 0 ? 
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-4'>
          {selected.map((file, i) => (
            <div key={i} className='wrap'>
              <AddAudioBox update={update} file={file} />
            </div>
          ))}
        </div> 
        : ''
      }
    </div>
  );
}
