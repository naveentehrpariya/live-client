import React, { useContext } from 'react'
import AuthLayout from '../../../layout/AuthLayout'
import { UserContext } from '../../../context/AuthProvider';

export default function Profile() {

   const {user} = useContext(UserContext);


  return (
    <>
    <AuthLayout heading={"Profile"} >
      <div class="bg-dark2 overflow-hidden shadow rounded-lg border border-gray-800">
         {/* <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-white">
                  User Profile
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  This is some information about the user.
            </p>
         </div> */}
         <div class="border-t border-gray-800 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-800">
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium text-gray-500">
                        Full name
                     </dt>
                     <dd class="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
                        {user.name}
                     </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium text-gray-500">
                        Email address
                     </dt>
                     <dd class="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
                     {user.email}
                     </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium text-gray-500">
                        Phone number
                     </dt>
                     <dd class="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
                        --
                     </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium text-gray-500">
                        Address
                     </dt>
                     <dd class="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
                        ---
                     </dd>
                  </div>
            </dl>
         </div>
      </div>
    </AuthLayout>
    </>
  )
}
