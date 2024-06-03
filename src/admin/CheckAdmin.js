import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Endpoints from '../api/Endpoints';
import { UserContext } from '../context/AuthProvider';
export default function CheckAdmin() {
  
  const {setIsAuthenticated, setUser} = useContext(UserContext);
  const navigate = useNavigate();

   function check_login(e) {
      const m = new Endpoints();
      const resp = m.user_profile();
      resp.then((res) => {
          if(res.data.status && res.data.user.role === '1'){
            setIsAuthenticated(true);
            setUser(res.data.user);
          } else {
            navigate('/home');
            toast.error("Unauthorized Access");
          }
      }).catch((err) => {
        console.log("errors",err); 
        navigate('/home');
        toast.error("Unauthorized Access");
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
