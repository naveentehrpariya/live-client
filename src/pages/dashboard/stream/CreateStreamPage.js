import React from 'react';
import create_stream from '../../../img/create-stream.png';
export default function CreateStreamPage({setStep}) {
  return (
    <div className='bg-dark1 rounded-[30px] p-4 pt-0 max-w-[700px] mt-[100px]'>
         <img className='img-fluid' src={create_stream} alt='create stream' />
         <div className='c-bottom p-3 pt-0' > 
            <div className='pe-4 sm:max-w-[350px] m-auto'>
               <h2 className='text-white text-center text-[20px]' >Create New 24/7 Stream</h2>
               <p className='text-gray-500 text-center text-[17px] pt-2' >Every 24/7 stream is a server instance that you can manage and personalize from this dashboard.</p>
            </div>
            <div className='flex justify-center mt-4' >
               <button onClick={()=>setStep(0)} className='btn mt-4 sm:mt-0 btn-main lg' >Create New Stream</button>
            </div>
         </div>
    </div>
  )
}
