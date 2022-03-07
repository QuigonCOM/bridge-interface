import React from 'react'
import image from "../../assets/img/slider/slider_1.png"

export default function BackGround() {
            
  const bgStyle = {
    backgroundColor: `#E5E5E5;`,
    backgroundImage: `url(${image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
}
  return (
    <div style={bgStyle} className='multi-background'>
      <div className='multi-background__color'></div>
    </div>
  )
}
