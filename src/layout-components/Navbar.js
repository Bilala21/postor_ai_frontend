import React from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import logo from "../assets/images/nav-logo.png"
import "../styles/layoutComponent.style.css"
import arrow from "../assets/icons/arrow.png"
import { Link, NavLink } from 'react-router-dom'
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";

const Navbar = ({ toggleTheme, theme }) => {
    return (
        <>
            <nav class="navbar navbar-expand-md ms-md-5 me-md-5 ms-sm-0">
                <div class="container-fluid">

                    <a class="navbar-brand" href="#">
                        <img src={logo} alt='' className='logo_style' />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className='navbar_wrapper'>
                            <ul className='navbar-nav mt-1 ms-5'>
                                <li className="nav-item nav_elements ms-lg-5 ms-md-0">Features</li>
                                <li className="nav-item nav_elements ms-lg-5">Socials</li>
                                <li className="nav-item nav_elements ms-lg-5">Resources</li>
                                <li className="nav-item nav_elements ms-lg-5">Pricing</li>
                                <li className="nav-item nav_elements ms-lg-5">Contact</li>
                            </ul>


                        </div>

                        <div className='nav_btns_wrapper mt-1 me-lg-5'>
                            <div className='me-lg-5 mt-3'>
                                <Link to="/login" className="link_class"><p className={`nav-item nav_elements ms-lg-5 ${theme === "dark" ? "text-white" : "text-black"}`}>Login</p></Link>
                            </div>
                            <div className='mt-2'>
                                <a href="#started"><Button className='nav_btn'>Get Started <span className='ms-2'><img src={arrow} alt="" className='arrow_btn' /></span></Button></a>
                            </div>

                            <div className='d-flex justify-content-center align-items-center ms-5'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    {/* <div>
                                        <p className='mt-2 me-3'>{theme}</p>
                                    </div> */}
                                    <Form>
                                        <FormGroup switch>
                                            <div className='d-flex justify-content-center align-items-center'>

                                                {/* <Input type="switch" role="switch" onClick={toggleTheme} checked={theme === 'dark'} /> */}
                                                <div className='mt-2'>
                                                    <input type="checkbox" className="checkbox" id="checkbox" onClick={toggleTheme} checked={theme === 'dark'} />
                                                    <label for="checkbox" className="label">
                                                        <IoMoonSharp className='moon' />
                                                        <IoSunnySharp className='sun' />
                                                        <div class='ball' />
                                                    </label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>

        </>
    )
}

export default Navbar