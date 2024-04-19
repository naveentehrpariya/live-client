import React from 'react'
import feature from '../../img/features.png';
export default function Features() {
  return (
    <div id='features' className='features py-24'>
      <div className='container m-auto' >
         <h2 className='heading-md text-center ' >Explore Our <span className='text-main' >Feature</span>  </h2>
         <p className='text-gray-400  text-center text-[18px] mt-2' >We have many feature for you to use in live stream </p>
        <div className='features-cols mt-16 grid grid-cols-2 gap-4' >
          
          <div className='features-faq'>
            <div class="mb-6 transition-all duration-200 bg-dark1 rounded-[20px] cursor-pointer">
                <button type="button" class="flex items-center justify-between w-full p-7">
                    <span class="flex text-[21px] font-semibold text-white font-mona"> Start Your 24/7 Live Stream in Minutes </span>
                    <svg class="w-6 h-6 text-gray-400 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div class="text-gray-500 p-6 pt-0">
                    <p className='text-[17px]' >Upstream simplifies the process of creating a 24/7 live stream on YouTube. With our easy-to-use stream builder, user-friendly interface & hosting you can quickly broadcast pre-recorded videos and provide your audience with constant access to your content. No server setup!</p>
                    <div className='turbo-gradient mt-8' ></div>
                </div>
            </div>
            <div class="mb-6 transition-all duration-200 bg-dark1 rounded-[20px] cursor-pointer">
                <button type="button" class="flex items-center justify-between w-full p-7">
                    <span class="flex text-[21px] font-semibold text-white font-mona"> Simple Drag & Drop 24/7 Stream Builder </span>
                    <svg class="w-6 h-6 text-gray-400 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div class="text-gray-500 d-none p-6 pt-0">
                    <p>Upstream simplifies the process of creating a 24/7 live stream on YouTube. With our easy-to-use stream builder, user-friendly interface & hosting you can quickly broadcast pre-recorded videos and provide your audience with constant access to your content. No server setup!</p>
                    <div className='turbo-gradient mt-8' ></div>
                </div>
            </div>
            
            <div class="mb-6 transition-all duration-200 bg-dark1 rounded-[20px] cursor-pointer">
                <button type="button" class="flex items-center justify-between w-full p-7">
                    <span class="flex text-[21px] font-semibold text-white font-mona">Schedule & Broadcast Pre-Recorded Videos </span>
                    <svg class="w-6 h-6 text-gray-400 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div class="text-gray-500 d-none p-6 pt-0">
                    <p>Upstream simplifies the process of creating a 24/7 live stream on YouTube. With our easy-to-use stream builder, user-friendly interface & hosting you can quickly broadcast pre-recorded videos and provide your audience with constant access to your content. No server setup!</p>
                    <div className='turbo-gradient mt-8' ></div>
                </div>
            </div>

            <div class="mb-6 transition-all duration-200 bg-dark1 rounded-[20px] cursor-pointer">
                <button type="button" class="flex items-center justify-between w-full p-7">
                    <span class="flex text-[21px] font-semibold text-white font-mona"> Multi-Channel Audio Support </span>
                    <svg class="w-6 h-6 text-gray-400 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div class="text-gray-500 d-none p-6 pt-0">
                    <p>Upstream simplifies the process of creating a 24/7 live stream on YouTube. With our easy-to-use stream builder, user-friendly interface & hosting you can quickly broadcast pre-recorded videos and provide your audience with constant access to your content. No server setup!</p>
                    <div className='turbo-gradient mt-8' ></div>
                </div>
            </div>

          </div>

          <div className='features-img' >
            <img src={feature} alt='features-img' className='w-full' />
          </div>

        </div>
      </div>
    </div>
  )
}
