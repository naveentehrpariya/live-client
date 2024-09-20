import React from 'react'
import HomeLayout from '../layout/HomeLayout'

export default function Refund() {
  return (
   <HomeLayout title="Cancellation and Refund Policy">
      <div className='py-6 md:py-12'>
         <div className="container mx-auto  text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-8">Cancellation and Refund Policy</h1>
            <div className="mb-8">
               <p>First-time users: Within 7 days of your initial purchase, you have the right to request cancellation of your live streaming server package and receive a full refund.</p>
               <p>Long-time users: Refunds are available for reasons related to product errors. Please contact our customer service team for assistance.</p>
               <p>To cancel your package, please send a cancellation request to our customer service email address: <a href="mailto:support@runstream.co" className="text-blue-500 hover:underline">support@runstream.co</a></p>
            </div>
            <div className="mb-8">
               <h2 className="text-xl md:text-2xl font-bold mb-4">Refund Procedure</h2>
               <p>Upon receiving your cancellation request, we will process your refund as quickly as possible. Refunds will be issued using the same method of payment used for the initial transaction.</p>
            </div>
            <div className="mb-8">
               <h2 className="text-xl md:text-2xl font-bold mb-4">Cancellation Deadline</h2>
               <p>To be eligible for a refund, your cancellation request must be received within 7 days from the date of your initial purchase.</p>
            </div>
            <div className="mb-8">
               <h2 className="text-xl md:text-2xl font-bold mb-4">Contact Us</h2>
               <p>If you have any questions or concerns regarding our Cancellation and Refund Policy, please don't hesitate to reach out to our customer service team at <a href="mailto:support@runstream.co" className="text-blue-500 hover:underline">support@runstream.co</a>.</p>
            </div>
            </div>

      </div>
   </HomeLayout>
  )
}
