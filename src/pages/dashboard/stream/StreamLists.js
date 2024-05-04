
import React from 'react';
import Stream from './Stream';
import addmore from '../../../img/addmorestreams.png'
import { Link } from 'react-router-dom';

export default function StreamLists({lists, reload}) {

   const AddMoreStream = () => {
      return (
         <div className='stream box overflow-hidden'>
            <div className='stream-img w-full relative' >
               <img src={addmore} className='img-fluid w-full max-h-[200px] object-cover'  />
            </div>
            <div className='stream-info p-6'>
               <Link to='/create-stream' className='mt-12 btn btn-main sm flex items-center justify-center'> Create Stream</Link>
            </div>
         </div>
      )
   }

  return (
    <>
      <div className='streams-lists grid grid-cols-2 xl:grid-cols-3 gap-5'>
         {lists && lists.length ? lists.map((item, index) => {
            return <Stream reload={reload} key={index} data={item} />
         }) : "NO STREAMS FOUND !!"}
         <AddMoreStream />
      </div>
    </>
  )
}
