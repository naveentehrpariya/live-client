import React from 'react'
import AdminLayout from './layout/AdminLayout'
import Pricing from '../pages/home/Pricing'
import { Link } from 'react-router-dom'
import AdminTitle from './layout/AdminTitle'

export default function AdminPlans() {
  return (
      <AdminLayout heading={"Pricing Plans"} >
          <AdminTitle heading="Plans">
              <Link to="/admin/pricing/add" className=" rounded-[30px] bg-main text-white py-2 px-4 shadow-md">+ Add Pricing Plan</Link>
          </AdminTitle>
         <Pricing classes="" colclasses="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" />
      </AdminLayout>
  )
}
