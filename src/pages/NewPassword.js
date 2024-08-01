import React, { useState } from 'react'
import "../styles/pages.style.css"
import { Link, useNavigate } from 'react-router-dom';
import headerLogo from "../assets/images/nav-logo.png"
import { useDispatch } from 'react-redux';
import { resetPassword } from '../apis/auth';
import { toast } from 'react-toastify';
import FormTemplate from '../components/form-template';
import { useForm } from 'react-hook-form';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmit, setSubmit] = useState(false);
    const {
        watch,
        errors
    } = useForm();
    const password = watch("password");
    const onSubmit = async (data) => {
        setSubmit(true)
        data.email = "ahmedhuzaifanaseer@gmail.com"
        const response = await dispatch(resetPassword(data));
        if (!response?.payload.success) {
            setSubmit(false)
            toast.error(response?.payload?.message)
        }
        else {
            toast.success(response?.payload?.message)
            setSubmit(false)
        }
    };

    const formFields = [
        {
            type: "password",
            label: "New Password",
            placeholder: "********",
            name: "password",
            validation: {
                required: 'Password is required',
                minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                },
            },
        },
        {
            type: "password",
            label: "Confirm Password",
            placeholder: "********",
            name: "confirmPassword",
            validation: {
                required: 'Confirm Password is required',

                validate: value => {
                    console.log(value, errors)
                    // value === password || "Passwords do not match"
                }
            },
        },
    ];

    return (
        <div className='w-100 mw-100 px-5 pt-4 form-wrapper'>
            <Link to='/'>
                <img src={headerLogo} alt={headerLogo} width={200} />
            </Link>

            <div className='update-password position-relative m-auto d-flex justify-content-center align-items-center flex-column'>
                <FormTemplate isSubmit={isSubmit} onSubmit={onSubmit} formFields={formFields} formTitle="Create New Password" btnText="Confirm Password" subHeading="Enter your new password" />
            </div>
        </div>
    )
}

export default Login