import React from 'react'
import { Button } from 'reactstrap'
import "../../styles/component.style.css"

const DarkBtn = (props) => {
    return (
        <>
            <Button className='dark_btn' onClick={props.onClick}>
                {props.value}
            </Button>
        </>
    )
}

export default DarkBtn