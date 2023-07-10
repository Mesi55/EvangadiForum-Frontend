import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { Alert, Button, Card, Form } from "react-bootstrap";
import "./login.css";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post(`${process.env.REACT_APP_base_url}/user/login`, {
        email: form.email,
        password: form.password,
      });
      console.log(loginRes);

      if (loginRes && loginRes.data) {
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
          userId: loginRes.data.user.user_id,
          username: loginRes.data.user.username,
        });

        localStorage.setItem("auth-token", loginRes.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${loginRes.data.token}`;
        navigate("/");
      } else {
        console.log("problem", loginRes);
        alert("An error occurred while logging in. Please try again later.");
      }
    } catch (err) {
      console.log("problem logining");
      alert(err.response.data.message);
    }
  };
  
  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);

  //? passoword icon
  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "passwordConfirm") {
      setShowPasswordConfirm(!showPasswordConfirm);
    }
  };

  return (
    <>
      
      <div className="container main-signup-wraper d-flex flex-column flex-md-row align-items-center my-md-0 mt-sm-0  mx-5 justify-content-center  " >
        <div className="mt-5 mt-md-0 d-sm-block d-md-none"><br /><br /> <br /></div>
      <Card className=" mt-md-0 mt-sm-5 boxlogin flex-grow-1 mb-5 col-sm-12 col-md-6 mx-5"  style={{ width: "100%", maxWidth: "400px", }}>
        <Card.Body>
          <h3 className="text-center mt-5 ">Login to your account</h3>
          <p className=" text-center my-5">
            Don’t have an account?{" "} <br />
            <Link to="/signup"> Create a new account</Link>
          </p>
          <Form className="mx-auto px-5 form  loginfrom" onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                name="email"
                className="in1 py-2"
                placeholder="Email Address"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group id="password">
              <Form.Control
              type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="in1 py-2"
                name="password"
                onChange={handleChange}
                required
                      />
                        <FontAwesomeIcon
              icon={showPassword ? faEye  : faEyeSlash}
              className="password-toggle"
              onClick={() => handleTogglePassword("password")}
              
            />
            </Form.Group>
            <br />
            <p className="forgot py-3 ">
              <Link to="/forgot_password" className="text-gray-800">
                Forgot Passowrd?
                      </Link>{" "}
                      
            </p>
            <Button className="text-center in1 " type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    {/* </div> */}
   <div className="mt-0 col-sm-12 col-md-6" style={{ width: "100%", maxWidth: "400px" }}>
      <p className="forTitle">
        <a className="forTitle" href="#">
          About
        </a>
      </p>
      <h1>Evangadi Networks</h1>
      <p>
        No matter what stage of life you are in, whether you’re just starting
        elementary school or being promoted to CEO of a Fortune 500 company,
        you have much to offer to those who are trying to follow in your
        footsteps.
        <br />
        <br />
        <br />
        Whether you are willing to share your knowledge or you are just looking
        to meet mentors of your own, please start by joining the network here.
      </p>
      <button type="" className="button">
        HOW IT WORKS
      </button>
    </div>

</div>
    </>
  );
};

export default LoginPage;
