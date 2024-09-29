import React, { useState } from 'react';
import image1 from '../../img/1.png';
import image2 from '../../img/2.png';
import image3 from '../../img/3.png';
import image4 from '../../img/4.png';
import image5 from '../../img/5.png';
import image6 from '../../img/6.png';
import image7 from '../../img/7.png';
import image8 from '../../img/8.png';
export default function Choose(){

   const lists = [
      {
        imageSrc: image1,
        title: "Drag & Drop",
        description: "Best in class drag & drop stream designer",
      },
      {
        title: "Multi Channel",
        description: "Multiple channels for music and effects",
        imageSrc: image2,
      },
      {
        title: "Queue Management",
        description: "Upload pre-recorded videos and queue them",
        imageSrc: image3,
      },
      {
        title: "Uninterrupted Stream",
        description: "Live update stream without ever stopping it",
        imageSrc: image4,

      },
      {
        title: "24/7 Support",
        description: "24/7 Live support available for assistance",
        imageSrc: image5,
      },
      {
        title: "Technical Free",
        description: "No technical knowledge required",
        imageSrc: image6,
      },
      {
        title: "No maintenance",
        description: "No server setup and maintenance",
        imageSrc: image7,
      },
      {
        title: "Advance Scheduling",
        description: "Schedule your streams in advance",
        imageSrc: image8,
      },
    ];

  return (
    <>
         <div className='choose py-24'>
            <div className='container m-auto' >

               <div className='top-tile max-w-[750px] m-auto' >
                  <h2 className='heading-md text-center ' >Why <span className='text-main' >Choose</span> Us</h2>
                  <p className='text-gray-400  text-center text-[18px] mt-2' >We have many feature for you to use in live stream </p>
               </div>

               <div className='mt-8 md:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5' >
                  {lists && lists.map((l, i)=>{
                     return (
                     <div className='fea-box p-4 bg-dark1 rounded-[20px]'>
                        <div className='fea-img' >
                           <img src={l.imageSrc} className='w-full' alt='RunStream' />
                        </div>
                        <h2 className='text-white font-bold mt-3 ' >{l.title}</h2>
                        <p className='text-gray-400 text-[14px] mt-1' >{l.description}</p>
                     </div>
                     )
                  })}
               </div>

            </div>
         </div>
    </>
  )
}
