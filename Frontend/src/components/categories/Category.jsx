import React from 'react'
import { Link } from 'react-router-dom';
import "./Category.css"
import beauty from "../../assets/beauty.svg"
import homeDecor from "../../assets/homedecor.svg"
import estateAgent from "../../assets/estate-agent.svg"

const Category = () => {
    return (
        <>
            <div className='title'>
                <h2>Categories</h2>
            </div>
            <div className='category-box'>
                <Link to="beauty-service">
                <div className='category'>
                    <img src={beauty} alt="" />
                    <span>Beauty</span>
                </div>
                </Link>
              
                <Link to="home-service">
                <div className='category'>
                    <img src={homeDecor} alt="" />
                    <span>Home Decoration</span>
                </div>
                </Link>
              <Link to="realState-service">
              <div className='category'>
                    <img src={estateAgent} alt="" />
                    <span>Real State Agent</span>
                </div>
              </Link>
             
            </div>
        </>
    )
}

export default Category
