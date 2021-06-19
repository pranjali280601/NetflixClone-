import React, { useEffect, useState } from 'react';
import './Banner.css'


const Banner=()=>{

    return (
        <header className = "banner" style = {{
            backgroundSize: "cover",
            backgroundImage: `url("https://i.pinimg.com/originals/ea/ba/51/eaba518f0dfd20c93d193a6b8bc19422.png")`,
            backgroundPosition: "center center"
        }}>
            <div className = "banner-contents">
                <h1 className = "banner-title">Movie Name</h1>
                <div className = "banner-btns">
                    <button className = "banner-btn">Play</button>
                    <button className = "banner-btn">My List</button>
                </div>
                <h1 className = "banner-des">Description</h1>
            </div>
            <div className = "banner-fade-btn" />

        </header>
    )
}

export default Banner