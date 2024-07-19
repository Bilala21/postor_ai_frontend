import React, { useState } from 'react'
import "../styles/pages.style.css"
import { Link, useNavigate } from 'react-router-dom';
import headerLogo from "../assets/images/nav-logo.png"
import { useDispatch } from 'react-redux';
import { forgotPasswerd } from '../apis/auth';
import { toast } from 'react-toastify';
import FormTemplate from '../components/form-template';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmit, setSubmit] = useState(false);
    const onSubmit = async (data) => {
        setSubmit(true)
        const response = await dispatch(forgotPasswerd({ body: data }));
        if (!response?.payload?.success) {
            toast.error(response?.payload?.message)
            setSubmit(false)
        }
        else {
            toast.success(response?.payload?.message)
            navigate('/newPassword')
        }
    };

    const formFields = [
        {
            type: "email",
            label: "Email",
            placeholder: "abcd@gmail.com",
            name: "email",
            validation: {
                required: 'Email is required',
                pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Enter a valid email address',
                },
            },
        }
    ];

    return (
        <div className='px-5 form-wrapper'>
            <Link to='/' className='form-page-header px-5 pt-4'>
                <img src={headerLogo} alt={headerLogo} width={200} />
            </Link>

            <div className='forgot-form position-relative m-auto d-flex justify-content-center align-items-center flex-column'>
                <FormTemplate isSubmit={isSubmit} subHeading="Enter you Email to reset your password" onSubmit={onSubmit} formFields={formFields} formTitle="Forgot Password" btnText="Get Email" socialText="Sign In With Google" />
            </div>
        </div>
    )
}

export default Login