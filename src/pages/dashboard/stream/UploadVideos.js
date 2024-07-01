import React, { useState } from 'react'
import { BsCameraVideo } from "react-icons/bs";
import AddVideoBox from './AddVideoBox';
import MyFiles from './MyFiles';
import Popup from '../../common/Popup';
import { FaCircleCheck } from 'react-icons/fa6';

export default function UploadVideos({update, removeUploadedVideo}) {

  const [open, setOpen] = useState();
  const [selected, setSelected] = useState([]);

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    const old = selected
    setSelected([...old, ...files]);
  };

  const removeLocalfile = (l) =>{
    console.log("local file", l)
    // if(){
    //   removeUploadedVideo
    // }
    const temp = selected;
    const removed = temp.filter(f => f !== l);
    console.log("removed", removed);
    setSelected(removed);
  }

  const [libraryFiles, setLibraryFiles] = useState([])
  const getSelectedVideos = (videos) => {
    console.log("videos",videos);
    setLibraryFiles([...libraryFiles, ...videos])
    setOpen("close");
    setTimeout(() => {
      setOpen(false);
    },1000)
  }

  const CloudFile = ({file}) =>{
    const removeFile = () =>{
      const temp = libraryFiles;
      const removed = temp.filter(f => f !== file);
      console.log("removed", removed);
      setLibraryFiles(removed);
    }
    return <div className="flex justify-center w-full mx-auto">
    <div className='selectedMedia w-full relative bg-gray-900 rounded-xl' >
      <button className='z-10 absolute top-2 right-2 bg-red-600 px-2 py-1 uppercase text-[13px] rounded-lg text-white' onClick={removeFile} >Remove</button>
      <video playsInline className='w-full object-cover h-full max-h-[150px] rounded-xl min-h-[150px]'>
        <source src={file.url} type={file.type} />
      </video>
      <div className='progresscomplete'><FaCircleCheck size={'2rem'} color='green' /></div>
    </div>
  </div>
  }
   
  return (
    <div className='border-t border-gray-600 mt-6 pt-6'>
      <div className='flex items-center justify-between mb-3'>
        <h2 className='mb-0 text-gray-300 text-lg '>Choose videos</h2>
        <Popup bg="bg-dark1 darkpopup" action={open} space={'p-6 sm:p-10'} btntext={"From Collection"} 
        btnclasses={'bg-main text-white rounded-[30px] px-3 py-[4px] text-[12px] font-bold uppercase  '} >
          <h2 className='text-white text-bold text-lg mb-3'>My Video Library</h2>
          <div className='max-h-[70vh] overflow-auto' > 
            <MyFiles sendFile={getSelectedVideos} type={'video'} />
          </div>
        </Popup>
      </div>


      <div className="relative w-full mb-4 bg-dark1 rounded-2xl border border-dashed border-gray-600 m-auto">
         <input onChange={handleFile} type="file" id="file-upload-video" accept="video/*" className="hidden" multiple />
         <label htmlFor="file-upload-video" className="flex flex-col-reverse items-center justify-center w-full cursor-pointer p-4">
         <p className="text-md font-light text-center text-gray-400 pt-2">Drag & Drop your files here</p>
         <BsCameraVideo color="#616161" size={'2rem'} />
         </label>
      </div>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-4'>
          {selected && selected.map((file, i) => (
            <div key={`local-file-${i}`} className='wrap'>
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
