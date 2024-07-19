import React from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import formBg from "../assets/images/form-rebin.png"
import Spinner from 'react-bootstrap/Spinner';

const FormTemplate = ({ isSubmit, formFields, formTitle, btnText, socialText, onSubmit, google = null, isLogin = false, subHeading = null }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <>
            <img src={formBg} alt={formBg} className='formbg position-absolute top-0 start-0 end-0 bottom-0 h-100 w-100' />

            <div className='position-relative form-content w-100 text-black-500 form-content mx-auto w-100 text-black-500'>
                <h2 className='text-center'>{formTitle}</h2>
                {
                    subHeading ? <p className='text-center fs-14'>{subHeading}</p> : null
                }
                {
                    google ?
                        <>
                            <button className='google-btn d-flex align-items-center justify-content-center px-3 border mx-auto'>
                                <img src={google} alt={google} width={20} height={20} />
                                <span>{socialText}</span>
                            </button>
                            <p className='fs-14 pt-3 text-center'>OR</p>
                        </>
                        : null
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    {formFields.map((field, index) => (
                        <div className={index === (formFields?.length - 1) ? null : "mb-3"} key={index}>
                            <label htmlFor={field.name} className="form-label">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                                id={field.name}
                                placeholder={field.placeholder}
                                {...register(field.name, field.validation)}
                            />
                            {errors[field.name] && (
                                <div className="invalid-feedback">{errors[field.name].message}</div>
                            )}
                        </div>
                    ))}
                    {
                        isLogin ?
                            <div className='d-flex align-items-center justify-content-between mt-3'>
                                <div className='d-flex align-items-center'>
                                    <input type="checkbox" className='checkboxin' />
                                    <label check className='ms-1 fs-14'>
                                        Remember me
                                    </label>
                                </div>
                                <Link to='/forgotPassword' className='link_class links fs-14 text-purple-500'>Forgot Password?</Link>
                            </div>
                            : null
                    }
                    <button type="submit" className="btn btn-primary w-100 mt-4 d-flex justify-content-center align-items-center">
                        {isSubmit ? <Spinner animation="border" /> : btnText}
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormTemplate;
