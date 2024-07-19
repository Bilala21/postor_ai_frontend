import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "../styles/layoutComponent.style.css";
import logo from "../assets/images/logo.png";
import { PiNotePencilBold, PiChatCircleTextBold, PiVideoBold } from "react-icons/pi";
import { MdInsertChartOutlined } from "react-icons/md";
import { TbInbox } from "react-icons/tb";
import { BiCalendar, BiLogOut, BiHomeAlt } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { logoutUser } from "../apis/auth"
import { useDispatch } from 'react-redux';

const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = (e) =>{
        e.preventDefault();
        dispatch(logoutUser({ navigation: navigate }));
    }
    return (
        <div className='sidebar_wrapper'>
            <div className="sidebar_logo">
                <img src={logo} alt="Logo" className='logo_style' />
            </div>

            <div className="navigate_links">
                <NavLink to="/home" className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <BiHomeAlt className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Home</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/compose" className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <PiNotePencilBold className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Compose</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/analytics" className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <MdInsertChartOutlined className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Analytics</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/inbox" className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <TbInbox className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Inbox</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/automation" className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <BsStars className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Automation</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/chat" className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <PiChatCircleTextBold className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Chat</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/mediaLibrary" className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <PiVideoBold className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Media Library</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/schedule" className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <BiCalendar className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Schedule</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/settings" className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <LuSettings className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Settings</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/logout" onClick={handleLogout} className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                    <div className='nav_items'>
                        <div className='mb-2 ms-3'>
                            <BiLogOut className='fs-3 sidebar_icon' />
                        </div>
                        <div className='mt-2 ms-3'>
                            <p>Log Out</p>
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
