import React, { useState } from 'react'
import { Button, Card, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import logo from "../assets/images/logo.png"
import accounts from "../assets/images/accounts.png"
import "../styles/pages.style.css";
import fb from "../assets/icons/facebook.png"
import insta from "../assets/icons/insta.png"
import twt from "../assets/icons/twitter.png"
import you from "../assets/icons/youtube.png"
import linked from "../assets/icons/linkedIn.png"
import ref from "../assets/icons/reff.png"


const Accounts = (args) => {

  const clientId = '1002434787614566'
  const redirectUri = "https://www.google.com/"
  const scope = "user_profile,user_media"
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const redirectToInstagramLogin = () => {
    window.location.href = authUrl;
    console.log("authUrl", authUrl)
  }
  return (
    <>
      <div className='p-5'>
        <div className='mt-1'>
          <img src={logo} alt="#" className='main_logo' />
        </div>

        <div>
          <Row>
            <Col md={6}>
              <div className='mt-5'>
                <h2>Everything you <br /> need to grow on <br /> social.</h2>
                <div className='d-flex justify-content-center'>
                  <img src={accounts} alt="#" className='accounts_side_img' />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <Card className='border-0 shadow acc_card'>
                  <div className='p-5'>
                    <h3 className='mt-5'>Link Social Media</h3>
                    <p>Add your social media account</p>

                    <div>
                      <Button className='fs-5 add_account_btn mt-5' onClick={toggle}>+ <br /> <span>Add account</span> </Button>
                    </div>

                    <div className='mt-5'>
                      <Button className='done_btn'>Done</Button>
                    </div>
                  </div>
                </Card>

                <Modal isOpen={modal} toggle={toggle} {...args} centered="true">
                  <div className='p-4'>
                    
                      <Button className='d-flex justify-content-center align-items-center bg-white text-black border-0 mb-2' onClick={redirectToInstagramLogin}>
                        <img src={insta} alt="" style={{ height: "32px", width: "32px" }} />
                        <p className='fs-5 ms-2 mt-3'>Instagram</p>
                      </Button>

                      <Button className='d-flex justify-content-center align-items-center bg-white text-black border-0 mb-2'>
                        <img src={twt} alt="" style={{ height: "32px", width: "32px" }} />
                        <p className='fs-5 ms-2 mt-3'>X</p>
                      </Button>

                      <Button className='d-flex justify-content-center align-items-center bg-white text-black border-0 mb-2'>
                        <img src={you} alt="" style={{ height: "32px", width: "32px" }} />
                        <p className='fs-5 ms-2 mt-3'>YouTube</p>
                      </Button>

                      <Button className='d-flex justify-content-center align-items-center bg-white text-black border-0 mb-2'>
                        <img src={linked} alt="" style={{ height: "32px", width: "32px" }} />
                        <p className='fs-5 ms-2 mt-3'>LinkedIn</p>
                      </Button>
                    
                  </div>
                  {/* <Row className='p-5'>
                    <Col md={6} className="d-flex justify-content-center">
                      <FormGroup check>
                        <div>
                          <Input
                            id="facebook"
                            name="facebook"
                            type="checkbox"
                          />
                          <Label
                            check
                            for="facebook"
                          >
                            Facebook
                          </Label>
                        </div>

                        <div>
                          <Input
                            id="instagram"
                            name="check"
                            type="checkbox"
                            onClick={redirectToInstagramLogin}
                          />
                          <Label
                            check
                            for="instagram"
                          >
                            Instagram
                          </Label>
                        </div>

                        <div>
                          <Input
                            id="x"
                            name="check"
                            type="checkbox"
                          />
                          <Label
                            check
                            for="x"
                          >
                            x
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
                          />
                          <Label
                            check
                            for="YouTube"
                          >
                            YouTube
                          </Label>
                        </div>

                        <div>
                          <Input
                            id="LinkdIn"
                            name="check"
                            type="checkbox"
                          />
                          <Label
                            check
                            for="LinkdIn"
                          >
                            LinkdIn
                          </Label>
                        </div>

                        <div>
                          <Input
                            id="Referral"
                            name="check"
                            type="checkbox"
                          />
                          <Label
                            check
                            for="Referral"
                          >
                            Referral
                          </Label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row> */}
                </Modal>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Accounts