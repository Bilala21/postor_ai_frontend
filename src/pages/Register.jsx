import React, { useState } from "react";
import google from "../assets/icons/google.png";
import "../styles/pages.style.css";
import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../assets/images/nav-logo.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import register from "../assets/images/register.png";
import FormTemplate from "../components/form-template";
import { registerUser } from "../apis/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmit, setSubmit] = useState(false);
  const onSubmit = async (data) => {
    try {
      setSubmit(true);
      const response = await dispatch(registerUser(data));
      if (!response?.payload.success) {
        toast.error(response?.payload.message);
      } else {
        toast.success("user registered successfully");
        navigate("/verify");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setSubmit(false);
    }
  };

  const formFields = [
    {
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
      name: "full_name",
      validation: {
        required: "Name is required",
      },
    },
    {
      type: "email",
      label: "Email",
      placeholder: "Email or phone number",
      name: "email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          message: "Enter a valid email address",
        },
      },
    },
    {
      type: "password",
      label: "Password",
      placeholder: "Password (include letters and numbers)",
      name: "password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters long",
        },
      },
    },
  ];

  return (
    <Container className="w-100 mw-100 px-5 pt-4 form-wrapper">
      <Row>
        <Col md={6}>
          <Link to="/">
            <img src={headerLogo} alt={headerLogo} width={200} />
          </Link>
          <div className="d-flex justify-content-center align-items-center">
            <p className="text-center fs-2 fw-bold mt-lg-5">
              Create, Schedule & Publish
            </p>
          </div>

          <div className="d-flex justify-content-center align-items-center mt-lg-5">
            <img
              src={register}
              alt=""
              style={{ height: "80%", width: "80%", objectFit: "contain" }}
            />
          </div>
        </Col>

        <div className="register-form position-relative ms-auto d-flex justify-content-center align-items-center flex-column">
          <FormTemplate
            isSubmit={isSubmit}
            onSubmit={onSubmit}
            formFields={formFields}
            formTitle="Sign up for PosterAI"
            btnText="Sign Up"
            google={google}
            socialText="Sign up with Google"
          />
          <div className="position-relative form-bottom">
            <Link
              to="/login"
              className="forgot-password w-100 text-left pt-2 d-block fs-14 text-decoration-none text-black-500 "
            >
              Already have an account?{" "}
              <span className="text-purple-500">Login</span>
            </Link>
            <p className="fs-14 terms text-center pt-5 text-black-500">
              By signing up, you agree to our 
              <span className="text-purple-500">Terms of Service</span> and
              acknowledge our 
              <span className="text-purple-500">Privacy Policy</span>
            </p>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
