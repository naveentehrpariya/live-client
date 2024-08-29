import React, { useContext } from 'react'
import AuthLayout from '../../../layout/AuthLayout'
import { UserContext } from '../../../context/AuthProvider';
import DeleteAccount from './DeleteAccount';

export default function Profile() {
   const { user } = useContext(UserContext);
   return (
      <>
      <AuthLayout heading={"Profile"} >
         <div className="bg-dark1 overflow-hidden shadow rounded-xl">

            <div className="px-4 py-4 sm:p-0">
               <dl className="divide-y divide-gray-800">
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                           Full name
                        </dt>
                        <dd className="mt-1 text-md text-gray-400 sm:mt-0 sm:col-span-2">
                           {user && user?.name || ''}
                        </dd>
                     </div>
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                           Username
                        </dt>
                        <dd className="mt-1 text-md text-gray-400 sm:mt-0 sm:col-span-2">
                           {user && user?.username || ''}
                        </dd>
                     </div>
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                           Active Subscription
                        </dt>
                        <dd className="mt-1 text-md text-gray-400 sm:mt-0 sm:col-span-2">
                           {user && user.plan ? <>
                              {user && user.plan && user.plan.name} (${user && user.plan && user.plan.price} {user && user.plan && user.plan.duration_title})
                           </> : "No Subscription"
                           }
                        </dd>
                     </div>
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                           Email address
                        </dt>
                        <dd className="mt-1 text-md text-gray-400 sm:mt-0 sm:col-span-2">
                        {user && user.email}
                        </dd>
                     </div>
                     <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                           Remove Account
                        </dt>
                        <dd className="mt-1 text-md text-gray-400 sm:mt-0 sm:col-span-2">
                        <DeleteAccount />
                        </dd>
                     </div>
               </dl>
            </div>
         </div>
            
      </AuthLayout>
      </>
   )
}
