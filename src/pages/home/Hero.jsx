import React from 'react'
import Button from '../common/Button';
import hero from '../../img/hero.png';

export default function Hero() {
  return <div className='hero-section'>
      <div className='container m-auto ' >
         <div className='max-w-[860px] py-24 px-6 m-auto' >
            <h2 className='heading-lg md:heading-xl text-center px-8 m-auto' >24/7 YouTube <span className='text-main' >Live Stream</span> Pre-Recorded Videos</h2>
            <p className='text-center text-white text-[20px] mt-3 leading-[22px]' >Take your YouTube channel to the next level with Upstream.
               The easiest way to build & maintain a 24 hour live stream using pre-recorded videos.</p>
               <div className='flex justify-center' >
                  <Button text="Sign up for free" classes={'mt-6'} ></Button>
               </div>
         </div>
         <div className='xl:px-16  m-auto' >
            <img src={hero} alt="hero" className='w-full h-full object-cover' />
         </div>
      </div>
    </div>
}
