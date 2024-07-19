import React from 'react'
import { Button, Card, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import "../styles/pages.style.css"
import personal from "../assets/images/personal.png"
import student from "../assets/images/student.png"
import employ from "../assets/images/employ.png"
import creater from "../assets/images/creater.png"
import large from "../assets/images/large.png"
import small from "../assets/images/business.png"
import Slider from 'react-slick'
import { useDispatch } from 'react-redux'
import { onboardFacebook } from '../apis/auth'
import fb from "../assets/icons/facebook.png"
import insta from "../assets/icons/insta.png"
import twt from "../assets/icons/twitter.png"
import you from "../assets/icons/youtube.png"
import linked from "../assets/icons/linkedIn.png"
import ref from "../assets/icons/reff.png"







const SocialLinks = () => {
  const dispatch = useDispatch()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  const openFacebook = () => {
    dispatch(onboardFacebook())
  }

  return (
    <>
      <div className='p-5'>
        <div className='text-center'>
          <p className='link_heading'>How did you discover <span className='heading_color'>Postor Ai</span></p>
          <p className='sub_heading_links'>How did you discover</p>
        </div>

        <div className='p-5 ms-lg-5 me-lg-5 d-flex justify-content-center'>
          <Card className='p-5 border-0 shadow w-75'>
            <div className='p-5'>
              <Row>
                <Col md={6} className="d-flex justify-content-center">
                  <FormGroup check>
                    <div>
                      <Input
                        id="facebook"
                        name="facebook"
                        type="checkbox"
                        className='fs-5'
                      // onClick={openFacebook}
                      />
                      <Label
                        check
                        for="facebook"
                        className='d-flex pt-1'
                      >
                        <span className='mt-0 me-2'><img src={fb} alt="" style={{ height: "22px", width: "22px" }} /></span>
                        <p>Facebook</p>
                      </Label>
                    </div>

                    <div>
                      <Input
                        id="instagram"
                        name="check"
                        type="checkbox"
                        className='fs-5'
                      />
                      <Label
                        check
                        for="instagram"
                        className='d-flex pt-1'
                      >
                        <span className='mt-0 me-2'><img src={insta} alt="" style={{ height: "22px", width: "22px" }} /></span>

                        <p> Instagram </p>
                      </Label>
                    </div>

                    <div>
                      <Input
                        id="x"
                        name="check"
                        type="checkbox"
                        className='fs-5'
                      />
                      <Label
                        check
                        for="x"
                        className='d-flex pt-1'

                      >
                        <span className='mt-0 me-2'><img src={twt} alt="" style={{ height: "22px", width: "22px" }} /></span>

                        <p> x</p>
                      </Label>
                    </div>
                  </FormGroup>

                </Col>
                <Col md={6} className="d-flex justify-content-center">
                  <FormGroup check>
                    <div>
                      <Input
                        id="YouTube"
                        name="check"
                        type="checkbox"
                        className='fs-5'
                      // onClick={openFacebook}
                      />
                      <Label
                        check
                        for="YouTube"
                        className='d-flex pt-1'
                      >
                        <span className='mt-0 me-2'><img src={you} alt="" style={{ height: "22px", width: "22px" }} /></span>
                        <p>YouTube</p>
                      </Label>
                    </div>

                    <div>
                      <Input
                        id="LinkedIn"
                        name="check"
                        type="checkbox"
                        className='fs-5'
                      />
                      <Label
                        check
                        for="LinkedIn"
                        className='d-flex pt-1'
                      >
                        <span className='mt-0 me-2'><img src={linked} alt="" style={{ height: "22px", width: "22px" }} /></span>

                        <p> LinkedIn </p>
                      </Label>
                    </div>

                    <div>
                      <Input
                        id="x"
                        name="check"
                        type="checkbox"
                        className='fs-5'
                      />
                      <Label
                        check
                        for="x"
                        className='d-flex pt-1'

                      >
                        <span className='mt-0 me-2'><img src={ref} alt="" style={{ height: "22px", width: "22px" }} /></span>

                        <p> Referral </p>
                      </Label>
                    </div>
                  </FormGroup>

                </Col>
              </Row>
            </div>
          </Card>
        </div>

        <div className='d-flex justify-content-center'>
          <Button className="nxt_btn">Next</Button>
        </div>
      </div>
    </>
  )
}

export default SocialLinks