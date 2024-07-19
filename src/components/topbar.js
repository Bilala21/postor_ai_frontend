import React from 'react'
import { Input } from 'reactstrap'
import "../styles/component.style.css"
import { TbInbox } from "react-icons/tb";
import profile from "../assets/icons/profile.png"
import { IoMdNotificationsOutline } from "react-icons/io";

const Topbar = () => {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <Input type="text" placeholder='search' className='bg_search' />
                <div className='topbar_icons'>
                    <TbInbox className='fs-3' />
                </div>
                <div className='topbar_icons'>
                    <IoMdNotificationsOutline className='fs-3' />
                </div>

                <div className='d-flex'>
                    <div className='topbar_icons'>
                        <img src={profile} alt="" />
                    </div>

                        <select name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                </div>
            </div>
        </>
    )
}

export default Topbar