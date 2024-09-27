import React from 'react'
import RoundICard from '../../components/roundimgcard/RoundICard'
import './style.css'

export default function SalonService() {
  return (
    <div className="container-fluid p-0">
      <img
        src='Services1.png'
        alt="carsoulimg"
        className="service img-fluid w-100"
      />
      <div className='caption'>
        <RoundICard
          title="WE OFFERS"
          description="Hey Saraa,dedicated to helping you achieve your best look. Share your desires with us, and we will make them a reality.  "
        />
      </div>
    </div>
  )
}
