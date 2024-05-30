import React from 'react'

export default function AdminTitle({heading, children}) {
  return (
   <div className="flex items-center justify-between p-1 pb-6">
      <h2 className='text-white font-bold text-2xl'>{heading}</h2>
      {children}
   </div>
  )
}
