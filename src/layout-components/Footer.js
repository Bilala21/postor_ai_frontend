import React from 'react'
import { Col, Row } from 'reactstrap'
import logo from "../assets/images/LogoWhite.svg"
import { PiLinkedinLogoBold, PiInstagramLogoBold, PiTiktokLogoBold, PiYoutubeLogoBold } from "react-icons/pi";
import { RiTwitterXLine } from "react-icons/ri";


const Footer = () => {
    return (
        <>
            <div className='p-5 footer_bg text-white mt-5'>
                {/* <Row>
                    <Col lg={5} md={6} sm={12}>
                        <img src={logo} alt="" />
                        <p className='mt-3'>Unleash the hidden genius in <br /> your workflow</p>                        
                    </Col>
                    <Col lg={2} md={12} sm={12}>
                        <div>
                            <h5>Product</h5>
                            <p>Scheduling</p>
                            <p>Analytics</p>
                            <p>Unes Ai</p>
                            <p>Inbox</p>
                            <p>White Label</p>
                        </div>
                    </Col>
                    <Col lg={2} md={12} sm={12}>
                        <div>
                            <h5>Company</h5>
                            <p>Privacy</p>
                            <p>Terms</p>
                            <p>Contact</p>
                            
                        </div>
                    </Col>
                    <Col lg={3} md={12} sm={12}>
                        <div>
                            <h5>Compare</h5>
                            <p>Hootsuite alternative</p>
                            <p>Buffer Alternative</p>
                            <p>Agorapulse Alternative</p>
                            <p>Sprout Social Alternative</p>
                        </div>
                    </Col>

                </Row> */}
                <div className='p-5'>
                    <div className='d-flex flex-column'>
                        <div>
                            <div className='img-fluid d-flex justify-content-center'>
                                <img src={logo} alt="" className='footer_logo' />
                            </div>
                            <div className='text-center'>
                                <p className='mt-3 footer_desc'>Take your social media <br /> management to the next level!</p>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <div>
                            <a href="https://www.linkedin.com/company/postor/?viewAsMember=true " target="_blank" rel="noopener noreferrer" className='link_footer'>
                                <PiLinkedinLogoBold className='fs-1' />
                            </a>
                        </div>
                        <div>
                            <a href="https://www.instagram.com/postorai/" target="_blank" rel="noopener noreferrer" className='link_footer'>
                                <PiInstagramLogoBold className='fs-1' />
                            </a>
                        </div>
                        <div>
                            <a href="https://www.tiktok.com/@postorai" target="_blank" rel="noopener noreferrer" className='link_footer'>
                                <PiTiktokLogoBold className='fs-1' />
                            </a>
                        </div>
                        <div>
                            <a href="https://x.com/postorai" target="_blank" rel="noopener noreferrer" className='link_footer'>
                                <RiTwitterXLine className='fs-1' />
                            </a>
                        </div>
                        <div>
                            <a href="https://www.youtube.com/@Postorai?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className='link_footer'>
                                <PiYoutubeLogoBold className='fs-1' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer