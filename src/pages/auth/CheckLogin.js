import React, { useEffect, useState } from 'react'
import Endpoints from '../../api/Endpoints';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function CheckLogin({redirect}) {
   const navigate = useNavigate();
   function check_login(e) {
      const m = new Endpoints();
      const resp = m.user_profile();
      resp.then((res) => {
         if(res.data.status){
          if(redirect){
            navigate('/home');
          }
         } else {
            toast.error("You must login first.");
            navigate('/login');
         }
      }).catch((err) => {
        console.log("errors",err);
        navigate('/login');
      });
    }

    useEffect(()=>{
      check_login();
    },[]);

  return (
    <>
      
    </>
  )
}
