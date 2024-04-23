import React from 'react'
import Logo from '../common/Logo';

export default function Sidebar() {

   function IconImage({ src, alt }) {
      return (
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className="shrink-0 w-5 aspect-square"
        />
      );
    }
    function MenuItem({ icon, label }) {
      return (
        <div className="bg-dark1 flex gap-4 py-4 pr-5 pl-5 mt-5 rounded-xl leading-[150%] text-neutral-400 max-md:pr-5">
          <IconImage src={icon} alt="" /> <div className="my-auto">{label}</div>
        </div>
      );
    }
    function UpgradePlan() {
      return (
        <div className="flex flex-col p-8 mt-12 text-base text-center  max-md:mt-10">
          
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c6ec264598e3cd87b1d2591426df05954e4abb434a4a199ebaf9fd206758a4e?apiKey=2e16c10895744f95b3906b7e14da906a&"
            alt="Upgrade your plan"
            className="z-10 self-center mt-0 aspect-[1.2] w-[195px]"
          />
          <div className="mt-2.5 leading-5 text-neutral-200">
            
            Upgrade your plan and create more streams
          </div>
          <div className="justify-center px-12 py-3.5 mt-7 text-white capitalize bg-red-500 leading-[90%] rounded-[180px] max-md:px-5">
            
            Upgrade Plan
          </div>
        </div>
      );
    }

  return (
    <>
      <nav className="sidebar-wrapper  border-r border-gray-900  text-base">
         <div className='sticky top-0 p-8 bg-dark flex justify-start items-center sidebar-logo' >
            <Logo />
         </div>

        <div className='menus p-8' >
            <MenuItem
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b76f3632fa4a0cbf10773892b2a869fe65c0026f494edf9021b4c11ac2ed80e9?apiKey=2e16c10895744f95b3906b7e14da906a&"
            label="Manage Subscription" />
            <MenuItem
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/0ee633a9a7d3d33d8ec68ab435cce9c978e8d96a626ce901eb24a0c1e9eedc00?apiKey=2e16c10895744f95b3906b7e14da906a&"
            label="My Profile" />
        </div>

        <UpgradePlan />
      </nav>
      
    </>
  )
}