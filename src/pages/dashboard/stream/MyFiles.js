import React, { useEffect, useState } from 'react'
import Endpoints from '../../../api/Endpoints';
import Loading from '../../common/Loading';

export default function MyFiles({type, sendFile}) {

   const [loading, setLoading] = useState(false);
   const [files, setFiles] = useState([]);

   const fetchFiles = async () => {
      setLoading(true);
      const m = new Endpoints();
      const resp = m.mymedia(type || 'image');
      resp.then(res => {
         setFiles(res.data.files);
         console.log(res.data);
         setLoading(false);
      }).catch(err => {
        console.log(err);
         setLoading(false);
      });
   }

   useEffect(()=>{
      fetchFiles();
   },[]);

   const [selected, setSelected] = useState(null);
   const selectFile = (url) => {
      setSelected(url);
      sendFile && sendFile(url)
   }

  return (
    <>

      { loading ? <Loading /> : ''}
      {type === "video" ? 
         <>
            <ul class="flex flex-col">
               {files && files.map((file, index) =>{
                  return <li onClick={()=>selectFile(file.url)} class={`${selected === file.url ? "bg-green-900" : "" } border-gray-400 flex rounded-xl flex-row mb-2`}>
                     <div class="select-none cursor-pointer bg-dark2 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform ">
                        <div class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">🎥</div>
                        <div class="flex-1 pl-1 mr-16">
                        <div class="font-medium text-white">{file.name}</div>
                        {/* <div class="text-gray-600 text-sm">200ml</div> */}
                        </div>
                        <div class="text-gray-600 text-xs">{file.mime}</div>
                     </div>
                  </li>
               })}
            </ul>
         </> 
      : ""}

      {type === "image" ? 
         <>
            <ul class="flex flex-col">
               {files && files.map((file, index) =>{
                  return <li onClick={()=>selectFile(file.url)} class={`${selected === file.url ? "bg-green-900" : "" } border-gray-400 flex rounded-xl flex-row mb-2`}>
                     <div class="select-none cursor-pointer bg-dark2 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform ">
                        <div class="flex flex-col rounded-md overflow-hidden w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                           <img className='w-full h-full object-cover' src={file.url} alt="ThumbImage" />
                        </div>
                        <div class="flex-1 pl-1 mr-16">
                        <div class="font-medium text-white">{file.name}</div>
                        {/* <div class="text-gray-600 text-sm">200ml</div> */}
                        </div>
                        <div class="text-gray-600 text-xs">{file.mime}</div>
                     </div>
                  </li>
               })}
            </ul>
         </> 
      : ""}
    </>
  )
}
