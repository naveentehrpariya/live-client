import React, { useContext, useEffect, useState } from 'react'
import Endpoints from '../../api/Endpoints';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';
export default function CheckAdmin() {

  const {Errors, setIsAuthenticated, setUser} = useContext(UserContext);
  const navigate = useNavigate();

   function check_login(e) {
      const m = new Endpoints();
      const resp = m.user_profile();
      resp.then((res) => {
         if(res.data.status){
          setIsAuthenticated(true);
          setUser(res.data.user);
         } else {
           toast.error("You must login first.");
           navigate('/login');
         }
      }).catch((err) => {
        console.log("errors",err);
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
