import React from 'react'

export default function Loading() {
  return (
    <div className='w-full px-12 py-20 flex justify-center'>
      <style>{`
      .loader {
         width: 100px;
         display: flex;
         justify-content: space-evenly;
       }
       
       .ball {
         list-style: none;
         width:25px;
         height:25px;
         border-radius: 50%;
         background-color: #fff;
       }
       
       .ball:nth-child(1) {
         animation: bounce-1 2.1s ease-in-out infinite;
       }
       
       @keyframes bounce-1 {
         50% {
           transform: translateY(-90px);
           scale: 0.3;
         }
       }
       
       .ball:nth-child(2) {
         animation: bounce-3 2.1s ease-in-out 0.3s infinite;
       }
       
       @keyframes bounce-2 {
         50% {
           transform: translateY(-90px);
           scale: 0.3;
         }
       }
       
       .ball:nth-child(3) {
         animation: bounce-3 2.1s ease-in-out 0.6s infinite;
       }
       
       @keyframes bounce-3 {
         50% {
           transform: translateY(-90px);
           scale: 0.3;
         }
       }
       `}</style>
      <div class="loader">
      <li class="ball"></li>
      <li class="ball"></li>
      <li class="ball"></li>
      </div>
    </div>
  )
}
