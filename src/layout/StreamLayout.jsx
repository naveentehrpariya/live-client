import * as React from "react";
import CheckLogin from "../pages/auth/CheckLogin";
import Logo from "../pages/common/Logo";
 
export default function StreamLayout({children, disabled,  onclick, step}) {

  return (
   <>
      <div className="bg-dark1 stream-auth-wrap">
            <CheckLogin takeaction={true} />
            <div className="bg-dark1 absolute w-full top-0 flex justify-between items-center p-6 border-b border-gray-800 " >
               <div>
                  <Logo size='text-xl md:text-2xl ' />
               </div>
               <button disabled={disabled} onClick={onclick} className={`${step < 3 ? 'disabled' : ""}  flex items-center text-white bg-main px-5 py-2 rounded-2xl`} >
               <svg width="15" height="15" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M11.489 7.96969C12.2355 7.53871 12.2355 6.46126 11.489 6.03028L2.53124 0.858526C1.78476 0.427547 0.851659 0.966271 0.851659 1.82823V12.1717C0.851659 13.0337 1.78476 13.5724 2.53124 13.1414L11.489 7.96969Z" stroke="#fff" stroke-width="0.746479"/>
               </svg> &nbsp;
               START</button>
            </div>
            <div className="content pt-[100px] min-h-screen" >
               {children}
            </div>
      </div>
   </>
  );
}
