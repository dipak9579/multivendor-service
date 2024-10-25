import React from 'react'
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
                <div className='category'>
                    <img src={beauty} alt="" />
                    <span>Beauty</span>
                </div>
                <div className='category'>
                    <img src={homeDecor} alt="" />
                    <span>Home Decoration</span>
                </div>
                <div className='category'>
                    <img src={estateAgent} alt="" />
                    <span>Real State Agent</span>
                </div>
            </div>
        </>
    )
}

export default Category
