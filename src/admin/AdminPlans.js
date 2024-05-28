import React from 'react'
import AdminLayout from './layout/AdminLayout'
import Pricing from '../pages/home/Pricing'
import { Link } from 'react-router-dom'

export default function AdminPlans() {
  return (
      <AdminLayout heading={"Pricing Plans"} >
          <div className='flex justify-ensd mb-4 '>
              <Link to="/admin/pricing/add" className=" rounded-[30px] bg-main text-white py-2 px-4 shadow-md">+ Add Pricing Plan</Link>
          </div>
         <Pricing classes="" colclasses="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" />
      </AdminLayout>
  )
}
