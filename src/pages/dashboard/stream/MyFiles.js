import React, { useEffect, useState } from 'react'
import Endpoints from '../../../api/Endpoints';

export default function MyFiles({type}) {

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

  return (
    <>

    </>
  )
}
