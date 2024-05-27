import React from 'react';
import create_stream from '../../../img/create-stream.png';
export default function CreateStream() {
  return (
    <div className='bg-dark1 rounded-[30px] p-4 pt-0 max-w-[700px]'>
         <img className='img-fluid' src={create_stream} alt='create stream' />
         <div className='c-bottom p-3 pt-0 sm:flex items-center justify-between' > 
            <div className='pe-4 sm:max-w-[350px]'>
               <h2 className='text-white text-center sm:text-start font-bold text-[20px]' >Create New 24/7 Stream</h2>
               <p className='text-gray-500 text-center sm:text-start text-[17px] pt-2' >Every 24/7 stream is a server instance that you can manage and personalize from this dashboard.</p>
            </div>
            <div>
               <a href="/create-stream" className='btn mt-4 sm:mt-0 block btn-main lg' >Create Stream</a>
            </div>
         </div>
    </div>
  )
}
