import React from 'react'
import { Button } from 'reactstrap'
import "../../styles/component.style.css"
import google from "../../assets/icons/google.png"

const BtnLg = (props) => {
  return (
    <>
        <Button className='btn_lg'>
            <span><img src={google} alt="" className='btn_icon me-2' /></span>
            {props.value}
        </Button>
    </>
  )
}

export default BtnLg