import React from 'react'
import how_to_youtube from '../../img/how-to-live.png';
import how_to_find_streamkey from '../../img/how-to-find.png';
export default function Guide() {
  return (
    <div className='guilde-boxes pb-24 '>
      <div className='container m-auto' >
        <div className='guilds mt-16 grid grid-cols-1 md:grid-cols-2 gap-4' >
          <div className='' >
            <img src={how_to_youtube} alt='features-img' className='w-full' />
          </div>
          <div className='' >
            <img src={how_to_find_streamkey} alt='features-img' className='w-full' />
          </div>
        </div>
      </div>
    </div>
  )
}
