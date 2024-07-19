import React from 'react'
// import logo from "../assets/icons/logo.png"
import "../styles/layoutComponent.style.css"
const LogoComponent = () => {
    return (
        <>
            <div className='logo_wrapper'>
                <div>
                    {/* <img src={logo} alt="" className='logo' /> */}
                </div>
                <div>
                    <p className='logo_text'>Unes Ai</p>
                </div>
            </div>
        </>
    )
}

export default LogoComponent