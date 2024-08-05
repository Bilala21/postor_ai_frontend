import React from 'react'
import { Button, Card, Input } from 'reactstrap'
import logo from "../assets/images/logo.png"
import arrow from "../assets/icons/arrow.png"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Verify = () => {
    const { registeredUser } = useSelector((state) => state.authorization);
    return (
        <>
            <div className='p-5'>
                <div className='d-flex justify-content-center'>
                    <img src={logo} alt="" className='main_logo' />
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <Card className='border-0 shadow mt-5 card_content'>
                        <div className='mt-5 mb-5'>
                            <div className='text-center'>
                                <h4>Verify Your Email</h4>
                            </div>
                            <div className='text-center'>
                                <p>Please enter the 6 digit code sent to your <br /> email {registeredUser?.email}, to continue</p>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <Input type='text' className='verify_field' />
                                <Input type='text' className='verify_field ms-1' />
                                <Input type='text' className='verify_field ms-1' />
                                <Input type='text' className='verify_field ms-1' />
                                <Input type='text' className='verify_field ms-1' />
                                <Input type='text' className='verify_field ms-1' />
                            </div>

                            <div className='d-flex justify-content-center mt-3'>
                                <Link to="/newPassword" className='link_class'> <Button className='confirm_btn'>Confirm <span className='ms-2'><img src={arrow} alt="" className='arrow_icon' /></span></Button> </Link>
                            </div>
                            <div className='d-flex justify-content-center mt-3'>
                                <Link to="/login" className='link_class'> <Button className='confirm_btn'>Skip <span className='ms-2'></span></Button> </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Verify