import React, { useContext } from 'react'
import Logo from '../common/Logo';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';
import TimeFormat from '../common/TimeFormat';
import { DiHtml5Multimedia } from "react-icons/di";
import { TbHome } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { CgLogOut } from "react-icons/cg";
import Time from '../common/Time';

export default function Sidebar({toggle, trial, logout}) {

  const {pathname} = window.location;
  const {user} = useContext(UserContext);
  function MenuItem({ icon, label, path, onclick = false }) {
    return (
      <NavLink onClick={onclick} to={path || "/home"} activeclassname=" bg-dark1"
      className={`${pathname === path ? "bg-main text-white" : "bg-dark1  text-neutral-400 "} capitalize  flex gap-4 py-4 pr-5 pl-5 mt-5 rounded-xl leading-[150%]max-md:pr-5`}>
        {icon} <div className="my-auto">{label}</div>
      </NavLink>
    );
  }

  const time = Time();


  function UpgradePlan() {
    return (
      <div className="bg-dark sticky bottom-0 flex flex-col p-8 mt-12 text-base text-center max-md:mt-10">
         
         <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c6ec264598e3cd87b1d2591426df05954e4abb434a4a199ebaf9fd206758a4e?apiKey=2e16c10895744f95b3906b7e14da906a&"
          alt="Upgrade your plan"
          className="z-10 self-center mt-0 aspect-[1.2] w-[150px]" />
        <div className="mt-2.5 leading-5 text-neutral-200">
          Upgrade your plan to create 24/7 streams
        </div>
        <Link to='/upgrade/subscription' className="justify-center px-12 py-3.5 mt-7 text-white capitalize bg-red-500 leading-[90%] rounded-[180px] max-md:px-5">
          Upgrade Plan
        </Link>
        {trial}
      </div>
    );
  }

  const sortName = (n) => { 
    const name = n;
    return name.split(' ')[0] || name;
  }

  return (
    <>

      <nav className={`sidebar-wrapper border-r border-gray-900 text-base ${toggle ? "sidebar-open" : ""}`}>
        <div className='sticky top-0 p-8 bg-dark flex justify-center items-center sidebar-logo' >
          <Link to='/home' > <Logo /> </Link>
        </div>


        <div className='menus p-8 pt-0' >
            <MenuItem path="/home"
            icon={<TbHome size={'2rem'} />}
            label="My Streams" />

            <MenuItem path="/profile"
            icon={<FaUserCog size={'2rem'}  />}
            label={user ? `${sortName(user.name)}'s Profile` : `Profile`} />

            <MenuItem path="/media"
            icon={<DiHtml5Multimedia size={'2rem'}  />}
            label="Collections" />


            {/* <MenuItem path="/subscriptions"
            icon={<SlCalender size={'1.3rem'}  />}
            label="My Subscription" /> */}

            <div className='xl:hidden'>
              <MenuItem onclick={logout}
              icon={<CgLogOut size={'1.3rem'}  />}
              label="Logout" />
            </div>
        </div>
         

        {user && user.plan && user.plan._id ? 
          <div className='px-6 pb-8'>
              <Link to="/my-subscription" className="bg-dark1 mx-auto sticky bottom-0 flex flex-col p-4 mt-4 text-base text-center rounded-[30px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c6ec264598e3cd87b1d2591426df05954e4abb434a4a199ebaf9fd206758a4e?apiKey=2e16c10895744f95b3906b7e14da906a&"
                  alt="Upgrade your plan"
                  className="z-10 self-center mt-0 aspect-[1.2] w-[100px]" />
                
                <div className="mt-2.5 text-white text-lg">
                  Active Plan
                </div>
                <div className="mt-2.5 leading-5 text-neutral-200 text-main font-bold text-2xl">
                  {user.plan.name} 
                </div>
                <p className='text-gray-400 mt-3'>{user.plan.description} </p>
              </Link>
              <Link to='/upgrade/subscription' className="justify-center px-10 py-3 mt-6 text-white capitalize text-sm bg-red-500 leading-[90%] rounded-[180px] block text-center max-md:px-5">
                  Upgrade Plan
              </Link>            
          </div> 
          : 
          <>
         
          <UpgradePlan /> 
          </>
        }
      </nav>
      
    </>
  )
}
