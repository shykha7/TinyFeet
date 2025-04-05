import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import FeaturedProducts from '../Components/FeaturedProducts'
import Category from '../Components/Category'
import Footer from '../Components/Footer'


function Home(){

    return(
      <>
    <Navbar/>
    <Hero/>
    <FeaturedProducts/>
    <Category/>
    <Footer/>
   
  </>
    
    )
} 
export default Home