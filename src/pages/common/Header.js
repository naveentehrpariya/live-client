import React, { useContext } from 'react'
import { Link  } from 'react-router-dom';
import Button from './Button';
import { UserContext } from '../../context/AuthProvider';
import CheckLogin from '../auth/CheckLogin';

export default function Header() {
  const {user}  = useContext(UserContext);
  const [toggle, setToggle] = React.useState(false);

  return (
    <>
    <CheckLogin  />
      <header className='sticky top-2 py-3 z-10' >
         <div className='container m-auto'>
            <nav className="px-3 py-1 md:py-3 ">
               <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                     <Link to="/" class="ms-3 sm:ms-8 flex items-center">
                        <h2 className='heading drunk lg px-0' >RunStream</h2>
                     </Link>
                     <div class="flex items-center xl:order-2">
                        {user && user.name ? 
                              <Link to="/home" class="text-main hover:text-white font-medium rounded-lg text-[20px] px-4 py-2 mr-2">My Account</Link>  
                              :
                           <>
                           <Link to="/login" class="hidden md:block text-main hover:text-white font-medium rounded-lg text-[20px] px-4 py-2 mr-2">Login</Link>
                           <Button to='/signup' text="Get Started" classes={'hidden sm:flex '} ></Button>
                           </>
                        }
                        
                        <button onClick={(e)=>setToggle(!toggle)}  class="ms-4 me-2 inline-flex items-center ml-1 text-sm text-gray-500 rounded-lg xl:hidden  focus:outline-none " >
                           <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                           <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                        
                     </div>

                     <div class={`${toggle ? "toggle" : ""} mobile-menu  justify-between items-center w-full xl:flex xl:w-auto xl:order-1`} id="mobile-menu-2">
                        <ul class="flex flex-col  font-medium xl:flex-row xl:space-x-5 ">
                           <li>
                                 <a href="#features" class="text-2xl xl:text-lg block py-3 xl:py-2 pr-2 pl-2 text-white rounded bg-primary-700" aria-current="page">Feature</a>
                           </li>
                           <li>
                                 <a href="#pricing" class="text-2xl xl:text-lg block py-3 xl:py-2 pr-2 pl-2 text-white rounded bg-primary-700" aria-current="page">Pricing</a>
                           </li>
                           <li>
                                 <a href="#reviews" class="text-2xl xl:text-lg block py-3 xl:py-2 pr-2 pl-2 text-white rounded bg-primary-700" aria-current="page">Reviews</a>
                           </li>
                           <li>
                                 <a href="#features" class="text-2xl xl:text-lg block py-3 xl:py-2 pr-2 pl-2 text-white rounded bg-primary-700" aria-current="page">FAQ</a>
                           </li>
                           {/* <li>
                                 <Link to="/help" class="text-2xl xl:text-lg block py-3 xl:py-2 pr-2 pl-2 text-white rounded bg-primary-700">Help</Link>
                           </li> */}
                        </ul>
                     </div>
               </div>
            </nav>
         </div>
      </header>

 

    </>
  )
}
