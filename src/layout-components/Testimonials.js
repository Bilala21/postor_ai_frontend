import React from 'react'
import Slider from 'react-slick'
import { Card, Col, Row } from 'reactstrap'
import pro1 from "../assets/icons/pro-1.png"
import pro2 from "../assets/icons/pro-2.png"
import pro3 from "../assets/icons/pro-3.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/layoutComponent.style.css"



const Testimonials = () => {

    let settings = {
        dots: true,
        // dotsClass: 'custom-dots',
        Infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: 5000,
        speed: 500,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    }
    let tests = [
        {
            imgs: pro1,
            title: "John Doe",
            subTitle: "Visiting Executive Fellow",
            desc: (
                <>
                    Unes Ai is a great social media tool. I could talk about all the features I love. But, I think it's more important to talk about the team behind it....see more
                </>
            )
        },
        {
            imgs: pro2,
            title: "Jennifer",
            subTitle: "Small Business",
            desc: (
                <>
                    Unes Ai is a great social media tool.It's really refreshing to see and gives me great trust in the product and its direction into the future....see more
                </>
            )
        },
        {
            imgs: pro3,
            title: "John Doe",
            subTitle: "Visiting Executive Fellow",
            desc: (
                <>
                    Unes Ai is a great social media tool. I could talk about all the features I love. But, I think it's more important to talk about the team behind it....see more
                </>
            )
        },
        {
            imgs: pro1,
            title: "John Doe",
            subTitle: "Visiting Executive Fellow",
            desc: (
                <>
                    Unes Ai is a great social media tool. I could talk about all the features I love. But, I think it's more important to talk about the team behind it....see more
                </>
            )
        },
        {
            imgs: pro1,
            title: "John Doe",
            subTitle: "Visiting Executive Fellow",
            desc: (
                <>
                    Unes Ai is a great social media tool. I could talk about all the features I love. But, I think it's more important to talk about the team behind it....see more
                </>
            )
        },
        {
            imgs: pro1,
            title: "John Doe",
            subTitle: "Visiting Executive Fellow",
            desc: (
                <>
                    Unes Ai is a great social media tool. I could talk about all the features I love. But, I think it's more important to talk about the team behind it....see more
                </>
            )
        },

    ]




    return (
        <>
            <div className='overflow-x-hidden bg_white_land'>
                <div className='text-center'>
                    <p className='fs-2 fw-semibold mt-5'>Testimonials</p>

                    <p className='fs-1 fw-bolder'>
                        See what our clients say
                    </p>
                </div>



                <div className="slider-container overflow-hidden pb-5">
                    <Slider {...settings}>
                        {
                            tests.map((item) => (
                                <>
                                    <div className='p-3 mb-5'>
                                        <Card className='border-0 shadow p-5'>
                                            <div className='d-flex'>
                                                <img src={item.imgs} alt="#" />
                                                <div className='mt-2 ms-4'>
                                                    <h2>John Doe</h2>
                                                    <p>Visiting Executive Fellow</p>
                                                </div>
                                            </div>
                                            <div className='mt-3'>
                                                <p>
                                                    Unes Ai is a great social media tool. I could talk about all the features I love. But, I think it's more important to talk about the team behind it....see more
                                                </p>
                                            </div>
                                        </Card>
                                    </div>
                                </>
                            ))
                        }
                    </Slider>
                </div>


            </div>
        </>
    )
}

export default Testimonials