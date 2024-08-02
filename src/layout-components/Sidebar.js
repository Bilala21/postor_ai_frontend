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

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser({ navigation: navigate }));
    };

    return (
        <div className='sidebar_wrapper'>
            <div className="sidebar_logo">
                <img src={logo} alt="Logo" className='logo_style' />
            </div>

            <div className="navigate_links">
                {[
                    { to: "/home", icon: BiHomeAlt, label: "Home" },
                    { to: "/compose", icon: PiNotePencilBold, label: "Compose" },
                    { to: "/analytics", icon: MdInsertChartOutlined, label: "Analytics" },
                    { to: "/inbox", icon: TbInbox, label: "Inbox" },
                    { to: "/automation", icon: BsStars, label: "Automation" },
                    { to: "/chat", icon: PiChatCircleTextBold, label: "Chat" },
                    { to: "/mediaLibrary", icon: PiVideoBold, label: "Media Library" },
                    { to: "/schedule", icon: BiCalendar, label: "Schedule" },
                    { to: "/settings", icon: LuSettings, label: "Settings" },
                ].map(({ to, icon: Icon, label }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => `link_items ${isActive ? 'active' : ''}`}>
                        <div className='nav_items'>
                            <Icon className='fs-3 sidebar_icon' />
                            <p >{label}</p>
                        </div>
                    </NavLink>
                ))}

                <NavLink to="/logout" onClick={handleLogout} className="link_items">
                    <div className='nav_items'>
                        <BiLogOut className='fs-3 sidebar_icon' />
                        <p>Log Out</p>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
