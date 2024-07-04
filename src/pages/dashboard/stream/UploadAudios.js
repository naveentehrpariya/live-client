import React, { useEffect, useState } from 'react'
import { BsFiletypeMp3 } from "react-icons/bs";
import AddAudioBox from './AddAudioBox';
import Popup from '../../common/Popup';
import MyFiles from './MyFiles';
import { FaCircleCheck } from 'react-icons/fa6';

  export default function UploadAudios({update, streamType, setRadio, getCloudFiles,removeUploadedAudio}) {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState();
  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    const old = selected
    setSelected([...old, ...files]);
  };

  const [audioType, setAudioType] = useState('music');
  const changeMusicType = (e) => {
    setAudioType(e);
    setRadio('');
  }

  const removeLocalfile = (l) =>{
    removeUploadedAudio(l);
    const temp = selected;
    const removed = temp.filter(f => f !== l);
    console.log("removed", removed);
    setSelected(removed);
  }
  
  const [libraryFiles, setLibraryFiles] = useState([]);
  const getSelectedVideos = (videos) => {
    console.log("seelcted videos",videos);
    setLibraryFiles([...libraryFiles, ...videos])
    getCloudFiles([...libraryFiles, ...videos])
    setOpen("close");
    setTimeout(() => {
      setOpen(false);
    },1000);
  }

  const CloudFile = ({file}) =>{
    const removeFile = () =>{
      const temp = libraryFiles;
      const removed = temp.filter(f => f !== file);
      setLibraryFiles(removed);
      getCloudFiles(removed)
    }
    const size = file.size / 1024 / 1024;
    return<>
    <div className="flex justify-center w-full mx-auto">
   <div className='selectedMedia w-full relative border border-gray-500 rounded-xl' >
    <button className='z-10 absolute top-2 right-2 bg-red-600 px-2 py-1 uppercase text-[13px] rounded-lg text-white' onClick={removeFile} >Remove</button>
    <div className='p-4 flex justify-center items-center w-full min-h-[150px]' >
      <BsFiletypeMp3 size='3rem' color="#fff" />
    </div>
     <div className='p-2 sm:p-3'>
      <p className='text-gray-400 text-sm line-clamp-1 w-full'>{file.name}</p>
      <p className='text-gray-400 text-[10px] line-clamp-1 w-full'>Size : {size.toFixed(2)} MB</p>
      <div className='progresscomplete'><FaCircleCheck size={'2rem'} color='green' /></div>
     </div>
   </div>
 </div>  
    
    </> 
  }

  return (
    <div className='pt-8 mt-8 border-t border-gray-800'>
      <div className='flex items-center justify-start mb-2'>
        <h2 className=' text-gray-200 text-xl '>Choose Sound Effects</h2>
      </div>
      {streamType === 'video' ? <p className='mb-4 text-gray-400 text-normal'>
        Audio files are not mandatory but if you want to play custom music over your stream you can upload it here.
        Main video music will be used by default.
      </p> : ""}

      <div className='flex mb-2'>
        <button onClick={()=>changeMusicType("music")} className={`${audioType === 'music' ? 'bg-main text-white' : 'bg-gray-600 text-gray-300'}  uppercase rounded-xl px-3 py-1 me-3 mb-3 text-[13px]`}>Songs Lists</button>
        <button onClick={()=>changeMusicType("radio")} className={`${audioType === 'radio' ? 'bg-main text-white' : 'bg-gray-600 text-gray-300'}  uppercase rounded-xl px-3 py-1 me-3 mb-3 text-[13px]`}>Radio Stream</button>
      </div>
      
      {audioType === 'music' ?
      <>
        <div className="relative w-full mb-4 bg-dark1 rounded-2xl border-dashed border-gray-700 border-2 m-auto">
          <input onChange={handleFile} type="file" id="file-upload-audio"  accept="audio/mp3" className="hidden" multiple />
          <label htmlFor="file-upload-audio" className="flex flex-col-reverse items-center justify-center w-full cursor-pointer p-4">
          <p className="text-md font-light text-center text-gray-400 pt-3">Drag & Drop your files here</p>
          <BsFiletypeMp3 color="#616161" size={'2rem'} />
          </label>
        </div> 

        <Popup bg="bg-dark1 darkpopup" action={open} space={'p-6 sm:p-10'} btntext={"Or select from your library"} 
      btnclasses={'bg-dark1 border border-gray-800 text-white rounded-[30px] w-full p-4 text-[15px] mb-4  '} >
          <h2 className='text-white text-bold text-lg mb-3'>My Music Library</h2>
          <div className='max-h-[70vh] overflow-auto' > 
            <MyFiles sendFile={getSelectedVideos} type={'audio'} />
          </div>
        </Popup>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-4'>
          {selected && selected.map((file, i) => (
            <div key={i} className='wrap'>
              <AddAudioBox removeFile={removeLocalfile} update={update} file={file} />
            </div>
          ))}
          {libraryFiles && libraryFiles.map((file, i) => (
            <div key={`cloud-file-${i}`} className='wrap'>
              <CloudFile file={file} />
            </div>
          ))}
        </div> 

        

        </>
        : 
        <input onChange={(e)=>setRadio(e.target.value)} name='radiostream' type={'text'} placeholder={"Radio stream url"} className="input" />
      }

        

    </div>
  );
}
