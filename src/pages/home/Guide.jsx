import React from 'react'
import feature from '../../img/features.png';
export default function Guide() {
  return (
    <div className='guilde-boxes pt-[30px] pb-24 '>
      <div className='container m-auto' >
        <div className='guilds mt-16 grid grid-cols-1 md:grid-cols-2 gap-4' >
          <div className='' >
            <img src={feature} alt='features-img' className='w-full' />
          </div>
          <div className='' >
            <img src={feature} alt='features-img' className='w-full' />
          </div>
        </div>
      </div>
    </div>
  )
}
