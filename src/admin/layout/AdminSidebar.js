import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';
import { DiHtml5Multimedia } from "react-icons/di";
import { TbHome } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Logo from '../../pages/common/Logo';

export default function AdminSidebar({toggle}) {
  const {pathname} = window.location;
  function MenuItem({ icon, label, path }) {
    return (
      <NavLink to={path || "/home"} 
      className={`${pathname === path ? "bg-main text-white" : "bg-dark1  text-neutral-400 "}  flex gap-4 py-4 pr-5 pl-5 mt-5 rounded-xl leading-[150%]max-md:pr-5`}>
        {icon} <div className="my-auto">{label}</div>
      </NavLink>
    );
  }

  return (
    <>
      <nav className={`sidebar-wrapper border-r border-gray-900 text-base ${toggle ? "sidebar-open" : ""}`}>
         
        <div className='sticky top-0 p-8 bg-dark flex justify-center items-center sidebar-logo' >
          <div className='text-center'>
            <Link to='/admin' > <Logo /></Link>
         </div>
        </div>

        <div className='menus p-8 pt-0' >
            
            <MenuItem path="/admin"
            icon={<TbHome size={'2rem'}  />}
            label="Dashboard" />

            <MenuItem path="/admin/users/active"
            icon={<FaUserCog size={'2rem'}  />}
            label="Users" />

            <MenuItem path="/admin/streams/all"
            icon={<TbHome size={'2rem'} />}
            label="Live Streams" />

            <MenuItem path="/admin/pricing"
            icon={<SlCalender size={'1.3rem'}  />}
            label="Pricing Plans" />

            <MenuItem path="/admin/subscriptions/all"
            icon={<DiHtml5Multimedia size={'2rem'}  />}
            label="Subscription" /> 

            <MenuItem path="/admin/media/image"
            icon={<DiHtml5Multimedia size={'2rem'}  />}
            label="Media Collections" /> 
            
        </div>
      </nav>
      
    </>
  )
}
