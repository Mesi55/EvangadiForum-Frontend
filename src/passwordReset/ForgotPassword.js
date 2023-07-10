import React, { useState } from "react";
import "./forgot.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OTP from './OTP';
import Cookie from "universal-cookie";


export const userEmail = React.createContext();
function ForgotPassword() {
  const [userData, setuserData] = useState({
    user_email_for_Password: "",
  });
  const [response, setResponse] = useState();
  const [encrypted, setEncypted] = useState("");
  let cookie = new Cookie();
  let navigate = useNavigate();

  let url = `${process.env.REACT_APP_base_url}/user/ForNewPassword`;
  let userSet = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url,
      data: userData,
    }).then((response) => {
      setResponse(response.data);
      setEncypted(response.data.Encrypt);
     
    });
  };
  let handleChange = (e) => {
    switch (e.target.name) {
      case "user_email_for_Password":
        setuserData((pre) => {
          return { user_email_for_Password: e.target.value };
        });
        break;
      default:
        break;
    }
  };
  if (response) {
    if (response.confirmation == false) {
      return (
        <div className="forSuccessPa pageNotFound ">
          <h1 className="thankYou">{response.message}</h1>
          <a className="thankYouAnch" href={`${response.redirect}`}>
            {response.redirectMessage}
          </a>
        </div>
      );
    } else {
      return encrypted ? (
        navigate(`/forgotPass/${encrypted}`)
      ) : (
        <h2>laoding</h2>
      );
    }
  } else {
    return (
<div className="login-container">
  <div className="login-content">
    <p className="login-text">
      Don't have an account? <br />
      <Link to="/signup" className="signup-link">Create a new account</Link>
    </p>
    <form onSubmit={userSet} className="login-form">
      <input
        className="email-input"
        type="email"
        name="user_email_for_Password"
        placeholder="Your Email"
        required
        onChange={handleChange}
      />
      <button className="submit-button">Send Reset Code</button>
    </form>
  </div>
</div>

    );
  }
}

export default ForgotPassword;
