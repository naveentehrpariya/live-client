import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import music from '../../img/music.png'
export default function Brand(){
  return (
    <>
   <div className='px-8'>
      <div className='brand py-24 bg-dark1 rounded-[35px]'>
         <div className='container m-auto' >
            <div className='top-tile max-w-[750px] m-auto' >
               <h2 className='heading-md text-center ' >Build & design custom 24/7 live streams for your <span className='text-main' >brand</span>  </h2>
               <p className='text-gray-400  text-center text-[18px] mt-2' >Strengthen your religiouse community with the power of live streaming. Create immersive 24/7 live streams of religious services, ceremonies or meditations. Engage your congregation and reach a wider audience, sharing hope and positivity.</p>
            </div>

            <div className='brand-swiper max-w-[950px] m-auto mt-8' >
               <Swiper
                  spaceBetween={15}
                  slidesPerView={4.5} autoplay={{
                     delay:1000,
                     disableOnInteraction: false,
                   }}
                   modules={[Autoplay]}  >
                  <SwiperSlide><img src={music} alt='image'  className='w-full'/></SwiperSlide>
                  <SwiperSlide><img src={music} alt='image'  className='w-full'/></SwiperSlide>
                  <SwiperSlide><img src={music} alt='image'  className='w-full'/></SwiperSlide>
                  <SwiperSlide><img src={music} alt='image'  className='w-full'/></SwiperSlide>
                  <SwiperSlide><img src={music} alt='image'  className='w-full'/></SwiperSlide>
                  <SwiperSlide><img src={music} alt='image'  className='w-full'/></SwiperSlide>
                  <SwiperSlide><img src={music} alt='image'  className='w-full'/></SwiperSlide>
                  <SwiperSlide><img src={music} alt='image'  className='w-full'/></SwiperSlide>
               </Swiper>
            </div>

         </div>
      </div>
   </div>
    </>
  )
}
