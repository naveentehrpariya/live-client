import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthProvider';
import AdminApi from '../api/AdminApi';
export default function CheckAdmin() {
  
  const {setAdmin} = useContext(UserContext);
  const navigate = useNavigate();
  function check_login(e) {
    const resp = AdminApi.get(`/user/profile`);
    resp.then((res) => {
        if(res.data.status && res.data.user.role === '1'){
          setAdmin(res.data.user);
        } else {
          navigate('/admin/login');
        }
    }).catch((err) => {
      console.log("errors",err); 
      navigate('/admin/login');
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
