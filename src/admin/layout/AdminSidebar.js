import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';
import { DiHtml5Multimedia } from "react-icons/di";
import { TbHome } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Logo from '../../pages/common/Logo';
import { CgLogOut } from 'react-icons/cg';
import { TfiWrite } from "react-icons/tfi";
import { MdFeaturedPlayList, MdOutlineContactSupport } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { MdLiveTv } from "react-icons/md";

export default function AdminSidebar({toggle}) {
  const {pathname} = window.location;
  function MenuItem({ icon, label, path }) {
    return (
      <NavLink to={path || "/admin/runstream/x93tzwkdtsmf/home"} 
      className={`${pathname === path ? "bg-main text-white" : "bg-dark1  text-neutral-400 "} flex gap-4 py-4 pr-5 pl-5 mt-5 rounded-xl leading-[150%]max-md:pr-5`}>
        {icon} <div className="my-auto">{label}</div>
      </NavLink>
    );
  }

  const logout = () => {
    localStorage.removeItem("admintoken");
    window.location.href = "/admin/runstream/x93tzwkdtsmf/login";
  };

  return (
    <>
      <nav className={`sidebar-wrapper border-r border-gray-900 text-base ${toggle ? "sidebar-open" : ""}`}>
         
        <div className='sticky top-0 p-8 bg-dark flex justify-center items-center sidebar-logo' >
          <div className='text-center'>
            <Link to='/admin/runstream/x93tzwkdtsmf' > <Logo /></Link>
         </div>
        </div>

        <div className='menus p-8 pt-0' >
            
            <MenuItem path="/admin/runstream/x93tzwkdtsmf"
            icon={<TbHome size={'2rem'}  />}
            label="Dashboard" />

            <MenuItem path="/admin/runstream/x93tzwkdtsmf/users/active"
            icon={<FaUserCog size={'2rem'}  />}
            label="Users" />

            <MenuItem path="/admin/runstream/x93tzwkdtsmf/streams/all"
            icon={<MdLiveTv size={'1.52rem'} />}
            label="Live Streams" />

            <MenuItem path="/admin/runstream/x93tzwkdtsmf/pricing"
            icon={<SlCalender size={'1.3rem'}  />}
            label="Pricing Plans" />

            <MenuItem path="/admin/runstream/x93tzwkdtsmf/subscriptions/all"
            icon={<CiCalendarDate size={'2rem'}  />}
            label="Subscription" /> 

            <MenuItem path="/admin/runstream/x93tzwkdtsmf/media/image"
            icon={<DiHtml5Multimedia size={'2rem'}  />}
            label="Media Collections" />

            <MenuItem path="/admin/runstream/x93tzwkdtsmf/site-features"
            icon={<MdFeaturedPlayList size={'1.5rem'}  />}
            label="Features" />

            <MenuItem path="/admin/runstream/x93tzwkdtsmf/testimonials"
            icon={<TfiWrite  size={'1.5rem'}  />}
            label="Testimonials" />

            <MenuItem path="/admin/runstream/x93tzwkdtsmf/inquiries"
            icon={<MdOutlineContactSupport  size={'1.5rem'}  />}
            label="Inquiries" />

            <div className='xl:hidden'>
              <MenuItem onclick={logout}
              icon={<CgLogOut size={'1.3rem'}  />}
              label="Logout" />
            </div>
            
        </div>
      </nav>
      
    </>
  )
}
