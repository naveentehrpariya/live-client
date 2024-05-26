import React from 'react'
import AdminLayout from './layout/AdminLayout'
import Pricing from '../pages/home/Pricing'

export default function AdminPlans() {
  return (
      <AdminLayout heading={"Pricing Plans"} >
         <Pricing classes="" colclasses="grid-cols-2 gap-5" />
      </AdminLayout>
  )
}
