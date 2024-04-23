import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({loading, onclick, to, text, classes, type, loadingtext}) {
  return (
    <>
    {type === 'button'? 
      <button disabled={loading} onClick={onclick} className={`${loading && "opacity-70 cursor-wait"} ${classes} ps-5 inline-flex  rounded-[40px] p-2 btn text-[20px] w-auto items-center justify-between`} >
        {loading? loadingtext || "Loading.." : text }
        <div className='ms-3 flex items-center justify-center arrow bg-white w-[40px] h-[40px]  rounded-[50%]' ><svg width="23" height="8" viewBox="0 0 23 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.3536 4.35355C22.5488 4.15829 22.5488 3.84171 22.3536 3.64645L19.1716 0.464466C18.9763 0.269204 18.6597 0.269204 18.4645 0.464466C18.2692 0.659728 18.2692 0.976311 18.4645 1.17157L21.2929 4L18.4645 6.82843C18.2692 7.02369 18.2692 7.34027 18.4645 7.53553C18.6597 7.7308 18.9763 7.7308 19.1716 7.53553L22.3536 4.35355ZM0 4.5H22V3.5H0V4.5Z" fill="#E13939"/>
          </svg>
        </div>
      </button>
     :
      <Link disabled={loading} to={to} className={`${loading && "opacity-70 cursor-wait"} ${classes} ps-5 inline-flex  rounded-[40px] p-2 btn text-[20px] w-auto items-center justify-between`} >
        {loading? loadingtext || "Loading.." : text}
        <div className='ms-3 flex items-center justify-center arrow bg-white w-[40px] h-[40px]  rounded-[50%]' ><svg width="23" height="8" viewBox="0 0 23 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.3536 4.35355C22.5488 4.15829 22.5488 3.84171 22.3536 3.64645L19.1716 0.464466C18.9763 0.269204 18.6597 0.269204 18.4645 0.464466C18.2692 0.659728 18.2692 0.976311 18.4645 1.17157L21.2929 4L18.4645 6.82843C18.2692 7.02369 18.2692 7.34027 18.4645 7.53553C18.6597 7.7308 18.9763 7.7308 19.1716 7.53553L22.3536 4.35355ZM0 4.5H22V3.5H0V4.5Z" fill="#E13939"/>
          </svg>
        </div>
      </Link>
    }

    </>
  )
}
