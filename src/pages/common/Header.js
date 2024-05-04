import React from 'react'
import { Link  } from 'react-router-dom';
import Button from './Button';

export default function Header() {
  return (
    <>
      <header className='sticky top-2 py-3 z-10' >
         <div className='container m-auto'>
            <nav className="px-3 py-3 ">
               <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                     <Link to="/" class="ms-8 flex items-center">
                        <h2 className='heading ' >RunStream</h2>
                     </Link>
                     <div class="flex items-center lg:order-2">
                        <Link to="/login" class="text-main hover:text-white font-medium rounded-lg text-[20px] px-4 py-2 mr-2">Login</Link>
                        <Button to='/signup' text="Get Started" classes={''} ></Button>
                        <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-2" aria-expanded="false">
                           <span class="sr-only">Open main menu</span>
                           <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                           <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                     </div>
                     <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-5 lg:mt-0">
                           <li>
                                 <a href="#features" class="block py-2 pr-2 pl-2 text-white rounded bg-primary-700" aria-current="page">Feature</a>
                           </li>
                           <li>
                                 <a href="#pricing" class="block py-2 pr-2 pl-2 text-white rounded bg-primary-700" aria-current="page">Pricing</a>
                           </li>
                           <li>
                                 <a href="#reviews" class="block py-2 pr-2 pl-2 text-white rounded bg-primary-700" aria-current="page">Reviews</a>
                           </li>
                           <li>
                                 <a href="#features" class="block py-2 pr-2 pl-2 text-white rounded bg-primary-700" aria-current="page">FAQ</a>
                           </li>
                           <li>
                                 <Link to="/help" class="block py-2 pr-2 pl-2 text-white rounded bg-primary-700">Help</Link>
                           </li>
                        </ul>
                     </div>
               </div>
            </nav>
         </div>
      </header>

 

    </>
  )
}
