import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import gridimage from '../../img/frame-grid.png'
import music from '../../img/music.png'
import { CiMusicNote1 } from "react-icons/ci";
import { SiYoutubegaming } from "react-icons/si";
import { PiCampfireLight } from "react-icons/pi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";

export default function Brand(){

   const data = [
      {
         image: <CiMusicNote1 size={'2rem'} />,
         title: 'Music',
      },
      {
         image: <SiYoutubegaming size={'2rem'} />,
         title: 'Gaming',
      },
      {
         image: <PiCampfireLight size={'2rem'} />,
         title: 'Religious', 
      },
      {
         image: <MdOutlineBusinessCenter size={'2rem'} />,
         title: 'Business',
      },
      {
         image: <FaNewspaper size={'2rem'} />,
         title: 'News',
      },
      {
         image: <CiMusicNote1 size={'2rem'} />,
         title: 'Music',
      },
      {
         image: <SiYoutubegaming size={'2rem'} />,
         title: 'Gaming',
      },
      {
         image: <PiCampfireLight size={'2rem'} />,
         title: 'Religious', 
      },
      {
         image: <MdOutlineBusinessCenter size={'2rem'} />,
         title: 'Business',
      },
      {
         image: <FaNewspaper size={'2rem'} />,
         title: 'News',
      }
   ]
  return (
    <>
   <div className='px-3 md:px-8'>
      <div className='brand md:py-24 bg-dark1 rounded-[35px]'>
         <div className='container m-auto' >
            <div className='top-tile max-w-[750px] m-auto' >
               <h2 className='heading-md text-center ' >Build & design custom 24/7 live streams for your <span className='text-main' >brand</span>  </h2>
               <p className='text-gray-400  text-center text-[18px] mt-2' >Strengthen your religiouse community with the power of live streaming. Create immersive 24/7 live streams of religious services, ceremonies or meditations. Engage your congregation and reach a wider audience, sharing hope and positivity.</p>
            </div>

            <div className='brand-swiper max-w-[950px] m-auto mt-8' >
               <Swiper
                  autoplay={{
                     delay:1000,
                     disableOnInteraction: false,
                   }}
                   breakpoints={{
                     320: {
                        slidesPerView: 2.5,
                        spaceBetween: 10,
                     },
                     640: {
                       slidesPerView: 2.5,
                       spaceBetween: 10,
                     },
                     768: {
                       slidesPerView: 3.5,
                       spaceBetween: 15,
                     },
                     1024: {
                       slidesPerView: 4.5,
                       spaceBetween: 15,
                     },
                   }}
                   modules={[Autoplay]}  >
                     {
                        data && data.map(function (item, index) {
                           return <SwiperSlide key={index} className='w-full h-full  bg-dark2 p-4 rounded-[20px]' >
                              <div className=' relative'>
                                 <img src={gridimage} alt='gridimage galley' className='w-full absolute h-full top-0 left-0'/>
                                
                                <div className='flex items-center'>
                                 <div className='icon me-2 w-[50px] h-[50px] flex justify-center items-center bg-[#4e4e4e23] text-white rounded-full p-3'>{item.image}</div>
                                 <p className='text-center font-mono font-bold text-gray-400 text-[20px] mt-2' >{item.title}</p>
                                </div>
                              </div>
                           </SwiperSlide>
                        })
                     }
               </Swiper>
            </div>

         </div>
      </div>
   </div>
    </>
  )
}
