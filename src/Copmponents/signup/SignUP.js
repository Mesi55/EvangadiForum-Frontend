import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import "./signup.css";

function SignUP() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [form, setForm] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "passwordConfirm") {
      setShowPasswordConfirm(!showPasswordConfirm);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submit:", form);
    try {
      //sending data to be registered in db
      await axios.post(`${process.env.REACT_APP_base_url}/user`, form);
      //once registered, automatically log in the user
      const loginRes = await axios.post(`${process.env.REACT_APP_base_url}/user/login`, {
        email: form.email,
        password: form.password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/login");
    } catch (error) {
      console.log("problem", error.response.data.message);
      alert(error.response.data.message);
      // alert(error.response.data.message);
    }
    console.log("Form data after submit:", form);
  };

  return (
    <div className="container main-signup-wraper d-flex flex-column flex-md-row justify-content-center align-items-center  mx-5 mb-5 ">
        <div className="mt-5 mt-md-0 d-sm-block d-md-none"><br /><br /> <br /></div>
      <Card
        className="boxlogin mt-md-0 mt-sm-5  pt-4 col-sm-12 col-md-6 mx-5"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Card.Body>
          <h2 className="text-center pt-sm-3 pt-md-0">Join the network</h2>
          <h6 className="text-center ">
            Already have an account? <Link to="/login">Sign In</Link>
          </h6>

          <form className="text-center form" onSubmit={handleSubmit}>
            <input
              className="in1 py-2"
              type="text"
              name="email"
              placeholder="email"
              onChange={handleChange}
              required
            />
            <br />
            <div className="d-flex  my-4 justify-content-space-between">
              <input
                className="in1 py-2"
                type="text"
                name="firstName"
                onChange={handleChange}
                required
                placeholder="First Name"
              />

              <input
                className="in1 py-2"
                placeholder="Last Name"
                style={{ marginLeft: "25px" }}
                type="text"
                name="lastName"
                onChange={handleChange}
                required
              />
            </div>
            <input
              className="in1 py-2"
              placeholder="User Name"
              type="text"
              name="userName"
              onChange={handleChange}
              required
            />
            <br />
            <div className="password-input-wrapper my-4">
              <input
                className="in1 py-2"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="password"
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="password-toggle-icon "
                onClick={() => handleTogglePassword("password")}
              />
            </div>
            <br />I agree to the <a href="#privacy">privacy policy</a> and{" "}
            <a href="">terms of service</a>
            <br />
            <Button className=" in1 mt-2" type="submit">
              Agree and Join
            </Button>
            <div className=" text-center pt-2  loginlink">
              <Link to="/login"> Already have an account?</Link>
            </div>
          </form>
        </Card.Body>
      </Card>

      <div className="my-5 col-sm-12 col-md-6" style={{ width: "100%", maxWidth: "400px" }}>
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
      <button type="" className="button ">
        HOW IT WORKS
      </button>
    </div>
    </div>
  );
}

export default SignUP;