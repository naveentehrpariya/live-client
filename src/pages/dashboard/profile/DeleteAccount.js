import React, { useContext, useState } from 'react'
import Popup from '../../common/Popup';
import toast from 'react-hot-toast';
import Api from '../../../api/Api';
import { UserContext } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccount() {
   const [open, setOpen] = useState();
   const {user, Errors} = useContext(UserContext);
   const navigate = useNavigate();
   const deleteAccount = () =>{ 
      const resp = Api.get(`/admin/user/enable-disable-user/${user._id}`);
      resp.then((res)=>{
         if(res.data.status){
            toast.success(res.data.message);
            navigate("/login");
            localStorage.removeItem("token");
         } else {
            toast.error(res.data.message);
         }
      }).catch((err)=>{
         Errors(err);
      });
   }

  return (
   <Popup action={open} space={'p-6 sm:p-10'} btntext={"Delete account"} btnclasses={'text-main'} >
    <h2 className='text-black-600 font-bold text-xl mb-2 text-center'>Delete Account</h2>
    <p className='text-gray-500 text-center'>Are you sure you want to delete your account permanently.</p>
    <p className='text-gray-500 text-center'>Please reach out to support for more help.</p>
    <p className='text-gray-500 text-center'>Action can not be undone. </p>
    
    <div className='flex justify-center mt-3'>
      <button onClick={deleteAccount} className='btn sm cursor-pointer text-white w-auto'>
         Delete account
      </button>
    </div>
   </Popup>
  )
}
