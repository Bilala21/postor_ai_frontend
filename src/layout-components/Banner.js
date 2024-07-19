import React from 'react'
import { Col, Container, Input, Row } from 'reactstrap'
import Navbar from './Navbar'
import banner from "../assets/images/banner.png"
import banner_image from "../assets/images/banner_image.png"
import mail from "../assets/icons/mail.png"
import insta from "../assets/icons/insta.png"
import twitter from "../assets/icons/twitter.png"
import tiktok from "../assets/icons/tiktok.png"
import facebook from "../assets/icons/facebook.png"
import youtube from "../assets/icons/youtube.png"


const Banner = ({ toggleTheme, theme }) => {
    console.log('theme' , theme)
    return (
        <>
            <div className={theme === "dark" ? "dark_banner_bg" : "banner_bg"}>
                <Navbar toggleTheme={toggleTheme} theme={theme} />

                <div className=' ms-4 me-4'>
                    <Row>
                        <Col md={6}>
                            <div className='mt-5 p-lg-5 '>
                                {/* <p className='text_purple fs-4'>Poster AI</p> */}
                                <p className='text-uppercase banner_heading'>
                                    {/* Social media made <span className='banner_heading_1'>simple</span> */}
                                </p>
                                {/* <p className='text-uppercase fs-2 fw-bold'>in your <span className='text_purple'>Workflow</span></p> */}
                                {/* <p className='banner_desc'>
                                    Create, schedule, publish, and easily manage all of <br /> your social media content <span className='banner_desc_1'>#withPostorai</span>
                                </p> */}


                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='text-center'>
                                {/* <img src={banner} alt="" className='banner_img' /> */}
                            </div>
                        </Col>
                    </Row>

                    <div className='d-flex justify-content-center'>
                        <div className='d-flex flex-column fs-5 fw-bold'>
                            <p className=''>Supported Platforms</p>
                            <hr className='line_break' />
                        </div>
                    </div>

                    <div className='d-flex justify-content-center'>
                        {/* <img src={facebook} alt="#" /> */}
                        <img src={insta} alt="#" className='ms-lg-2' />
                        <img src={tiktok} alt="#" className='ms-lg-2' />
                        <img src={twitter} alt="#" className='ms-lg-2' />
                        <img src={youtube} alt="#" className='ms-lg-2' />
                        {/* <img src={facebook} alt="#" className='ms-lg-2'/>
                        <img src={insta} alt="#" className='ms-lg-2'/>
                        <img src={tiktok} alt="#" className='ms-lg-2'/>
                        <img src={twitter} alt="#" className='ms-lg-2'/>
                        <img src={youtube} alt="#" className='ms-lg-2'/> */}

                    </div>

                    <div className='d-flex justify-content-center mt-5 animate__animated animate__slideInUp'>
                        <img src={banner_image} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner