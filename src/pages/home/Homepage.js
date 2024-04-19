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
      <Pricing />
      <Guide />
      <Testimonials />
      <LetsTake />
    </HomeLayout>
    </>
  )
}
