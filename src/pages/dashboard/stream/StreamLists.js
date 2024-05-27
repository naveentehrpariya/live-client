
import React from 'react';
import Stream from './Stream';
import addmore from '../../../img/addmorestreams.png';
import { Link } from 'react-router-dom';
import Loading from '../../common/Loading';
import Nocontent from '../../common/NoContent';

export default function StreamLists({lists, reload, loading}) {

   const AddMoreStream = () => {
      return (
         <div className='stream box overflow-hidden'>
            <div className='stream-img w-full relative p-3' >
               <img src={addmore} className='img-fluid w-full max-h-[200px] object-cover' alt='images'  />
            </div>
            <div className='stream-info p-6'>
               <Link to='/create-stream' className='mt-12 btn btn-main sm flex items-center justify-center'> Create Stream</Link>
            </div>
         </div>
      )
   }

  return (
    <>
     {loading ? <Loading /> : <>
      <div className='streams-lists grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
         <AddMoreStream />
         {lists && lists.length ? lists.map((item, index) => {
            return <Stream reload={reload} key={index} data={item} />
         }) : <Nocontent /> }
        
      </div>
     </>}
    </>
  )
}
