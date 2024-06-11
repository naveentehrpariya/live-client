import React from 'react'
import HomeLayout from '../layout/HomeLayout'

export default function Contact() {
  return (
      <HomeLayout>
         <div className="flex py-16 md:py-28 items-center justify-start bg-dark">
         <div className="mx-auto w-full p-6 max-w-lg">
            <h1 className="text-3xl text-center text-white font-medium">Contact us</h1>
            <p className="mt-2 text-center text-gray-300">Email us at <a className='text-main' href="mailto:support@runstream.co">support@runstream.co</a> or message us here:</p>

            <form a className="mt-6">
               <div className="grid gap-2 md:gap-6 md:grid-cols-2">
                  <div className="relative z-0">
                     <input type="text" name="name" className="input text-white" placeholder="Name" />
                  </div>
                  <div className="relative z-0">
                     <input type="text" name="email" className="input text-white" placeholder="Email" />
                  </div>
               </div>
               <div className="relative z-0  mt-3 col-span-2">
                  <textarea name="message"  className="input text-white" placeholder="Message"></textarea>
               </div>
               <div className='flex justify-center' >
                  <button type="submit" className="btn md mt-4 ">Send Message</button>
               </div>
            </form>
         </div>
         </div>
      </HomeLayout>
  )
}
