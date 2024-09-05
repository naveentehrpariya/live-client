import React from 'react'
import Hero from './Hero'
import Features from './Features'
import Brand from './Brand'
import Choose from './Choose'
import Pricing from './Pricing'
import Guide from './Guide'
import Testimonials from './Testimonials'
import LetsTake from './LetsTake'
import HomeLayout from '../../layout/HomeLayout'

export default function Homepage() {
  return (
    <>
    <HomeLayout>
      <Hero />
      <Features />
      <Brand />
      <Choose />
      <div className='px-0 md:px-6' >
        <div className='md:bg-dark1 rounded-[35px]' >
          <div className='container ' >
            <Pricing heading={true} classes="pricing py-0 md:py-24" colclasses="mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"  />
          </div>
        </div>
      </div>
      <Guide />
      <Testimonials />
      <LetsTake />
    </HomeLayout>
    </>
  )
}
