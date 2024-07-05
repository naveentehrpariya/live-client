import React, { useEffect, useState } from 'react'
import { BsCameraVideo } from "react-icons/bs";
import AddVideoBox from './AddVideoBox';
import MyFiles from './MyFiles';
import Popup from '../../common/Popup';
import { FaCircleCheck } from 'react-icons/fa6';

export default function UploadVideos({update, removeUploadedVideo, getCloudFiles}) {

  const [open, setOpen] = useState();
  const [selected, setSelected] = useState([]);

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    const old = selected
    setSelected([...old, ...files]);
  };

  const removeLocalfile = (l) =>{
    removeUploadedVideo(l);
    const temp = selected;
    const removed = temp.filter(f => f !== l);
    console.log("removed", removed);
    setSelected(removed);
  }

  const [libraryFiles, setLibraryFiles] = useState([])
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
    return<>
    <div className="flex justify-center w-full mx-auto">
    <div className='selectedMedia w-full relative bg-gray-900 rounded-xl' >
      <button className='z-10 absolute top-2 right-2 bg-red-600 px-2 py-1 uppercase text-[13px] rounded-lg text-white' onClick={removeFile} >Remove</button>
      <video playsInline className='w-full object-cover h-full max-h-[150px] rounded-xl min-h-[150px]'>
        <source src={file.url} type={file.type} />
      </video>
      <div className='progresscomplete'><FaCircleCheck size={'2rem'} color='green' /></div>
    </div>
  </div>
    <h2 className='text-gray-200 text-[14px] mt-2 line-clamp-1'>{file.name}</h2>
    </> 
  }
   
  return (
    <div className='border-t border-gray-800 mt-8 pt-8'>
      <div className='flex items-center justify-start'>
        <h2 className='mb-3 text-gray-200 text-xl '>Choose videos</h2>
      </div>
      <div className="relative w-full mb-4 bg-dark1 rounded-2xl border-dashed border-gray-700 border-2 m-auto">
         <input onChange={handleFile} type="file" id="file-upload-video" accept="video/*" className="hidden" multiple />
         <label htmlFor="file-upload-video" className="flex flex-col-reverse items-center justify-center w-full cursor-pointer p-4">
         <p className="text-md font-light text-center text-gray-400 pt-2">Drag & Drop your files here</p>
         <BsCameraVideo color="#616161" size={'2rem'} />
         </label>
      </div>
      <Popup bg="bg-dark1 darkpopup" action={open} space={'p-6 sm:p-10'} btntext={"Or select from your library"} 
      btnclasses={'bg-dark1 border border-gray-800 text-white rounded-[30px] w-full p-4 text-[15px]  '} >
        <h2 className='text-white text-bold text-lg mb-3'>My Video Library</h2>
        <div className='max-h-[70vh] overflow-auto' > 
          <MyFiles sendFile={getSelectedVideos} type={'video'} />
        </div>
      </Popup>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 mt-4'>
          {selected && selected.map((file, i) => (
            <div key={`local-file-${i}${file.name}`} className='wrap'>
              <AddVideoBox key={`local-file-${i}`} removeFile={removeLocalfile} update={update} file={file} />
            </div>
          ))}
          {libraryFiles && libraryFiles.map((file, i) => (
            <div key={`cloud-file-${i}`} className='wrap'>
              <CloudFile file={file} />
            </div>
          ))}
      </div> 
      
    </div>
  );
}
