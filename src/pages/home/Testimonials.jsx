import 'swiper/css';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import user from '../../img/user.png';
import heart from '../../img/heart.png';

const testimonials = [
   {
      avatar: user,
      name: "Anthony",
      content:
      "My first day contacting support I met Sebastian. I have never has such good customer service in my life! I wish more businesses cared as much about customers as Sebastian. Runstream sets a standard far above what most business ethics offer today. Sebastian took his time to explain.",
   },
   {
      avatar: user,
      name: "Anthony",
      content:
      "My first day contacting support I met Sebastian. I have never has such good customer service in my life! I wish more businesses cared as much about customers as Sebastian. Runstream sets a standard far above what most business ethics offer today. Sebastian took his time to explain.",
   },
   {
      avatar: user,
      name: "Anthony",
      content:
      "My first day contacting support I met Sebastian. I have never has such good customer service in my life! I wish more businesses cared as much about customers as Sebastian. Runstream sets a standard far above what most business ethics offer today. Sebastian took his time to explain.",
   },
   {
      avatar: user,
      name: "Anthony",
      content:
      "My first day contacting support I met Sebastian. I have never has such good customer service in my life! I wish more businesses cared as much about customers as Sebastian. Runstream sets a standard far above what most business ethics offer today. Sebastian took his time to explain.",
   },
   {
      avatar: user,
      name: "Anthony",
      content:
      "My first day contacting support I met Sebastian. I have never has such good customer service in my life! I wish more businesses cared as much about customers as Sebastian. Runstream sets a standard far above what most business ethics offer today. Sebastian took his time to explain.",
   },
];

export default function Testimonials(){

   function Avatar({ src, alt }) {
      return <img loading="lazy" src={src} alt={alt} className="shrink-0 rounded-full aspect-square w-[52px]" />;
   }
   
   function Testimonial({ avatar, name, content }) {
      return (
         <article className="flex bg-dark1 flex-col p-6 text-white rounded-3xl bg-slate-950">
          <header className="flex gap-4 text-xl font-bold leading-5 text-center whitespace-nowrap">
            <Avatar src={avatar} alt={`${name}'s avatar`} />
            <h2 className="my-auto">{name}</h2>
          </header>
          <p className="mt-5 text-base leading-7 text-gray-400">{content}</p>
        </article>
      );
   }
   return (
      <>
      <style>{`
      .hert-image{top:-30px;left:50%;transform:translateX(-50%);}
      .t-overlay{position:absolute;top:0;height:100%;width:400px;z-index:2;}
      .t-overlay.left{background:linear-gradient(90deg,rgb(1 10 14) 1%,rgba(1,10,15,0.22875087535014005) 100%);left:0;}
      .t-overlay.right{background:linear-gradient(270deg,rgb(1 10 14) 1%,rgba(1,10,15,0.22875087535014005) 100%);right:0;}
      `}</style>
         <div id="reviews" className='testimonials md:py-12'>
            <div className='container m-auto' >
               <div className='relative w-full' > 
                  <img loading="lazy" src={heart} alt={'heart-icons'} className="absolute hert-image max-w-[300px] md:max-w-[500px]" />;
                  <div className='top-tile max-w-[750px] m-auto mb-12' >
                     <h2 className='heading-md text-center ' ><span className='text-main' >Loved</span> by Every Creator </h2>
                     <p className='text-gray-400  text-center text-[18px] mt-2' >Here’s what people are saying about us</p>
                  </div>
                  <div className='relative' > 
                     <div className='left t-overlay' ></div>
                        <Swiper
                           autoplay={{
                              delay:4000,
                              disableOnInteraction: false,
                           }}
                           breakpoints={{
                              320: {
                                 slidesPerView: 1,
                              },
                              767: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                              },
                              992: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                              },
                            }}
                           modules={[Autoplay]}  >

                           {testimonials && testimonials.map((t, i) => {
                              return (
                                 <SwiperSlide key={i}>
                                 <Testimonial avatar={t.avatar} name={t.name} content={t.content} />
                              </SwiperSlide>
                              );
                           })}
                              
                        </Swiper>
                     <div className='right t-overlay' ></div>
                  </div>
               </div>

            </div>
         </div>
    </>
  )
}
