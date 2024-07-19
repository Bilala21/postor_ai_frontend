import React, { useState } from 'react'
import "../styles/layoutComponent.style.css"
import hrTw from "../assets/icons/tw-hr.png"
import { Button, Col, Input, Row } from 'reactstrap'
import google from "../assets/icons/goog.png"
import mic from "../assets/icons/micro.png"
import amz from "../assets/icons/amz.png"
import base from "../assets/icons/base.png"
import mail from "../assets/icons/mail.png"
import arrow from "../assets/icons/arrow.png"
import axios from 'axios'
import { toast } from 'react-toastify';


const Worldwide = ({ theme }) => {

    const [email, setEmail] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    // const validateEmail = (email) => {
    //     // Simple regex for validating email format
    //     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return re.test(String(email).toLowerCase());
    // };

    // const handleClick = () => {
    //     if (!validateEmail(email)) {
    //         toast.error('Please enter a valid email address');
    //         return;
    //     }

    //     axios.post('http://localhost:4000/api/emails/addEmail', { email })
    //         .then((res) => {
    //             if (res.data.email === "") {
    //                 toast.error("Enter a valid email");
    //             } else {
    //                 toast.success('Email submitted successfully');
    //                 console.log('Response:', res);
    //             }
    //         })
    //         .catch((error) => {
    //             toast.error('There was an error submitting your email');
    //             console.error('There was an error!', error);
    //         });
    // };
    return (
        <>
            {/* <div className='overflow-x-hidden worldwide_bg'>
                <div className="text-center">
                    <p className='fs-2 fw-semibold mt-5 sec_heading'>Trusted WorldWide</p>
                </div>

                <div className='mt-5 mb-5'>
                    <Row>
                        <Col lg={3} md={6} sm={12} className="d-flex justify-content-center">
                            <img src={google} alt="" />
                        </Col>
                        <Col lg={3} md={6} sm={12} className="d-flex justify-content-center">
                            <img src={base} alt="" />
                        </Col>
                        <Col lg={3} md={6} sm={12} className="d-flex justify-content-center">
                            <img src={amz} alt="" />
                        </Col>
                        <Col lg={3} md={6} sm={12} className="d-flex justify-content-center">
                            <img src={mic} alt="" />
                        </Col>
                    </Row>
                </div>
            </div> */}

            <div className={` pt-5 pb-5 mt-5 p-5 ${theme === "dark" ? "dark_world_wide_bg" : "world_wide_bg"}`} id="started">
                {/* <div id="mc_embed_shell">
                    <div className='text-center'>
                        <p className='fs-4 fw-bold heading_title'>Be the first to try it</p>
                    </div>

                    <div className='d-flex justify-content-center mt-5'>
                        <div className="input-group mobile_res">
                            
                            <input type="email" required className="form-control mobile_view" placeholder="Enter your email ..." value={email}
                                onChange={handleChange} />
                            <div className="">
                                <button className="d-flex justify-content-center align-items-center btn_bg p-2 border-0" type="button">
                                    Get started <span className='ms-2'><img src={arrow} alt="" /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}



                <div id="mc_embed_shell">
                    <div className='text-center'>
                        <p className='fs-4 fw-bold heading_title'>Be the first to try it</p>
                    </div>

                    <div className='d-flex justify-content-center mt-5'>
                        <div className="input-group mobile_res">
                            <form
                                action="https://postor.us13.list-manage.com/subscribe/post?u=50a8a8feb526ee6c6eb74e2a7&amp;id=5c7dc87b56&amp;f_id=008502e9f0"
                                method="post"
                                id="mc-embedded-subscribe-form"
                                name="mc-embedded-subscribe-form"
                                className="validate w-100"
                                target="_blank"
                            >
                                <div className='d-flex justify-content-center'>

                                    <input
                                        type="email"
                                        name="EMAIL"
                                        className="required email form-control mobile_view w-100"
                                        id="mce-EMAIL"
                                        placeholder="Enter your email ..."
                                        required
                                        value={email}
                                        onChange={handleChange}
                                    />
                                    <div className="">
                                        <button
                                            className="d-flex justify-content-center align-items-center btn_bg p-2 border-0"
                                            type="submit"
                                            id="mc-embedded-subscribe"
                                        >
                                            Start
                                            <span className='ms-2 d-flex align-items-center'>
                                                <img src={arrow} alt="Arrow" className='arrow_icon' />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div id="mce-responses" className="clear foot">
                                    <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                                    <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                                </div>
                                <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                                    <input
                                        type="text"
                                        name="b_50a8a8feb526ee6c6eb74e2a7_5c7dc87b56"
                                        tabIndex="-1"
                                        value=""
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}

export default Worldwide