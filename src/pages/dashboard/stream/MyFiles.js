import React, { useEffect, useState } from 'react'
import Endpoints from '../../../api/Endpoints';
import Loading from '../../common/Loading';
import Nocontent from '../../common/NoContent';

export default function MyFiles({type, sendFile}) {
   const [loading, setLoading] = useState(false);
   const [files, setFiles] = useState([]);
   const [selected, setSelected] = useState([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const fetchFiles = async (pg) => {
      setLoading(true);
      const m = new Endpoints();
      const resp = m.mymedia((type || 'image'), pg, 10 );
      resp.then(res => {
         if(pg > 1){
            const old = files;
            setFiles([...old, ...res.data.files]);
         } else { 
            setFiles(res.data.files);
         }
         if(res.data.totalPages === pg){
            setHasMore(false)
         }
         setPage(page+1);
         setTimeout(()=>{
            setLoading(false);
         }, 500)
      }).catch(err => {
        console.log(err);
         setLoading(false);
      });
   }

   useEffect(()=>{
      fetchFiles(page);
   },[]);
   
   function selectFile(file) {
      let temp = [...selected];
      const fileIndex = temp.indexOf(file); 
      if (fileIndex > -1) {
         temp.splice(fileIndex, 1);
      } else {
         temp.push(file);
      }
      setSelected(temp);
   }

   const getSize = (size) =>{ 
      const t = size / 1024 / 1024;
      return t.toFixed(2) + " MB"
   }

   
   const addFiles = () => { 
      sendFile(selected||[]);
      setTimeout(()=>{
         setSelected([]);
      },1000);
   }

  return (
    <>
      { loading ? <Loading /> : 
         <>
            {type === "video" ? 
               <>
               {files && files.length ?
               <>
                  <ul className="flex flex-col">
                     {files.map((file, index) =>{
                        return (
                           <li key={index} 
                              onClick={()=>selectFile(file)} 
                              className={`${selected && selected.includes(file) ? "border-green-500" : "border-gray-700"} border  flex rounded-xl flex-row mb-2`} >
                              <div className="select-none cursor-pointer bg-dark2 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform">
                                 <div className="flex flex-col rounded-md w-10 h-10 bg-gray-500 justify-center items-center mr-4">{selected && selected.includes(file) ? "✅" : "🎥"}</div>
                                 <div className="flex-1 pl-1">
                                    <div className="font-medium text-white break-all line-clamp-2">{file.name}</div>
                                    <div className="text-gray-400 text-xs block w-full">{file.mime} | {getSize(file.size)}</div>
                                 </div>
                                 
                              </div>
                           </li>
                        )
                     })}
                  </ul>
               </> 
               : <Nocontent />
               }
               </> 
            : ""}

            {type === "audio" ? 
               <>
               {files && files.length ?
               <>
                  <ul className="flex flex-col">
                     {files.map((file, index) =>{
                        return (
                           <li key={index} 
                              onClick={()=>selectFile(file)} 
                              className={`${selected && selected.includes(file) ? "border-green-500" : "border-gray-700"} border  flex rounded-xl flex-row mb-2`} >
                              <div className="select-none cursor-pointer bg-dark2 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform">
                                 <div className="flex flex-col rounded-md w-10 h-10 bg-gray-500 justify-center items-center mr-4">{selected && selected.includes(file) ? "✅" : "🎧ྀི"}</div>
                                 <div className="flex-1 pl-1">
                                    <div className="font-medium text-white break-all line-clamp-2">{file.name}</div>
                                    <div className="text-gray-400 text-xs block w-full">{file.mime} | {getSize(file.size)}</div>
                                 </div>
                                 
                              </div>
                           </li>
                        )
                     })}
                  </ul>
               </> 
               : <Nocontent />
               }
               </> 
            : ""}
            
            {type === "image" ? 
               <>
                  {files && files.length ?
                     <>
                        <ul className="flex flex-col">
                           {files.map((file, index) =>{
                              return (
                                 <li 
                                    key={index} 
                                    onClick={()=>selectFile(file.url)} 
                                    className={`${selected && selected.includes(file) ? "bg-green-900" : ""} border-gray-400 flex rounded-xl flex-row mb-2`}
                                 >
                                    <div className="select-none cursor-pointer bg-dark2 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform">
                                       <div className="flex flex-col rounded-md overflow-hidden w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                                          <img className='w-full h-full object-cover' src={file.url} alt="ThumbImage" />
                                       </div>
                                       <div className="flex-1 pl-1 mr-16">
                                          <div className="font-medium text-white break-all line-clamp-2">{file.name}</div>
                                       </div>
                                       <div>
                                          <div className="text-gray-400 text-xs block w-full">{file.mime}</div>
                                          <div className="text-gray-400 text-xs block w-full">{getSize(file.size)}</div>
                                       </div>
                                    </div>
                                 </li>
                              )
                           })}
                        </ul>
                     </> 
                     : <Nocontent />
                  }
               </> 
            : ""}
         </>
      }
            
      { !loading  && hasMore ? 
         <>
            {files.length > 0 && <button onClick={()=>fetchFiles(page)} 
            className='bg-gray-800 rounded-xl px-4 text-sm py-2 text-white table mb-3  m-auto'>
               Load More
            </button>} 
         </> : ''
      }

      {files.length > 0 && <button onClick={addFiles} className='bg-main mt-3 rounded-xl px-3 py-2 text-white w-full sticky bottom-0'>+ Add</button>}
      </>
  )
}
