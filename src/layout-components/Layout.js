import React from 'react'
import Sidebar from './Sidebar'
import "../styles/layoutComponent.style.css"

const Layout = ({children}) => {
    return (
        <>
            <div className='d-flex' style={{ height: "100vh", overflow: "hidden" }}>
                <Sidebar />
                <div className='child_section'>{children}</div>
            </div>
        </>
    )
}

export default Layout