import React, { useState } from 'react'
import google from "../assets/icons/google.png"
import "../styles/pages.style.css"
import { Link, useNavigate } from 'react-router-dom';
import headerLogo from "../assets/images/nav-logo.png"
import { useDispatch } from 'react-redux';
import { loginUser } from '../apis/auth';
import { toast } from 'react-toastify';
import FormTemplate from '../components/form-template';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    setSubmit(true)
    const response = await dispatch(loginUser({ body: data, navigation: navigate }));
    // console.log(response)
    if (!response?.payload.success) {
      setSubmit(false)
      setError(response?.payload)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
    else {
      navigate("/home")
    }
  };

  const formFields = [
    {
      type: "email",
      label: "Email",
      placeholder: "Email or phone",
      name: "email",
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: 'Enter a valid email address',
        },
      },
    },
    {
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      name: "password",
      validation: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters long',
        },
      },
    },
  ];

  return (
    <div className='px-5 form-wrapper'>
      <Link to='/' className='form-page-header px-5 pt-4'>
        <img src={headerLogo} alt={headerLogo} width={200} />
      </Link>

      <div className='login-form position-relative m-auto d-flex justify-content-center align-items-center flex-column'>
        {
          error?.success == null ? null : <p className=' position-absolute error-message top-0 bg-danger py-2 text-center text-white'>{error?.message}</p>
        }
        <FormTemplate isSubmit={isSubmit} onSubmit={onSubmit} formFields={formFields} formTitle="Let’s Sign You In" btnText="Sign In" google={google} socialText="Sign In With Google" isLogin={true} />
        <Link to='/register' className='forgot-password w-100 text-left pt-2 d-block fs-14 text-decoration-none text-black-500 position-relative'>
          No Account Yet? <span className='text-purple-500'>Sign up</span></Link>
      </div>
    </div>
  )
}

export default Login