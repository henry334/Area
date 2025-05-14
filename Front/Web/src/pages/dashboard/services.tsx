import Navbar from '@/components/Navbar'
import SearchBar from '@/components/SearchBar'
import ServicesGrid from '@/components/ServicesGrid'
import React from 'react'

export default function services() {
  return (
    <div className='bg-white h-screen'>
      <Navbar />
      <div className='flex flex-col justify-center items-center mt-32'>
        <ServicesGrid />
      </div>
    </div>
  )
}
