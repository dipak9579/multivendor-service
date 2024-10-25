import React from 'react'
import './FeatureService.css'
import Ac_Image from '../../assets/Ac_Image.jpg'
import ac_repair from '../../assets/ac_repair.png'

import estate_agent from '../../assets/estate-agent.png'
import agent from '../../assets/agent.jpg'

import home_decor from '../../assets/Home_decor.jpg'
import house_decoration from '../../assets/house-decoration.png'

const FeatureService = () => {
  return (
    <>
    <div className='title'>
        <h2>Featured Services</h2>
    </div>
    <div className="programs">
      <div className="program">
        <img src={Ac_Image} alt="" />
        <div className="caption">
            <img src={ac_repair} alt="" />
            <p>Ac Repairing</p>
        </div>
      </div>
      <div className="program">
        <img src={agent} alt="" />
        <div className="caption">
            <img src={estate_agent} alt="" />
            <p>Real State Agent</p>
        </div>
      </div>
      <div className="program">
        <img src={home_decor} alt="" />
        <div className="caption">
            <img src={house_decoration} alt="" />
            <p>Home Decoration</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default FeatureService
