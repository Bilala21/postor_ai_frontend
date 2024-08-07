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
import { Add } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

const Accounts = (args) => {

  const clientId = '1002434787614566'
  const redirectUri = "https://www.google.com/"
  const scope = "user_profile,user_media"
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const redirectToInstagramLogin = (response) => {
    window.location.href = authUrl;
    console.log("authUrl", authUrl)
  }
  const responseMessage = (response) => {
    console.log("Google Login response:", response)
  }
  const errorMessage = () => {
    console.log("Google Login Error:")
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
                    <h3 className='mt-5'>Connect with Postor.AI</h3>
                    <Typography>Add your social media accounts</Typography>

                    <div>
                      <Button className='fs-5 add_account_btn mt-5' onClick={toggle}><Add /> <span>Add account</span> </Button>
                    </div>

                    <div className='mt-5'>
                      <Button className='done_btn'>Done</Button>
                    </div>
                  </div>
                </Card>

                <Modal isOpen={modal} toggle={toggle} {...args} centered="true">
                  <div style={{ padding: 20 }}>
                    <Typography variant='h6' textAlign={'center'} fontWeight={"600"}>Connect your social media accounts to unlock exclusive Postor.ai features</Typography>

                    <div style={styles.rowView}>
                      <div style={styles.subRowView}>
                        <img src={fb} alt="" style={styles.icon} />
                        <Typography>Facebook</Typography>
                      </div>
                      {/* Add Login Button here */}
                    </div>

                    <div style={styles.rowView} onClick={redirectToInstagramLogin}>
                      <div style={styles.subRowView}>
                        <img src={insta} alt="" style={styles.icon} />
                        <Typography>Instagram</Typography>
                      </div>
                      {/* Add Login Button here */}

                    </div>


                    <div style={styles.rowView}>
                      <div style={styles.subRowView}>
                        <img src={twt} alt="" style={styles.icon} />
                        <Typography>X,formally Twitter</Typography>
                      </div>
                      {/* Add Login Button here */}
                    </div>

                    <div style={styles.rowView}>
                      <div style={styles.subRowView}>
                        <img src={you} alt="" style={styles.icon} />
                        <Typography>YouTube</Typography>
                      </div>
                      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                    </div>

                    <div style={styles.rowView}>
                      <div style={styles.subRowView}>
                        <img src={linked} alt="" style={styles.icon} />
                        <Typography>LinkedIn</Typography>
                      </div>
                      {/* Add Login Button here */}
                    </div>

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

const styles = {
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  icon: { height: "32px", width: "32px" },
  subRowView:
    { flexDirection: 'row', alignItems: 'center', display: 'flex', gap: 10 }
}