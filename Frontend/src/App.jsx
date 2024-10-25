import React from 'react'
import Hero from './components/Hero/Hero'
import Navbar from './components/navbar/Navbar'
import FeatureSevice from './components/FeaturedService/FeatureSevice'
import Category from './components/categories/Category'
import Testimonials from './components/Testimonials/Testimonials'
import Benefits from './components/Benefits/Benefits'
import ContactUs from './components/contact/ContactUs'
import TrustBadges from './components/TrustBadge/TrustBadges'
import Endorsements from './components/Endorsement/Endorsements'
import Footer from './components/Footer/Footer.jsx'
import FAQ from './components/FAQ/FAQ.jsx'

const App = () => {
  return (
    <>
    <Navbar/>
      <Hero/>
      <FeatureSevice/>
      <Category/>
      <Testimonials/>
      <Benefits/>
      <TrustBadges/>
      <ContactUs/>
      <Endorsements/>
      <FAQ/>
      <Footer/>
    </>
  )
}

export default App
