import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import "../styles/layoutComponent.style.css"
import cardOne from "../assets/icons/card-1-icon.png"
import cardTwo from "../assets/icons/card-2-icon.png"
import cardThree from "../assets/icons/card-3-icon.png"
import cardFour from "../assets/icons/card-4-icon.png"
import cardFive from "../assets/icons/card-5-icon.png"
import cardSix from "../assets/icons/card-6-icon.png"


const Features = ({theme }) => {
    const cardData = [
        {
            cardImg: cardOne,
            title: "Scheduling",
            desc: (
                <>
                    Get ahead of your competitors by planning and scheduling your content in advance!
                </>
            )
        },
        {
            cardImg: cardTwo,
            title: "Cross posting",
            desc: (
                <>
                    Press “POST” once, and have it published on multiple platforms all in once.
                </>
            )
        },
        {
            cardImg: cardThree,
            title: "Collaboration",
            desc: (
                <>
                    Work together with your team and invite your clients to follow along. Use Postor's approval workflow to save more time and get more wins!
                </>
            )
        },
        {
            cardImg: cardFour,
            title: "Postor AI ",
            desc: (
                <>
                    A custom made AI chat bot that can generate the right hashtags  write and edit video scripts that goes viral!
                </>
            )
        },
        {
            cardImg: cardFive,
            title: "Analytics",
            desc: (
                <>
                    Discover in-depth analytics to boost your growth and receive personalized tips from our AI based on your account insights.
                </>
            )
        },
        {
            cardImg: cardSix,
            title: "White Label",
            desc: (
                <>
                    Personalize the platform with your branding, including your name, logo, colors, and additional features.
                </>
            )
        }
    ]
    return (
        <>
            <div className={`overflow-x-hidden p-5 ${theme === "dark" ? "dark_features_bg" : "features_bg"}`}>
                <div className='text-center'>

                    <p className='fs-2 fw-semibold mt-5'>Features</p>
                    <div className='d-flex justify-content-center '>
                        <hr className='line_break' />
                    </div>

                    <p className='fs-1 fw-bolder'>
                        Content Mastery, Translated: Automate, <br />
                        Schedule, Connect!
                    </p>
                </div>
                <div className='star_bg p-md-4'>

                    <Row className='p-5'>
                        {cardData.map((dt) => {
                            return (
                                <>
                                    <Col lg={4} md={6} sm={12} className="d-flex justify-content-center p-3 ">

                                        <Card className={`mb-4 w-100 h-auto border-0 shadow ${theme === "dark" ? "dark_card_wrapper" : "card_wrapper"}`}>
                                            <div className={theme === "dark"?'dark_icon_wrapper': "icon_wrapper"}>
                                                <img src={dt.cardImg} alt="" className='h-50 w-50' />
                                            </div>
                                            <div className='mt-3'>
                                                <h5 className='heading_feature'>{dt.title}</h5>
                                            </div>
                                            <div className='mt-3 desc_style'>
                                                <p className={theme === "dark"?'dark_desc_text': "desc_text"}>{dt.desc}</p>
                                            </div>
                                        </Card>
                                    </Col>
                                </>
                            )
                        })}

                    </Row>
                </div>
            </div>
        </>
    )
}

export default Features