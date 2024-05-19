import React from 'react'
import AuthLayout from '../../../layout/AuthLayout'
import Addmedia from './Addmedia'
import MediaList from './MediaList'

export default function Media() {
   return (
      <AuthLayout heading={"My Media"} >
          <MediaList />
      </AuthLayout>
   )
}
