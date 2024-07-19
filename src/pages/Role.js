import React from 'react'
import { Card, Col, Row } from 'reactstrap'
import personal from "../assets/images/personal.png"
import student from "../assets/images/student.png"
import employ from "../assets/images/employ.png"
import creater from "../assets/images/creater.png"
import large from "../assets/images/large.png"
import small from "../assets/images/business.png"


const Role = () => {
  return (
    <div className='p-5'>
      <div className='text-center'>
        <p className='role_heading text-black'>Welcome To <span>Postor Ai</span></p>
        <p className='role_sub'>Let's get you set up!</p>
      </div>

      <div className='ms-5 me-5 p-5'>
        <p className='txt_des'>What would you like to be called?</p>
        <Card className='border-0 shadow'>
          <Row className='mt-5'>
            <Col md={4} className="d-flex justify-content-center">
              <div className='card_wrapper'>
                <img src={personal} alt="" />
                <p className='mt-4 card_text'>Personal</p>
              </div>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <div className='card_wrapper'>
                <img src={student} alt="" />
                <p className='mt-4 card_text'>Student</p>

              </div>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <div className='card_wrapper'>
                <img src={employ} alt="" />
                <p className='mt-4 card_text'>Employ</p>

              </div>
            </Col>
          </Row>

          <Row className='mt-5 mb-5'>
            <Col md={4} className="d-flex justify-content-center">
              <div className='card_wrapper'>
                <img src={creater} alt="" />
                <p className='mt-4 card_text'>Content Creater</p>

              </div>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <div className='card_wrapper'>
                <img src={large} alt="" />
                <p className='mt-4 card_text'>Large Business</p>

              </div>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <div className='card_wrapper'>
                <img src={small} alt="" />
                <p className='mt-4 card_text'>Small Business</p>

              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}

export default Role