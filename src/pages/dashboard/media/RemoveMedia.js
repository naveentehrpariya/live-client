import React from 'react'
import Endpoints from '../../../api/Endpoints';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

export default function RemoveMedia({id, classes, update, page, updateSize}) {

   const [loading, setLoading] = React.useState(false);

   async function UploadMedia() {
      setLoading(true);
      const m = new Endpoints();
      const resp = m.delete_media(id);
      resp.then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          setLoading(false); 
          update && update(page); 
          updateSize && updateSize();
      }).catch((err) => {
          console.log(err);
          toast.error('Failed to delete file. Please try again');
          setLoading(false);
      });
   }

   return (
      <button className={`${classes} flex items-center text-danger`} onClick={UploadMedia}><MdDelete color="red" /> </button>
   )
}
